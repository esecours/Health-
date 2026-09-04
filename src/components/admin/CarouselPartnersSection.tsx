import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building, 
  Plus, 
  Trash2, 
  Upload, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ExternalLink, 
  AlertTriangle 
} from 'lucide-react';

export const CarouselPartnersSection: React.FC = () => {
  const { partners = [], addPartner, deletePartner, setCurrentView } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<{ id: string; name: string } | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter partners with valid logos that show up in the carousel
  const carouselPartners = partners.filter(p => p.logoUrl && p.logoUrl.trim() !== '');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError('L\'image est trop volumineuse (maximum 5 Mo)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setLogoUrl(reader.result);
      }
    };
    reader.onerror = () => {
      setFileError('Erreur lors de la lecture du fichier');
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAddModal = () => {
    setName('');
    setLogoUrl('');
    setFileError('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!logoUrl.trim()) {
      setFileError('Veuillez téléverser une image ou fournir un lien vers le logo');
      return;
    }

    addPartner({
      name: name.trim(),
      logoUrl: logoUrl.trim(),
      type: 'ngo',
      country: 'Bénin',
      focusDomains: ['Santé', 'Égalité', 'Jeunesse'],
      projectsExecuted: [],
      activitiesExecuted: [],
      interventionZones: ['National'],
      sinceYear: new Date().getFullYear(),
      description: `Partenaire stratégique de HEALTHDEV ONG - Affiché dans le carrousel public.`
    });

    setIsModalOpen(false);
    setName('');
    setLogoUrl('');
  };

  const handleConfirmDelete = () => {
    if (partnerToDelete) {
      deletePartner(partnerToDelete.id);
      setPartnerToDelete(null);
    }
  };

  return (
    <div id="carousel-partners-section" className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-50 text-[#144D32] rounded-xl border border-emerald-100">
              <Building className="w-5 h-5" />
            </span>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 font-display">
              Gestion des Partenaires du Carrousel
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {carouselPartners.length} affichés
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl">
            Ajoutez ou supprimez les partenaires qui défilent automatiquement dans le bandeau de l'onglet{' '}
            <strong className="text-slate-700">« Actualités & Voix du Changement »</strong> et sur la page d'accueil.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setCurrentView('news')}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Voir le carrousel sur la page Actualités"
          >
            <ExternalLink className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Voir le Carrousel</span>
          </button>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-[#144D32] hover:bg-[#0f3a25] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un Partenaire</span>
          </button>
        </div>
      </div>

      {/* Grid of carousel partners */}
      {carouselPartners.length === 0 ? (
        <div className="p-10 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Building className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">Aucun partenaire dans le carrousel</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Ajoutez votre premier partenaire avec son nom et son image pour qu'il commence à défiler automatiquement.
          </p>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-[#144D32] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#0f3a25] transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter maintenant</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {carouselPartners.map(partner => (
            <div 
              key={partner.id} 
              className="group relative bg-slate-50 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-teal-300 p-4 transition-all duration-200 flex flex-col items-center justify-between gap-3 text-center hover:shadow-md"
            >
              {/* Delete quick action */}
              <button
                type="button"
                onClick={() => setPartnerToDelete({ id: partner.id, name: partner.name })}
                className="absolute top-2 right-2 p-1.5 bg-white text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg border border-slate-200 opacity-80 group-hover:opacity-100 transition-all cursor-pointer shadow-xs"
                title={`Supprimer ${partner.name} du carrousel`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              {/* Logo preview */}
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-white border border-slate-200/80 p-2.5 flex items-center justify-center overflow-hidden shrink-0 mt-2 shadow-2xs">
                <img 
                  src={partner.logoUrl} 
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    // Fallback visual if image fails to load
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Partner Name & Tag */}
              <div className="w-full">
                <h4 className="font-bold text-slate-800 text-xs truncate" title={partner.name}>
                  {partner.name}
                </h4>
                <div className="mt-1 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                    Défile
                  </span>
                </div>
              </div>

              {/* Explicit Delete Button */}
              <button
                type="button"
                onClick={() => setPartnerToDelete({ id: partner.id, name: partner.name })}
                className="w-full py-1.5 px-2 text-[10px] font-bold text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Supprimer</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add Partner */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#144D32] flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Ajouter un Partenaire au Carrousel
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Sera immédiatement visible dans le défilement automatique
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Partner Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nom du Partenaire *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: OMS Bénin, UNICEF, Mairie de Cotonou..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#144D32]"
                />
              </div>

              {/* Partner Logo (Upload or URL) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Image du Logo *
                </label>

                {/* Preview Box */}
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="h-16 w-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 p-1">
                    {logoUrl ? (
                      <img 
                        src={logoUrl} 
                        alt="Aperçu du logo" 
                        className="h-full w-full object-contain" 
                      />
                    ) : (
                      <Building className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">
                      {logoUrl ? 'Image sélectionnée' : 'Aucune image'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {logoUrl ? 'Prêt à être ajouté au carrousel' : 'Téléversez un fichier ou collez un lien URL'}
                    </p>
                  </div>
                </div>

                {/* Upload Button */}
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="carousel-partner-file-upload"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
                  >
                    <Upload className="w-4 h-4 text-slate-600" />
                    <span>Choisir une image sur l'ordinateur</span>
                  </button>
                </div>

                {/* Or direct URL */}
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="h-px bg-slate-200 flex-1"></div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">ou lien web</span>
                    <div className="h-px bg-slate-200 flex-1"></div>
                  </div>
                  <input
                    type="url"
                    value={logoUrl.startsWith('data:') ? '' : logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://example.com/logo-partenaire.png"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#144D32]"
                  />
                </div>

                {fileError && (
                  <p className="text-xs text-red-600 font-medium">{fileError}</p>
                )}
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#144D32] hover:bg-[#0f3a25] text-white text-xs font-bold rounded-xl cursor-pointer transition-all shadow-sm flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enregistrer & Afficher</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirmation Delete */}
      {partnerToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-bold text-slate-900 text-base">
                Retirer du Carrousel ?
              </h3>
              <p className="text-xs text-slate-500">
                Êtes-vous sûr de vouloir retirer le partenaire <strong className="text-slate-800">« {partnerToDelete.name} »</strong> du carrousel public ?
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPartnerToDelete(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Oui, Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
