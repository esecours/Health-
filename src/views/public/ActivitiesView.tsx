import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, ActivityStatus } from '../../types';
import { CertificateModal } from '../../components/common/CertificateModal';
import { AddActivityModal } from '../../components/admin/AddActivityModal';
import { ActivityParticipantsModal } from '../../components/admin/ActivityParticipantsModal';
import { 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  X, 
  Award, 
  Clock, 
  Sparkles, 
  UserCheck, 
  Phone,
  ChevronRight,
  Filter,
  Plus,
  AlertCircle
} from 'lucide-react';

export const ActivitiesView: React.FC = () => {
  const { 
    activities, 
    selectedActivityId, 
    setSelectedActivityId, 
    currentUser, 
    registerForActivity,
    unregisterFromActivity,
    setCurrentView
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [departmentFilter, setDepartmentFilter] = useState('Tous');
  const [certActivity, setCertActivity] = useState<Activity | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewParticipantsActivity, setViewParticipantsActivity] = useState<Activity | null>(null);

  const departments = ['Tous', 'Borgou', 'Alibori', 'Donga', 'Atacora', 'Collines', 'Littoral'];

  const canPostActivity = (currentUser?.role === 'super_admin' || 
                          currentUser?.role === 'admin' || 
                          currentUser?.role === 'program_manager') && 
                          currentUser?.role !== 'volunteer';

  const filteredActivities = activities.filter(act => {
    const matchesSearch = act.title.toLowerCase().includes(search.toLowerCase()) ||
      act.description.toLowerCase().includes(search.toLowerCase()) ||
      (act.location && act.location.toLowerCase().includes(search.toLowerCase())) ||
      (act.commune && act.commune.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'Tous' || act.status === statusFilter;
    const matchesDept = departmentFilter === 'Tous' || act.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDept;
  });

  const activeActivityModal = activities.find(a => a.id === selectedActivityId);

  const handleRegisterVolunteer = async (activityId: string) => {
    if (!currentUser) {
      setCurrentView('login');
      return;
    }
    const res = await registerForActivity(activityId);
    if (res.success) {
      setSuccessMessage(res.message);
      setTimeout(() => setSuccessMessage(null), 4500);
    } else {
      setErrorMessage(res.message);
      setTimeout(() => setErrorMessage(null), 4500);
    }
  };

  const handleUnregisterVolunteer = async (activityId: string) => {
    if (!currentUser) return;
    const res = await unregisterFromActivity(activityId);
    if (res.success) {
      setSuccessMessage(res.message);
      setTimeout(() => setSuccessMessage(null), 4500);
    }
  };

  const isUserRegistered = (activity: Activity) => {
    if (!currentUser) return false;
    const hasDeclared = (activity.registeredVolunteers || []).some(v => v.userId === currentUser.id);
    const hasAssigned = (activity.assignedVolunteers || []).includes(`${currentUser.firstName} ${currentUser.lastName}`);
    return hasDeclared || hasAssigned;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#144D32] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Agenda & Terrain
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
              Activités & Actions Communautaires
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Participez à nos ateliers de sensibilisation, caravanes de santé, cliniques juridiques 
              et formations de pairs éducateurs à travers le Bénin. Les bénévoles et membres connectés peuvent déclarer leur participation en un clic.
            </p>
          </div>

          {/* Admin Create Button */}
          {canPostActivity && (
            <div className="shrink-0">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-3 bg-[#144D32] hover:bg-[#0d3623] text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publier une activité</span>
              </button>
            </div>
          )}
        </div>

        {/* Global Banner Notification */}
        {successMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-xs font-bold animate-in fade-in duration-200">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher une activité, un lieu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#144D32] focus:bg-white"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#144D32]"
              >
                <option value="Tous">Tous les statuts</option>
                <option value="upcoming">À venir (ouvert aux bénévoles)</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminée</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#144D32]"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept === 'Tous' ? 'Tous les départements' : `Département : ${dept}`}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => {
            const registered = isUserRegistered(act);
            const declaredCount = (act.registeredVolunteers || []).length || (act.assignedVolunteers || []).length;

            return (
              <div
                key={act.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-[#144D32]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                      act.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : act.status === 'in_progress'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-[#144D32]'
                    }`}>
                      {act.status === 'completed' ? 'Terminée' : act.status === 'in_progress' ? 'En cours' : 'À venir'}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#144D32]" />
                      <span>{act.date}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg leading-snug">
                    {act.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {act.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#144D32] shrink-0" />
                      <span>{act.location}, {act.commune} ({act.department})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Heure : <strong>{act.time || '09:00'}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Bénévoles mobilisés : <strong className="text-teal-800">{declaredCount} / {act.requiredVolunteers || 10}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedActivityId(act.id)}
                      className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Détails
                    </button>

                    {act.status === 'upcoming' && (
                      <div className="flex-1 flex flex-col gap-1">
                        {registered ? (
                          <div className="flex items-center gap-1">
                            <button
                              disabled
                              className="flex-1 py-2 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center justify-center gap-1 cursor-default"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Inscrit(e)</span>
                            </button>
                            <button
                              onClick={() => handleUnregisterVolunteer(act.id)}
                              className="px-2 py-2 text-[10px] text-slate-400 hover:text-rose-600 rounded-lg font-semibold hover:bg-rose-50 cursor-pointer"
                              title="Annuler ma participation"
                            >
                              Annuler
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRegisterVolunteer(act.id)}
                            className="w-full py-2 bg-[#144D32] hover:bg-[#0d3623] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Je participe</span>
                          </button>
                        )}
                      </div>
                    )}

                    {act.status === 'completed' && (
                      <button
                        onClick={() => setCertActivity(act)}
                        className="flex-1 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        <span>Attestation</span>
                      </button>
                    )}
                  </div>

                  {/* Admin view participants button */}
                  {canPostActivity && (
                    <button
                      onClick={() => setViewParticipantsActivity(act)}
                      className="w-full py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5 text-teal-700" />
                      <span>Voir les participants déclarés ({declaredCount})</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Detail Modal */}
      {activeActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-[#144D32] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  {activeActivityModal.department} • {activeActivityModal.commune}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-2">
                  {activeActivityModal.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedActivityId(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider text-[#144D32] mb-1">
                  Description & Objectifs
                </h4>
                <p className="leading-relaxed text-slate-600">
                  {activeActivityModal.description}
                </p>
              </div>

              {activeActivityModal.expectedResults && (
                <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <h4 className="font-bold text-[#144D32] text-xs mb-1">Résultats attendus</h4>
                  <p className="text-xs text-emerald-950">{activeActivityModal.expectedResults}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block">Date et Heure :</span>
                  <span className="font-bold text-slate-900">{activeActivityModal.date} à {activeActivityModal.time || '09:00'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block">Lieu précis :</span>
                  <span className="font-bold text-slate-900">{activeActivityModal.location}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block">Responsable de l'activité :</span>
                  <span className="font-bold text-slate-900">{activeActivityModal.responsible}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block">Besoin en bénévoles :</span>
                  <span className="font-bold text-slate-900">{activeActivityModal.requiredVolunteers} personnes</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedActivityId(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs cursor-pointer"
              >
                Fermer
              </button>

              <div className="flex items-center gap-2">
                {canPostActivity && (
                  <button
                    onClick={() => {
                      setViewParticipantsActivity(activeActivityModal);
                      setSelectedActivityId(null);
                    }}
                    className="px-4 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Participants ({(activeActivityModal.registeredVolunteers || []).length})</span>
                  </button>
                )}

                {activeActivityModal.status === 'upcoming' && (
                  isUserRegistered(activeActivityModal) ? (
                    <button
                      onClick={async () => {
                        await handleUnregisterVolunteer(activeActivityModal.id);
                        setSelectedActivityId(null);
                      }}
                      className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs cursor-pointer"
                    >
                      Se désister
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleRegisterVolunteer(activeActivityModal.id);
                        setSelectedActivityId(null);
                      }}
                      className="px-5 py-2.5 bg-[#144D32] hover:bg-[#0d3623] text-white rounded-xl font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Je participe</span>
                    </button>
                  )
                )}

                {activeActivityModal.status === 'completed' && (
                  <button
                    onClick={() => {
                      setCertActivity(activeActivityModal);
                      setSelectedActivityId(null);
                    }}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>Obtenir mon attestation</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {certActivity && (
        <CertificateModal
          isOpen={!!certActivity}
          onClose={() => setCertActivity(null)}
          activity={certActivity}
        />
      )}

      {/* Add Activity Modal for Admin */}
      <AddActivityModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Participants list modal for Admin */}
      <ActivityParticipantsModal
        activity={viewParticipantsActivity}
        isOpen={!!viewParticipantsActivity}
        onClose={() => setViewParticipantsActivity(null)}
      />
    </div>
  );
};

