import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NewsArticle } from '../../types';
import { 
  Search, 
  Calendar, 
  User, 
  Tag, 
  X, 
  ChevronRight, 
  Share2, 
  Eye, 
  Sparkles,
  ArrowLeft,
  Megaphone
} from 'lucide-react';
import { FacebookFeedSection } from '../../components/public/FacebookFeedSection';
import { PartnersCarousel } from '../../components/public/PartnersCarousel';

export const NewsView: React.FC = () => {
  const { news, selectedArticleId, setSelectedArticleId } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tous');

  const categories = ['Tous', 'Santé Mentale', 'Environnement', 'Campagne', 'Institutionnel', 'Autonomisation', 'Témoignage', 'Plaidoyer'];

  const filteredNews = news.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.content.toLowerCase().includes(search.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = categoryFilter === 'Tous' || art.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const activeArticle = news.find(n => n.id === selectedArticleId);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Actualités & Plaidoyer
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
            Voix du Terrain & Publications
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Suivez au quotidien l'actualité des activités, les communiqués officiels et 
            les histoires d'émancipation portées par HEALTHDEV ONG.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par mot-clé, tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>

            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c === 'Tous' ? 'Toutes les catégories' : c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.length === 0 ? (
            <div className="col-span-full py-16 px-6 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#144D32] flex items-center justify-center mx-auto">
                <Megaphone className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">Aucune actualité trouvée</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                {search || categoryFilter !== 'Tous'
                  ? "Aucun article ne correspond à vos critères de recherche. Essayez d'autres termes."
                  : "Aucune publication ou communiqué n'est disponible pour le moment. Les nouveaux articles paraîtront ici."}
              </p>
              {(search || categoryFilter !== 'Tous') && (
                <button
                  onClick={() => { setSearch(''); setCategoryFilter('Tous'); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          ) : (
            filteredNews.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticleId(article.id)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg hover:border-teal-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {article.imageUrl && (
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-slate-950/80 text-white text-[10px] font-bold rounded-lg uppercase">
                        {article.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    {!article.imageUrl && (
                      <span className="px-2.5 py-1 bg-teal-50 text-teal-800 text-[10px] font-bold rounded-lg uppercase border border-teal-200">
                        {article.category}
                      </span>
                    )}
                    <div className="flex items-center gap-1.5 ml-auto">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-teal-700 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 mb-3">
                  {article.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px]">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-800">
                  <span>Lire l'article complet</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))
          )}
        </div>

        <PartnersCarousel />

        <FacebookFeedSection />
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-10 space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200 uppercase">
                  {activeArticle.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mt-2">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span>Rédigé par <strong>{activeArticle.author}</strong></span>
                </div>
              </div>
              <button
                onClick={() => setSelectedArticleId(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-16/9 bg-slate-100">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body */}
            <div className="prose prose-slate text-xs sm:text-sm leading-relaxed space-y-4 text-slate-700">
              {activeArticle.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-1.5">
                {activeArticle.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                    #{t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedArticleId(null)}
                className="px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Fermer l'article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
