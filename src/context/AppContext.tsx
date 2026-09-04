import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Project,
  Activity,
  ActivityRegisteredVolunteer,
  ActivityAttendance,
  Contribution,
  Payment,
  MEIndicator,
  FundingOpportunity,
  DocumentItem,
  DocumentResource,
  NewsArticle,
  InterventionZone,
  FinancialTransaction,
  NotificationItem,
  ChatMessage,
  AuditLog,
  UserRole,
  Partner,
  Announcement
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_PROJECTS,
  INITIAL_ACTIVITIES,
  INITIAL_ATTENDANCES,
  INITIAL_CONTRIBUTIONS,
  INITIAL_PAYMENTS,
  INITIAL_INDICATORS,
  INITIAL_OPPORTUNITIES,
  INITIAL_DOCUMENTS,
  INITIAL_NEWS,
  INITIAL_ZONES,
  INITIAL_TRANSACTIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_MESSAGES,
  INITIAL_AUDIT_LOGS,
  INITIAL_PARTNERS,
  INITIAL_ANNOUNCEMENTS
} from '../data/initialData';


interface AppContextType {
  // Auth & User
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  switchUserRole: (role: UserRole) => void;
  login: (email: string, password?: string) => boolean;
  logout: () => void;
  registerVolunteer: (data: Partial<UserProfile>) => { success: boolean; message: string };

  // Data Collections
  users: UserProfile[];
  projects: Project[];
  activities: Activity[];
  attendances: ActivityAttendance[];
  contributions: Contribution[];
  payments: Payment[];
  indicators: MEIndicator[];
  meIndicators: MEIndicator[];
  opportunities: FundingOpportunity[];
  documents: DocumentItem[];
  resources: DocumentResource[];
  news: NewsArticle[];
  zones: InterventionZone[];
  partners: Partner[];
  transactions: FinancialTransaction[];
  notifications: NotificationItem[];
  messages: ChatMessage[];
  auditLogs: AuditLog[];

  // Navigation & View Controls
  currentView: string;
  setCurrentView: (view: string) => void;
  activeDashboardTab: string;
  setActiveDashboardTab: (tab: string) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  selectedActivityId: string | null;
  setSelectedActivityId: (id: string | null) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;

  // Actions - Projects
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Actions - Activities
  addActivity: (activity: Omit<Activity, 'id' | 'createdAt'>) => void;
  updateActivity: (id: string, updates: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;
  registerToActivity: (activityId: string, volunteerId: string) => void;
  registerForActivity: (activityId: string) => Promise<{ success: boolean; message: string }>;
  unregisterFromActivity: (activityId: string) => Promise<{ success: boolean; message: string }>;
  cancelActivityRegistration: (activityId: string, volunteerId: string) => void;
  updateParticipantStatus: (activityId: string, userId: string, status: 'declared' | 'confirmed' | 'attended' | 'cancelled') => void;
  updateAttendance: (attendanceId: string, updates: Partial<ActivityAttendance>) => void;

  // Actions - Volunteers & Users
  addUser: (user: Omit<UserProfile, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<UserProfile>) => void;
  deleteUser: (id: string) => void;
  updateUserStatus: (userId: string, status: 'pending' | 'active' | 'suspended' | 'inactive') => void;
  updateVolunteerStatus: (userId: string, status: 'pending' | 'active' | 'suspended' | 'inactive') => void;
  updateUserRole: (userId: string, role: UserRole) => void;
  updateUserSections: (userId: string, allowedSections: string[]) => void;
  updateProfile: (userId: string, updates: Partial<UserProfile>) => void;

  // Actions - Contributions & Payments
  addContribution: (contribution: Omit<Contribution, 'id' | 'createdAt'>) => void;
  updateContribution: (id: string, updates: Partial<Contribution>) => void;
  deleteContribution: (id: string) => void;
  processPayment: (paymentData: {
    contributionId?: string;
    contributionTitle?: string;
    amount: number;
    paymentMethod: Payment['paymentMethod'];
    payerPhone?: string;
    notes?: string;
  }) => Promise<{ success: boolean; payment: Payment }>;

  // Actions - M&E
  updateIndicatorValue: (indicatorId: string, newValue: number) => void;
  addIndicator: (indicator: Omit<MEIndicator, 'id' | 'lastUpdated' | 'achievementRate' | 'history'>) => void;
  updateIndicator: (id: string, updates: Partial<MEIndicator>) => void;
  deleteIndicator: (id: string) => void;

  // Actions - Opportunities
  toggleBookmarkOpportunity: (opportunityId: string) => void;
  addOpportunity: (opportunity: Omit<FundingOpportunity, 'id' | 'createdAt'>) => void;
  updateOpportunity: (id: string, updates: Partial<FundingOpportunity>) => void;
  deleteOpportunity: (id: string) => void;

  // Actions - Documents
  addDocument: (document: Omit<DocumentItem, 'id' | 'downloadsCount'>) => void;
  updateDocument: (id: string, updates: Partial<DocumentItem>) => void;
  deleteDocument: (id: string) => void;
  incrementDocumentDownload: (docId: string) => void;

  // Actions - News
  addNewsArticle: (article: Omit<NewsArticle, 'id'>) => void;
  updateNewsArticle: (id: string, updates: Partial<NewsArticle>) => void;
  deleteNewsArticle: (id: string) => void;

  // Actions - Partners
  addPartner: (partner: Omit<Partner, 'id'>) => void;
  updatePartner: (id: string, updates: Partial<Partner>) => void;
  deletePartner: (id: string) => void;

  // Actions - Zones
  addZone: (zone: Omit<InterventionZone, 'id'>) => void;
  updateZone: (id: string, updates: Partial<InterventionZone>) => void;
  deleteZone: (id: string) => void;

  // Actions - Financials
  addTransaction: (transaction: Omit<FinancialTransaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<FinancialTransaction>) => void;
  deleteTransaction: (id: string) => void;

  // Actions - Notifications & Messaging
  addNotification: (notification: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>) => void;
  deleteNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  sendMessage: (content: string, channelId?: string, recipientId?: string) => void;

  // Actions - Announcements & Maintenance
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt'>) => void;
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  isMaintenanceMode: boolean;
  setMaintenanceMode: (status: boolean) => void;

  // Search & Global Helpers
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  resetAllDataToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'healthdev_users_official_v14',
  PROJECTS: 'healthdev_projects_official_v14',
  ACTIVITIES: 'healthdev_activities_official_v14',
  ATTENDANCES: 'healthdev_attendances_official_v14',
  CONTRIBUTIONS: 'healthdev_contributions_official_v14',
  PAYMENTS: 'healthdev_payments_official_v14',
  INDICATORS: 'healthdev_indicators_official_v14',
  OPPORTUNITIES: 'healthdev_opportunities_official_v14',
  DOCUMENTS: 'healthdev_documents_official_v14',
  NEWS: 'healthdev_news_official_v14',
  ZONES: 'healthdev_zones_official_v14',
  PARTNERS: 'healthdev_partners_official_v14',
  TRANSACTIONS: 'healthdev_transactions_official_v14',
  NOTIFICATIONS: 'healthdev_notifications_official_v14',
  MESSAGES: 'healthdev_messages_official_v14',
  AUDIT_LOGS: 'healthdev_audit_logs_official_v14',
  ANNOUNCEMENTS: 'healthdev_announcements_official_v14',
  MAINTENANCE_MODE: 'healthdev_maintenance_mode_v14',
  CURRENT_USER_ID: 'healthdev_current_user_id_v14',
  CURRENT_VIEW: 'healthdev_current_view_v14'
};


export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Helper to load or initialize
  const loadState = <T,>(key: string, defaultVal: T): T => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (key.includes('users') && Array.isArray(parsed)) {
          // If stored users array has less than 40 accounts or contains legacy dummy entries, invalidate
          const isLegacy = parsed.length < 40 || parsed.some((u: any) => u.id === 'usr-1' || u.id === 'usr-8' || u.email?.includes('@healthdev.org'));
          if (isLegacy) {
            localStorage.removeItem(key);
            return defaultVal;
          }
        }
        if (key.includes('news') && Array.isArray(parsed)) {
          return parsed.filter((item: any) => !['news-comm-1', 'news-comm-2', 'news-comm-3'].includes(item.id)) as unknown as T;
        }
        if (key.includes('announcements') && Array.isArray(parsed)) {
          return parsed.filter((item: any) => item.id !== 'ann-1') as unknown as T;
        }
        if (Array.isArray(parsed) && parsed.length === 0 && Array.isArray(defaultVal) && defaultVal.length > 0) {
          return defaultVal;
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return defaultVal;
  };

  const [users, setUsers] = useState<UserProfile[]>(() => {
    const loaded = loadState(STORAGE_KEYS.USERS, INITIAL_USERS) || [];
    const isOutdated = loaded.length < 40 || loaded.some(u => u.id === 'usr-1' || u.id === 'usr-8' || u.email?.includes('@healthdev.org'));
    const sourceUsers = isOutdated ? INITIAL_USERS : loaded;
    return sourceUsers.map((u: UserProfile, idx: number) => {
      const initialMatch = INITIAL_USERS.find(iu => iu.id === u.id);
      const defaultMatricule = initialMatch?.matricule || u.matricule || `HD-BEN-${String(idx + 1).padStart(4, '0')}`;
      const defaultPoste = u.poste || initialMatch?.poste || u.profession || (u.role === 'volunteer' ? 'Bénévole Terrain' : 'Membre Actif');
      return {
        ...u,
        matricule: defaultMatricule,
        poste: defaultPoste
      };
    });
  });
  const [projects, setProjects] = useState<Project[]>(() => loadState(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS) || []);
  const [activities, setActivities] = useState<Activity[]>(() => loadState(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES) || []);
  const [attendances, setAttendances] = useState<ActivityAttendance[]>(() => loadState(STORAGE_KEYS.ATTENDANCES, INITIAL_ATTENDANCES) || []);
  const [contributions, setContributions] = useState<Contribution[]>(() => loadState(STORAGE_KEYS.CONTRIBUTIONS, INITIAL_CONTRIBUTIONS) || []);
  const [payments, setPayments] = useState<Payment[]>(() => loadState(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS) || []);
  const [indicators, setIndicators] = useState<MEIndicator[]>(() => loadState(STORAGE_KEYS.INDICATORS, INITIAL_INDICATORS) || []);
  const [opportunities, setOpportunities] = useState<FundingOpportunity[]>(() => loadState(STORAGE_KEYS.OPPORTUNITIES, INITIAL_OPPORTUNITIES) || []);
  const [documents, setDocuments] = useState<DocumentItem[]>(() => loadState(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS) || []);
  const [news, setNews] = useState<NewsArticle[]>(() => {
    const loaded = loadState(STORAGE_KEYS.NEWS, INITIAL_NEWS) || [];
    // Ensure initial static articles are present if they were not saved in localStorage
    const merged = [...loaded];
    INITIAL_NEWS.forEach(initArt => {
      if (!merged.some(item => item.id === initArt.id)) {
        merged.unshift(initArt);
      }
    });
    return merged;
  });
  const [zones, setZones] = useState<InterventionZone[]>(() => loadState(STORAGE_KEYS.ZONES, INITIAL_ZONES) || []);
  const [partners, setPartners] = useState<Partner[]>(() => {
    return INITIAL_PARTNERS;
  });
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(() => loadState(STORAGE_KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS) || []);
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => loadState(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS) || []);
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadState(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES) || []);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => loadState(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS) || []);
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => loadState(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS) || []);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MAINTENANCE_MODE);
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  const setMaintenanceMode = (status: boolean) => {
    setIsMaintenanceMode(status);
    localStorage.setItem(STORAGE_KEYS.MAINTENANCE_MODE, JSON.stringify(status));
    logAction('Mode Maintenance', status ? 'Plateforme mise en maintenance' : 'Plateforme activée (hors maintenance)');
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  }, [announcements]);

  const addAnnouncement = (itemData: Omit<Announcement, 'id' | 'createdAt'>) => {
    const newItem: Announcement = {
      ...itemData,
      id: `ann-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setAnnouncements(prev => [newItem, ...prev]);
    logAction('Publication communiqué', `Communiqué publié : "${newItem.title}"`);
  };

  const updateAnnouncement = (id: string, updates: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    logAction('Mise à jour communiqué', `Communiqué ${id} modifié`);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    logAction('Suppression communiqué', `Communiqué ${id} supprimé`);
  };


  // Current logged in user (default to Super Admin Rolland GNANGNI (DE), or toggle to any member)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const storedId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    if (storedId) {
      const found = users.find(u => u.id === storedId);
      if (found && !found.email.includes('@healthdev.org') && found.id !== 'usr-1') return found;
    }
    return users.find(u => u.id === 'usr-staff-1') || users[0] || null;
  });

  const [currentView, setCurrentView] = useState<string>(() => loadState(STORAGE_KEYS.CURRENT_VIEW, 'home'));
  const [activeDashboardTab, setActiveDashboardTab] = useState<string>('overview');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCES, JSON.stringify(attendances));
  }, [attendances]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(contributions));
  }, [contributions]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
  }, [payments]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INDICATORS, JSON.stringify(indicators));
  }, [indicators]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(opportunities));
  }, [opportunities]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
  }, [documents]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
  }, [news]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(zones));
  }, [zones]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(partners));
  }, [partners]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUser.id);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    }
  }, [currentUser]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, JSON.stringify(currentView));
  }, [currentView]);

  // Log an audit action
  const logAction = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('fr-FR'),
      userName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Anonyme',
      userRole: currentUser ? currentUser.role : 'visitor',
      action,
      details,
      ip: '154.68.12.98 (Parakou, BJ)'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Auth Methods
  const switchUserRole = (role: UserRole) => {
    const match = users.find(u => u.role === role);
    if (match) {
      setCurrentUser(match);
      logAction('Changement de rôle de test', `Basculé vers le profil ${match.firstName} ${match.lastName} (${role})`);
    }
  };

  const login = (email: string): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (found) {
      if (found.status === 'suspended') {
        alert('Votre compte a été suspendu par l\'administration de HEALTHDEV ONG. Veuillez contacter contact@healthdev.ong.');
        return false;
      }
      setCurrentUser(found);
      logAction('Connexion utilisateur', `Connexion réussie pour ${found.email}`);
      return true;
    }
    return false;
  };

  const logout = () => {
    logAction('Déconnexion utilisateur', `Déconnexion de ${currentUser?.email}`);
    setCurrentUser(null);
    setCurrentView('home');
  };

  const registerVolunteer = (data: Partial<UserProfile>): { success: boolean; message: string } => {
    const existing = users.find(u => u.email.toLowerCase() === (data.email || '').toLowerCase());
    if (existing) {
      return { success: false, message: 'Cette adresse email est déjà enregistrée.' };
    }

    const nextMatriculeNum = users.length + 1;
    const generatedMatricule = data.matricule || `HD-BEN-${String(nextMatriculeNum).padStart(4, '0')}`;
    const defaultPoste = data.poste || 'Bénévole Terrain';

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      matricule: generatedMatricule,
      poste: defaultPoste,
      email: data.email || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      role: 'volunteer',
      gender: data.gender || 'F',
      birthDate: data.birthDate,
      phone: data.phone || '',
      city: data.city || 'Parakou',
      department: data.department || 'Borgou',
      address: data.address,
      profession: data.profession || 'Étudiant(e)',
      educationLevel: data.educationLevel || 'Bac',
      skills: data.skills || [],
      interests: data.interests || ['Santé reproductive', 'Droits des femmes'],
      availability: data.availability || 'Week-ends',
      motivation: data.motivation || 'Dévouement bénévole.',
      avatarUrl: data.avatarUrl || (data.gender === 'F' ? '/default_avatar_f.jpg' : '/default_avatar_m.jpg'),
      status: 'pending', // Pending admin validation
      createdAt: new Date().toISOString().split('T')[0],
      volunteerHours: 0,
      participationsCount: 0
    };

    setUsers(prev => [newUser, ...prev]);

    // Create Notification for admin
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      targetRole: 'admin',
      title: 'Nouvelle candidature bénévole reçue',
      message: `${newUser.firstName} ${newUser.lastName} (${newUser.city}) a postulé comme bénévole. En attente de validation.`,
      type: 'volunteer',
      createdAt: new Date().toLocaleString('fr-FR'),
      isRead: false,
      link: 'volunteers'
    };
    setNotifications(prev => [newNotif, ...prev]);

    logAction('Inscription bénévole', `Nouvelle candidature soumise par ${newUser.firstName} ${newUser.lastName}`);

    return { 
      success: true, 
      message: 'Votre candidature a bien été enregistrée ! Un administrateur de HEALTHDEV ONG examinera votre dossier sous 24 à 48 heures.' 
    };
  };

  // Volunteer approval & role management
  const updateUserStatus = (userId: string, status: 'pending' | 'active' | 'suspended' | 'inactive') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    const target = users.find(u => u.id === userId);
    logAction('Modification statut utilisateur', `Statut de ${target?.firstName} ${target?.lastName} changé en "${status}"`);
  };

  const updateUserRole = (userId: string, role: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
    const target = users.find(u => u.id === userId);
    logAction('Modification rôle utilisateur', `Rôle de ${target?.firstName} ${target?.lastName} changé en "${role}"`);
  };

  const addUser = (userData: Omit<UserProfile, 'id' | 'createdAt'>) => {
    const nextMatriculeNum = users.length + 1;
    const generatedMatricule = userData.matricule || `HD-BEN-${String(nextMatriculeNum).padStart(4, '0')}`;
    const defaultPoste = userData.poste || userData.profession || (userData.role === 'volunteer' ? 'Bénévole Terrain' : 'Membre de l\'équipe');

    const newUser: UserProfile = {
      ...userData,
      matricule: generatedMatricule,
      poste: defaultPoste,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [newUser, ...prev]);
    logAction('Création compte utilisateur', `Nouveau compte créé : ${newUser.firstName} ${newUser.lastName} (${newUser.matricule} - ${newUser.poste})`);
  };

  const updateUser = (id: string, updates: Partial<UserProfile>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    if (currentUser?.id === id) {
      setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
    }
    logAction('Mise à jour compte utilisateur', `Compte ${id} mis à jour`);
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    logAction('Suppression compte utilisateur', `Compte ${id} supprimé`);
  };

  const updateUserSections = (userId: string, allowedSections: string[]) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, allowedSections } : u));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, allowedSections } : null);
    }
    logAction('Mise à jour permissions sections', `Permissions mises à jour pour le compte ${userId}`);
  };

  const updateProfile = (userId: string, updates: Partial<UserProfile>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  // Projects CRUD
  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProj: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProjects(prev => [newProj, ...prev]);

    // Notify volunteers about the new program / project
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      targetRole: 'volunteer',
      title: `Nouveau programme publié : ${newProj.title}`,
      message: `Le programme « ${newProj.title} » (${newProj.domain || 'Santé communautaire'}) a été publié. De nouvelles missions bénévoles sont ouvertes.`,
      type: 'project',
      createdAt: new Date().toLocaleString('fr-FR'),
      isRead: false,
      link: 'projects'
    };
    setNotifications(prev => [notif, ...prev]);

    logAction('Création de projet', `Nouveau projet créé : "${newProj.title}"`);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    logAction('Mise à jour projet', `Projet ${id} mis à jour`);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    logAction('Suppression projet', `Projet ${id} supprimé`);
  };

  // Activities CRUD
  const addActivity = (activityData: Omit<Activity, 'id' | 'createdAt'>) => {
    const newAct: Activity = {
      ...activityData,
      id: `act-${Date.now()}`,
      status: activityData.status || 'upcoming',
      registeredVolunteers: activityData.registeredVolunteers || [],
      assignedVolunteers: activityData.assignedVolunteers || [],
      actualParticipants: activityData.actualParticipants || 0,
      targetParticipants: activityData.targetParticipants || 50,
      requiredVolunteers: activityData.requiredVolunteers || 10,
      budgetPlanned: activityData.budgetPlanned || 0,
      budgetUsed: activityData.budgetUsed || 0,
      progressPercent: activityData.progressPercent || 0,
      photos: activityData.photos && activityData.photos.length > 0 ? activityData.photos : ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800'],
      documents: activityData.documents || [],
      objectives: activityData.objectives && activityData.objectives.length > 0 ? activityData.objectives : ['Mobilisation communautaire et sensibilisation de terrain'],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setActivities(prev => [newAct, ...prev]);

    // Notify volunteers about the new activity / field mission
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      targetRole: 'volunteer',
      title: `Nouvelle activité publiée : ${newAct.title}`,
      message: `L'activité « ${newAct.title} » est planifiée pour le ${newAct.date} à ${newAct.time || '09:00'} (${newAct.location || 'Parakou'}). Vous pouvez d'ores et déjà vous déclarer participant(e) !`,
      type: 'activity',
      createdAt: new Date().toLocaleString('fr-FR'),
      isRead: false,
      link: 'activities'
    };
    setNotifications(prev => [notif, ...prev]);

    logAction('Planification activité', `Nouvelle activité créée : "${newAct.title}" (${newAct.date} à ${newAct.time})`);
  };

  const updateActivity = (id: string, updates: Partial<Activity>) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    logAction('Mise à jour activité', `Activité ${id} mise à jour`);
  };

  const deleteActivity = (id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
    setAttendances(prev => prev.filter(att => att.activityId !== id));
    logAction('Suppression activité', `Activité ${id} supprimée`);
  };

  const registerToActivity = (activityId: string, volunteerId: string) => {
    const volunteer = users.find(u => u.id === volunteerId);
    const activity = activities.find(a => a.id === activityId);
    if (!volunteer || !activity) return;

    // Check if already registered
    const existing = attendances.find(att => att.activityId === activityId && att.volunteerId === volunteerId);
    if (existing) return;

    const newAttendance: ActivityAttendance = {
      id: `att-${Date.now()}`,
      activityId,
      activityTitle: activity.title,
      volunteerId,
      volunteerName: `${volunteer.firstName} ${volunteer.lastName}`,
      volunteerEmail: volunteer.email,
      volunteerPhone: volunteer.phone,
      volunteerRole: volunteer.role,
      status: 'confirmed',
      registeredAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      hoursCompleted: 0
    };

    setAttendances(prev => [newAttendance, ...prev]);

    const newParticipantItem: ActivityRegisteredVolunteer = {
      userId: volunteer.id,
      name: `${volunteer.firstName} ${volunteer.lastName}`,
      email: volunteer.email,
      phone: volunteer.phone,
      role: volunteer.role,
      registeredAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'confirmed'
    };

    setActivities(prev => prev.map(a => {
      if (a.id === activityId) {
        const assignedSet = new Set([...(a.assignedVolunteers || []), `${volunteer.firstName} ${volunteer.lastName}`]);
        const regList = (a.registeredVolunteers || []).filter(r => r.userId !== volunteer.id);
        return {
          ...a,
          assignedVolunteers: Array.from(assignedSet),
          registeredVolunteers: [newParticipantItem, ...regList],
          actualParticipants: (a.actualParticipants || 0) + 1
        };
      }
      return a;
    }));

    logAction('Inscription activité bénévole', `${volunteer.firstName} ${volunteer.lastName} s'est inscrit(e) à "${activity.title}"`);
  };

  const registerForActivity = async (activityId: string): Promise<{ success: boolean; message: string }> => {
    if (!currentUser) {
      return { success: false, message: 'Veuillez vous connecter pour participer à cet événement.' };
    }
    const activity = activities.find(a => a.id === activityId);
    if (!activity) {
      return { success: false, message: 'Activité non trouvée.' };
    }
    const alreadyDeclared = (activity.registeredVolunteers || []).some(r => r.userId === currentUser.id);
    if (alreadyDeclared) {
      return { success: true, message: 'Vous êtes déjà déclaré(e) participant(e) à cet événement.' };
    }

    const newParticipant: ActivityRegisteredVolunteer = {
      userId: currentUser.id,
      name: `${currentUser.firstName} ${currentUser.lastName}`,
      email: currentUser.email,
      phone: currentUser.phone || '',
      role: currentUser.role || 'volunteer',
      registeredAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'declared'
    };

    const newAttendance: ActivityAttendance = {
      id: `att-${Date.now()}`,
      activityId,
      activityTitle: activity.title,
      volunteerId: currentUser.id,
      volunteerName: `${currentUser.firstName} ${currentUser.lastName}`,
      volunteerEmail: currentUser.email,
      volunteerPhone: currentUser.phone,
      volunteerRole: currentUser.role,
      status: 'registered',
      registeredAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      hoursCompleted: 0
    };

    setAttendances(prev => [newAttendance, ...prev]);

    setActivities(prev => prev.map(a => {
      if (a.id === activityId) {
        const set = new Set([...(a.assignedVolunteers || []), `${currentUser.firstName} ${currentUser.lastName}`]);
        const currentReg = a.registeredVolunteers || [];
        return {
          ...a,
          assignedVolunteers: Array.from(set),
          registeredVolunteers: [newParticipant, ...currentReg],
          actualParticipants: (a.actualParticipants || 0) + 1
        };
      }
      return a;
    }));

    // Notification instantanée envoyée aux administrateurs
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      targetRole: 'admin',
      title: `Nouveau participant déclaré : ${currentUser.firstName} ${currentUser.lastName}`,
      message: `${currentUser.firstName} ${currentUser.lastName} (${currentUser.role === 'volunteer' ? 'Bénévole' : 'Utilisateur'}) s'est déclaré(e) participant(e) à l'événement « ${activity.title} ».`,
      type: 'activity',
      createdAt: new Date().toLocaleString('fr-FR'),
      isRead: false,
      link: 'activities'
    };
    setNotifications(prev => [notif, ...prev]);

    logAction('Déclaration participant', `${currentUser.firstName} ${currentUser.lastName} s'est déclaré(e) participant(e) à "${activity.title}"`);
    return { success: true, message: 'Votre participation a été déclarée avec succès !' };
  };

  const unregisterFromActivity = async (activityId: string): Promise<{ success: boolean; message: string }> => {
    if (!currentUser) {
      return { success: false, message: 'Veuillez vous connecter.' };
    }
    cancelActivityRegistration(activityId, currentUser.id);
    return { success: true, message: 'Votre déclaration de participation a été annulée.' };
  };

  const cancelActivityRegistration = (activityId: string, volunteerId: string) => {
    setAttendances(prev => prev.filter(att => !(att.activityId === activityId && att.volunteerId === volunteerId)));
    
    setActivities(prev => prev.map(a => {
      if (a.id === activityId) {
        const regFiltered = (a.registeredVolunteers || []).filter(r => r.userId !== volunteerId);
        const user = users.find(u => u.id === volunteerId);
        const fullName = user ? `${user.firstName} ${user.lastName}` : '';
        const assignedFiltered = (a.assignedVolunteers || []).filter(name => name !== fullName);
        return {
          ...a,
          registeredVolunteers: regFiltered,
          assignedVolunteers: assignedFiltered,
          actualParticipants: Math.max(0, (a.actualParticipants || 1) - 1)
        };
      }
      return a;
    }));

    logAction('Désistement participant', `Participant ${volunteerId} retiré de l'activité ${activityId}`);
  };

  const updateParticipantStatus = (activityId: string, userId: string, status: 'declared' | 'confirmed' | 'attended' | 'cancelled') => {
    setActivities(prev => prev.map(a => {
      if (a.id === activityId) {
        const updatedReg = (a.registeredVolunteers || []).map(r => r.userId === userId ? { ...r, status } : r);
        return { ...a, registeredVolunteers: updatedReg };
      }
      return a;
    }));

    const attendanceStatusMap: Record<string, ActivityAttendance['status']> = {
      declared: 'registered',
      confirmed: 'confirmed',
      attended: 'attended',
      cancelled: 'cancelled'
    };

    setAttendances(prev => prev.map(att => {
      if (att.activityId === activityId && att.volunteerId === userId) {
        return { ...att, status: attendanceStatusMap[status] || 'confirmed' };
      }
      return att;
    }));

    logAction('Statut participant mis à jour', `Statut du participant ${userId} fixé à "${status}" pour l'activité ${activityId}`);
  };

  const updateAttendance = (attendanceId: string, updates: Partial<ActivityAttendance>) => {
    setAttendances(prev => prev.map(att => att.id === attendanceId ? { ...att, ...updates } : att));
  };

  // Contributions & Payments
  const addContribution = (data: Omit<Contribution, 'id' | 'createdAt'>) => {
    const newContrib: Contribution = {
      ...data,
      id: `cotis-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      collectedAmount: 0,
      paidCount: 0
    };
    setContributions(prev => [newContrib, ...prev]);
    logAction('Création appel de cotisation', `Nouvelle cotisation créée : "${newContrib.title}"`);
  };

  const updateContribution = (id: string, updates: Partial<Contribution>) => {
    setContributions(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    logAction('Mise à jour cotisation', `Cotisation ${id} modifiée`);
  };

  const deleteContribution = (id: string) => {
    setContributions(prev => prev.filter(c => c.id !== id));
    logAction('Suppression cotisation', `Cotisation ${id} supprimée`);
  };

  const processPayment = async (paymentData: {
    contributionId?: string;
    contributionTitle?: string;
    amount: number;
    paymentMethod: Payment['paymentMethod'];
    payerPhone?: string;
    notes?: string;
  }): Promise<{ success: boolean; payment: Payment }> => {
    const user = currentUser || {
      id: 'guest',
      firstName: 'Donateur',
      lastName: 'Généreux',
      email: 'donateur@healthdev.ong'
    };

    const receiptNum = `REC-HD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const txNum = `TX-HD-${Date.now()}`;

    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      transactionNumber: txNum,
      contributionId: paymentData.contributionId,
      contributionTitle: paymentData.contributionTitle || 'Don Direct HEALTHDEV ONG',
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      userEmail: user.email,
      amount: paymentData.amount,
      currency: 'FCFA',
      date: new Date().toLocaleString('fr-FR'),
      status: 'paid',
      paymentMethod: paymentData.paymentMethod,
      payerPhone: paymentData.payerPhone,
      reference: `${(paymentData.paymentMethod || 'KKIAPAY').toUpperCase()}-BJ-${Math.floor(10000000 + Math.random() * 90000000)}`,
      receiptNumber: receiptNum,
      notes: paymentData.notes || 'Paiement en ligne sécurisé'
    };

    setPayments(prev => [newPayment, ...prev]);

    // Update contribution collected amount
    if (paymentData.contributionId) {
      setContributions(prev => prev.map(c => {
        if (c.id === paymentData.contributionId) {
          return {
            ...c,
            collectedAmount: (c.collectedAmount || 0) + paymentData.amount,
            paidCount: (c.paidCount || 0) + 1
          };
        }
        return c;
      }));
    }

    // Add to financial transactions
    const newTx: FinancialTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'income',
      category: paymentData.contributionId ? 'Cotisations Membres' : 'Dons & Soutiens',
      amount: paymentData.amount,
      currency: 'FCFA',
      description: `Paiement ${paymentData.contributionTitle || 'Don'} par ${user.firstName} ${user.lastName} (${paymentData.paymentMethod})`,
      responsible: 'Système Mobile Money Automatisé',
      referenceNumber: newPayment.reference || txNum
    };
    setTransactions(prev => [newTx, ...prev]);

    // Create Notification for admin regarding new donation or contribution payment
    const isDonation = !paymentData.contributionId;
    const paymentNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      targetRole: 'admin',
      title: isDonation 
        ? `Nouveau don reçu • ${paymentData.amount.toLocaleString()} FCFA` 
        : `Nouvelle cotisation encaissée • ${paymentData.amount.toLocaleString()} FCFA`,
      message: `${user.firstName} ${user.lastName} a effectué un versement de ${paymentData.amount.toLocaleString()} FCFA via ${paymentData.paymentMethod} (${paymentData.contributionTitle || 'Don volontaire'}). Réf: ${newPayment.reference || txNum}.`,
      type: isDonation ? 'donation' : 'payment',
      createdAt: new Date().toLocaleString('fr-FR'),
      isRead: false,
      link: 'finances'
    };
    setNotifications(prev => [paymentNotif, ...prev]);

    logAction('Paiement reçu', `Encaissement de ${paymentData.amount.toLocaleString()} FCFA via ${paymentData.paymentMethod}`);

    return { success: true, payment: newPayment };
  };

  // M&E
  const updateIndicatorValue = (indicatorId: string, newValue: number) => {
    setIndicators(prev => prev.map(ind => {
      if (ind.id === indicatorId) {
        const rate = Number(((newValue / ind.targetValue) * 100).toFixed(1));
        const newHistory = [...ind.history, { date: new Date().toISOString().split('T')[0], value: newValue }];
        return {
          ...ind,
          currentValue: newValue,
          achievementRate: rate,
          lastUpdated: new Date().toISOString().split('T')[0],
          history: newHistory
        };
      }
      return ind;
    }));
    logAction('Mise à jour indicateur M&E', `Indicateur ${indicatorId} mis à jour à ${newValue}`);
  };

  const addIndicator = (indData: Omit<MEIndicator, 'id' | 'lastUpdated' | 'achievementRate' | 'history'>) => {
    const rate = Number(((indData.currentValue / indData.targetValue) * 100).toFixed(1));
    const newInd: MEIndicator = {
      ...indData,
      id: `ind-${Date.now()}`,
      achievementRate: rate,
      lastUpdated: new Date().toISOString().split('T')[0],
      history: [{ date: new Date().toISOString().split('T')[0], value: indData.currentValue }]
    };
    setIndicators(prev => [newInd, ...prev]);
    logAction('Création indicateur M&E', `Nouvel indicateur créé : "${newInd.indicatorName}"`);
  };

  const updateIndicator = (id: string, updates: Partial<MEIndicator>) => {
    setIndicators(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
    logAction('Mise à jour indicateur', `Indicateur ${id} modifié`);
  };

  const deleteIndicator = (id: string) => {
    setIndicators(prev => prev.filter(i => i.id !== id));
    logAction('Suppression indicateur', `Indicateur ${id} supprimé`);
  };

  // Opportunities
  const toggleBookmarkOpportunity = (id: string) => {
    setOpportunities(prev => prev.map(opp => opp.id === id ? { ...opp, isBookmarked: !opp.isBookmarked } : opp));
  };

  const addOpportunity = (oppData: Omit<FundingOpportunity, 'id' | 'createdAt'>) => {
    const newOpp: FundingOpportunity = {
      ...oppData,
      id: `opp-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setOpportunities(prev => [newOpp, ...prev]);
    logAction('Publication opportunité de financement', `Opportunité créée : "${newOpp.title}"`);
  };

  const updateOpportunity = (id: string, updates: Partial<FundingOpportunity>) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
    logAction('Mise à jour opportunité', `Opportunité ${id} modifiée`);
  };

  const deleteOpportunity = (id: string) => {
    setOpportunities(prev => prev.filter(o => o.id !== id));
    logAction('Suppression opportunité', `Opportunité ${id} supprimée`);
  };

  // Documents
  const addDocument = (docData: Omit<DocumentItem, 'id' | 'downloadsCount'>) => {
    const newDoc: DocumentItem = {
      ...docData,
      id: `doc-${Date.now()}`,
      downloadsCount: 0
    };
    setDocuments(prev => [newDoc, ...prev]);
    logAction('Dépôt documentaire', `Nouveau document ajouté : "${newDoc.title}"`);
  };

  const updateDocument = (id: string, updates: Partial<DocumentItem>) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
    logAction('Mise à jour document', `Document ${id} modifié`);
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    logAction('Suppression document', `Document ${id} supprimé`);
  };

  const incrementDocumentDownload = (docId: string) => {
    setDocuments(prev => prev.map(d => d.id === docId ? { ...d, downloadsCount: d.downloadsCount + 1 } : d));
  };

  // News
  const addNewsArticle = (artData: Omit<NewsArticle, 'id'>) => {
    const newArt: NewsArticle = {
      ...artData,
      id: `art-${Date.now()}`
    };
    setNews(prev => [newArt, ...prev]);
    logAction('Publication actualité', `Article publié : "${newArt.title}"`);
  };

  const updateNewsArticle = (id: string, updates: Partial<NewsArticle>) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
    logAction('Mise à jour actualité', `Article ${id} modifié`);
  };

  const deleteNewsArticle = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
    logAction('Suppression actualité', `Article ${id} supprimé`);
  };

  // Partners
  const addPartner = (partnerData: Omit<Partner, 'id'>) => {
    const newPartner: Partner = {
      ...partnerData,
      id: `part-${Date.now()}`
    };
    setPartners(prev => [newPartner, ...prev]);
    logAction('Ajout partenaire', `Partenaire créé : ${newPartner.name}`);
  };

  const updatePartner = (id: string, updates: Partial<Partner>) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    logAction('Mise à jour partenaire', `Partenaire ${id} modifié`);
  };

  const deletePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
    logAction('Suppression partenaire', `Partenaire ${id} supprimé`);
  };

  // Zones
  const addZone = (zoneData: Omit<InterventionZone, 'id'>) => {
    const newZone: InterventionZone = {
      ...zoneData,
      id: `zone-${Date.now()}`
    };
    setZones(prev => [newZone, ...prev]);
    logAction('Ajout zone d\'intervention', `Zone ajoutée : ${newZone.commune}`);
  };

  const updateZone = (id: string, updates: Partial<InterventionZone>) => {
    setZones(prev => prev.map(z => z.id === id ? { ...z, ...updates } : z));
    logAction('Mise à jour zone', `Zone ${id} modifiée`);
  };

  const deleteZone = (id: string) => {
    setZones(prev => prev.filter(z => z.id !== id));
    logAction('Suppression zone', `Zone ${id} supprimée`);
  };

  // Transactions
  const addTransaction = (txData: Omit<FinancialTransaction, 'id'>) => {
    const newTx: FinancialTransaction = {
      ...txData,
      id: `tx-${Date.now()}`
    };
    setTransactions(prev => [newTx, ...prev]);
    logAction('Transaction financière', `${txData.type === 'income' ? 'Recette' : 'Dépense'} de ${txData.amount} FCFA enregistrée`);
  };

  const updateTransaction = (id: string, updates: Partial<FinancialTransaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    logAction('Mise à jour transaction', `Transaction ${id} modifiée`);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    logAction('Suppression transaction', `Transaction ${id} supprimée`);
  };

  // Notifications
  const addNotification = (notifData: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotif: NotificationItem = {
      ...notifData,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toLocaleString('fr-FR'),
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Chat
  const sendMessage = (content: string, channelId = 'general', recipientId?: string) => {
    if (!content.trim() || !currentUser) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: `${currentUser.firstName} ${currentUser.lastName}`,
      senderRole: currentUser.role,
      senderAvatar: currentUser.avatarUrl,
      channelId,
      recipientId,
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
  };

  const resetAllDataToDefaults = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setProjects(INITIAL_PROJECTS);
    setActivities(INITIAL_ACTIVITIES);
    setAttendances(INITIAL_ATTENDANCES);
    setContributions(INITIAL_CONTRIBUTIONS);
    setPayments(INITIAL_PAYMENTS);
    setIndicators(INITIAL_INDICATORS);
    setOpportunities(INITIAL_OPPORTUNITIES);
    setDocuments(INITIAL_DOCUMENTS);
    setNews(INITIAL_NEWS);
    setZones(INITIAL_ZONES);
    setPartners(INITIAL_PARTNERS);
    setTransactions(INITIAL_TRANSACTIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setMessages(INITIAL_MESSAGES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setCurrentUser(INITIAL_USERS[0]);
    setCurrentView('home');
    alert('Données réinitialisées aux valeurs initiales par défaut.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUserRole,
        login,
        logout,
        registerVolunteer,
        users,
        projects,
        activities,
        attendances,
        contributions,
        payments,
        indicators,
        meIndicators: indicators,
        opportunities,
        documents,
        resources: documents,
        news,
        zones,
        partners,
        transactions,
        notifications,
        messages,
        auditLogs,
        currentView,
        setCurrentView,
        activeDashboardTab,
        setActiveDashboardTab,
        selectedProjectId,
        setSelectedProjectId,
        selectedActivityId,
        setSelectedActivityId,
        selectedArticleId,
        setSelectedArticleId,
        addProject,
        updateProject,
        deleteProject,
        addActivity,
        updateActivity,
        deleteActivity,
        registerToActivity,
        registerForActivity,
        unregisterFromActivity,
        cancelActivityRegistration,
        updateParticipantStatus,
        updateAttendance,
        addUser,
        updateUser,
        deleteUser,
        updateUserStatus,
        updateVolunteerStatus: updateUserStatus,
        updateUserRole,
        updateUserSections,
        updateProfile,
        addContribution,
        updateContribution,
        deleteContribution,
        processPayment,
        updateIndicatorValue,
        addIndicator,
        updateIndicator,
        deleteIndicator,
        toggleBookmarkOpportunity,
        addOpportunity,
        updateOpportunity,
        deleteOpportunity,
        addDocument,
        updateDocument,
        deleteDocument,
        incrementDocumentDownload,
        addNewsArticle,
        updateNewsArticle,
        deleteNewsArticle,
        addPartner,
        updatePartner,
        deletePartner,
        addZone,
        updateZone,
        deleteZone,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addNotification,
        deleteNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        sendMessage,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        isMaintenanceMode,
        setMaintenanceMode,
        searchQuery,
        setSearchQuery,
        resetAllDataToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
