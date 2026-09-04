import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { NewsArticle } from '../../types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  X, 
  Megaphone, 
  CheckCircle2, 
  Upload, 
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';

export const NewsManager: React.FC = () => {
  const { news = [], addNewsArticle, updateNewsArticle, deleteNewsArticle } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Communiqué Officiel');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('Direction Exécutive HEALTHDEV');
  const [readTime, setReadTime] = useState('2 min');
  const [isBannerAnnouncement, setIsBannerAnnouncement] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openAddModal = () => {
    setEditingArticle(null);
    setTitle('');
    setCategory('Communiqué Officiel');
    setSummary('');
    setContent('');
    setImageUrl('');
    setAuthor('Direction Exécutive HEALTHDEV');
    setReadTime('2 min');
    setIsBannerAnnouncement(true);
    setIsModalOpen(true);
  };

  const openEditModal = (article: NewsArticle) => {
    setEditingArticle(article);
    setTitle(article.title);
    setCategory(article.category);
    setSummary(article.summary || article.excerpt || '');
    setContent(article.content || '');
    setImageUrl(article.imageUrl || '');
    setAuthor(article.author || 'Direction Exécutive HEALTHDEV');
    setReadTime(article.readTime || '2 min');
    setIsBannerAnnouncement(article.isBannerAnnouncement ?? true);
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleBannerFlag = (article: NewsArticle) => {
    updateNewsArticle(article.id, {
      isBannerAnnouncement: !article.isBannerAnnouncement
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingArticle) {
      updateNewsArticle(editingArticle.id, {
        title: title.trim(),
        category,
        summary: summary.trim(),
        excerpt: summary.trim(),
        content: content.trim(),
        imageUrl: imageUrl.trim() || undefined,
        author: author.trim() || 'Direction Exécutive HEALTHDEV',
        readTime,
        isBannerAnnouncement
      });
    } else {
      addNewsArticle({
        title: title.trim(),
        category,
        date: new Date().toISOString().split('T')[0],
        summary: summary.trim(),
        excerpt: summary.trim(),
        content: content.trim(),
        imageUrl: imageUrl.trim() || undefined,
        author: author.trim() || 'Direction Exécutive HEALTHDEV',
        readTime,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        isPublished: true,
        isBannerAnnouncement,
        tags: [category, 'Bénin', 'Communiqué']
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, artTitle: string) => {
    if (window.confirm(`Supprimer définitivement le communiqué/article "${artTitle}" ?`)) {
      deleteNewsArticle(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#144D32] flex items-center justify-center">
              <Megaphone className="w-4 h-4" />
            </div>
            <span>Gestion des Communiqués & Publications</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Rédigez les communiqués officiels, flash infos et actualités diffusés sur le site public et en direct dans le bandeau d'en-tête.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 bg-[#144D32] hover:bg-[#0d3623] active:scale-[0.98] text-white text-xs font-bold rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Créer un Communiqué</span>
        </button>
      </div>

      {/* Grid or Empty State */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {news.length === 0 ? (
          <div className="col-span-full py-16 px-6 text-center bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#144D32] flex items-center justify-center mx-auto border border-emerald-100">
              <Megaphone className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 font-display">Aucun communiqué ou article enregistré</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Toutes les données démo ont été nettoyées. Vous pouvez maintenant publier vos véritables communiqués officiels et articles d'actualité.
              </p>
            </div>
            <div>
              <button
                onClick={openAddModal}
                className="px-5 py-2.5 bg-[#144D32] hover:bg-[#0d3623] text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Rédiger un premier communiqué</span>
              </button>
            </div>
          </div>
        ) : (
          news.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#144D32] transition-all flex flex-col justify-between">
              <div>
                <div className="h-44 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  {article.imageUrl ? (
                    <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5 p-4 text-center">
                      <Megaphone className="w-8 h-8 text-slate-300" />
                      <span className="text-[11px] font-medium text-slate-400">HEALTHDEV Communiqué</span>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-[#144D32] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                    {article.category}
                  </span>

                  {article.isBannerAnnouncement && (
                    <span className="absolute top-3 right-3 bg-[#E86A24] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                      <Megaphone className="w-3 h-3" />
                      <span>Bandeau Haut</span>
                    </span>
                  )}
                </div>
                <div className="p-4 sm:p-5 space-y-2">
                  <div className="text-[10px] text-slate-400 flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.author}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">{article.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{article.summary || article.excerpt}</p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => toggleBannerFlag(article)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    article.isBannerAnnouncement
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-slate-200/80 text-slate-600 hover:bg-slate-300'
                  }`}
                  title="Activer/Désactiver l'affichage dans le bandeau supérieur"
                >
                  <Megaphone className="w-3.5 h-3.5" />
                  <span>{article.isBannerAnnouncement ? 'Actif en haut' : '+ Diffuser en haut'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(article)}
                    className="p-2 text-slate-600 hover:text-[#144D32] hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id, article.title)}
                    className="p-2 text-slate-600 hover:text-rose-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
            <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-[#144D32]" />
                <span>{editingArticle ? 'Modifier le Communiqué' : 'Rédiger un Communiqué Officiel'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Titre du Communiqué / Publication *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Communiqué Officiel - Démarrage des sessions..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#144D32]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#144D32] bg-white"
                  >
                    <option value="Communiqué Officiel">Communiqué Officiel</option>
                    <option value="Flash Info">Flash Info</option>
                    <option value="Avis aux Bénévoles">Avis aux Bénévoles</option>
                    <option value="Plaidoyer & Droits">Plaidoyer & Droits</option>
                    <option value="Vie de l'ONG">Vie de l'ONG</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Auteur / Émetteur</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#144D32]"
                  />
                </div>
              </div>

              {/* Banner Toggle Switch */}
              <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Megaphone className="w-5 h-5 text-[#144D32] shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#144D32]">Diffuser dans le bandeau supérieur</h4>
                    <p className="text-[11px] text-emerald-800">Apparaîtra en direct au sommet de la page d'accueil</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isBannerAnnouncement}
                  onChange={(e) => setIsBannerAnnouncement(e.target.checked)}
                  className="w-5 h-5 accent-[#144D32] rounded cursor-pointer shrink-0"
                />
              </div>

              {/* Image Upload or URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Illustration / Affiche (Optionnelle)</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://... ou téléchargez un fichier"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="grow px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#144D32]"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span className="hidden sm:inline">Parcourir</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {imageUrl && (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img src={imageUrl} alt="Aperçu" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImageUrl('')}
                        className="absolute top-2 right-2 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Résumé court (Affiché en bandeau) *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Bref résumé d'une ou deux phrases pour la bannière..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#144D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Texte intégral du communiqué</label>
                <textarea
                  rows={4}
                  placeholder="Détails complets du communiqué ou de la note d'information..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#144D32]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors">
                  Annuler
                </button>
                <button type="submit" className="px-5 py-2 bg-[#144D32] hover:bg-[#0d3623] text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5 transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publier le Communiqué</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
