import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Partner } from '../../types';
import { Plus, Edit, Trash2, Building, Globe, CheckCircle2, X } from 'lucide-react';

export const PartnersManager: React.FC = () => {
  const { partners = [], addPartner, updatePartner, deletePartner } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [type, setType] = useState<Partner['type']>('ngo');
  const [country, setCountry] = useState('Bénin');
  const [description, setDescription] = useState('');
  const [sinceYear, setSinceYear] = useState<number>(2024);
  const [website, setWebsite] = useState('');
  const [fundingScope, setFundingScope] = useState('');

  const openAddModal = () => {
    setEditingPartner(null);
    setName('');
    setLogoUrl('');
    setType('ngo');
    setCountry('Bénin');
    setDescription('');
    setSinceYear(2024);
    setWebsite('');
    setFundingScope('Appui technique & financier');
    setIsModalOpen(true);
  };

  const openEditModal = (partner: Partner) => {
    setEditingPartner(partner);
    setName(partner.name);
    setLogoUrl(partner.logoUrl);
    setType(partner.type);
    setCountry(partner.country);
    setDescription(partner.description || '');
    setSinceYear(partner.sinceYear || 2024);
    setWebsite(partner.website || '');
    setFundingScope(partner.fundingScope || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingPartner) {
      updatePartner(editingPartner.id, {
        name,
        logoUrl,
        type,
        country,
        description,
        sinceYear,
        website,
        fundingScope
      });
    } else {
      addPartner({
        name,
        logoUrl,
        type,
        country,
        description,
        sinceYear,
        website,
        fundingScope,
        focusDomains: ['Santé', 'Égalité', 'Jeunesse'],
        projectsExecuted: ['Projet Partenariat 2025'],
        activitiesExecuted: ['Sensibilisation & Mobilisation'],
        interventionZones: ['Parakou', 'Borgou']
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, partnerName: string) => {
    if (window.confirm(`Supprimer le partenaire "${partnerName}" ?`)) {
      deletePartner(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            Gestion des Partenaires Institutionnels & PTF
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Ajoutez, modifiez ou supprimez les organismes partenaires techniques, financiers et sociaux.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un Partenaire</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {partners.map((partner) => (
          <div key={partner.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 font-bold text-[10px] uppercase border border-teal-200">
                  {partner.type}
                </span>
                <span className="text-[11px] text-slate-400 font-bold">{partner.country}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base leading-snug">{partner.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-3">{partner.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">Partenaire depuis {partner.sinceYear}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(partner)}
                  className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(partner.id, partner.name)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">
                {editingPartner ? 'Modifier le partenaire' : 'Nouveau partenaire'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">Logo du Partenaire *</label>
                
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Preview" className="h-full w-full object-contain" />
                    ) : (
                      <Building className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="URL du logo (ex: https://...)"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[11px] focus:outline-none focus:border-teal-500"
                    />
                    
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setLogoUrl(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold rounded-lg cursor-pointer transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Téléverser une image</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nom du Partenaire *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Type de Partenaire</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  >
                    <option value="ngo">ONG / Réseau</option>
                    <option value="international_donor">Bailleur International</option>
                    <option value="social_partner">Partenaire Social</option>
                    <option value="civil_society">Mairie / Institution</option>
                    <option value="private_sector">Secteur Privé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pays / Portée</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Périmètre d'appui</label>
                <input
                  type="text"
                  value={fundingScope}
                  onChange={(e) => setFundingScope(e.target.value)}
                  placeholder="Ex: Subvention & Appui technique"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl cursor-pointer">
                  Annuler
                </button>
                <button type="submit" className="px-5 py-2 bg-teal-600 text-white text-xs font-bold rounded-xl cursor-pointer">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
