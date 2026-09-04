import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, ProjectStatus } from '../../types';
import { NGO_INFO } from '../../data/initialData';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  X, 
  FileText, 
  ChevronRight, 
  Building, 
  Phone,
  Sparkles,
  TrendingUp
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { projects, selectedProjectId, setSelectedProjectId, activities } = useApp();
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('Tous');
  const [selectedStatus, setSelectedStatus] = useState<string>('Tous');

  const domainsList = ['Tous', ...Array.from(new Set(projects.map(p => p.domain)))];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.location.toLowerCase().includes(search.toLowerCase()) ||
      project.donorOrPartner.toLowerCase().includes(search.toLowerCase());
    const matchesDomain = selectedDomain === 'Tous' || project.domain === selectedDomain;
    const matchesStatus = selectedStatus === 'Tous' || project.status === selectedStatus;
    return matchesSearch && matchesDomain && matchesStatus;
  });

  const activeProjectModal = projects.find(p => p.id === selectedProjectId);
  const projectActivities = activities.filter(a => a.projectId === selectedProjectId);

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'in_progress':
        return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">En cours</span>;
      case 'preparation':
        return <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold">En préparation</span>;
      case 'planned':
        return <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold">Planifié</span>;
      case 'completed':
        return <span className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-bold">Terminé</span>;
      case 'paused':
        return <span className="px-2.5 py-1 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold">En pause</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 bg-red-100 text-red-800 rounded-lg text-xs font-bold">Annulé</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Programmes & Réalisations
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
            Nos Projets & Interventions
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Découvrez nos programmes d'action au Bénin pour la santé reproductive, 
            la lutte contre les VBG, l'autonomisation et la justice climatique.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="relative md:col-span-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par mot-clé, commune..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>

            {/* Domain Filter */}
            <div>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              >
                {domainsList.map(dom => (
                  <option key={dom} value={dom}>{dom}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              >
                <option value="Tous">Tous les statuts</option>
                <option value="in_progress">En cours</option>
                <option value="preparation">En préparation</option>
                <option value="planned">Planifié</option>
                <option value="completed">Terminé</option>
                <option value="paused">En pause</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg hover:border-teal-300 transition-all flex flex-col justify-between group p-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="px-2.5 py-1 bg-teal-50 text-teal-800 text-[10px] font-bold rounded-lg uppercase border border-teal-200">
                    {project.domain}
                  </span>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(project.status)}
                    <span className="font-mono font-bold text-slate-400">{project.code}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  <span>{project.location}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 mt-2 space-y-4">
                {/* Progress & Target */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Avancement</span>
                    <span className="text-teal-700 font-bold">{project.progressPercentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-600 rounded-full"
                      style={{ width: `${project.progressPercentage}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                    <span>Bénéficiaires :</span>
                    <strong className="text-slate-800">
                      {project.actualBeneficiaries.toLocaleString()} / {project.targetBeneficiaries.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProjectId(project.id)}
                  className="w-full py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer border border-teal-200/60"
                >
                  <span>Consulter le projet complet</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900">Aucun projet trouvé</h3>
            <p className="text-xs text-slate-500">
              Modifiez vos critères de recherche ou réinitialisez les filtres.
            </p>
          </div>
        )}
      </div>

      {/* Comprehensive Project Detail Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                    {activeProjectModal.domain}
                  </span>
                  {getStatusBadge(activeProjectModal.status)}
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {activeProjectModal.code}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  {activeProjectModal.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProjectId(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Content (2 cols) */}
              <div className="md:col-span-2 space-y-6">
                <div className="rounded-2xl overflow-hidden aspect-16/9 bg-slate-100">
                  <img
                    src={activeProjectModal.imageUrl}
                    alt={activeProjectModal.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-teal-700">
                    Description du Projet
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {activeProjectModal.description}
                  </p>
                </div>

                {/* Objectives */}
                <div className="space-y-2.5">
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-teal-700">
                    Objectifs Spécifiques
                  </h4>
                  <ul className="space-y-2">
                    {activeProjectModal.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Results */}
                {activeProjectModal.keyResults?.length > 0 && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Réalisations Clés à ce Jour</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-emerald-800">
                      {activeProjectModal.keyResults.map((res, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-bold">•</span>
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Activities */}
                {projectActivities.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-teal-700">
                      Activités Rattachées ({projectActivities.length})
                    </h4>
                    <div className="space-y-2">
                      {projectActivities.map(act => (
                        <div key={act.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-slate-900 block">{act.title}</span>
                            <span className="text-slate-500">{act.date} • {act.location}</span>
                          </div>
                          <span className="font-bold text-teal-600">{act.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Info (1 col) */}
              <div className="space-y-4 text-xs">
                {/* Meta card */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-200 pb-2">
                    Fiche Technique
                  </h4>

                  <div>
                    <span className="text-slate-400 block">Zone d'action :</span>
                    <span className="font-semibold text-slate-900">{activeProjectModal.location}, {activeProjectModal.commune} ({activeProjectModal.department})</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block">Période d'exécution :</span>
                    <span className="font-semibold text-slate-900">{activeProjectModal.startDate} au {activeProjectModal.endDate}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block">Bailleur / Partenaire :</span>
                    <span className="font-semibold text-teal-700">{activeProjectModal.donorOrPartner}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block">Budget alloué :</span>
                    <span className="font-bold text-slate-900 text-sm">{activeProjectModal.budget.toLocaleString()} {activeProjectModal.currency}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block">Responsable de Projet :</span>
                    <span className="font-semibold text-slate-900">{activeProjectModal.leadResponsible}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block">Cible Bénéficiaires :</span>
                    <span className="font-bold text-slate-900">
                      {activeProjectModal.actualBeneficiaries.toLocaleString()} / {activeProjectModal.targetBeneficiaries.toLocaleString()} atteints ({activeProjectModal.womenPercentage}% femmes)
                    </span>
                  </div>
                </div>

                {/* Documents */}
                {activeProjectModal.documents?.length > 0 && (
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <h5 className="font-bold text-slate-900 text-xs">Documents du projet</h5>
                    {activeProjectModal.documents.map(doc => (
                      <div key={doc.id} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                          <span className="truncate text-[11px] font-medium">{doc.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedProjectId(null)}
                className="px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
              >
                Fermer la fiche projet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
