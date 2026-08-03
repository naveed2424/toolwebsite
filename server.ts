import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Endpoint to generate daily trending SEO blog post using Gemini with Search Grounding
app.post("/api/generate-blog", async (req, res) => {
  try {
    const { userPrompt } = req.body;
    
    const topicInstruction = userPrompt && userPrompt.trim().length > 0 
      ? userPrompt 
      : "Write today's best and trending topic in AI, tech tools, or productivity news.";

    const ai = getGeminiClient();

    const systemPrompt = `Act as a professional journalist, SEO expert, and content strategist. Write a detailed, engaging, and fact-based blog post on the latest news or current affairs topic based on the request: "${topicInstruction}".

Follow these strict rules and structure:
1. CONTENT STRUCTURE:
- Create a highly clickable, emotional, CTR-focused headline.
- Write an engaging introduction that hooks the reader.
- Provide background/context for beginners.
- Break the article into well-structured sections using Markdown H2 and H3 headings.
- Cover latest developments, key facts/data/statistics, expert insights, and real-world impacts.
- Use bullet points, short paragraphs, and clear formatting.
- Add a "Key Takeaways" section.
- Add an FAQ Section (3-4 Q&As).
- End with a strong conclusion and future outlook.

2. IMAGES & MEDIA:
- Suggest 5 image placeholders (1 Featured Image + 4 In-content images).
- For each image, provide:
  - Placement instruction (e.g., "Featured Image", "After Section 1", "After Section 2", "In Key Data Section", "Before Conclusion")
  - Image Concept (e.g., "Abstract AI neural web connecting global devices")
  - SEO-Optimized ALT Text
  - Caption

3. SEO & LINKING:
- Primary keyword and 3-5 secondary keywords.
- Meta Title (under 60 chars) and Meta Description (150-160 chars).
- Internal Linking Suggestions: Mention 3 internal tools from our website (e.g., AI Article Generator, SEO Meta Tag Generator, Readability Calculator, Image Converter, PDF Merger, Unit Converter).
- External Linking Suggestions: Cite 2-3 authoritative sources (e.g., OpenAI, Google DeepMind, MIT Tech Review, Nature).

Return your response strictly as valid JSON with the following structure (no markdown fences around JSON or raw string output):
{
  "title": "CTR Focused Title",
  "metaTitle": "SEO Meta Title",
  "metaDescription": "SEO Meta Description under 160 characters",
  "primaryKeyword": "Primary Keyword",
  "secondaryKeywords": ["Keyword 1", "Keyword 2", "Keyword 3"],
  "category": "AI Trends",
  "readTime": "8 min read",
  "author": "Tech Digest Editorial Team",
  "excerpt": "Brief engaging summary...",
  "tableOfContents": ["Section 1 Title", "Section 2 Title", "Section 3 Title"],
  "contentMarkdown": "Full article markdown body with H2, H3, lists, citations...",
  "featuredImage": {
    "url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    "alt": "SEO optimized alt text for featured image",
    "caption": "Caption for featured image"
  },
  "inContentImages": [
    {
      "placement": "After Introduction",
      "url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      "alt": "Alt text for image 1",
      "caption": "Caption 1"
    },
    {
      "placement": "In Key Developments",
      "url": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
      "alt": "Alt text for image 2",
      "caption": "Caption 2"
    },
    {
      "placement": "In Expert Insights",
      "url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      "alt": "Alt text for image 3",
      "caption": "Caption 3"
    },
    {
      "placement": "Before Conclusion",
      "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "alt": "Alt text for image 4",
      "caption": "Caption 4"
    }
  ],
  "keyTakeaways": ["Takeaway 1", "Takeaway 2", "Takeaway 3", "Takeaway 4"],
  "faq": [
    {"question": "Q1?", "answer": "A1"},
    {"question": "Q2?", "answer": "A2"},
    {"question": "Q3?", "answer": "A3"}
  ],
  "internalLinks": [
    {"anchor": "AI Article & Prompt Generator", "url": "#tool-ai-article-generator", "reason": "Generate structured content"},
    {"anchor": "SEO Meta Tag Generator", "url": "#tool-seo-meta-tag-generator", "reason": "Optimize page title and description"}
  ],
  "externalSources": [
    {"name": "Google DeepMind Research", "url": "https://deepmind.google"},
    {"name": "MIT Technology Review", "url": "https://technologyreview.com"}
  ],
  "ctaText": "Ready to boost your workflow? Try our 100+ free online AI and utility tools today!"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: topicInstruction,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }]
      },
    });

    const jsonText = response.text || "{}";
    const blogData = JSON.parse(jsonText);
    
    // Attach ID and timestamp
    const fullBlog = {
      id: "blog-" + Date.now(),
      slug: (blogData.title || "trending-topic").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      publishedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      views: Math.floor(Math.random() * 150) + 50,
      likes: Math.floor(Math.random() * 30) + 10,
      ...blogData,
    };

    res.json({ success: true, article: fullBlog });
  } catch (error: any) {
    console.error("Blog generation error:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Failed to generate blog post.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
