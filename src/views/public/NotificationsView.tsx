import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { NotificationItem } from '../../types';
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Trash2, 
  Heart, 
  UserPlus, 
  Calendar, 
  FolderGit2, 
  DollarSign, 
  ExternalLink,
  Sparkles,
  Info,
  Search,
  Filter,
  ArrowLeft,
  LayoutDashboard,
  ShieldCheck,
  Clock,
  ChevronRight,
  BellOff,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { 
    currentUser, 
    notifications = [], 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    deleteNotification,
    clearNotifications,
    setActiveDashboardTab,
    setCurrentView,
    setSelectedActivityId,
    setSelectedProjectId
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const isVolunteer = currentUser?.role === 'volunteer';

  // Filter notifications according to the active role
  const roleFilteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (n.targetRole === 'volunteer') {
        return isVolunteer;
      }
      if (n.targetRole === 'admin') {
        return !isVolunteer;
      }
      if (isVolunteer) {
        return ['activity', 'project', 'system', 'opportunity'].includes(n.type);
      }
      return true;
    });
  }, [notifications, isVolunteer]);

  // Apply status, category, and search query filters
  const filteredNotifications = useMemo(() => {
    return roleFilteredNotifications.filter(item => {
      // Status filter
      if (filterStatus === 'unread' && item.isRead) return false;
      if (filterStatus === 'read' && !item.isRead) return false;

      // Category filter
      if (filterCategory !== 'all' && item.type !== filterCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesMessage = item.message.toLowerCase().includes(query);
        if (!matchesTitle && !matchesMessage) return false;
      }

      return true;
    });
  }, [roleFilteredNotifications, filterStatus, filterCategory, searchQuery]);

  const totalCount = roleFilteredNotifications.length;
  const unreadCount = roleFilteredNotifications.filter(n => !n.isRead).length;
  const readCount = totalCount - unreadCount;

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const handleMarkAllRead = () => {
    markAllNotificationsAsRead();
    showFeedback('Toutes les notifications ont été marquées comme lues.');
  };

  const handleDeleteRead = () => {
    const readItems = roleFilteredNotifications.filter(n => n.isRead);
    readItems.forEach(item => deleteNotification(item.id));
    showFeedback(`${readItems.length} notification(s) lue(s) supprimée(s).`);
  };

  const handleClearAll = () => {
    if (window.confirm('Voulez-vous vraiment effacer toutes vos notifications ?')) {
      clearNotifications();
      showFeedback('Toutes les notifications ont été supprimées.');
    }
  };

  const handleNotificationAction = (item: NotificationItem) => {
    if (!item.isRead) {
      markNotificationAsRead(item.id);
    }

    if (item.link) {
      if (['finances', 'volunteers', 'projects', 'activities', 'news', 'overview', 'announcements'].includes(item.link)) {
        if (setActiveDashboardTab) {
          setActiveDashboardTab(item.link as any);
        }
        setCurrentView('dashboard');
      } else if (item.link === 'activities') {
        setCurrentView('activities');
      } else if (item.link === 'projects') {
        setCurrentView('projects');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getCategoryConfig = (type: NotificationItem['type']) => {
    switch (type) {
      case 'donation':
        return {
          label: 'Donation reçue',
          bgBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          Icon: Heart,
          color: 'text-emerald-700'
        };
      case 'volunteer':
        return {
          label: 'Bénévolat & Mobilisation',
          bgBadge: 'bg-teal-100 text-teal-800 border-teal-200',
          iconBg: 'bg-teal-50 text-teal-700 border-teal-200',
          Icon: UserPlus,
          color: 'text-teal-700'
        };
      case 'activity':
        return {
          label: 'Activité Terrain',
          bgBadge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          iconBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          Icon: Calendar,
          color: 'text-indigo-700'
        };
      case 'project':
        return {
          label: 'Projet Stratégique',
          bgBadge: 'bg-blue-100 text-blue-800 border-blue-200',
          iconBg: 'bg-blue-50 text-blue-700 border-blue-200',
          Icon: FolderGit2,
          color: 'text-blue-700'
        };
      case 'payment':
        return {
          label: 'Cotisation & Trésorerie',
          bgBadge: 'bg-amber-100 text-amber-800 border-amber-200',
          iconBg: 'bg-amber-50 text-amber-700 border-amber-200',
          Icon: DollarSign,
          color: 'text-amber-700'
        };
      default:
        return {
          label: 'Alerte Système',
          bgBadge: 'bg-slate-100 text-slate-800 border-slate-200',
          iconBg: 'bg-slate-50 text-slate-700 border-slate-200',
          Icon: Info,
          color: 'text-slate-700'
        };
    }
  };

  const getActionLabel = (link?: string, type?: NotificationItem['type']) => {
    if (!link) return null;
    if (link === 'activities') return 'Consulter l\'activité terrain';
    if (link === 'projects') return 'Consulter le projet';
    if (link === 'volunteers') return 'Voir dans la gestion des bénévoles';
    if (link === 'finances') return 'Voir dans la trésorerie';
    if (link === 'news') return 'Lire le communiqué / actualité';
    return 'Consulter les détails';
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Top Breadcrumb & Back Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <button
              onClick={() => setCurrentView('home')}
              className="hover:text-teal-700 transition-colors cursor-pointer flex items-center gap-1 font-semibold"
            >
              Accueil
            </button>
            <span>/</span>
            <span className="font-bold text-slate-900">Centre de Notifications</span>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={() => setCurrentView('dashboard')}
                className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-teal-600" />
                <span>Tableau de bord ERP</span>
              </button>
            )}
            <button
              onClick={() => setCurrentView('home')}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour à l'accueil</span>
            </button>
          </div>
        </div>

        {/* Hero Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-teal-50 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-black uppercase tracking-wider">
                <Bell className="w-3.5 h-3.5" />
                <span>Centre d'alertes & notifications</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display">
                Toutes les notifications
              </h1>
              <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                {currentUser ? (
                  isVolunteer ? (
                    <>
                      Connecté en tant que <strong>{currentUser.firstName} {currentUser.lastName}</strong> (Bénévole). Retrouvez ici en temps réel les annonces d'activités, appels à mobilisation et mises à jour des missions.
                    </>
                  ) : (
                    <>
                      Connecté en tant que <strong>{currentUser.firstName} {currentUser.lastName}</strong> ({currentUser.role}). Retrouvez l'historique de tous les dons reçus, candidatures de bénévoles, déclarations de présence et alertes ERP.
                    </>
                  )
                ) : (
                  <>
                    Notifications publiques de la plateforme HEALTHDEV ONG. Connectez-vous à votre compte membre ou bénévole pour accéder à vos alertes personnalisées.
                  </>
                )}
              </p>
            </div>

            {/* Quick KPI stats */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center min-w-[90px]">
                <div className="text-2xl font-black text-slate-900 font-display">{totalCount}</div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total</div>
              </div>
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-center min-w-[90px]">
                <div className="text-2xl font-black text-rose-700 font-display">{unreadCount}</div>
                <div className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Non lues</div>
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center min-w-[90px]">
                <div className="text-2xl font-black text-emerald-700 font-display">{readCount}</div>
                <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Lues</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Alert if action occurred */}
        {feedbackMessage && (
          <div className="p-4 bg-teal-50 border border-teal-200 text-teal-800 rounded-2xl text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>{feedbackMessage}</span>
            </div>
            <button
              onClick={() => setFeedbackMessage(null)}
              className="text-teal-600 hover:text-teal-900 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Filters, Search & Bulk Actions Bar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Status Tabs (All, Unread, Read) */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl w-fit">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Toutes ({totalCount})
              </button>
              <button
                onClick={() => setFilterStatus('unread')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterStatus === 'unread'
                    ? 'bg-white text-rose-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Non lues
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-rose-600 text-white rounded-full text-[10px] font-black">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setFilterStatus('read')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === 'read'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lues ({readCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative grow max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par mot-clé (don, activité, bénévole)..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Bulk Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  title="Tout marquer comme lu"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Tout marquer comme lu</span>
                </button>
              )}
              {readCount > 0 && (
                <button
                  onClick={handleDeleteRead}
                  className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Supprimer toutes les notifications lues"
                >
                  <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Supprimer les lues</span>
                </button>
              )}
              {totalCount > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                  title="Effacer tout l'historique"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Tout effacer</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Chips Filter */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-bold mr-1 flex items-center gap-1 text-[11px]">
              <Filter className="w-3 h-3" />
              Filtrer par type :
            </span>
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tous les types
            </button>
            <button
              onClick={() => setFilterCategory('activity')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                filterCategory === 'activity'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              <Calendar className="w-3 h-3" />
              Activités terrain
            </button>
            {!isVolunteer && (
              <button
                onClick={() => setFilterCategory('donation')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  filterCategory === 'donation'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                <Heart className="w-3 h-3" />
                Dons & Collectes
              </button>
            )}
            {!isVolunteer && (
              <button
                onClick={() => setFilterCategory('volunteer')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  filterCategory === 'volunteer'
                    ? 'bg-teal-700 text-white'
                    : 'bg-teal-50 text-teal-800 hover:bg-teal-100'
                }`}
              >
                <UserPlus className="w-3 h-3" />
                Candidatures bénévoles
              </button>
            )}
            <button
              onClick={() => setFilterCategory('project')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                filterCategory === 'project'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <FolderGit2 className="w-3 h-3" />
              Projets stratégiques
            </button>
            {!isVolunteer && (
              <button
                onClick={() => setFilterCategory('payment')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  filterCategory === 'payment'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                <DollarSign className="w-3 h-3" />
                Cotisations
              </button>
            )}
            <button
              onClick={() => setFilterCategory('system')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                filterCategory === 'system'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Info className="w-3 h-3" />
              Système & Alertes
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto">
                <BellOff className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Aucune notification trouvée
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {searchQuery || filterStatus !== 'all' || filterCategory !== 'all'
                    ? 'Aucun élément ne correspond à vos critères de recherche ou de filtre actuels.'
                    : 'Vous n\'avez aucune notification enregistrée pour le moment. Vous serez alerté en direct dès la prochaine mise à jour.'}
                </p>
              </div>

              {(searchQuery || filterStatus !== 'all' || filterCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterStatus('all');
                    setFilterCategory('all');
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          ) : (
            filteredNotifications.map((notif) => {
              const { label, bgBadge, iconBg, Icon } = getCategoryConfig(notif.type);
              const actionLabel = getActionLabel(notif.link, notif.type);

              return (
                <div
                  key={notif.id}
                  className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-150 flex flex-col sm:flex-row items-start justify-between gap-4 shadow-xs hover:shadow-md ${
                    !notif.isRead 
                      ? 'border-teal-300 bg-teal-50/20 ring-1 ring-teal-200/50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3.5 grow min-w-0">
                    {/* Category Icon */}
                    <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Main Content */}
                    <div className="space-y-1.5 grow min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Unread indicator */}
                        {!notif.isRead && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-black uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                            Nouveau
                          </span>
                        )}

                        {/* Category Badge */}
                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold border uppercase tracking-wider ${bgBadge}`}>
                          {label}
                        </span>

                        {/* Target Role Tag */}
                        {notif.targetRole && (
                          <span className="text-[10px] text-slate-400 font-semibold">
                            • {notif.targetRole === 'volunteer' ? 'Cible : Bénévoles' : notif.targetRole === 'admin' ? 'Cible : Administration' : 'Cible : Tous'}
                          </span>
                        )}
                      </div>

                      <h2 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                        {notif.title}
                      </h2>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {notif.message}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notif.createdAt}
                        </span>

                        {actionLabel && notif.link && (
                          <button
                            onClick={() => handleNotificationAction(notif)}
                            className="text-teal-700 font-bold hover:text-teal-900 flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <span>{actionLabel}</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions (Mark read, Delete) */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center gap-1.5">
                      {!notif.isRead ? (
                        <button
                          onClick={() => {
                            markNotificationAsRead(notif.id);
                            showFeedback('Notification marquée comme lue.');
                          }}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Marquer comme lu"
                        >
                          <Check className="w-3.5 h-3.5 text-teal-600" />
                          <span className="hidden sm:inline">Marquer lu</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 px-2 py-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-300" />
                          <span className="hidden sm:inline">Déjà lu</span>
                        </span>
                      )}

                      <button
                        onClick={() => {
                          deleteNotification(notif.id);
                          showFeedback('Notification supprimée.');
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        title="Supprimer la notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {actionLabel && notif.link && (
                      <button
                        onClick={() => handleNotificationAction(notif)}
                        className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1"
                      >
                        <span>Accéder</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info tip */}
        <div className="p-4 bg-slate-100/80 rounded-2xl text-center text-xs text-slate-500 border border-slate-200">
          Les alertes sont synchronisées en direct avec l'ERP de HEALTHDEV ONG (activités terrain, candidatures de bénévoles, dons et communiqués officiels).
        </div>

      </div>
    </div>
  );
};
