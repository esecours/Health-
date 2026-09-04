import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, Activity, User, Contribution, Payment } from '../../types';
import { CertificateModal } from '../../components/common/CertificateModal';
import { ActivitiesManager } from '../../components/admin/ActivitiesManager';
import { CotisationsManager } from '../../components/admin/CotisationsManager';
import { UsersManager } from '../../components/admin/UsersManager';
import { NewsManager } from '../../components/admin/NewsManager';
import { DocumentsManager } from '../../components/admin/DocumentsManager';
import { PartnersManager } from '../../components/admin/PartnersManager';
import { CarouselPartnersSection } from '../../components/admin/CarouselPartnersSection';
import { ZonesManager } from '../../components/admin/ZonesManager';
import { AnnouncementsManager } from '../../components/admin/AnnouncementsManager';
import { VbgManager } from '../../components/admin/VbgManager';
import { NotificationsCenter } from '../../components/common/NotificationsCenter';
import { EditProfileModal } from '../../components/profile/EditProfileModal';
import { UserBadgeModal } from '../../components/profile/UserBadgeModal';
import { 
  ShieldAlert,
  LayoutDashboard, 
  FolderGit2, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Award, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Smartphone, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  ShieldCheck,
  Edit,
  X,
  CreditCard,
  Building,
  UserCheck,
  UserX,
  Sparkles,
  Heart,
  Newspaper,
  FileText,
  MapPin,
  Megaphone,
  Bell,
  UserPlus,
  ExternalLink,
  User as UserIcon,
  Camera
} from 'lucide-react';


interface DashboardViewProps {
  onOpenPaymentModal: () => void;
  onOpenPaymentForContrib?: (contrib: Contribution) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  onOpenPaymentModal, 
  onOpenPaymentForContrib 
}) => {
  const { 
    currentUser, 
    projects = [], 
    activities = [], 
    users = [], 
    contributions = [], 
    payments = [], 
    meIndicators = [],
    addProject,
    updateProject,
    addActivity,
    updateVolunteerStatus,
    setCurrentView,
    isMaintenanceMode,
    setMaintenanceMode,
    announcements = [],
    notifications = [],
    markNotificationAsRead,
    activeDashboardTab,
    setActiveDashboardTab
  } = useApp();

  const [activeTab, setActiveTabState] = useState<
    'overview' | 'projects' | 'activities' | 'volunteers' | 'finances' | 'me' | 'news' | 'documents' | 'partners' | 'zones' | 'announcements' | 'vbg' | 'maintenance' | 'my_volunteer' | 'my_profile'
  >(() => {
    if (activeDashboardTab && activeDashboardTab !== 'overview') {
      return activeDashboardTab as any;
    }
    return currentUser?.role === 'volunteer' ? 'my_volunteer' : 'overview';
  });

  const setActiveTab = (tab: typeof activeTab) => {
    setActiveTabState(tab);
    if (setActiveDashboardTab) {
      setActiveDashboardTab(tab);
    }
  };

  useEffect(() => {
    if (activeDashboardTab && activeDashboardTab !== activeTab) {
      setActiveTabState(activeDashboardTab as any);
    }
  }, [activeDashboardTab]);

  // Modals & form state
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [certActivity, setCertActivity] = useState<Activity | null>(null);
  const [certRecipient, setCertRecipient] = useState<string>('');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

  // Search & Filters
  const [volunteerSearch, setVolunteerSearch] = useState('');
  const [volunteerStatusFilter, setVolunteerStatusFilter] = useState('Tous');

  // Computed stats
  const totalCollectedDues = (payments || []).filter(p => p.status === 'completed').reduce((acc, p) => acc + p.amount, 0);
  const pendingVolunteers = (users || []).filter(u => u.role === 'volunteer' && u.status === 'pending');
  const activeProjects = (projects || []).filter(p => p.status === 'in_progress');
  const upcomingActivities = (activities || []).filter(a => a.status === 'upcoming');

  // User specific volunteer data
  const myActivities = (activities || []).filter(a => 
    a.assignedVolunteers?.includes(`${currentUser?.firstName} ${currentUser?.lastName}`) ||
    (a.registeredVolunteers || []).some(r => r.userId === currentUser?.id)
  );
  const myPayments = (payments || []).filter(p => p.payerName?.includes(currentUser?.lastName || '') || p.payerPhone === currentUser?.phone);

  // Helper to check granular access permissions for RBAC
  const canAccessSection = (sectionId: string) => {
    if (currentUser?.role === 'super_admin' || currentUser?.role === 'admin') return true;
    if (currentUser?.role === 'volunteer') {
      // Les bénévoles ne doivent pas avoir la possibilité de publier ou gérer des activités depuis le tableau de bord
      return false;
    }
    if (currentUser?.role === 'partner') {
      // Les partenaires ne doivent pas avoir la possibilité de pouvoir gérer :
      // Comptes & Bénévoles, Trésorerie & Cotisations, Actualités, Zones, Partenaires
      if (['volunteers', 'finances', 'news', 'zones', 'partners', 'announcements', 'maintenance'].includes(sectionId)) {
        return false;
      }
      return true;
    }
    if (currentUser?.allowedSections && currentUser.allowedSections.length > 0) {
      return currentUser.allowedSections.includes(sectionId);
    }
    if (currentUser?.role === 'secretary') {
      return ['overview', 'finances', 'volunteers', 'documents', 'news'].includes(sectionId);
    }
    if (currentUser?.role === 'financial_manager') {
      return ['overview', 'finances', 'documents'].includes(sectionId);
    }
    if (currentUser?.role === 'program_manager') {
      return ['overview', 'projects', 'activities'].includes(sectionId);
    }
    if (currentUser?.role === 'me_manager') {
      return ['overview', 'me', 'projects', 'activities'].includes(sectionId);
    }
    return true;
  };

  // Ensure user cannot stay on restricted tab when role changes
  React.useEffect(() => {
    if (!canAccessSection(activeTab) && activeTab !== 'my_volunteer') {
      setActiveTab('overview');
    }
  }, [currentUser?.role, activeTab]);


  // Quick helper for role names
  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'super_admin': return <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 font-bold text-xs">Super Admin</span>;
      case 'admin': return <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 font-bold text-xs">Admin RH / Dir.</span>;
      case 'secretary': return <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs">Secrétaire Générale</span>;
      case 'financial_manager': return <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-bold text-xs">Resp. Financier</span>;
      case 'program_manager': return <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 font-bold text-xs">Resp. Programmes</span>;
      case 'me_manager': return <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200 font-bold text-xs">Resp. M&E</span>;
      case 'volunteer': return <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 font-bold text-xs">Bénévole</span>;
      default: return null;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        {/* Top ERP Bar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative group shrink-0">
              <img
                src={currentUser?.avatarUrl || '/default_avatar.jpg'}
                alt={currentUser?.firstName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-100 shadow-xs"
              />
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="absolute -bottom-1 -right-1 p-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-sm transition-transform group-hover:scale-110 cursor-pointer"
                title="Modifier ma photo de profil"
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  Tableau de bord ERP
                </h1>
                {getRoleBadge(currentUser?.role)}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Connecté en tant que <strong>{currentUser?.firstName} {currentUser?.lastName}</strong> ({currentUser?.email}) • Parakou, Bénin
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsBadgeModalOpen(true)}
              className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Afficher et imprimer ma carte d'accréditation"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Mon Badge Officiel</span>
            </button>

            <NotificationsCenter />



            <button
              onClick={onOpenPaymentModal}
              className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-teal-600/20 cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>Cotisation (MoMo)</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Filtered by RBAC permissions) */}
        <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar text-xs font-bold">
          {currentUser?.role !== 'volunteer' && (
            <>
              {canAccessSection('overview') && (
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Vue d'ensemble</span>
                </button>
              )}

              {canAccessSection('projects') && (
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'projects'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>Projets ({projects.length})</span>
                </button>
              )}

              {canAccessSection('activities') && (
                <button
                  onClick={() => setActiveTab('activities')}
                  className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'activities'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Activités Terrain ({activities.length})</span>
                </button>
              )}

              {canAccessSection('volunteers') && (
                <button
                  onClick={() => setActiveTab('volunteers')}
                  className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'volunteers'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Comptes & Bénévoles</span>
                  {pendingVolunteers.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center">
                      {pendingVolunteers.length}
                    </span>
                  )}
                </button>
              )}

              {canAccessSection('finances') && (
                <button
                  onClick={() => setActiveTab('finances')}
                  className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'finances'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Trésorerie & Cotisations</span>
                </button>
              )}

              {canAccessSection('me') && (
                <button
                  onClick={() => setActiveTab('me')}
                  className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'me'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Suivi-Éval (M&E)</span>
                </button>
              )}

              {canAccessSection('news') && (
                <button
                  onClick={() => setActiveTab('news')}
                  className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'news'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Newspaper className="w-4 h-4" />
                  <span>Actualités</span>
                </button>
              )}

              {canAccessSection('documents') && (
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'documents'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Documents</span>
                </button>
              )}

              {canAccessSection('partners') && (
                <button
                  onClick={() => setActiveTab('partners')}
                  className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'partners'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>Partenaires (Carrousel)</span>
                </button>
              )}

              {canAccessSection('zones') && (
                <button
                  onClick={() => setActiveTab('zones')}
                  className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'zones'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Zones</span>
                </button>
              )}

              {canAccessSection('announcements') && (
                <button
                  onClick={() => setActiveTab('announcements')}
                  className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'announcements'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Megaphone className="w-4 h-4" />
                  <span>Communiqués</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('vbg')}
                className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                  activeTab === 'vbg'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Signalements VBG</span>
              </button>

              {(currentUser?.role === 'super_admin' || currentUser?.role === 'admin') && (
                <button
                  onClick={() => setActiveTab('maintenance')}
                  className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'maintenance'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-200'
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Mode Maintenance {isMaintenanceMode && '(ON)'}</span>
                </button>
              )}
            </>
          )}

          {/* Volunteer specific Tab */}
          <button
            onClick={() => setActiveTab('my_volunteer')}
            className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'my_volunteer'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Mon Espace Bénévole Dédié</span>
          </button>

          {/* Universal Profile & Official Badge Tab */}
          <button
            onClick={() => setActiveTab('my_profile')}
            className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'my_profile'
                ? 'bg-[#144D32] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <UserIcon className="w-4 h-4 text-[#F5C84F]" />
            <span>Mon Profil & Badge Officiel</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
                  <span>Cotisations & Dons</span>
                  <DollarSign className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-display">
                  {totalCollectedDues.toLocaleString()} FCFA
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Via MTN MoMo & Moov</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">+12%</span>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
                  <span>Projets en Exécution</span>
                  <FolderGit2 className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-display">
                  {activeProjects.length} / {projects.length}
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">8 départements</span>
                  <span className="text-blue-700 font-bold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">100% actif</span>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
                  <span>Bénévoles Inscrits</span>
                  <Users className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-display">
                  {users.filter(u => u.role === 'volunteer').length}
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Réseau jeunesse</span>
                  <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">{pendingVolunteers.length} en attente</span>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
                  <span>Missions à Venir</span>
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-display">
                  {upcomingActivities.length}
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Ateliers & caravanes</span>
                  <span className="text-purple-700 font-bold bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">Programmé</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Pending Approvals */}
              <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">
                    Candidatures Bénévoles en Attente ({pendingVolunteers.length})
                  </h3>
                  <button
                    onClick={() => setActiveTab('volunteers')}
                    className="text-xs text-teal-600 font-bold hover:underline"
                  >
                    Gérer tout
                  </button>
                </div>

                {pendingVolunteers.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-slate-100">
                    Toutes les candidatures ont été traitées par les RH.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {pendingVolunteers.slice(0, 3).map(vol => (
                      <div key={vol.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                            {vol.firstName[0]}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{vol.firstName} {vol.lastName}</span>
                            <span className="text-slate-500 text-[11px]">{vol.profession} • {vol.city}</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => updateVolunteerStatus(vol.id, 'active')}
                            className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer"
                            title="Approuver"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => updateVolunteerStatus(vol.id, 'inactive')}
                            className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors cursor-pointer"
                            title="Refuser"
                          >
                            <UserX className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Payments Log */}
              <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">
                    Dernières Transactions Mobile Money ({payments.length})
                  </h3>
                  <button
                    onClick={() => setActiveTab('finances')}
                    className="text-xs text-teal-600 font-bold hover:underline"
                  >
                    Voir grand livre
                  </button>
                </div>

                <div className="space-y-2">
                  {payments.slice(0, 4).map(pay => (
                    <div key={pay.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block">{pay.userName}</span>
                        <span className="text-slate-500 text-[11px]">{pay.contributionTitle} • {pay.date}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-emerald-700 block">+{pay.amount.toLocaleString()} F</span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">{pay.paymentMethod}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section Gestion des Partenaires du Carrousel */}
            {canAccessSection('partners') && (
              <div className="pt-2">
                <CarouselPartnersSection />
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 font-display">
                  Gestion des Projets & Budgets
                </h2>
                <p className="text-xs text-slate-500">
                  Planification, pilotage opérationnel et suivi budgétaire en FCFA.
                </p>
              </div>
              <button
                onClick={() => setShowAddProjectModal(true)}
                className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-teal-600/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau Projet</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
                      <th className="py-3 px-4">Code / Projet</th>
                      <th className="py-3 px-4">Domaine</th>
                      <th className="py-3 px-4">Localisation</th>
                      <th className="py-3 px-4">Budget</th>
                      <th className="py-3 px-4">Bénéficiaires</th>
                      <th className="py-3 px-4">Avancement</th>
                      <th className="py-3 px-4">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {projects.map(proj => (
                      <tr key={proj.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-mono text-[11px] font-bold text-slate-400 block">{proj.code}</span>
                          <span className="font-bold text-slate-900 text-sm block">{proj.title}</span>
                          <span className="text-[11px] text-slate-500">Bailleur: {proj.donorOrPartner}</span>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700">{proj.domain}</td>
                        <td className="py-3.5 px-4 text-slate-600">{proj.location}, {proj.commune}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{proj.budget.toLocaleString()} {proj.currency}</td>
                        <td className="py-3.5 px-4 text-slate-700">
                          {proj.actualBeneficiaries.toLocaleString()} / {proj.targetBeneficiaries.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden mb-1">
                            <div className="bg-teal-600 h-full rounded-full" style={{ width: `${proj.progressPercentage}%` }}></div>
                          </div>
                          <span className="font-bold text-teal-700">{proj.progressPercentage}%</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                            {proj.status.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ACTIVITIES & PARTICIPANTS MANAGEMENT */}
        {activeTab === 'activities' && canAccessSection('activities') && (
          <div className="animate-in fade-in duration-150">
            <ActivitiesManager />
          </div>
        )}

        {/* TAB 4: VOLUNTEERS & ACCOUNTS (USERS MANAGER) */}
        {activeTab === 'volunteers' && canAccessSection('volunteers') && (
          <div className="animate-in fade-in duration-150">
            <UsersManager />
          </div>
        )}

        {/* TAB 5: FINANCES & COTISATIONS (COTISATIONS MANAGER & LEDGER) */}
        {activeTab === 'finances' && canAccessSection('finances') && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Cotisations Campaign Manager */}
            <CotisationsManager onOpenPaymentModalFor={onOpenPaymentForContrib} />

            {/* Payments Ledger Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Grand Livre des Transactions & Recouvrements (Mobile Money & Espèces)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Traçabilité en temps réel des versements MTN MoMo, Moov Money et Caisse.
                  </p>
                </div>
                <button
                  onClick={onOpenPaymentModal}
                  className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nouveau Paiement</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
                      <th className="py-3 px-4">N° Reçu</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Adhérent / Payeur</th>
                      <th className="py-3 px-4">Motif</th>
                      <th className="py-3 px-4">Mode & Réf</th>
                      <th className="py-3 px-4 text-right">Montant (FCFA)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payments.map(pay => (
                      <tr key={pay.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{pay.receiptNumber}</td>
                        <td className="py-3.5 px-4 text-slate-500">{pay.date}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-900">{pay.userName}</td>
                        <td className="py-3.5 px-4 text-slate-700">{pay.contributionTitle}</td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold uppercase text-slate-800 block">{pay.paymentMethod}</span>
                          <span className="font-mono text-[10px] text-slate-400">{pay.reference}</span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-black text-emerald-700 text-sm">
                          {pay.amount.toLocaleString()} F
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: M&E INDICATORS */}
        {activeTab === 'me' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 font-display">
                  Suivi-Évaluation & Cibles d'Impact (M&E)
                </h2>
                <p className="text-xs text-slate-500">
                  Mesure de performance trimestrielle et reddition de comptes.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meIndicators.map(ind => {
                const rate = Math.round((ind.currentValue / ind.targetValue) * 100);
                return (
                  <div key={ind.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                        {ind.code}
                      </span>
                      <span className={`text-xs font-bold ${rate >= 100 ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {rate}% atteint
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm">{ind.title}</h4>
                    <p className="text-xs text-slate-500">Domaine : {ind.domain}</p>

                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Progression :</span>
                        <span className="font-bold text-slate-900">
                          {ind.currentValue.toLocaleString()} / {ind.targetValue.toLocaleString()} {ind.unit}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-teal-600 h-full rounded-full" style={{ width: `${Math.min(rate, 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 7: NEWS MANAGER */}
        {activeTab === 'news' && canAccessSection('news') && (
          <div className="animate-in fade-in duration-150">
            <NewsManager />
          </div>
        )}

        {/* TAB 8: DOCUMENTS MANAGER */}
        {activeTab === 'documents' && canAccessSection('documents') && (
          <div className="animate-in fade-in duration-150">
            <DocumentsManager />
          </div>
        )}

        {/* TAB 9: PARTNERS MANAGER */}
        {activeTab === 'partners' && canAccessSection('partners') && (
          <div className="animate-in fade-in duration-150 space-y-8">
            <CarouselPartnersSection />
            <PartnersManager />
          </div>
        )}

        {/* TAB 10: ZONES MANAGER */}
        {activeTab === 'zones' && canAccessSection('zones') && (
          <div className="animate-in fade-in duration-150">
            <ZonesManager />
          </div>
        )}

        {/* TAB 11: ANNOUNCEMENTS MANAGER */}
        {activeTab === 'announcements' && canAccessSection('announcements') && (
          <div className="animate-in fade-in duration-150">
            <AnnouncementsManager />
          </div>
        )}

        {/* TAB VBG: VBG MANAGER */}
        {activeTab === 'vbg' && (
          <div className="animate-in fade-in duration-150">
            <VbgManager />
          </div>
        )}

        {/* TAB 12: MAINTENANCE MODE MANAGEMENT */}
        {activeTab === 'maintenance' && canAccessSection('maintenance') && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150 max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">Système de Mode Maintenance</h3>
                <p className="text-xs text-slate-500">Activez ou désactivez la maintenance de la plateforme HEALTHDEV ONG.</p>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Statut actuel de la plateforme</h4>
                  <p className="text-xs text-slate-500">
                    {isMaintenanceMode 
                      ? '⚠️ La plateforme est en maintenance. Seuls les administrateurs connectés peuvent y accéder.' 
                      : '✅ La plateforme est pleinement opérationnelle et accessible au public.'}
                  </p>
                </div>
                <button
                  onClick={() => setMaintenanceMode(!isMaintenanceMode)}
                  className={`px-5 py-2.5 rounded-2xl font-black text-xs transition-all shadow-md cursor-pointer ${
                    isMaintenanceMode 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                >
                  {isMaintenanceMode ? 'Désactiver la maintenance' : 'Activer le mode maintenance'}
                </button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 space-y-1">
              <strong>Note de sécurité :</strong>
              <p>
                Lorsque le mode maintenance est actif, les visiteurs non connectés visualisent la page de maintenance avec un accès direct de connexion pour les administrateurs.
              </p>
            </div>
          </div>
        )}

        {/* TAB 7: VOLUNTEER'S PERSONAL SPACE */}
        {activeTab === 'my_volunteer' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Mon Espace d'Engagement Bénévole</span>
                </div>
                <h2 className="text-2xl font-black font-display">
                  Bonjour {currentUser?.firstName} !
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  Retrouvez ici le récapitulatif de vos missions terrain avec HEALTHDEV ONG, 
                  votre badge d'accréditation officiel et vos attestations certifiées.
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setIsBadgeModalOpen(true)}
                  className="px-4 py-2.5 bg-[#F5C84F] hover:bg-[#e5b93e] text-slate-950 font-black rounded-xl text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-slate-950" />
                  <span>Mon Badge Officiel 2026</span>
                </button>

                <button
                  onClick={() => setIsEditProfileOpen(true)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all border border-slate-700 flex items-center gap-2 cursor-pointer"
                >
                  <Edit className="w-4 h-4 text-teal-400" />
                  <span>Modifier mon profil & photo</span>
                </button>
              </div>
            </div>

            {/* Quick Badge Highlight Card */}
            <div className="bg-gradient-to-r from-teal-900/40 via-slate-900 to-[#144D32]/40 rounded-3xl p-6 border border-teal-800/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative group shrink-0">
                  <img
                    src={currentUser?.avatarUrl || '/default_avatar.jpg'}
                    alt={currentUser?.firstName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#F5C84F] shadow-md"
                  />
                  <button
                    onClick={() => setIsEditProfileOpen(true)}
                    className="absolute -bottom-1 -right-1 p-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-sm cursor-pointer"
                    title="Changer la photo"
                  >
                    <Camera className="w-3 h-3" />
                  </button>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-black text-white font-display">
                      Badge d'Accréditation & Carte de Membre 2026
                    </h3>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black rounded-md uppercase">
                      Vérifié
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Matricule : <strong className="font-mono text-teal-300">HD-BEN-2026-{(currentUser?.id || '01').replace(/\D/g, '').slice(-4).padStart(4, '0')}</strong> • Déployable sur les caravanes terrain
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsBadgeModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#144D32] hover:bg-[#0e3b26] text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-950/40 border border-teal-500/30"
                >
                  <Award className="w-4 h-4 text-[#F5C84F]" />
                  <span>Afficher / Imprimer le Badge</span>
                </button>
              </div>
            </div>

            {/* Volunteer Targeted Announcements */}
            {announcements.filter(a => a.isActive && (a.targetAudience === 'volunteers' || a.targetAudience === 'all')).length > 0 && (
              <div className="space-y-3">
                {announcements.filter(a => a.isActive && (a.targetAudience === 'volunteers' || a.targetAudience === 'all')).map(ann => (
                  <div key={ann.id} className="bg-gradient-to-r from-teal-900 to-emerald-900 text-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg border border-teal-700/50 flex flex-col md:flex-row items-stretch md:items-center gap-4 sm:gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl pointer-events-none"></div>
                    {ann.imageUrl && (
                      <div className="w-full md:w-48 h-40 sm:h-44 md:h-32 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border border-white/20 shadow-sm bg-slate-900">
                        <img src={ann.imageUrl} alt={ann.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}
                    <div className="grow space-y-1.5 relative z-10 min-w-0">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-teal-500/20 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-bold text-teal-200">
                        <Megaphone className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                        <span>Communiqué Officiel • Bénévoles</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold font-display text-white break-words leading-snug">
                        {ann.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed break-words">
                        {ann.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Volunteer Real-time Notifications: Activities & Programs Published */}
            {notifications.filter(n => n.targetRole === 'volunteer' || n.type === 'activity' || n.type === 'project').length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-teal-100 text-teal-800 rounded-xl">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Alertes Bénévoles • Nouvelles Activités & Programmes
                      </h3>
                      <p className="text-xs text-slate-500">
                        Soyez informé en direct des nouvelles opportunités et missions publiées sur le terrain
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-xl border border-teal-200">
                      {notifications.filter(n => (n.targetRole === 'volunteer' || n.type === 'activity' || n.type === 'project') && !n.isRead).length} nouveau(x)
                    </span>
                    <button
                      onClick={() => {
                        setCurrentView('notifications');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Voir toutes</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {notifications
                    .filter(n => n.targetRole === 'volunteer' || n.type === 'activity' || n.type === 'project')
                    .slice(0, 4)
                    .map(notif => (
                      <div 
                        key={notif.id}
                        onClick={() => {
                          if (!notif.isRead) markNotificationAsRead(notif.id);
                          if (notif.link === 'activities') setCurrentView('activities');
                          else if (notif.link === 'projects') setCurrentView('projects');
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                          !notif.isRead 
                            ? 'bg-teal-50/50 border-teal-200 hover:bg-teal-50' 
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 line-clamp-1">
                              {notif.title}
                            </span>
                            {!notif.isRead && (
                              <span className="px-1.5 py-0.5 bg-teal-600 text-white text-[9px] font-bold rounded-md shrink-0">
                                Nouveau
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-snug">
                            {notif.message}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200/60 text-slate-400">
                          <span>{notif.createdAt}</span>
                          <span className="text-teal-700 font-bold hover:underline">
                            Participer / Voir →
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Volunteer Personal Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Missions Assignées</span>
                <div className="text-2xl font-black text-slate-900">{myActivities.length}</div>
                <p className="text-[11px] text-slate-500">Ateliers & caravanes terrain</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Heures de Bénévolat</span>
                <div className="text-2xl font-black text-teal-700">{myActivities.length * 8 || 16} h</div>
                <p className="text-[11px] text-slate-500">Validées par la Direction RH</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Cotisations Payées</span>
                <div className="text-2xl font-black text-emerald-700">
                  {myPayments.reduce((acc, p) => acc + p.amount, 0).toLocaleString()} F
                </div>
                <p className="text-[11px] text-slate-500">Statut adhérent(e) à jour</p>
              </div>
            </div>

            {/* My registered activities */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Mes Inscriptions aux Activités</h3>
                <button
                  onClick={() => setCurrentView('activities')}
                  className="text-xs text-teal-600 font-bold hover:underline"
                >
                  Découvrir d'autres activités
                </button>
              </div>

              {myActivities.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-100">
                  Vous n'êtes pas encore inscrit(e) à une activité. Rendez-vous dans l'onglet « Activités » pour participer.
                </div>
              ) : (
                <div className="space-y-3">
                  {myActivities.map(act => (
                    <div key={act.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">{act.title}</span>
                        <span className="text-slate-500">{act.date} • {act.location}, {act.commune}</span>
                      </div>

                      <button
                        onClick={() => {
                          setCertActivity(act);
                          setCertRecipient(`${currentUser?.firstName} ${currentUser?.lastName}`);
                        }}
                        className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto transition-colors cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-amber-600" />
                        <span>Télécharger mon Attestation</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {/* TAB 8: PROFILE & BADGE (UNIVERSAL FOR ALL USERS) */}
        {activeTab === 'my_profile' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Profile Hero Card */}
            <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                  <div className="relative group shrink-0">
                    <img
                      src={currentUser?.avatarUrl || '/default_avatar.jpg'}
                      alt={currentUser?.firstName}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white/20 shadow-xl"
                    />
                    <button
                      onClick={() => setIsEditProfileOpen(true)}
                      className="absolute -bottom-1 -right-1 p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-lg transition-transform group-hover:scale-105 cursor-pointer"
                      title="Modifier ma photo"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                      <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
                        {currentUser?.firstName} {currentUser?.lastName}
                      </h2>
                      {getRoleBadge(currentUser?.role)}
                      <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Compte Vérifié</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                      <span>{currentUser?.profession || 'Membre de l\'équipe'}</span>
                      <span className="text-slate-500">•</span>
                      <span>{currentUser?.city || 'Parakou'}, {currentUser?.department || 'Borgou'} (Bénin)</span>
                      <span className="text-slate-500">•</span>
                      <span className="font-mono text-teal-300">HD-2026-{(currentUser?.id || '01').replace(/\D/g, '').slice(-4).padStart(4, '0')}</span>
                    </p>

                    <p className="text-xs text-slate-400 max-w-xl italic">
                      {currentUser?.motivation || 'Engagé(e) pour la santé des jeunes, les droits sexuels et reproductifs et le leadership féminin avec HEALTHDEV ONG au Bénin.'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
                  <button
                    onClick={() => setIsBadgeModalOpen(true)}
                    className="px-5 py-3 bg-[#144D32] hover:bg-[#0e3b26] text-white rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer border border-[#F5C84F]/30"
                  >
                    <Award className="w-4 h-4 text-[#F5C84F]" />
                    <span>Générer mon Badge Officiel</span>
                  </button>

                  <button
                    onClick={() => setIsEditProfileOpen(true)}
                    className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
                  >
                    <Edit className="w-4 h-4 text-teal-400" />
                    <span>Modifier mes informations</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Grid: Left Info & Right Badge Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Personal and Professional details (2 Cols) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Details card */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h3 className="font-bold text-slate-900 text-base font-display flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-teal-600" />
                      <span>Coordonnées & Informations Personnelles</span>
                    </h3>
                    <button
                      onClick={() => setIsEditProfileOpen(true)}
                      className="text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Modifier</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-slate-400 block font-medium mb-1">Prénom & Nom</span>
                      <span className="font-bold text-slate-800 text-sm">{currentUser?.firstName} {currentUser?.lastName}</span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-slate-400 block font-medium mb-1">Adresse Email</span>
                      <span className="font-bold text-slate-800 text-sm">{currentUser?.email}</span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-slate-400 block font-medium mb-1">Téléphone / WhatsApp</span>
                      <span className="font-bold text-slate-800 text-sm">{currentUser?.phone || '+229 97 00 00 00'}</span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-slate-400 block font-medium mb-1">Localisation</span>
                      <span className="font-bold text-slate-800 text-sm">{currentUser?.city || 'Parakou'}, {currentUser?.department || 'Borgou'}</span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-slate-400 block font-medium mb-1">Profession / Rôle</span>
                      <span className="font-bold text-slate-800 text-sm">{currentUser?.profession || 'Membre actif'}</span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-slate-400 block font-medium mb-1">Disponibilité pour missions</span>
                      <span className="font-bold text-slate-800 text-sm">{currentUser?.availability || 'Selon les besoins de projet'}</span>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block">
                        Compétences & Domaines d'Intervention ({currentUser?.skills?.length || 0})
                      </span>
                      <button
                        onClick={() => setIsEditProfileOpen(true)}
                        className="text-xs text-teal-600 font-bold hover:underline cursor-pointer"
                      >
                        + Gérer mes compétences
                      </button>
                    </div>

                    {currentUser?.skills && currentUser.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {currentUser.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-500 text-xs text-center">
                        Aucune compétence renseignée. Cliquez sur « Modifier mes informations » pour ajouter vos domaines d'expertise.
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Official Badge Presentation & Quick Print (1 Col) */}
              <div className="space-y-6">
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#F5C84F] uppercase tracking-wider">
                      <Award className="w-4 h-4" />
                      <span>Carte d'Accréditation Officielle</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold rounded-md uppercase">
                      Actif
                    </span>
                  </div>

                  {/* Mini Badge Preview */}
                  <div className="bg-white text-slate-900 rounded-2xl p-4 shadow-lg border border-slate-200 relative overflow-hidden">
                    <div className="bg-[#144D32] -mx-4 -mt-4 p-3 text-center text-white mb-3">
                      <div className="text-[9px] font-black tracking-widest uppercase text-[#F5C84F]">
                        RÉPUBLIQUE DU BÉNIN
                      </div>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <div className="w-8 h-8 rounded-lg bg-white p-0.5 overflow-hidden flex items-center justify-center border border-[#F5C84F] shrink-0 shadow-xs">
                          <img src="/logo1.jpg" alt="Logo" className="w-full h-full object-contain rounded-md" />
                        </div>
                        <span className="text-sm font-black font-display text-white">
                          HEALTHDEV ONG
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={currentUser?.avatarUrl || '/default_avatar.jpg'}
                        alt={currentUser?.firstName}
                        className="w-16 h-16 rounded-xl object-cover border-2 border-teal-600 shadow-xs shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-black text-slate-900 truncate uppercase">
                          {currentUser?.firstName} {currentUser?.lastName}
                        </div>
                        <div className="text-[10px] font-black text-teal-800 uppercase truncate">
                          {currentUser?.poste?.trim() || (
                            currentUser?.role === 'volunteer' ? 'Bénévole Terrain' :
                            currentUser?.role === 'super_admin' ? 'Super Administrateur' :
                            currentUser?.role === 'admin' ? 'Direction & Admin RH' :
                            currentUser?.role === 'secretary' ? 'Secrétaire Générale' :
                            currentUser?.role === 'program_manager' ? 'Responsable Programmes' :
                            currentUser?.role === 'financial_manager' ? 'Responsable Financier' :
                            currentUser?.role === 'me_manager' ? 'Responsable Suivi & Éval.' :
                            currentUser?.role === 'comm_manager' ? 'Responsable Communication' : 'Membre Accrédité'
                          )}
                        </div>
                        <div className="text-[10px] font-mono font-bold text-slate-600 mt-0.5 bg-slate-100 px-1.5 py-0.5 rounded-sm inline-block">
                          {currentUser?.matricule || `HD-BEN-${(currentUser?.id || '01').replace(/\D/g, '').slice(-4).padStart(4, '0')}`}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                      <span className="text-slate-400 font-bold uppercase text-[9px]">{currentUser?.city || 'Parakou'}, {currentUser?.department || 'Borgou'}</span>
                      <span className="font-bold text-emerald-700">Accrédité(e)</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 text-center leading-relaxed">
                    Cette carte officielle permet de vous identifier lors de vos interventions sur le terrain et lors des événements de HEALTHDEV ONG.
                  </p>

                  <div className="space-y-2">
                    <button
                      onClick={() => setIsBadgeModalOpen(true)}
                      className="w-full py-3 bg-[#144D32] hover:bg-[#0e3b26] text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-950/40 border border-[#F5C84F]/30"
                    >
                      <Award className="w-4 h-4 text-[#F5C84F]" />
                      <span>Ouvrir & Imprimer le Badge</span>
                    </button>

                    <button
                      onClick={() => setIsEditProfileOpen(true)}
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
                    >
                      <Camera className="w-3.5 h-3.5 text-teal-400" />
                      <span>Changer la photo du badge</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {certActivity && (
        <CertificateModal
          isOpen={!!certActivity}
          onClose={() => setCertActivity(null)}
          activity={certActivity}
          volunteerName={certRecipient || `${currentUser?.firstName} ${currentUser?.lastName}`}
        />
      )}

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
        />
      )}

      {/* User Badge Modal */}
      {isBadgeModalOpen && (
        <UserBadgeModal
          isOpen={isBadgeModalOpen}
          onClose={() => setIsBadgeModalOpen(false)}
          onOpenEditProfile={() => {
            setIsBadgeModalOpen(false);
            setIsEditProfileOpen(true);
          }}
        />
      )}
    </div>
  );
};
