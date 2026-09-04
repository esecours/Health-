import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Announcement } from '../../types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Megaphone, 
  Image as ImageIcon, 
  Users, 
  Globe, 
  X, 
  Upload, 
  Calendar,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const AnnouncementsManager: React.FC = () => {
  const { announcements = [], addAnnouncement, updateAnnouncement, deleteAnnouncement } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [targetAudience, setTargetAudience] = useState<'public' | 'volunteers' | 'all'>('public');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isActive, setIsActive] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openAddModal = () => {
    setEditingAnnouncement(null);
    setTitle('');
    setContent('');
    setImageUrl('');
    setTargetAudience('public');
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate('');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (item: Announcement) => {
    setEditingAnnouncement(item);
    setTitle(item.title);
    setContent(item.content);
    setImageUrl(item.imageUrl || '');
    setTargetAudience(item.targetAudience || 'public');
    setStartDate(item.startDate || new Date().toISOString().split('T')[0]);
    setEndDate(item.endDate || '');
    setIsActive(item.isActive ?? true);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editingAnnouncement) {
      updateAnnouncement(editingAnnouncement.id, {
        title: title.trim(),
        content: content.trim(),
        imageUrl: imageUrl.trim() || undefined,
        targetAudience,
        startDate: startDate || new Date().toISOString().split('T')[0],
        endDate: endDate.trim() || undefined,
        isActive
      });
    } else {
      addAnnouncement({
        title: title.trim(),
        content: content.trim(),
        imageUrl: imageUrl.trim() || undefined,
        targetAudience,
        startDate: startDate || new Date().toISOString().split('T')[0],
        endDate: endDate.trim() || undefined,
        isActive
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, annTitle: string) => {
    if (window.confirm(`Supprimer définitivement le communiqué "${annTitle}" ?`)) {
      deleteAnnouncement(id);
    }
  };

  const getAudienceBadge = (audience: string) => {
    switch (audience) {
      case 'public':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[11px] font-bold">
            <Globe className="w-3 h-3 shrink-0" /> Grand Public
          </span>
        );
      case 'volunteers':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-[11px] font-bold">
            <Users className="w-3 h-3 shrink-0" /> Bénévoles Connectés
          </span>
        );
      case 'all':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-800 border border-purple-200 rounded-full text-[11px] font-bold">
            <Megaphone className="w-3 h-3 shrink-0" /> Public & Bénévoles
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#144D32]">
            <Megaphone className="w-4 h-4" />
            <span>Communication Officielle</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Gestion des Communiqués
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Diffusez des communiqués officiels (textes et images) qui défileront en direct dans le bandeau supérieur d'en-tête (Top Live Bar) du site et dans l'espace réservé aux bénévoles.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="w-full sm:w-auto px-5 py-3 bg-[#144D32] hover:bg-[#0d3623] active:scale-[0.98] text-white rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Communiqué</span>
        </button>
      </div>

      {/* Grid of Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {announcements.length === 0 ? (
          <div className="col-span-full py-12 px-4 text-center bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-8 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
              <Megaphone className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-800">Aucun communiqué officiel publié</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Cliquez sur le bouton ci-dessus pour rédiger et publier un communiqué avec texte ou image.
            </p>
          </div>
        ) : (
          announcements.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:border-[#144D32] transition-all"
            >
              <div className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {getAudienceBadge(item.targetAudience)}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.isActive ? 'Actif' : 'Masqué'}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug font-display break-words">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 break-words">
                  {item.content}
                </p>

                {item.imageUrl && (
                  <div className="relative aspect-video sm:aspect-16/9 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              <div className="px-4 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 font-medium">
                  Publié le {item.startDate || item.createdAt?.split('T')[0]}
                </span>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 text-slate-600 hover:text-[#144D32] hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                    title="Modifier"
                    aria-label="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-2 text-slate-600 hover:text-rose-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                    title="Supprimer"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal - Fully Responsive */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] sm:max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-xs z-20 px-4 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#144D32] shrink-0">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display truncate">
                    {editingAnnouncement ? 'Modifier le Communiqué' : 'Nouveau Communiqué Officiel'}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                    Diffusion officielle HEALTHDEV ONG
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form id="announcement-form" onSubmit={handleSubmit} className="overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5 grow overscroll-contain">
              
              {/* Titre */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Titre du Communiqué <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex : 📢 Communiqué : Lancement de la campagne..."
                  className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#144D32] focus:ring-1 focus:ring-[#144D32] transition-all bg-white"
                />
              </div>

              {/* Type d'Audience - Responsive Cards */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Public Cible d'Affichage <span className="text-rose-500">*</span>
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  <button
                    type="button"
                    onClick={() => setTargetAudience('public')}
                    className={`p-3 rounded-xl sm:rounded-2xl border text-left flex sm:flex-col items-center sm:items-start gap-2.5 sm:gap-2 transition-all cursor-pointer ${
                      targetAudience === 'public'
                        ? 'border-[#144D32] bg-emerald-50/60 text-[#144D32] ring-1 ring-[#144D32]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${targetAudience === 'public' ? 'bg-[#144D32] text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-tight">Grand Public</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">Page d'accueil du site</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetAudience('volunteers')}
                    className={`p-3 rounded-xl sm:rounded-2xl border text-left flex sm:flex-col items-center sm:items-start gap-2.5 sm:gap-2 transition-all cursor-pointer ${
                      targetAudience === 'volunteers'
                        ? 'border-teal-700 bg-teal-50/60 text-teal-800 ring-1 ring-teal-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${targetAudience === 'volunteers' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-tight">Bénévoles Connectés</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">Espace membre & missions</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetAudience('all')}
                    className={`p-3 rounded-xl sm:rounded-2xl border text-left flex sm:flex-col items-center sm:items-start gap-2.5 sm:gap-2 transition-all cursor-pointer ${
                      targetAudience === 'all'
                        ? 'border-purple-700 bg-purple-50/60 text-purple-800 ring-1 ring-purple-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${targetAudience === 'all' ? 'bg-purple-700 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Megaphone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-tight">Tous les deux</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">Public & Bénévoles</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Contenu textuel */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Texte du Communiqué <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Rédigez le texte officiel du communiqué..."
                  className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#144D32] focus:ring-1 focus:ring-[#144D32] transition-all bg-white leading-relaxed resize-y min-h-[100px]"
                ></textarea>
              </div>

              {/* Section Image : Téléversement ou URL */}
              <div className="space-y-2.5 p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Image d'illustration (Optionnel)
                  </label>
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('');
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      Supprimer l'image
                    </button>
                  )}
                </div>

                {/* Upload or URL options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {/* File Upload Button */}
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="announcement-file-upload"
                    />
                    <label
                      htmlFor="announcement-file-upload"
                      className="w-full py-2.5 px-3 rounded-xl border border-dashed border-slate-300 hover:border-[#144D32] bg-white text-xs font-bold text-slate-700 hover:text-[#144D32] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[44px]"
                    >
                      <Upload className="w-4 h-4 text-[#144D32] shrink-0" />
                      <span className="truncate">Téléverser une image</span>
                    </label>
                  </div>

                  {/* Direct input / Preset shortcuts */}
                  <div className="relative">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="/Ban1.jpg ou lien web"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-[#144D32] bg-white min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Raccourcis :</span>
                  <button
                    type="button"
                    onClick={() => setImageUrl('/Ban1.jpg')}
                    className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:border-[#144D32] text-[11px] text-slate-700 font-medium transition-colors cursor-pointer"
                  >
                    Ban1.jpg
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUrl('/Ban2.jpg')}
                    className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:border-[#144D32] text-[11px] text-slate-700 font-medium transition-colors cursor-pointer"
                  >
                    Ban2.jpg
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUrl('/hero_benin_activists.jpg')}
                    className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:border-[#144D32] text-[11px] text-slate-700 font-medium transition-colors cursor-pointer"
                  >
                    Membres & Activistes
                  </button>
                </div>

                {/* Preview if image is loaded */}
                {imageUrl && (
                  <div className="relative aspect-video sm:aspect-16/9 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 max-h-48 sm:max-h-56 mt-2">
                    <img
                      src={imageUrl}
                      alt="Aperçu du communiqué"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              {/* Dates & Visibilité */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Date de début
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-[#144D32] bg-white min-h-[44px]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Date de fin (Optionnel)
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-[#144D32] bg-white min-h-[44px]"
                  />
                </div>
              </div>

              {/* Toggle Actif */}
              <label
                htmlFor="isActiveAnnouncement"
                className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100/80 flex items-center gap-3 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  id="isActiveAnnouncement"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded text-[#144D32] focus:ring-[#144D32] shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                    Activer la diffusion immédiatement (Bandeau d'en-tête défilant)
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Le communiqué défilera en direct dans le bandeau supérieur de la plateforme.
                  </span>
                </div>
              </label>
            </form>

            {/* Modal Sticky Footer - Responsive layout */}
            <div className="sticky bottom-0 bg-slate-50/95 backdrop-blur-xs px-4 sm:px-6 py-3.5 sm:py-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors text-center cursor-pointer min-h-[44px]"
              >
                Annuler
              </button>
              <button
                type="submit"
                form="announcement-form"
                className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-[#144D32] hover:bg-[#0d3623] active:scale-[0.98] text-white rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md text-center cursor-pointer min-h-[44px]"
              >
                {editingAnnouncement ? 'Enregistrer les modifications' : 'Publier le Communiqué'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
