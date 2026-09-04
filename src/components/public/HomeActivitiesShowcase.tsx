import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Activity } from '../../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  UserCheck, 
  CheckCircle2, 
  LogIn, 
  Lock, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  X,
  Award
} from 'lucide-react';

export const HomeActivitiesShowcase: React.FC = () => {
  const { 
    activities = [], 
    currentUser, 
    registerForActivity, 
    unregisterFromActivity, 
    setCurrentView 
  } = useApp();

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4500);
  };

  const handleRegister = async (activityId: string) => {
    if (!currentUser) {
      showNotification('error', 'Veuillez vous connecter pour déclarer votre participation.');
      return;
    }
    const res = await registerForActivity(activityId);
    if (res.success) {
      showNotification('success', res.message);
    } else {
      showNotification('error', res.message);
    }
  };

  const handleUnregister = async (activityId: string) => {
    if (!currentUser) return;
    const res = await unregisterFromActivity(activityId);
    if (res.success) {
      showNotification('success', res.message);
    }
  };

  const isUserRegistered = (activity: Activity) => {
    if (!currentUser) return false;
    const hasDeclared = (activity.registeredVolunteers || []).some(v => v.userId === currentUser.id);
    const hasAssigned = (activity.assignedVolunteers || []).includes(`${currentUser.firstName} ${currentUser.lastName}`);
    return hasDeclared || hasAssigned;
  };

  // Sort activities: upcoming first, then others; show top 3 or 4
  const displayActivities = [...activities]
    .sort((a, b) => {
      if (a.status === 'upcoming' && b.status !== 'upcoming') return -1;
      if (a.status !== 'upcoming' && b.status === 'upcoming') return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Toast feedback */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-3 animate-in fade-in duration-200 shadow-md ${
              feedback.type === 'success'
                ? 'bg-emerald-600 text-white shadow-emerald-900/10'
                : 'bg-rose-600 text-white shadow-rose-900/10'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-white" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-white" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/70 text-[#144D32] border border-emerald-200 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Agenda & Actions Communautaires</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              Activités Publiées par l'Administration
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Consultez les dates, heures et détails des missions de sensibilisation, caravanes de santé et ateliers terrain.
              {currentUser ? (
                <span className="block mt-1 text-emerald-800 font-semibold">
                  Connecté(e) en tant que {currentUser.firstName} {currentUser.lastName} : vous pouvez déclarer votre participation ci-dessous.
                </span>
              ) : (
                <span className="block mt-1 text-slate-500 italic">
                  Note : Seuls les utilisateurs connectés ont la possibilité de déclarer leur participation.
                </span>
              )}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentView('activities');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#144D32] font-black hover:text-[#0d3623] text-xs sm:text-sm flex items-center gap-1.5 hover:underline cursor-pointer"
            >
              <span>Consulter l'agenda complet ({activities.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayActivities.length === 0 ? (
            <div className="col-span-full py-12 px-6 text-center bg-white rounded-3xl border border-slate-200 shadow-xs space-y-2">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">Aucune activité publiée pour le moment</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Les prochaines sessions et ateliers communautaires programmés par la Direction des Programmes de HEALTHDEV ONG apparaîtront ici.
              </p>
            </div>
          ) : (
            displayActivities.map((act) => {
              const registered = isUserRegistered(act);
              const declaredCount = (act.registeredVolunteers || []).length || (act.assignedVolunteers || []).length;
              const requiredCount = act.requiredVolunteers || 10;
              const isFull = declaredCount >= requiredCount;

              return (
                <div
                  key={act.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Top row: Department and Status */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-emerald-50 text-[#144D32] border border-emerald-200 uppercase tracking-wider">
                        {act.department || 'Borgou'} • {act.commune || 'Parakou'}
                      </span>

                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                          act.status === 'upcoming'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : act.status === 'in_progress'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {act.status === 'upcoming' ? 'Inscriptions ouvertes' : act.status === 'in_progress' ? 'En cours' : 'Terminée'}
                      </span>
                    </div>

                    {/* Date & Time Highlights */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <div className="inline-flex items-center gap-1.5 font-extrabold text-[#144D32] bg-emerald-50/80 px-2.5 py-1 rounded-xl border border-emerald-100">
                        <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{act.date}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 font-extrabold text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100">
                        <Clock className="w-3.5 h-3.5 text-indigo-700" />
                        <span>{act.time || '09:00'}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#144D32] transition-colors">
                      {act.title}
                    </h3>

                    {/* Description snippet */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {act.description}
                    </p>

                    {/* Location and Mobilization */}
                    <div className="space-y-2 text-xs text-slate-500 pt-1">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#E86A24] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{act.location || act.commune || 'Borgou'}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>Mobilisation :</span>
                        </span>
                        <strong className="text-slate-800 font-bold">
                          {declaredCount} / {requiredCount} bénévoles
                        </strong>
                      </div>

                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#144D32] rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, Math.round((declaredCount / requiredCount) * 100))}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="pt-5 mt-4 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedActivity(act)}
                        className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Détails
                      </button>

                      {/* Declaration Button logic: Only logged in users can declare */}
                      {currentUser ? (
                        act.status === 'upcoming' ? (
                          registered ? (
                            <div className="flex-1 flex items-center gap-1">
                              <div className="flex-1 py-2 px-2.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                                <span>Inscrit(e)</span>
                              </div>
                              <button
                                onClick={() => handleUnregister(act.id)}
                                className="py-2 px-2 text-[11px] text-slate-400 hover:text-rose-600 font-semibold hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Se désister de cette activité"
                              >
                                Annuler
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleRegister(act.id)}
                              className="flex-1 py-2.5 px-3 bg-[#144D32] hover:bg-[#0e3b26] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-[#144D32]/20 transition-all cursor-pointer"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>Je participe</span>
                            </button>
                          )
                        ) : (
                          <div className="flex-1 py-2 text-center text-xs font-bold text-slate-400 bg-slate-50 rounded-xl">
                            {act.status === 'completed' ? 'Activité terminée' : 'En cours'}
                          </div>
                        )
                      ) : (
                        /* Not logged in: Show clear CTA to login to participate */
                        <button
                          onClick={() => {
                            setCurrentView('login');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer group/btn"
                          title="Connexion requise pour vous déclarer"
                        >
                          <LogIn className="w-3.5 h-3.5 text-[#F4A261] group-hover/btn:translate-x-0.5 transition-transform" />
                          <span>Se connecter pour participer</span>
                        </button>
                      )}
                    </div>

                    {!currentUser && (
                      <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>Seul un compte connecté peut s'engager</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black px-2.5 py-1 rounded-md bg-emerald-50 text-[#144D32] border border-emerald-200 uppercase tracking-wider">
                  {selectedActivity.department} • {selectedActivity.commune}
                </span>
                <h3 className="text-xl font-black text-slate-900 font-display">
                  {selectedActivity.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider text-[#144D32] mb-1">
                  Description & Objectifs
                </h4>
                <p className="leading-relaxed">
                  {selectedActivity.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-slate-400 block text-[11px]">Date & Heure :</span>
                  <span className="font-bold text-slate-900">{selectedActivity.date} à {selectedActivity.time || '09:00'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-slate-400 block text-[11px]">Lieu précis :</span>
                  <span className="font-bold text-slate-900">{selectedActivity.location || selectedActivity.commune}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-slate-400 block text-[11px]">Responsable :</span>
                  <span className="font-bold text-slate-900">{selectedActivity.responsible || 'Direction HEALTHDEV'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-slate-400 block text-[11px]">Bénévoles mobilisés :</span>
                  <span className="font-bold text-emerald-800">
                    {(selectedActivity.registeredVolunteers || []).length || (selectedActivity.assignedVolunteers || []).length} / {selectedActivity.requiredVolunteers || 10}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedActivity(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Fermer
              </button>

              {currentUser ? (
                selectedActivity.status === 'upcoming' && (
                  isUserRegistered(selectedActivity) ? (
                    <button
                      onClick={async () => {
                        await handleUnregister(selectedActivity.id);
                        setSelectedActivity(null);
                      }}
                      className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs cursor-pointer"
                    >
                      Se désister
                    </button>
                  ) : (
                    <button
                      onClick={async () => {
                        await handleRegister(selectedActivity.id);
                        setSelectedActivity(null);
                      }}
                      className="px-5 py-2.5 bg-[#144D32] hover:bg-[#0e3b26] text-white rounded-xl font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Je participe à cette activité</span>
                    </button>
                  )
                )
              ) : (
                <button
                  onClick={() => {
                    setSelectedActivity(null);
                    setCurrentView('login');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4 text-[#F4A261]" />
                  <span>Se connecter pour participer</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
