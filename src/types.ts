export type UserRole = 
  | 'super_admin'
  | 'admin'
  | 'secretary'
  | 'program_manager'
  | 'financial_manager'
  | 'comm_manager'
  | 'me_manager'
  | 'partner'
  | 'volunteer';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  gender: 'female' | 'male' | 'other' | 'F' | 'M' | 'Autre';
  birthDate?: string;
  phone: string;
  city: string;
  department: string;
  address?: string;
  profession?: string;
  educationLevel?: string;
  skills: string[];
  interests: string[];
  availability?: string;
  motivation?: string;
  avatarUrl?: string;
  matricule?: string; // Matricule officiel d'accréditation (ex: HD-BEN-0001)
  poste?: string; // Poste occupé au sein de HEALTHDEV ONG (ex: Présidente CA, Directrice Exécutive, Bénévole Terrain)
  bloodGroup?: string;
  emergencyContact?: string;
  status: 'pending' | 'active' | 'suspended' | 'inactive';
  partnerOrganization?: string;
  authorizedProjectIds?: string[];
  allowedSections?: string[]; // Granular ERP dashboard sections: 'overview', 'projects', 'activities', 'volunteers', 'finances', 'me', 'news', 'documents', 'partners', 'zones'
  createdAt: string;
  volunteerHours?: number;
  participationsCount?: number;
}

export type User = UserProfile;

export type ProjectStatus = 
  | 'planned'
  | 'preparation'
  | 'in_progress'
  | 'paused'
  | 'completed'
  | 'cancelled';

export interface Project {
  id: string;
  title: string;
  code: string;
  slug: string;
  imageUrl: string;
  description: string;
  objectives: string[];
  domain: string;
  location: string;
  commune: string;
  department: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  budget: number;
  currency: string;
  donorOrPartner: string;
  partnerId?: string;
  leadResponsible: string;
  leadPhone?: string;
  teamMembers: string[];
  targetBeneficiaries: number;
  actualBeneficiaries: number;
  womenPercentage: number;
  youthPercentage: number;
  progressPercentage: number;
  documents: { id: string; name: string; url: string; date: string }[];
  photos: string[];
  keyResults: string[];
  createdAt: string;
}

export type ActivityStatus = 
  | 'upcoming'
  | 'in_progress'
  | 'completed'
  | 'postponed'
  | 'cancelled';

export interface ActivityRegisteredVolunteer {
  userId: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  registeredAt: string;
  status?: 'declared' | 'confirmed' | 'attended' | 'cancelled';
  notes?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName?: string;
  objectives: string[];
  date: string;
  endDate?: string;
  time: string;
  location: string;
  commune: string;
  department: string;
  responsible: string;
  teamMembers: string[];
  assignedVolunteers?: string[];
  registeredVolunteers?: ActivityRegisteredVolunteer[];
  requiredVolunteers?: number;
  expectedResults?: string;
  budgetPlanned: number;
  budgetUsed: number;
  status: ActivityStatus;
  progressPercent: number;
  targetParticipants: number;
  actualParticipants: number;
  photos: string[];
  documents: { id: string; name: string; url: string }[];
  activityReport?: string;
  createdAt: string;
}

export interface ActivityAttendance {
  id: string;
  activityId: string;
  activityTitle?: string;
  volunteerId: string;
  volunteerName: string;
  volunteerEmail: string;
  volunteerPhone?: string;
  volunteerRole?: string;
  status: 'registered' | 'confirmed' | 'attended' | 'cancelled';
  registeredAt: string;
  hoursCompleted: number;
  notes?: string;
}

export interface Contribution {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  createdAt: string;
  deadline: string;
  targetYear: number;
  targetAudience: string;
  status: 'active' | 'closed';
  instructions: string;
  frequency?: string;
  collectedAmount?: number;
  paidCount?: number;
  totalTargetMembers?: number;
}

export type PaymentMethod = 'mtn_momo' | 'moov_money' | 'card' | 'bank_transfer' | 'cash';
export type PaymentStatus = 'pending' | 'paid' | 'completed' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  transactionNumber: string;
  contributionId?: string;
  contributionTitle?: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  currency: string;
  date: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  payerPhone?: string;
  reference?: string;
  receiptNumber: string;
  notes?: string;
}

export interface MEIndicator {
  id: string;
  code?: string;
  title?: string;
  domain?: string;
  projectId: string;
  projectName?: string;
  objective: string;
  expectedResult: string;
  indicatorName: string;
  baselineValue: number;
  targetValue: number;
  currentValue: number;
  unit: string;
  achievementRate: number;
  verificationSource: string;
  responsible: string;
  status?: 'in_progress' | 'achieved' | 'exceeded';
  collectionFrequency: 'Mensuelle' | 'Trimestrielle' | 'Semestrielle' | 'Annuelle';
  lastUpdated: string;
  history: { date: string; value: number }[];
}

export interface FundingOpportunity {
  id: string;
  title: string;
  donor?: string;
  organization: string;
  type?: string;
  countries: string[];
  sectors: string[];
  amount: string;
  amountValue?: number;
  deadline: string;
  description: string;
  domain?: string;
  eligibilityRegion?: string;
  criteria?: string[];
  eligibility: string[];
  officialLink: string;
  url?: string;
  documents?: { name: string; url: string }[];
  status: 'open' | 'closing_soon' | 'closed';
  createdAt: string;
  isBookmarked?: boolean;
}

export type DocumentCategory = 
  | 'Rapports annuels'
  | 'Rapports financiers'
  | 'Rapports d\'activités'
  | 'Documents institutionnels'
  | 'Politiques et chartes'
  | 'Études et recherches'
  | 'Guides et manuels'
  | 'Formulaires & Outils'
  | string;

export type DocumentAccessLevel = 'public' | 'members' | 'admin' | 'partners';

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  category: DocumentCategory;
  author: string;
  date: string;
  uploadDate?: string;
  fileUrl: string;
  fileSize: string;
  fileType: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'zip' | 'image' | string;
  fileExtension?: string;
  accessLevel: DocumentAccessLevel;
  downloadsCount: number;
}

export type DocumentResource = DocumentItem;

export interface Partner {
  id: string;
  name: string;
  type: string;
  country: string;
  description: string;
  focusDomains: string[];
  sinceYear: number;
  website?: string;
  logoUrl: string;
  projectsExecuted?: string[];
  activitiesExecuted?: string[];
  fundingScope?: string;
  interventionZones?: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  summary?: string;
  content: string;
  category: string;
  imageUrl: string;
  author: string;
  authorRole?: string;
  date: string;
  tags: string[];
  isFeatured?: boolean;
  isBannerAnnouncement?: boolean;
  isPublished?: boolean;
  readTime?: string;
  viewsCount?: number;
}

export interface InterventionZone {
  id: string;
  department: string;
  commune: string;
  locationName: string;
  coordinates: [number, number];
  activeProjectsCount: number;
  completedActivitiesCount: number;
  beneficiariesReached: number;
  leadContact: string;
  beneficiariesCount?: number;
  focalPointName?: string;
  focalPointPhone?: string;
  arrondissements?: string[];
}

export interface FinancialTransaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  projectId?: string;
  projectName?: string;
  amount: number;
  currency: string;
  description: string;
  responsible: string;
  referenceNumber: string;
  proofDocument?: string;
}

export interface NotificationItem {
  id: string;
  userId?: string;
  targetRole?: 'admin' | 'volunteer' | 'all';
  title: string;
  message: string;
  type: 'activity' | 'payment' | 'donation' | 'opportunity' | 'system' | 'volunteer' | 'project';
  createdAt: string;
  isRead: boolean;
  link?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  senderAvatar?: string;
  recipientId?: string;
  channelId?: string;
  content: string;
  timestamp: string;
  attachments?: { name: string; url: string }[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  action: string;
  details: string;
  ip: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  targetAudience: 'public' | 'volunteers' | 'all';
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
}

export type VbgUrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

export type VbgStatus = 'submitted' | 'under_review' | 'assigned' | 'in_progress' | 'resolved' | 'closed';

export interface VbgReportNote {
  id: string;
  author: string;
  role: string;
  date: string;
  text: string;
  isPublicForReporter: boolean;
}

export interface VbgReport {
  id: string;
  trackingCode: string; // ex: VBG-2026-9812
  isAnonymous: boolean;
  reporterName?: string;
  reporterPhone?: string;
  reporterEmail?: string;
  reporterRelation: 'victim' | 'witness' | 'relative' | 'health_worker' | 'other';
  victimAgeGroup?: 'minor' | 'young_adult' | 'adult' | 'elderly';
  victimGender: 'F' | 'M' | 'Autre';
  vbgType: 'physical' | 'sexual' | 'psychological' | 'economic' | 'forced_marriage' | 'mutilation' | 'harassment' | 'cyber_harassment' | 'other';
  vbgTypeLabel: string;
  urgencyLevel: VbgUrgencyLevel;
  department: string;
  commune: string;
  locationDetails?: string;
  incidentDate: string;
  description: string;
  perpetratorKnown?: boolean;
  perpetratorRelation?: string;
  supportRequested: string[]; // ex: ['Assistance Médicale', 'Prise en charge Psychologique', 'Accompagnement Juridique', 'Protection & Hébergement']
  status: VbgStatus;
  assignedAgent?: string;
  notes?: VbgReportNote[];
  createdAt: string;
  updatedAt: string;
}

