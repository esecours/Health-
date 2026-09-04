import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, ActivityRegisteredVolunteer } from '../../types';
import { AddActivityModal } from './AddActivityModal';
import { ActivityParticipantsModal } from './ActivityParticipantsModal';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  UserCheck,
  UserX,
  ExternalLink,
  ChevronRight,
  Filter,
  Download,
  Eye,
  Trash2,
  Sparkles,
  ClipboardList,
  Layers,
  ArrowUpDown
} from 'lucide-react';

export const ActivitiesManager: React.FC = () => {
  const {
    activities,
    deleteActivity,
    currentUser,
    registerForActivity,
    unregisterFromActivity,
    updateParticipantStatus,
    users
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'activities' | 'all_participants'>('activities');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedActivityForModal, setSelectedActivityForModal] = useState<Activity | null>(null);

  // Volunteers must NOT have the ability to publish or delete activities from the dashboard
  const canPublishActivities = (currentUser?.role === 'super_admin' || 
                                currentUser?.role === 'admin' || 
                                currentUser?.role === 'program_manager') && 
                                currentUser?.role !== 'volunteer';
  
  // Filters for activities tab
  const [searchActivity, setSearchActivity] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'in_progress' | 'completed'>('all');

  // Filters for all_participants tab
  const [searchParticipant, setSearchParticipant] = useState('');
  const [filterByActivityId, setFilterByActivityId] = useState<string>('all');
  const [filterByStatus, setFilterByStatus] = useState<string>('all');

  // Feedback banner
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  // Compile all participants across all activities
  const allDeclaredParticipants: Array<{
    activityId: string;
    activityTitle: string;
    activityDate: string;
    activityTime?: string;
    participant: ActivityRegisteredVolunteer;
  }> = [];

  activities.forEach(activity => {
    const list: ActivityRegisteredVolunteer[] = (activity.registeredVolunteers && activity.registeredVolunteers.length > 0)
      ? activity.registeredVolunteers
      : (activity.assignedVolunteers || []).map((name, idx) => {
          const matchingUser = users.find(u => `${u.firstName} ${u.lastName}`.toLowerCase() === name.toLowerCase());
          return {
            userId: matchingUser ? matchingUser.id : `vol-${idx}`,
            name,
            email: matchingUser ? matchingUser.email : 'contact@healthdev.ong',
            phone: matchingUser?.phone || '+229 01 00 00 00',
            role: matchingUser?.role || 'volunteer',
            registeredAt: activity.createdAt || '2026-09-01',
            status: 'confirmed' as const
          };
        });

    list.forEach(p => {
      allDeclaredParticipants.push({
        activityId: activity.id,
        activityTitle: activity.title,
        activityDate: activity.date,
        activityTime: activity.time,
        participant: p
      });
    });
  });

  // Filter activities
  const filteredActivities = activities.filter(a => {
    const matchesSearch = 
      a.title.toLowerCase().includes(searchActivity.toLowerCase()) ||
      a.description.toLowerCase().includes(searchActivity.toLowerCase()) ||
      (a.location && a.location.toLowerCase().includes(searchActivity.toLowerCase())) ||
      (a.commune && a.commune.toLowerCase().includes(searchActivity.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter participants in the global table
  const filteredDeclaredParticipants = allDeclaredParticipants.filter(item => {
    const matchesSearch = 
      item.participant.name.toLowerCase().includes(searchParticipant.toLowerCase()) ||
      (item.participant.email && item.participant.email.toLowerCase().includes(searchParticipant.toLowerCase())) ||
      (item.participant.phone && item.participant.phone.includes(searchParticipant)) ||
      item.activityTitle.toLowerCase().includes(searchParticipant.toLowerCase());

    const matchesActivity = filterByActivityId === 'all' || item.activityId === filterByActivityId;
    const matchesStatus = filterByStatus === 'all' || (item.participant.status || 'declared') === filterByStatus;

    return matchesSearch && matchesActivity && matchesStatus;
  });

  // Stats calculation
  const totalActivitiesCount = activities.length;
  const upcomingActivitiesCount = activities.filter(a => a.status === 'upcoming').length;
  const totalParticipantsDeclaredCount = allDeclaredParticipants.length;
  const confirmedParticipantsCount = allDeclaredParticipants.filter(p => p.participant.status === 'confirmed' || p.participant.status === 'attended').length;

  const handleExportCSV = () => {
    const headers = ['Nom Participant', 'Email', 'Téléphone', 'Rôle', 'Activité', 'Date Activité', 'Heure Activité', 'Date Déclaration', 'Statut'];
    const rows = filteredDeclaredParticipants.map(item => [
      `"${item.participant.name}"`,
      `"${item.participant.email || ''}"`,
      `"${item.participant.phone || ''}"`,
      `"${item.participant.role || 'bénévole'}"`,
      `"${item.activityTitle.replace(/"/g, '""')}"`,
      `"${item.activityDate}"`,
      `"${item.activityTime || ''}"`,
      `"${item.participant.registeredAt || ''}"`,
      `"${item.participant.status || 'declared'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `participants_declares_healthdev_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showFeedback('success', 'Export CSV téléchargé avec succès !');
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2.5 animate-in fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Top Banner & KPI Header */}
      <div className="bg-linear-to-r from-teal-900 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-400/20 text-teal-200 border border-teal-400/30 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Espace Activités & Participants
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              Gestion des Activités et Participants
            </h1>
            <p className="text-teal-100/80 text-xs sm:text-sm leading-relaxed">
              Publiez les missions et activités avec date, heure et description détaillée. Suivez en temps réel la liste de tous les bénévoles et utilisateurs qui se déclarent participants.
            </p>
          </div>

          {canPublishActivities && (
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-3 bg-teal-400 hover:bg-teal-300 text-teal-950 font-black text-xs sm:text-sm rounded-2xl flex items-center gap-2 shadow-lg shadow-teal-900/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publier une activité</span>
              </button>
            </div>
          )}
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-teal-700/40">
          <div className="p-3.5 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/10">
            <div className="text-[11px] font-medium text-teal-200 uppercase tracking-wider">
              Total Activités
            </div>
            <div className="text-2xl font-black text-white mt-1">
              {totalActivitiesCount}
            </div>
            <div className="text-[10px] text-teal-300/80 mt-0.5">Événements enregistrés</div>
          </div>

          <div className="p-3.5 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/10">
            <div className="text-[11px] font-medium text-teal-200 uppercase tracking-wider">
              Activités à Venir
            </div>
            <div className="text-2xl font-black text-white mt-1">
              {upcomingActivitiesCount}
            </div>
            <div className="text-[10px] text-teal-300/80 mt-0.5">Inscriptions ouvertes</div>
          </div>

          <div className="p-3.5 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/10">
            <div className="text-[11px] font-medium text-teal-200 uppercase tracking-wider">
              Participants Déclarés
            </div>
            <div className="text-2xl font-black text-teal-200 mt-1">
              {totalParticipantsDeclaredCount}
            </div>
            <div className="text-[10px] text-teal-300/80 mt-0.5">Bénévoles mobilisés</div>
          </div>

          <div className="p-3.5 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/10">
            <div className="text-[11px] font-medium text-teal-200 uppercase tracking-wider">
              Taux de Confirmation
            </div>
            <div className="text-2xl font-black text-white mt-1">
              {totalParticipantsDeclaredCount > 0
                ? Math.round((confirmedParticipantsCount / totalParticipantsDeclaredCount) * 100)
                : 0}%
            </div>
            <div className="text-[10px] text-teal-300/80 mt-0.5">{confirmedParticipantsCount} confirmés / présents</div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('activities')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'activities'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Activités & Événements ({activities.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('all_participants')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'all_participants'
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Tous les participants déclarés ({totalParticipantsDeclaredCount})</span>
          </button>
        </div>

        {activeSubTab === 'all_participants' && (
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-teal-600" />
            <span>Exporter en CSV</span>
          </button>
        )}
      </div>

      {/* TAB 1: ACTIVITIES VIEW */}
      {activeSubTab === 'activities' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchActivity}
                onChange={(e) => setSearchActivity(e.target.value)}
                placeholder="Rechercher par nom, lieu, commune..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 text-xs"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Toutes ({activities.length})
              </button>
              <button
                onClick={() => setStatusFilter('upcoming')}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  statusFilter === 'upcoming'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                À venir ({activities.filter(a => a.status === 'upcoming').length})
              </button>
              <button
                onClick={() => setStatusFilter('in_progress')}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  statusFilter === 'in_progress'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                En cours ({activities.filter(a => a.status === 'in_progress').length})
              </button>
              <button
                onClick={() => setStatusFilter('completed')}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  statusFilter === 'completed'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Terminées ({activities.filter(a => a.status === 'completed').length})
              </button>
            </div>
          </div>

          {/* Activities List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredActivities.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-800 text-sm">Aucune activité trouvée</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {canPublishActivities 
                    ? 'Aucune activité ne correspond à vos filtres. Cliquez sur "Publier une activité" pour créer votre premier événement.'
                    : 'Aucune activité ne correspond à vos filtres.'}
                </p>
              </div>
            ) : (
              filteredActivities.map((activity) => {
                const declaredCount = (activity.registeredVolunteers || []).length || (activity.assignedVolunteers || []).length;
                const isUserDeclared = currentUser && (
                  (activity.registeredVolunteers || []).some(r => r.userId === currentUser.id) ||
                  (activity.assignedVolunteers || []).includes(`${currentUser.firstName} ${currentUser.lastName}`)
                );

                return (
                  <div
                    key={activity.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-4"
                  >
                    {/* Top line: Badges & Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${
                              activity.status === 'upcoming'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : activity.status === 'in_progress'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            {activity.status === 'upcoming' ? 'À Venir (Inscriptions ouvertes)' : activity.status === 'in_progress' ? 'En Cours' : 'Terminée'}
                          </span>

                          <span className="text-xs text-slate-500 font-medium">
                            {activity.projectName || 'HEALTHDEV ONG'}
                          </span>
                        </div>

                        {/* Title of activity */}
                        <h3 className="text-base sm:text-lg font-black text-slate-900 font-display">
                          {activity.title}
                        </h3>

                        {/* Date, Time, Location pills */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                          <div className="inline-flex items-center gap-1.5 font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
                            <Calendar className="w-3.5 h-3.5 text-teal-600" />
                            <span>{activity.date}</span>
                          </div>

                          <div className="inline-flex items-center gap-1.5 font-bold text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                            <Clock className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{activity.time || '09:00'}</span>
                          </div>

                          <div className="inline-flex items-center gap-1.5 text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{activity.location || activity.commune || 'Borgou'} ({activity.department || 'Borgou'})</span>
                          </div>
                        </div>
                      </div>

                      {/* Right quick buttons */}
                      <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
                        {/* Button to open participant list */}
                        <button
                          onClick={() => setSelectedActivityForModal(activity)}
                          className="px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 rounded-xl font-black text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
                        >
                          <Users className="w-4 h-4 text-teal-700" />
                          <span>Participants ({declaredCount})</span>
                        </button>

                        {/* Delete activity (admin only, volunteers cannot delete) */}
                        {canPublishActivities && (
                          <button
                            onClick={() => {
                              if (confirm(`Êtes-vous sûr de vouloir supprimer l'activité « ${activity.title} » ?`)) {
                                deleteActivity(activity.id);
                                showFeedback('success', 'Activité supprimée avec succès.');
                              }
                            }}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                            title="Supprimer cette activité"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {activity.description}
                    </p>

                    {/* Bottom bar: Volunteer mobilization status & Join button */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      {/* Volunteer progress bar */}
                      <div className="flex items-center gap-3 flex-1 max-w-md">
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between text-[11px] font-bold text-slate-600">
                            <span>Mobilisation bénévoles :</span>
                            <span className="text-teal-700">{declaredCount} / {activity.requiredVolunteers || 10} déclarés</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-teal-600 h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min(100, Math.round((declaredCount / (activity.requiredVolunteers || 10)) * 100))}%`
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Participant Declaration Button (for connected user/volunteer) */}
                      <div className="flex items-center gap-2">
                        {isUserDeclared ? (
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold text-xs">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Vous êtes déclaré(e)</span>
                            </span>
                            <button
                              onClick={async () => {
                                const res = await unregisterFromActivity(activity.id);
                                showFeedback(res.success ? 'success' : 'error', res.message);
                              }}
                              className="text-xs text-slate-400 hover:text-rose-600 hover:underline font-semibold cursor-pointer"
                            >
                              Se désister
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={async () => {
                              const res = await registerForActivity(activity.id);
                              showFeedback(res.success ? 'success' : 'error', res.message);
                            }}
                            className="px-4 py-2 bg-slate-900 hover:bg-teal-700 text-white rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Users className="w-3.5 h-3.5" />
                            <span>Se déclarer participant</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ALL DECLARED PARTICIPANTS (REGISTRE GLOBAL) */}
      {activeSubTab === 'all_participants' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchParticipant}
                onChange={(e) => setSearchParticipant(e.target.value)}
                placeholder="Rechercher participant, tél, activité..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 text-xs"
              />
            </div>

            {/* Filter by Activity dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={filterByActivityId}
                onChange={(e) => setFilterByActivityId(e.target.value)}
                className="w-full md:w-64 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-600 font-medium"
              >
                <option value="all">Toutes les activités ({activities.length})</option>
                {activities.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.title.slice(0, 40)}...
                  </option>
                ))}
              </select>

              {/* Status filter */}
              <select
                value={filterByStatus}
                onChange={(e) => setFilterByStatus(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-600 font-medium"
              >
                <option value="all">Tous statuts</option>
                <option value="declared">Déclarés</option>
                <option value="confirmed">Confirmés</option>
                <option value="attended">Présents</option>
                <option value="cancelled">Désistés</option>
              </select>
            </div>
          </div>

          {/* Participants Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            {filteredDeclaredParticipants.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <Users className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-800 text-sm">
                  Aucun participant déclaré trouvé
                </p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Les bénévoles ou utilisateurs qui s'inscrivent aux activités apparaîtront directement ici dans ce tableau de bord.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                      <th className="py-3.5 px-4">Participant</th>
                      <th className="py-3.5 px-4">Événement & Date</th>
                      <th className="py-3.5 px-4">Coordonnées</th>
                      <th className="py-3.5 px-4">Déclaration</th>
                      <th className="py-3.5 px-4">Statut</th>
                      <th className="py-3.5 px-4 text-right">Actions Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDeclaredParticipants.map((item, idx) => {
                      const { participant, activityId, activityTitle, activityDate, activityTime } = item;
                      const status = participant.status || 'declared';

                      return (
                        <tr key={`${activityId}-${participant.userId}-${idx}`} className="hover:bg-slate-50/80 transition-colors">
                          {/* Participant Name & Role */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center shrink-0 border border-teal-200">
                                {participant.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900">
                                  {participant.name}
                                </div>
                                <div className="text-[10px] text-slate-400 capitalize">
                                  {participant.role === 'volunteer' ? 'Bénévole' : participant.role || 'Membre'}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Activity Title & Schedule */}
                          <td className="py-3.5 px-4 max-w-xs">
                            <div className="font-semibold text-slate-800 line-clamp-1" title={activityTitle}>
                              {activityTitle}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-teal-600" />
                                {activityDate}
                              </span>
                              <span>•</span>
                              <span className="inline-flex items-center gap-1">
                                <Clock className="w-3 h-3 text-indigo-600" />
                                {activityTime || '09:00'}
                              </span>
                            </div>
                          </td>

                          {/* Coordinates */}
                          <td className="py-3.5 px-4">
                            <div className="space-y-0.5 text-[11px]">
                              {participant.phone && (
                                <a
                                  href={`tel:${participant.phone}`}
                                  className="flex items-center gap-1 text-slate-700 hover:text-teal-600 font-medium"
                                >
                                  <Phone className="w-3 h-3 text-slate-400" />
                                  <span>{participant.phone}</span>
                                </a>
                              )}
                              {participant.email && (
                                <a
                                  href={`mailto:${participant.email}`}
                                  className="flex items-center gap-1 text-slate-500 hover:text-teal-600"
                                >
                                  <Mail className="w-3 h-3 text-slate-400" />
                                  <span className="truncate max-w-[140px]">{participant.email}</span>
                                </a>
                              )}
                            </div>
                          </td>

                          {/* Declaration timestamp */}
                          <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                            {participant.registeredAt || 'Récemment'}
                          </td>

                          {/* Status badge */}
                          <td className="py-3.5 px-4">
                            {status === 'attended' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <CheckCircle2 className="w-3 h-3" /> Présent
                              </span>
                            ) : status === 'confirmed' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                                <UserCheck className="w-3 h-3" /> Confirmé
                              </span>
                            ) : status === 'cancelled' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                                <UserX className="w-3 h-3" /> Désisté
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                <Clock className="w-3 h-3 text-amber-700" /> Déclaré
                              </span>
                            )}
                          </td>

                          {/* Action buttons */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {status !== 'confirmed' && (
                                <button
                                  onClick={() => {
                                    updateParticipantStatus(activityId, participant.userId, 'confirmed');
                                    showFeedback('success', `Statut de ${participant.name} confirmé.`);
                                  }}
                                  className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md font-bold text-[10px] border border-blue-200 cursor-pointer"
                                  title="Confirmer la participation"
                                >
                                  Confirmer
                                </button>
                              )}

                              {status !== 'attended' && (
                                <button
                                  onClick={() => {
                                    updateParticipantStatus(activityId, participant.userId, 'attended');
                                    showFeedback('success', `Présence de ${participant.name} validée sur le terrain.`);
                                  }}
                                  className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-md font-bold text-[10px] border border-emerald-200 cursor-pointer"
                                  title="Marquer présent à l'activité"
                                >
                                  Présent
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Activity Modal (Admin/Manager only, volunteers cannot publish) */}
      {canPublishActivities && (
        <AddActivityModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {/* Participants Modal for specific activity */}
      <ActivityParticipantsModal
        activity={selectedActivityForModal}
        isOpen={!!selectedActivityForModal}
        onClose={() => setSelectedActivityForModal(null)}
      />
    </div>
  );
};
