import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
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
  Info
} from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationsCenterProps {
  className?: string;
}

export const NotificationsCenter: React.FC<NotificationsCenterProps> = ({ className = '' }) => {
  const { 
    currentUser, 
    notifications = [], 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    deleteNotification,
    clearNotifications,
    setActiveDashboardTab,
    currentView,
    setCurrentView
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [filterTab, setFilterTab] = useState<'all' | 'unread'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const isVolunteer = currentUser?.role === 'volunteer';

  // Filter notifications according to the active role
  const userNotifications = notifications.filter(n => {
    // If targeted role is set:
    if (n.targetRole === 'volunteer') {
      return isVolunteer;
    }
    if (n.targetRole === 'admin') {
      return !isVolunteer;
    }
    // If targetRole is 'all' or undefined, show according to notification type
    if (isVolunteer) {
      return ['activity', 'project', 'system', 'opportunity'].includes(n.type);
    } else {
      // Admins see donations, volunteer candidates, finances, projects, system, etc.
      return true;
    }
  });

  const unreadCount = userNotifications.filter(n => !n.isRead).length;

  const displayedNotifications = filterTab === 'unread' 
    ? userNotifications.filter(n => !n.isRead)
    : userNotifications;

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'donation':
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Heart className="w-4 h-4 fill-emerald-600 text-emerald-600" />
          </div>
        );
      case 'volunteer':
        return (
          <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <UserPlus className="w-4 h-4" />
          </div>
        );
      case 'activity':
        return (
          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
        );
      case 'project':
        return (
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <FolderGit2 className="w-4 h-4" />
          </div>
        );
      case 'payment':
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <DollarSign className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
        );
    }
  };

  const handleNotificationClick = (item: NotificationItem) => {
    if (!item.isRead) {
      markNotificationAsRead(item.id);
    }

    if (item.link) {
      if (['finances', 'volunteers', 'projects', 'activities', 'news', 'overview'].includes(item.link)) {
        if (setActiveDashboardTab) {
          setActiveDashboardTab(item.link as any);
        }
        setCurrentView('dashboard');
      } else if (item.link === 'activities') {
        setCurrentView('activities');
      } else if (item.link === 'projects') {
        setCurrentView('projects');
      }
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Bell Trigger Button - Opens Notifications Page */}
      <button
        onClick={() => {
          setCurrentView('notifications');
          setIsOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`relative p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-xs ${
          currentView === 'notifications'
            ? 'bg-teal-700 text-white border border-teal-800 ring-2 ring-teal-500/20'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200'
        }`}
        aria-label="Toutes les notifications"
        title="Ouvrir la page de toutes les notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-rose-600 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-sm animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-teal-500/20 text-teal-400 rounded-lg">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-black text-sm text-white">Notifications ERP</h3>
                <p className="text-[10px] text-slate-300">
                  {isVolunteer ? 'Alertes & Activités bénévoles' : 'Alertes Administrateur & Dons'}
                </p>
              </div>
            </div>

            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold rounded-full">
                {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Subheader Filters & Actions */}
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFilterTab('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  filterTab === 'all'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Toutes ({userNotifications.length})
              </button>
              <button
                onClick={() => setFilterTab('unread')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  filterTab === 'unread'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Non lues ({unreadCount})
              </button>
            </div>

            {userNotifications.length > 0 && (
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    title="Tout marquer comme lu"
                    className="p-1 text-slate-500 hover:text-teal-700 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={clearNotifications}
                  title="Effacer tout"
                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
            {displayedNotifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500 space-y-2">
                <Sparkles className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-semibold">Aucune notification pour le moment</p>
                <p className="text-[11px] text-slate-400">
                  {isVolunteer 
                    ? 'Vous serez alerté dès qu’une activité ou un programme est publié.' 
                    : 'Vous serez notifié des nouveaux dons et candidatures bénévoles.'}
                </p>
              </div>
            ) : (
              displayedNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3.5 hover:bg-slate-50/90 transition-all cursor-pointer flex items-start gap-3 relative group ${
                    !notif.isRead ? 'bg-teal-50/40 font-medium' : ''
                  }`}
                >
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-teal-600 shrink-0 mt-2"></span>
                  )}
                  {getNotifIcon(notif.type)}

                  <div className="grow min-w-0 pr-6">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-slate-900 truncate block">
                        {notif.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 leading-snug">
                      {notif.message}
                    </p>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                      <span>{notif.createdAt}</span>
                      {notif.link && (
                        <span className="text-teal-700 font-bold flex items-center gap-0.5 hover:underline">
                          Voir détails <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item Actions */}
                  <div className="absolute right-2 top-2 hidden group-hover:flex items-center gap-1 bg-white/90 p-0.5 rounded-lg shadow-xs border border-slate-200">
                    {!notif.isRead && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markNotificationAsRead(notif.id);
                        }}
                        title="Marquer comme lu"
                        className="p-1 hover:text-teal-700 text-slate-400 rounded transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notif.id);
                      }}
                      title="Supprimer"
                      className="p-1 hover:text-rose-600 text-slate-400 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <span className="text-[10px] text-slate-500">
              {isVolunteer 
                ? 'Système d’alerte directe pour bénévoles HEALTHDEV ONG' 
                : 'Système d’alerte administratif en temps réel'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
