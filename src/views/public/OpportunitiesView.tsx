import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FundingOpportunity } from '../../types';
import { 
  Search, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  ExternalLink, 
  Clock, 
  Bookmark, 
  CheckCircle2, 
  X, 
  Building, 
  Globe, 
  ChevronRight,
  Filter
} from 'lucide-react';

export const OpportunitiesView: React.FC = () => {
  const { opportunities } = useApp();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('Tous');
  const [selectedOpp, setSelectedOpp] = useState<FundingOpportunity | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredOpps = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(search.toLowerCase()) ||
      opp.donor.toLowerCase().includes(search.toLowerCase()) ||
      opp.domain.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'Tous' || opp.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Veille Stratégique & Partenariats
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
            Opportunités de Financement & Appels à Projets
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Plateforme de veille collaborative pour les subventions féministes, fonds d'urgence, 
            appels à propositions et bourses de recherche ouvertes aux ONG béninoises.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par bailleur, domaine, mot-clé..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>

            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              >
                <option value="Tous">Tous les types de financement</option>
                <option value="grant">Subvention / Don (Grant)</option>
                <option value="call_for_proposals">Appel à propositions officiel</option>
                <option value="award">Prix & Bourse d'excellence</option>
                <option value="partnership">Partenariat stratégique</option>
              </select>
            </div>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpps.map((opp) => {
            const isSaved = bookmarkedIds.includes(opp.id);
            return (
              <div
                key={opp.id}
                onClick={() => setSelectedOpp(opp)}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-teal-300 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200 uppercase tracking-wider">
                      {opp.type.replace('_', ' ')}
                    </span>
                    <button
                      onClick={(e) => toggleBookmark(opp.id, e)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isSaved ? 'text-teal-600 bg-teal-50' : 'text-slate-300 hover:text-slate-600'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-teal-600' : ''}`} />
                    </button>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-teal-700 transition-colors">
                    {opp.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>Bailleur : <strong className="text-slate-800">{opp.donor}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Budget max : <strong className="text-emerald-700">{opp.amount}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Date limite : <strong className="text-slate-900">{opp.deadline}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-800">
                  <span>Consulter les critères & postuler</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Opportunity Modal */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200 uppercase">
                  {selectedOpp.domain}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-2">
                  {selectedOpp.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOpp(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block">Organisme Bailleur :</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedOpp.donor}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block">Enveloppe financière :</span>
                  <span className="font-bold text-emerald-700 text-sm">{selectedOpp.amount}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block">Date limite de soumission :</span>
                  <span className="font-bold text-teal-700 text-sm">{selectedOpp.deadline}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block">Zone d'éligibilité :</span>
                  <span className="font-bold text-slate-900">{selectedOpp.eligibilityRegion}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider text-teal-700 mb-1">
                  Description de l'Appel
                </h4>
                <p className="leading-relaxed text-slate-600">
                  {selectedOpp.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider text-teal-700 mb-1">
                  Critères d'Éligibilité
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedOpp.criteria?.map((crit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedOpp(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs cursor-pointer"
              >
                Fermer
              </button>

              <a
                href={selectedOpp.url}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs"
              >
                <span>Accéder au formulaire de candidature</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
