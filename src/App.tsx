import React, { useState, useEffect } from 'react';
import { CategoryId, ToolItem, BlogArticle, AdSenseConfig } from './types';
import { TOOLS_DATA } from './data/toolsData';
import { INITIAL_BLOGS } from './data/initialBlogs';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToolGrid } from './components/ToolGrid';
import { ToolView } from './components/ToolView';
import { BlogHub } from './components/BlogHub';
import { AboutUs } from './components/AboutUs';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { Disclaimer } from './components/Disclaimer';
import { ContactPage } from './components/ContactPage';
import { SitemapModal } from './components/SitemapModal';

export function App() {
  const [activeTab, setActiveTab] = useState<'tools' | 'blog' | 'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact'>('tools');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);

  // Favorites state persisted in LocalStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aitoolshub_favorites');
      return saved ? JSON.parse(saved) : ['pdf-merge-split', 'loan-mortgage-calc', 'ai-article-generator'];
    } catch {
      return ['pdf-merge-split', 'loan-mortgage-calc'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aitoolshub_favorites', JSON.stringify(favorites));
    } catch {
      // ignore storage errors
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  // Blog Articles state initialized with SEO blogs
  const [articles, setArticles] = useState<BlogArticle[]>(() => {
    try {
      const saved = localStorage.getItem('aitoolshub_blogs');
      return saved ? JSON.parse(saved) : INITIAL_BLOGS;
    } catch {
      return INITIAL_BLOGS;
    }
  });

  const handleAddNewArticle = (newArticle: BlogArticle) => {
    const updated = [newArticle, ...articles];
    setArticles(updated);
    try {
      localStorage.setItem('aitoolshub_blogs', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // AdSense Placement Configuration
  const [adConfig, setAdConfig] = useState<AdSenseConfig>({
    publisherId: 'ca-pub-9876543210987654',
    enabled: true,
    demoMode: true,
    slots: {
      headerBanner: '10001',
      sidebarSquare: '10002',
      inArticle: '10003',
      footerSticky: '10004',
      toolSidebar: '10005',
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-indigo-600 selection:text-white transition-colors duration-200">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedTool(null);
        }}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedTool(null);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
        onOpenSitemap={() => setIsSitemapOpen(true)}
        adConfig={adConfig}
        setAdConfig={setAdConfig}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {selectedTool ? (
          <ToolView
            tool={selectedTool}
            onBack={() => setSelectedTool(null)}
            onSelectTool={(tool) => setSelectedTool(tool)}
            isFavorite={favorites.includes(selectedTool.id)}
            onToggleFavorite={toggleFavorite}
            adConfig={adConfig}
          />
        ) : (
          <>
            {activeTab === 'tools' && (
              <ToolGrid
                tools={TOOLS_DATA}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSelectTool={(tool) => setSelectedTool(tool)}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                showFavoritesOnly={showFavoritesOnly}
                setShowFavoritesOnly={setShowFavoritesOnly}
                adConfig={adConfig}
                onNavigateBlog={() => setActiveTab('blog')}
              />
            )}

            {activeTab === 'blog' && (
              <BlogHub articles={articles} onAddNewArticle={handleAddNewArticle} adConfig={adConfig} />
            )}

            {activeTab === 'about' && <AboutUs />}
            {activeTab === 'privacy' && <PrivacyPolicy />}
            {activeTab === 'terms' && <TermsAndConditions />}
            {activeTab === 'disclaimer' && <Disclaimer />}
            {activeTab === 'contact' && <ContactPage />}
          </>
        )}
      </main>

      {/* Footer Navigation & Compliance */}
      <Footer
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedTool(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSitemap={() => setIsSitemapOpen(true)}
      />

      {/* XML Sitemap & Robots.txt Modal */}
      <SitemapModal isOpen={isSitemapOpen} onClose={() => setIsSitemapOpen(false)} />
    </div>
  );
}

export default App;
