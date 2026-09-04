import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentResource } from '../../types';
import { 
  Search, 
  FileText, 
  Download, 
  Eye, 
  ShieldCheck, 
  Lock, 
  BookOpen, 
  CheckCircle2, 
  X, 
  Sparkles,
  Printer
} from 'lucide-react';

export const ResourcesView: React.FC = () => {
  const { documents, currentUser } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tous');
  const [viewingDoc, setViewingDoc] = useState<DocumentResource | null>(null);

  const categories = ['Tous', 'Rapports Annuels & Bilan', 'Gouvernance & Statuts', 'Politiques de Sauvegarde & Genre', 'Guides & Formations'];

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = (doc.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (doc.description || '').toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'Tous' || doc.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleDownload = (doc: DocumentResource) => {
    setViewingDoc(doc);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Centre Documentaire & Transparence
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
            Ressources, Rapports & Politiques
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Accédez en toute transparence à nos documents officiels, statuts constitutifs, 
            rapports d'activités certifiés, manuels de procédures et outils de formation.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un rapport, une politique..."
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
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-teal-400 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    {(doc.fileExtension || 'PDF').toUpperCase()} • {doc.fileSize || 'N/A'}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-teal-700 block mb-1">
                    {doc.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {doc.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {doc.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Mis à jour le {doc.uploadDate}
                </span>

                <button
                  onClick={() => handleDownload(doc)}
                  className="px-3.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Consulter</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Reader / Preview Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                  PDF
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                    {viewingDoc.title}
                  </h2>
                  <span className="text-xs text-slate-400">
                    {viewingDoc.category} • {viewingDoc.fileSize}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setViewingDoc(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Content Simulation */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
              <div className="text-center border-b border-slate-200 pb-3 font-sans">
                <div className="font-black text-slate-900 text-base">HEALTHDEV ONG – HEALTH AND DEVELOPMENT</div>
                <div className="text-[11px] text-slate-500">Parakou, République du Bénin • Documents Officiels</div>
              </div>

              <p className="font-bold text-slate-900 font-sans text-sm">
                Objet : {viewingDoc.title}
              </p>

              <p>
                {viewingDoc.description}
              </p>

              <div className="p-3 bg-white rounded-xl border border-slate-200 font-sans text-xs space-y-1">
                <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Document validé par le Conseil d'Administration</span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Enregistré au registre documentaire sous la référence DOC-HD-2024-{viewingDoc.id}.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer</span>
              </button>

              <button
                onClick={() => {
                  setViewingDoc(null);
                }}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le document officiel (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
