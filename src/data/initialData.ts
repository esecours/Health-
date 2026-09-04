import {
  UserProfile,
  Project,
  Activity,
  Contribution,
  Payment,
  MEIndicator,
  FundingOpportunity,
  DocumentItem,
  NewsArticle,
  InterventionZone,
  FinancialTransaction,
  NotificationItem,
  ChatMessage,
  AuditLog,
  ActivityAttendance,
  Partner,
  Announcement,
  VbgReport
} from '../types';


export const NGO_INFO = {
  name: 'HEALTHDEV ONG',
  fullName: 'Health and Development (HEALTHDEV) ONG',
  logoUrl: '/logo1.jpg',
  logo2Url: '/logo2.jpg',
  tagline: 'Organisation féministe de jeunes activistes engagés pour l’épanouissement, le bien-être social et la défense des droits humains.',
  heroSlogan: 'Organisation féministe de jeunes engagée pour la santé, les droits humains, l’égalité des sexes, l’autonomisation des femmes et le bien-être durable des communautés en République du Bénin.',
  
  // Structure Presentation
  structurePresentation: 'Health and Development (HEATHDEV) ONG est une organisation féministe de jeunes activistes engagés pour l’épanouissement, le bien-être social et la défense des droits humains. Ils luttent pour la promotion du genre et l’égalité des sexes, de la paix et de la sécurité, l’éradication des violences faites aux filles et aux femmes, contre la discrimination sous toutes ses formes. Elle base ses actions sur l’assouplissement progressive des normes patriarcales pour un monde plus justes. Ses actions concourent à l’atteinte des Objectifs de Développement Durable. HEALTHDEV ONG est une organisation légale enregistrée sous le n° 2025-416/MISP/DC/SGM/DAIC/SACC/SA du 22 Mai 2025, déclarée au Journal Officiel n° 14, Page 1062 du 15 Juillet 2025 en République du Bénin, IFU n° 6202535950485. La conformité aux nouvelles normes est déjà faite et en attente d’approbation.',

  // Legal & Official Registration
  registrationNumber: '2025-416/MISP/DC/SGM/DAIC/SACC/SA du 22 Mai 2025',
  journalOfficiel: 'Journal Officiel n° 14, Page 1062 du 15 Juillet 2025 en République du Bénin',
  ifu: '6202535950485',
  complianceStatus: 'La conformité aux nouvelles normes est déjà faite et en attente d’approbation',
  creationYear: 2021,
  startYear: 2024,
  
  // Contact & Location
  email: 'healthdev.ong@gmail.com',
  phone: '(+229) 0192431595 / 0161557695',
  phoneClean: '+2290192431595',
  secondaryPhone: '+2290161557695',
  address: 'Bawé, 3e Arrondissement de Parakou, Département du Borgou, République du Bénin',
  city: 'Parakou',
  department: 'Borgou',
  country: 'Bénin',
  
  // Leadership & Governance
  president: 'AHO Régina',
  presidentRole: 'Présidente du Conseil d’Administration',
  presidentContact: 'ahoregina12@gmail.com +2290161557695',
  
  socialLinks: {
    facebook: 'https://facebook.com/HealthDev',
    twitter: 'https://twitter.com/healthdevong',
    linkedin: 'https://linkedin.com/company/healthdev-ong',
    instagram: 'https://instagram.com/healthdev_ong',
    whatsapp: 'https://wa.me/2290192431595'
  },
  
  // Founding History & Genesis
  genesisHistory: 'Ayant milité entant que pairs éducateurs au sein du Mouvement d’Action des Jeunes de l’Association Béninoise pour la Promotion de la Famille (MAJ/ABPF affilié à IPPF) certains membres après l’âge requis, ont exprimé le désir de continuer leur militantisme en mettant leurs compétences et connaissances au service des communautés à la base. C’est ainsi qu’a germé en 2021 l’idée de créer une organisation plus ouverte sur les préoccupations sociales d’où le nom de « Santé et Développement » en anglais (HEALTH and DEVELOPMENT). Les initiatives entreprises sont inspirées des problèmes des communautés à la base précisément les jeunes filles, garçons et jeunes femmes afin de répondre aux défis d’insuffisance d’informations fiables, de connaissances sur la sexualité, les droits sexuels dans le but de réaliser leur plein potentiel. De 2021 à 2023, l’idée a été murie, les bases créées, les objectifs, mission et vision clarifiés. Les activités ont réellement commencé en 2024 et continuent jusqu’à ce jour.',

  // Vision, Mission & Objectives
  vision: 'Un Bénin où les adolescents.es, les jeunes et les femmes jouissent de leurs droits en toute égalité, dans un environnement sain, de paix et de justice sociale d’ici 2030',
  
  mission: 'Favoriser l’accès des jeunes et des femmes aux droits sexuels et reproductifs et à des soins de qualité sans discrimination aucune, impulser le leadership pour le renforcement de la lutte contre les violences basées sur le genre et l’autonomisation des femmes, et contribuer à un environnement de paix et de sécurité pour tous dans un monde plus vert et durable.',

  generalObjectives: [
    'Favoriser l’accès des jeunes et des femmes aux droits sexuels et reproductifs et à des soins de qualité sans discrimination aucune.',
    'Impulser le leadership pour le renforcement de la lutte contre les violences basées sur le genre et l’autonomisation des femmes',
    'Contribuer à un environnement de paix et de sécurité pour tous dans un monde plus vert et durable.'
  ],

  // Official Strategic Axes
  strategicAxes: [
    {
      id: 'sdsr',
      title: 'Santé et Droits Sexuels et Reproductifs',
      description: 'Favoriser l’accès des jeunes et des femmes aux droits sexuels et reproductifs et à des soins de qualité sans discrimination aucune.',
      target: 'Adolescents et jeunes, filles, garçons et jeunes femmes',
      icon: 'HeartPulse'
    },
    {
      id: 'vbg',
      title: 'Genre, Lutte contre les Violences basées sur le Genre',
      description: 'Promotion du genre et de l’égalité des sexes, éradication des violences faites aux filles et aux femmes, et lutte contre la discrimination sous toutes ses formes.',
      target: 'Filles, femmes, adolescents et collectivités',
      icon: 'ShieldAlert'
    },
    {
      id: 'autonomisation',
      title: 'Autonomisation de la femme',
      description: 'Impulser le leadership féminin, renforcer la prise de parole et l’indépendance sociale et économique des jeunes filles et femmes.',
      target: 'Jeunes filles et femmes (rurales, vulnérables)',
      icon: 'Sparkles'
    },
    {
      id: 'paix-environnement',
      title: 'Environnement, Paix et Cohésion sociale',
      description: 'Contribuer à un environnement de paix et de sécurité pour tous dans un monde plus vert et durable.',
      target: 'Communautés à la base, leaders religieux et communautaires',
      icon: 'Leaf'
    }
  ],

  // Target Groups (Cibles)
  targetGroups: [
    'Les adolescents et jeunes (filles et garçons scolarisées, déscolarisés, non scolarisés)',
    'Les femmes (rurales, vulnérables)',
    'Les personnes vivant avec un handicap',
    'Les leaders religieux et communautaires'
  ],

  // Affiliation Networks
  affiliationNetworks: [
    'Le Réseau des Féministes du Bénin',
    'Le Mouvement ODAS'
  ],

  // Values
  values: [
    { name: 'Égalité des sexes & Féminisme', desc: 'Assouplissement progressif des normes patriarcales et défense inconditionnelle des droits fondamentaux des femmes et des filles.' },
    { name: 'Inclusion & Non-discrimination', desc: 'Accueil et soutien bienveillant sans distinction de genre, de handicap, d\'origine ou de statut social.' },
    { name: 'Redevabilité & Transparence', desc: 'Gestion intègre, éthique et rigoureuse des ressources confiées par les membres, bailleurs et partenaires.' },
    { name: 'Leadership des Jeunes', desc: 'Valorisation du potentiel transformateur et innovant des jeunes activistes comme moteurs essentiels du changement.' },
    { name: 'Solidarité & Sororité', desc: 'Espaces sûrs de libération de la parole, entraide communautaire et alliance avec les mouvements féministes.' },
    { name: 'Paix & Justice Sociale', desc: 'Création d\'un environnement pacifique, équitable et sécurisé propice au bien-être durable de toutes et tous.' }
  ],

  // 9 Pillars for UI navigation / views
  domains: [
    { id: '1', title: 'Santé & Droits Sexuels et Reproductifs (SDSR)', icon: 'HeartPulse', desc: 'Éducation à la sexualité complète (PESCA), prévention des IST/VIH, accès à la contraception et hygiène menstruelle.', target: 'Apprenti.e.s, élèves et jeunes' },
    { id: '2', title: 'Genre et Égalité des Sexes', icon: 'Scale', desc: 'Plaidoyer féministe, déconstruction des stéréotypes patriarcaux et promotion de la parité décisionnelle.', target: 'Organisations de jeunesse & société civile' },
    { id: '3', title: 'Lutte contre les VBG & Espaces Sûrs', icon: 'ShieldAlert', desc: 'Cercles de parole (Projet Balayeuses et Fières), écoute active, référencement et plaidoyer auprès des mairies.', target: 'Survivantes de VBG, femmes travailleuses' },
    { id: '4', title: 'Autonomisation des Femmes & Filles', icon: 'Sparkles', desc: 'Programme « Capaciter pour Autonomiser », formation à l\'art oratoire, leadership et compétences professionnelles.', target: 'Jeunes filles à Nikki, Parakou et Calavi' },
    { id: '5', title: 'SSR & Secteur des Transports', icon: 'Users', desc: 'Projet UNFPA/OCAL pour un regard féminin sur les métiers du transport, la prévention des VBG et de la SSR.', target: 'Jeunes filles et acteurs des corridors de transport' },
    { id: '6', title: 'Avortement Sécurisé & Droits Fondamentaux', icon: 'Award', desc: 'Vulgarisation de la loi SR au Bénin, déstigmatisation et campagne nationale #WakeUpforWomanRight (Global Fund for Women).', target: 'Professionnels, activistes et femmes' },
    { id: '7', title: 'Environnement & Développement Vert', icon: 'Leaf', desc: 'Salubrité urbaine avec les balayeuses de la SGDS, justice climatique et sensibilisation à l\'éco-citoyenneté.', target: 'Villes de Parakou, Calavi et Cotonou' },
    { id: '8', title: 'Paix, Sécurité & Cohésion Sociale', icon: 'Handshake', desc: 'Médiation communautaire, prévention des conflits et inclusion des dignitaires coutumiers dans le Borgou et l\'Alibori.', target: 'Communes septentrionales du Bénin' },
    { id: '9', title: 'Gouvernance & Renforcement Institutionnel', icon: 'Home', desc: 'Plan stratégique, politiques de sauvegarde éthique, formation continue des membres et partenariats durables.', target: 'Membres bénévoles et instances dirigeantes' }
  ],

  // Diagnostic & Capacity Needs
  diagnostic: {
    level: 'Niveau 2 sur 5 (Développement Organisationnel)',
    fullText: 'Sur une échelle de 1 à 5 notre organisation se situerait au niveau 2 en matière de développement organisationnel. Nous sommes enregistrés et avons un compte bancaire par lequel transite des fonds ; nous avons un petit local servant de bureau, dans lequel nous tenons nos réunions et formations à Parakou, la gouvernance est composée d’un Conseil d’Administration et une commission de Contrôle Interne. La Direction exécutive est partiellement disponible. Pour le moment, seuls le département programmes est entièrement fonctionnel au regard des besoins en ressources humaines. Il reste encore de compétences à mobiliser pour rendre opérationnel le département exécutif et celui des finances et de la comptabilité. Nous disposons actuellement de huit membres qui travaillent de manière bénévole dans l’équipe exécutive. Il est élaboré depuis deux ans des rapports annuels et financiers mais ces rapports n’ont jamais été audités. Nos activités sont pour la majorité réalisées grâce aux cotisations annuelles et souscriptions des membres. Les projets exécutés sur financement sont des projets ponctuels à courte durée et sans un fonds de fonctionnement.',
    impactGoalText: 'Obtenir ce fonds de développement organisationnel ferait évoluer notre organisation d’un stade de mise en œuvre de projets vers une structure plus solide, plus crédible et plus durable, capable de mobiliser davantage de ressources et d\'obtenir des résultats à long terme.',
    governance: 'Conseil d’Administration et Commission de Contrôle Interne. Direction exécutive partiellement disponible (département programmes entièrement fonctionnel avec 8 membres bénévoles). Compétences à mobiliser pour l’exécutif et finances/comptabilité. Rapports annuels et financiers élaborés depuis 2 ans (non audités).',
    funding: 'Activités réalisées pour la majorité grâce aux cotisations annuelles et souscriptions des membres. Projets financés ponctuels à courte durée sans fonds de fonctionnement.',
    infrastructure: 'Petit local servant de bureau pour réunions et formations à Parakou. Compte bancaire actif.',
    needs: [
      {
        category: 'Gouvernance',
        title: 'Renforcement de la gouvernance',
        description: 'Élaboration du plan stratégique quinquennal, renforcement du fonctionnement du Conseil d\'administration et de la Commission de Contrôle Interne et la mise en place de politiques de gouvernance et de redevabilité.'
      },
      {
        category: 'Ressources Humaines',
        title: 'Renforcement des capacités du personnel et des bénévoles',
        description: 'Formations en gestion de projet, suivi-évaluation, mobilisation de ressources, communication, leadership, gestion financière, développement des compétences techniques en lien avec les domaines d\'intervention de l\'organisation.'
      },
      {
        category: 'Systèmes de Gestion',
        title: 'Renforcement des systèmes de gestion',
        description: 'Élaboration de manuels de procédures administratives, financières et comptables, la mise en place de systèmes de suivi-évaluation et de gestion des données, l’acquisition de logiciels de comptabilité, de gestion de projets ou de gestion documentaire et la mise en place de politiques de gestion des risques.'
      },
      {
        category: 'Développement Institutionnel',
        title: 'Développement institutionnel',
        description: 'Élaboration d\'une stratégie de mobilisation des ressources, développement d\'une stratégie de communication et de visibilité et renforcement de l\'identité visuelle.'
      },
      {
        category: 'Conformité Institutionnelle',
        title: 'Conformité et politiques institutionnelles',
        description: 'Mise à jour de politiques de protection de l\'enfance, de prévention du harcèlement, de sauvegarde (Safeguarding), de protection des données, de lutte contre la fraude et la corruption et de gestion des conflits d\'intérêts.'
      },
      {
        category: 'Équipements & Infrastructures',
        title: 'Équipements et infrastructures',
        description: 'En matière d’équipements, les besoins sont : l\'achat de matériel informatique, du mobilier de bureau, des équipements de visioconférence, d’élargissement et d’aménagement des locaux du bureau.'
      }
    ]
  }
};

export const INITIAL_USERS: UserProfile[] = [
  // ================= CONSEIL D'ADMINISTRATION (CA) =================
  {
    id: 'usr-ca-1',
    matricule: '01-21MF',
    poste: 'Présidente du Conseil d\'Administration (Présidente CA)',
    email: 'ahoregina12@gmail.com',
    firstName: 'Régina',
    lastName: 'AHO',
    role: 'super_admin',
    gender: 'F',
    birthDate: '1995-04-12',
    phone: '+229 01 61 55 76 95',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Bawé, 3e Arrondissement, Parakou',
    profession: 'Présidente du Conseil d\'Administration & Activiste Féministe',
    educationLevel: 'Master en Santé Publique & Gestion de Projets',
    skills: ['Gouvernance ONG', 'Plaidoyer Féministe', 'Santé Sexuelle & Reproductive (SDSR)', 'Coordination Institutionnelle'],
    interests: ['Droits des femmes', 'Leadership des jeunes', 'Égalité de genre', 'Autonomisation'],
    availability: 'Temps plein',
    motivation: 'Bâtir un Bénin où les adolescentes, les jeunes et les femmes jouissent pleinement de leurs droits dans la paix et la justice sociale.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2021-03-10',
    volunteerHours: 540,
    participationsCount: 42
  },
  {
    id: 'usr-ca-2',
    matricule: '13-241MA',
    poste: 'Trésorier Général (TG/CA)',
    email: 'rodrigue.hounkpatin@healthdev.ong',
    firstName: 'C. Rodrigue',
    lastName: 'HOUNKPATIN',
    role: 'financial_manager',
    gender: 'M',
    birthDate: '1992-06-18',
    phone: '+229 01 97 00 75 52',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Trésorier Général & Gestionnaire Financier',
    educationLevel: 'Master en Finance & Comptabilité',
    skills: ['Gestion budgétaire', 'Audit financier', 'Trésorerie', 'Supervision des cotisations'],
    interests: ['Transparence financière', 'Gestion de projets', 'Économie solidaire'],
    availability: 'Temps plein',
    motivation: 'Garantir une gestion financière irréprochable et transparente au service des actions de l\'ONG.',
    avatarUrl: '/default_avatar_m.jpg',
    status: 'active',
    createdAt: '2021-03-15',
    volunteerHours: 480,
    participationsCount: 38
  },
  {
    id: 'usr-ca-3',
    matricule: '10-24MA',
    poste: 'Secrétaire Générale (SG/CA)',
    email: 'yasmine.bahoure@healthdev.ong',
    firstName: 'Yasmine',
    lastName: 'BAH-OURE',
    role: 'secretary',
    gender: 'F',
    birthDate: '1996-09-24',
    phone: '+229 01 53 96 85 58',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Secrétaire Générale & Juriste',
    educationLevel: 'Master en Administration & Droit Public',
    skills: ['Gestion administrative', 'Rédaction de procès-verbaux', 'Coordination des instances', 'Archivage'],
    interests: ['Administration des ONG', 'Gouvernance associative', 'Droits des jeunes'],
    availability: 'Temps plein',
    motivation: 'Assurer le bon fonctionnement statutaire et administratif des instances de décision.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2021-04-10',
    volunteerHours: 420,
    participationsCount: 35
  },
  {
    id: 'usr-ca-4',
    matricule: '14-241MA',
    poste: 'Conseillère à l’Orientation Stratégique (COS/CA)',
    email: 'souliya.mevotairou@healthdev.ong',
    firstName: 'Souliya',
    lastName: 'MEVO TAIROU',
    role: 'admin',
    gender: 'F',
    birthDate: '1994-11-12',
    phone: '+229 01 97 72 33 44',
    city: 'Abomey-Calavi',
    department: 'Atlantique',
    address: 'Abomey-Calavi',
    profession: 'Conseillère Stratégique & Experte Développement',
    educationLevel: 'Master en Planification Stratégique & Développement Communautaire',
    skills: ['Orientation stratégique', 'Plaidoyer institutionnel', 'Développement organisationnel', 'Relations bailleurs'],
    interests: ['Politiques publiques de santé', 'Leadership féminin', 'Égalité de genre'],
    availability: 'Temps plein',
    motivation: 'Guider les orientations à long terme pour pérenniser l\'impact social de HEALTHDEV ONG.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2021-04-15',
    volunteerHours: 390,
    participationsCount: 31
  },
  {
    id: 'usr-ca-5',
    matricule: '15-241MA',
    poste: 'Conseillère Juridique (CJ/CA)',
    email: 'ruth.dohou@healthdev.ong',
    firstName: 'Ruth',
    lastName: 'DOHOU',
    role: 'admin',
    gender: 'F',
    birthDate: '1995-02-28',
    phone: '+229 01 99 54 18 75',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Conseillère Juridique & Juriste Spécialisée',
    educationLevel: 'Master en Droit des Affaires & Contentieux',
    skills: ['Veille juridique', 'Conformité statutaire', 'Assistance juridique VBG', 'Contrats et partenariats'],
    interests: ['Justice sociale', 'Droits des femmes', 'Droit associatif'],
    availability: 'Temps plein',
    motivation: 'Protéger l\'organisation sur le plan juridique et défendre les droits des bénéficiaires.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2021-05-02',
    volunteerHours: 360,
    participationsCount: 29
  },

  // ================= COMMISSION DE CONTRÔLE INTERNE (CCI) =================
  {
    id: 'usr-cci-6',
    matricule: '05-22MA',
    poste: 'Commissaire aux Comptes (CC/CCI)',
    email: 'moise.ahissou@healthdev.ong',
    firstName: 'Moïse',
    lastName: 'AHISSOU',
    role: 'admin',
    gender: 'M',
    birthDate: '1993-08-14',
    phone: '+229 01 66 17 93 25',
    city: 'Abomey-Calavi',
    department: 'Atlantique',
    address: 'Abomey-Calavi',
    profession: 'Commissaire aux Comptes & Auditeur Interne',
    educationLevel: 'Master en Audit & Contrôle de Gestion',
    skills: ['Audit comptable', 'Contrôle interne', 'Conformité des procédures', 'Rapports de contrôle'],
    interests: ['Redevabilité', 'Éthique financière', 'Gouvernance'],
    availability: 'Temps plein',
    motivation: 'Veiller à la conformité rigoureuse de la gestion des ressources de l\'organisation.',
    avatarUrl: '/default_avatar_m.jpg',
    status: 'active',
    createdAt: '2022-01-10',
    volunteerHours: 310,
    participationsCount: 25
  },
  {
    id: 'usr-cci-7',
    matricule: '16-241MA',
    poste: 'Rapporteuse de la Commission de Contrôle Interne',
    email: 'candide.houngbedji@healthdev.ong',
    firstName: 'S. Candide',
    lastName: 'HOUNGBEDJI',
    role: 'admin',
    gender: 'F',
    birthDate: '1996-03-19',
    phone: '+229 01 66 73 51 68',
    city: 'Cotonou',
    department: 'Littoral',
    address: 'Cotonou',
    profession: 'Rapporteuse CCI & Spécialiste Contrôle Qualité',
    educationLevel: 'Master en Sciences de Gestion',
    skills: ['Rapports d\'audit', 'Évaluation de conformité', 'Suivi des recommandations', 'Documentation'],
    interests: ['Transparence', 'Bonnes pratiques de gouvernance', 'Droits humains'],
    availability: 'Temps plein',
    motivation: 'Contribuer à la transparence totale des opérations et des comptes.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2022-02-15',
    volunteerHours: 290,
    participationsCount: 23
  },
  {
    id: 'usr-cci-8',
    matricule: '15-24MA',
    poste: 'Membre de la Commission de Contrôle Interne (Membre/CCI)',
    email: 'hermione.attolou@healthdev.ong',
    firstName: 'Hermione S.',
    lastName: 'ATTOLOU',
    role: 'admin',
    gender: 'F',
    birthDate: '1997-07-05',
    phone: '+229 01 95 80 77 81',
    city: 'Abomey-Calavi',
    department: 'Atlantique',
    address: 'Abomey-Calavi',
    profession: 'Membre CCI & Analyste de Gestion',
    educationLevel: 'Licence en Comptabilité & Gestion',
    skills: ['Vérification des pièces comptables', 'Inspection terrain', 'Contrôle des stocks'],
    interests: ['Rigueur administrative', 'Engagement citoyen', 'Égalité de genre'],
    availability: 'Temps plein',
    motivation: 'Participer activement à la sauvegarde de l\'intégrité de notre ONG.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2022-03-20',
    volunteerHours: 270,
    participationsCount: 21
  },

  // ================= LE PERSONNEL (DIRECTION & STAFF TECHNIQUE) =================
  {
    id: 'usr-staff-1',
    matricule: '02-21MF',
    poste: 'Directeur Exécutif (DE)',
    email: 'rolland.gnangni@healthdev.ong',
    firstName: 'Rolland',
    lastName: 'GNANGNI',
    role: 'super_admin',
    gender: 'M',
    birthDate: '1993-10-12',
    phone: '+229 01 96 65 65 31',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Directeur Exécutif & Spécialiste Santé Publique',
    educationLevel: 'Master en Management des Organisations & Santé Publique',
    skills: ['Direction exécutive', 'Gestion de programmes', 'Relations bailleurs & PTF', 'Management d\'équipe'],
    interests: ['Santé communautaire', 'Droits des jeunes', 'Innovation sociale', 'ODD'],
    availability: 'Temps plein',
    motivation: 'Diriger l\'exécution opérationnelle des programmes pour maximiser l\'impact au bénéfice des communautés.',
    avatarUrl: '/default_avatar_m.jpg',
    status: 'active',
    createdAt: '2021-03-12',
    volunteerHours: 520,
    participationsCount: 45
  },
  {
    id: 'usr-staff-2',
    matricule: '07-23MA',
    poste: 'Coordonnatrice des Programmes (CoP)',
    email: 'neonelle.houngnissi@healthdev.ong',
    firstName: 'Néonelle P.',
    lastName: 'HOUNGNISSI',
    role: 'program_manager',
    gender: 'F',
    birthDate: '1995-12-08',
    phone: '+229 01 96 60 04 21',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Coordonnatrice des Programmes & Experte SDSR',
    educationLevel: 'Master en Gestion de Projets & Santé Communautaire',
    skills: ['Coordination de projets', 'Protocoles PESCA', 'Supervision des animateurs terrain', 'Formation de pairs'],
    interests: ['Santé reproductive', 'Droits des adolescentes', 'Lutte contre les VBG'],
    availability: 'Temps plein',
    motivation: 'Assurer une mise en œuvre fluide et de haute qualité de tous nos projets sur le terrain.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2022-04-10',
    volunteerHours: 460,
    participationsCount: 40
  },
  {
    id: 'usr-staff-3',
    matricule: '30-26MA',
    poste: 'Responsable Administration et Finances (RAF)',
    email: 'eliane.akli@healthdev.ong',
    firstName: 'Eliane',
    lastName: 'AKLI',
    role: 'financial_manager',
    gender: 'F',
    birthDate: '1994-05-17',
    phone: '+229 01 97 00 14 75',
    city: 'Abomey-Calavi',
    department: 'Atlantique',
    address: 'Abomey-Calavi',
    profession: 'Responsable Administrative et Financière',
    educationLevel: 'Master en Gestion Financière & Comptabilité',
    skills: ['Comptabilité analytique', 'Gestion budgétaire', 'Rapports financiers bailleurs', 'Paiements MoMo/Moov'],
    interests: ['Gestion rigoureuse', 'Micro-finance', 'Inclusion financière'],
    availability: 'Temps plein',
    motivation: 'Veiller à la bonne gestion administrative, financière et matérielle des fonds de projets.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2022-05-15',
    volunteerHours: 410,
    participationsCount: 34
  },
  {
    id: 'usr-staff-4',
    matricule: '09-24MA',
    poste: 'Chargée de Projet (CP)',
    email: 'natacha.odjrado@healthdev.ong',
    firstName: 'A. Natacha',
    lastName: 'ODJRADO',
    role: 'program_manager',
    gender: 'F',
    birthDate: '1997-02-14',
    phone: '+229 01 95 25 93 07',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Chargée de Projet & Spécialiste Genre',
    educationLevel: 'Master en Sociologie & Gestion de Projets',
    skills: ['Gestion opérationnelle de projet', 'Animation de séances de sensibilisation', 'Mobilisation communautaire'],
    interests: ['Autonomisation des filles', 'Éducation à la sexualité', 'Protection de l\'enfance'],
    availability: 'Temps plein',
    motivation: 'Concrétiser les objectifs de nos projets auprès des populations les plus vulnérables.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2023-01-10',
    volunteerHours: 350,
    participationsCount: 30
  },
  {
    id: 'usr-staff-5',
    matricule: '06-23MA',
    poste: 'Chargée du Partenariat et du Plaidoyer (CPP)',
    email: 'sandra.gandonou@healthdev.ong',
    firstName: 'E. Sandra',
    lastName: 'GANDONOU',
    role: 'admin',
    gender: 'F',
    birthDate: '1996-04-20',
    phone: '+229 01 68 56 51 31',
    city: 'Ouidah',
    department: 'Atlantique',
    address: 'Ouidah',
    profession: 'Chargée de Partenariats & Plaidoyer Institutionnel',
    educationLevel: 'Master en Relations Internationales & Plaidoyer',
    skills: ['Plaidoyer institutionnel', 'Négociation partenariale', 'Réseautage société civile', 'Mobilisation de ressources'],
    interests: ['Diplomatie associative', 'Droits des femmes', 'Alliances stratégiques'],
    availability: 'Temps plein',
    motivation: 'Tisser des partenariats stratégiques durables avec les institutions et bailleurs.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2023-02-01',
    volunteerHours: 330,
    participationsCount: 28
  },
  {
    id: 'usr-staff-6',
    matricule: '19-25MA',
    poste: 'Chargé de Communication (CCom)',
    email: 'flaviano.gomez@healthdev.ong',
    firstName: 'Flaviano',
    lastName: 'GOMEZ',
    role: 'comm_manager',
    gender: 'M',
    birthDate: '1998-08-30',
    phone: '+229 01 40 33 48 79',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Chargé de Communication & Médias Digitaux',
    educationLevel: 'Licence en Communication Digitale & Journalisme',
    skills: ['Communication digitale', 'Création de contenu', 'Relations presse', 'Campagnes de sensibilisation'],
    interests: ['Storytelling visuel', 'Médias sociaux', 'Visibilité des causes humanitaires'],
    availability: 'Temps plein',
    motivation: 'Faire entendre la voix de nos bénéficiaires et donner un écho puissant à nos actions.',
    avatarUrl: '/default_avatar_m.jpg',
    status: 'active',
    createdAt: '2023-03-15',
    volunteerHours: 320,
    participationsCount: 27
  },
  {
    id: 'usr-staff-7',
    matricule: '32-26MA',
    poste: 'Chargé de la Planification et du Suivi-Evaluation (CPSE)',
    email: 'amour.bakpe@healthdev.ong',
    firstName: 'Amour',
    lastName: 'BAKPE',
    role: 'me_manager',
    gender: 'M',
    birthDate: '1995-01-25',
    phone: '+229 01 66 58 85 65',
    city: 'Cotonou',
    department: 'Littoral',
    address: 'Cotonou',
    profession: 'Chargé Suivi-Évaluation & Statisticien',
    educationLevel: 'Master en Statistique & Évaluation de Projets',
    skills: ['Suivi-évaluation', 'Indicateurs de performance', 'KoboToolbox / ODK', 'Rapports d\'impact'],
    interests: ['Données probantes', 'Recherche appliquée', 'Efficience des projets'],
    availability: 'Temps plein',
    motivation: 'Fournir des données fiables pour mesurer et amplifier l\'impact réel sur les populations.',
    avatarUrl: '/default_avatar_m.jpg',
    status: 'active',
    createdAt: '2023-04-01',
    volunteerHours: 300,
    participationsCount: 25
  },
  {
    id: 'usr-staff-8',
    matricule: '31-26MA',
    poste: 'Chargé de la Logistique et Achats (CLA)',
    email: 'emmanuel.dahande@healthdev.ong',
    firstName: 'Emmanuel B.',
    lastName: 'DAHANDE',
    role: 'admin',
    gender: 'M',
    birthDate: '1994-07-19',
    phone: '+229 01 96 75 20 10',
    city: 'Cotonou',
    department: 'Littoral',
    address: 'Cotonou',
    profession: 'Chargé Logistique & Approvisionnements',
    educationLevel: 'Licence en Logistique & Gestion de la Chaîne d\'Approvisionnement',
    skills: ['Logistique d\'événements', 'Gestion des stocks', 'Achats et passation de marchés', 'Transport'],
    interests: ['Optimisation logistique', 'Organisation d\'activités de masse', 'Sécurité matérielle'],
    availability: 'Temps plein',
    motivation: 'Garantir une logistique sans faille pour la réussite de toutes nos caravanes et ateliers.',
    avatarUrl: '/default_avatar_m.jpg',
    status: 'active',
    createdAt: '2023-05-10',
    volunteerHours: 280,
    participationsCount: 24
  },

  // ================= LES VOLONTAIRES (MEMBRES ENGAGÉS) =================
  {
    id: 'usr-vol-9',
    matricule: '03-21MF',
    poste: 'Volontaire - Membre',
    email: 'marcelline.sounnoukinny@healthdev.ong',
    firstName: 'Marcelline',
    lastName: 'SOUNNOUKINNY',
    role: 'volunteer',
    gender: 'F',
    birthDate: '1998-03-14',
    phone: '+229 01 97 36 07 44',
    city: 'Cotonou',
    department: 'Littoral',
    address: 'Cotonou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Sociologie',
    skills: ['Mobilisation communautaire', 'Sensibilisation', 'Écoute active'],
    interests: ['Droits des femmes', 'Santé communautaire'],
    availability: 'Temps partiel',
    motivation: 'M\'investir activement pour le bien-être de ma communauté.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2021-03-20',
    volunteerHours: 195,
    participationsCount: 26
  },
  {
    id: 'usr-vol-10',
    matricule: '04-21MF',
    poste: 'Volontaire - Membre',
    email: 'murielle.ahouandjinou@healthdev.ong',
    firstName: 'Murielle',
    lastName: 'AHOUANDJINOU',
    role: 'volunteer',
    gender: 'F',
    birthDate: '1999-07-22',
    phone: '+229 01 96 57 85 52',
    city: 'Porto-Novo',
    department: 'Ouémé',
    address: 'Porto-Novo',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Psychologie',
    skills: ['Causeries éducatives', 'Accompagnement psychosocial', 'Animation'],
    interests: ['Jeunesse', 'Santé mentale', 'Autonomisation'],
    availability: 'Temps partiel',
    motivation: 'Offrir un espace d\'écoute et de soutien aux jeunes filles.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2021-04-05',
    volunteerHours: 180,
    participationsCount: 24
  },
  {
    id: 'usr-vol-11',
    matricule: '16-25MA',
    poste: 'Volontaire - Membre',
    email: 'thecle.agnondo@healthdev.ong',
    firstName: 'Thècle Ginette',
    lastName: 'AGNONDO',
    role: 'volunteer',
    gender: 'F',
    birthDate: '2000-01-15',
    phone: '+229 01 97 09 46 42',
    city: 'Porto-Novo',
    department: 'Ouémé',
    address: 'Porto-Novo',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Droit',
    skills: ['Plaidoyer local', 'Sensibilisation aux droits', 'Secrétariat bénévole'],
    interests: ['Droits humains', 'Égalité de genre'],
    availability: 'Temps partiel',
    motivation: 'Promouvoir les droits des jeunes et l\'égalité dans ma région.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2022-05-12',
    volunteerHours: 165,
    participationsCount: 22
  },
  {
    id: 'usr-vol-12',
    matricule: '12-24MA',
    poste: 'Volontaire - Membre',
    email: 'prudence.amoussou@healthdev.ong',
    firstName: 'Prudence',
    lastName: 'AMOUSSOU',
    role: 'volunteer',
    gender: 'F',
    birthDate: '1997-11-09',
    phone: '+229 01 96 50 79 08',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Éducation',
    skills: ['Animation de groupes', 'Théâtre forum', 'Pair-éducation'],
    interests: ['Éducation à la sexualité', 'Leadership'],
    availability: 'Temps partiel',
    motivation: 'Sensibiliser les jeunes aux bonnes pratiques de santé.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2022-06-18',
    volunteerHours: 155,
    participationsCount: 20
  },
  {
    id: 'usr-vol-13',
    matricule: '14-24MA',
    poste: 'Volontaire - Membre',
    email: 'jacques.kouessi@healthdev.ong',
    firstName: 'Jacques L.',
    lastName: 'KOUESSI',
    role: 'volunteer',
    gender: 'M',
    birthDate: '1996-08-30',
    phone: '+229 01 66 63 92 58',
    city: 'Cotonou',
    department: 'Littoral',
    address: 'Cotonou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Informatique',
    skills: ['Support technique', 'Collecte de données', 'Mobilisation'],
    interests: ['Numérique solidaire', 'Jeunesse'],
    availability: 'Temps partiel',
    motivation: 'Apporter mon appui technique et humain aux actions de l\'ONG.',
    avatarUrl: '/default_avatar_m.jpg',
    status: 'active',
    createdAt: '2022-07-10',
    volunteerHours: 145,
    participationsCount: 19
  },
  {
    id: 'usr-vol-14',
    matricule: '22-25MA',
    poste: 'Volontaire - Membre',
    email: 'nadege.ahouandogbo@healthdev.ong',
    firstName: 'Nadège',
    lastName: 'AHOUANDOGBO',
    role: 'volunteer',
    gender: 'F',
    birthDate: '1998-05-18',
    phone: '+229 01 61 32 61 48',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Soins Infirmiers',
    skills: ['Sensibilisation hygiène', 'Premiers secours', 'Écoute'],
    interests: ['Santé publique', 'Hygiène menstruelle'],
    availability: 'Temps partiel',
    motivation: 'Aider les femmes et filles à mieux prendre soin de leur santé.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2023-01-20',
    volunteerHours: 140,
    participationsCount: 18
  },
  {
    id: 'usr-vol-15',
    matricule: '21-25MA',
    poste: 'Volontaire - Membre',
    email: 'walyatou.bahoueze@healthdev.ong',
    firstName: 'Walyatou',
    lastName: 'BAH OUEZE',
    role: 'volunteer',
    gender: 'F',
    birthDate: '2001-09-12',
    phone: '+229 01 58 20 06 68',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Étudiante en Droit',
    skills: ['Animation terrain', 'Prise de parole', 'Communication'],
    interests: ['Droits des femmes', 'Sororité'],
    availability: 'Temps partiel',
    motivation: 'Défendre la cause des filles et adolescentes à Parakou.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2023-02-14',
    volunteerHours: 135,
    participationsCount: 17
  },
  {
    id: 'usr-vol-16',
    matricule: '26-25MA',
    poste: 'Volontaire - Membre',
    email: 'benoite.hounkpalodo@healthdev.ong',
    firstName: 'Benoite',
    lastName: 'HOUNKPALODO',
    role: 'volunteer',
    gender: 'F',
    birthDate: '1999-12-03',
    phone: '+229 01 61 24 29 07',
    city: 'Cotonou',
    department: 'Littoral',
    address: 'Cotonou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Gestion',
    skills: ['Organisation d\'événements', 'Mobilisation', 'Logistique légère'],
    interests: ['Action humanitaire', 'Émancipation féminine'],
    availability: 'Temps partiel',
    motivation: 'Participer aux campagnes de plaidoyer et d\'action sociale.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2023-03-01',
    volunteerHours: 130,
    participationsCount: 16
  },
  {
    id: 'usr-vol-17',
    matricule: '12-241MA',
    poste: 'Volontaire - Membre',
    email: 'marie-jeanne.deguenonvo@healthdev.ong',
    firstName: 'Marie-Jeanne',
    lastName: 'DEGUENONVO',
    role: 'volunteer',
    gender: 'F',
    birthDate: '1997-04-25',
    phone: '+229 01 62 68 63 43',
    city: 'Kandi',
    department: 'Alibori',
    address: 'Kandi',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Agronomie',
    skills: ['Sensibilisation rurale', 'Animation de cercles communautaires', 'Médiation'],
    interests: ['Développement rural', 'Santé des femmes du Nord'],
    availability: 'Temps partiel',
    motivation: 'Porter la voix de HEALTHDEV ONG dans le département de l\'Alibori à Kandi.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2023-03-25',
    volunteerHours: 125,
    participationsCount: 15
  },
  {
    id: 'usr-vol-18',
    matricule: '11-24MA',
    poste: 'Volontaire - Membre',
    email: 'pascaline.abraham@healthdev.ong',
    firstName: 'Pascaline',
    lastName: 'ABRAHAM',
    role: 'volunteer',
    gender: 'F',
    birthDate: '2000-06-11',
    phone: '+229 01 66 00 40 14',
    city: 'Abomey-Calavi',
    department: 'Atlantique',
    address: 'Abomey-Calavi',
    profession: 'Volontaire - Membre',
    educationLevel: 'Étudiante en Sociologie',
    skills: ['Animation de jeunesse', 'Distribution de kits', 'Accueil'],
    interests: ['Santé reproductive', 'Solidarité féminine'],
    availability: 'Temps partiel',
    motivation: 'Agir concrètement pour soutenir les filles et femmes en situation difficile.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2023-04-10',
    volunteerHours: 120,
    participationsCount: 15
  },
  {
    id: 'usr-vol-19',
    matricule: '23-25MA',
    poste: 'Volontaire - Membre',
    email: 'carmelle.babatounde@healthdev.ong',
    firstName: 'Carmelle',
    lastName: 'BABATOUNDE',
    role: 'volunteer',
    gender: 'F',
    birthDate: '1998-10-17',
    phone: '+229 01 66 87 49 64',
    city: 'Abomey-Calavi',
    department: 'Atlantique',
    address: 'Abomey-Calavi',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Lettres Modernes',
    skills: ['Animation d\'ateliers', 'Rédaction de résumés', 'Communication'],
    interests: ['Culture', 'Éducation des filles', 'Paix'],
    availability: 'Temps partiel',
    motivation: 'Partager des messages d\'espoir et d\'autonomisation avec la jeunesse.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2023-05-02',
    volunteerHours: 115,
    participationsCount: 14
  },
  {
    id: 'usr-vol-20',
    matricule: '18-25MA',
    poste: 'Volontaire - Membre',
    email: 'jorisse.pathinvo@healthdev.ong',
    firstName: 'Jorisse F.',
    lastName: 'PATHINVO',
    role: 'volunteer',
    gender: 'F',
    birthDate: '1999-02-14',
    phone: '+229 01 96 74 17 81',
    city: 'Abomey-Calavi',
    department: 'Atlantique',
    address: 'Abomey-Calavi',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Économie',
    skills: ['Sensibilisation', 'Gestion des fiches', 'Accueil participants'],
    interests: ['Égalité des chances', 'Jeunesse'],
    availability: 'Temps partiel',
    motivation: 'Participer au rayonnement des valeurs de solidarité de HEALTHDEV ONG.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2023-06-01',
    volunteerHours: 110,
    participationsCount: 13
  },
  {
    id: 'usr-vol-21',
    matricule: '24-25MA',
    poste: 'Volontaire - Membre',
    email: 'carine.kounnou@healthdev.ong',
    firstName: 'Carine',
    lastName: 'KOUNNOU',
    role: 'volunteer',
    gender: 'F',
    birthDate: '2001-04-08',
    phone: '+229 01 67 08 00 82',
    city: 'Abomey-Calavi',
    department: 'Atlantique',
    address: 'Abomey-Calavi',
    profession: 'Volontaire - Membre',
    educationLevel: 'Étudiante en Journalisme',
    skills: ['Prise de notes', 'Animation micro', 'Interview terrain'],
    interests: ['Médias', 'Droits humains'],
    availability: 'Temps partiel',
    motivation: 'Aider à relayer les témoignages de vie et les besoins des bénéficiaires.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2023-06-20',
    volunteerHours: 105,
    participationsCount: 13
  },
  {
    id: 'usr-vol-22',
    matricule: '25-25MA',
    poste: 'Volontaire - Membre',
    email: 'stephanie.yedji@healthdev.ong',
    firstName: 'Stéphanie',
    lastName: 'YEDJI',
    role: 'volunteer',
    gender: 'F',
    birthDate: '1998-08-16',
    phone: '+229 01 53 81 34 44',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Sciences Sociales',
    skills: ['Causeries éducatives', 'Mobilisation de quartier', 'Animation'],
    interests: ['Santé communautaire', 'Autonomisation'],
    availability: 'Temps partiel',
    motivation: 'Participer aux campagnes de sensibilisation directe à Parakou.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2023-07-15',
    volunteerHours: 100,
    participationsCount: 12
  },
  {
    id: 'usr-vol-23',
    matricule: '08-23MA',
    poste: 'Volontaire - Membre',
    email: 'farid.mora@healthdev.ong',
    firstName: 'Farid',
    lastName: 'MORA',
    role: 'volunteer',
    gender: 'M',
    birthDate: '1999-03-05',
    phone: '+229 01 97 23 69 04',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Sciences de l\'Éducation',
    skills: ['Pair-éducation garçons', 'Théâtre-forum', 'Sensibilisation'],
    interests: ['Masculinité positive', 'Santé des jeunes'],
    availability: 'Temps partiel',
    motivation: 'Engager les jeunes garçons dans le respect et la protection des droits des filles.',
    avatarUrl: '/default_avatar_m.jpg',
    status: 'active',
    createdAt: '2023-08-01',
    volunteerHours: 95,
    participationsCount: 12
  },
  {
    id: 'usr-vol-24',
    matricule: '17-25MA',
    poste: 'Volontaire - Membre',
    email: 'rubinel.nassara@healthdev.ong',
    firstName: 'Rubinel',
    lastName: 'NASSARA',
    role: 'volunteer',
    gender: 'M',
    birthDate: '2000-11-20',
    phone: '+229 01 52 07 84 57',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Étudiant en Gestion',
    skills: ['Logistique terrain', 'Affichage et orientation', 'Animation'],
    interests: ['Bénévolat', 'Jeunesse engagée'],
    availability: 'Temps partiel',
    motivation: 'Aider activement sur le terrain lors des caravanes et ateliers.',
    avatarUrl: '/default_avatar_m.jpg',
    status: 'active',
    createdAt: '2023-08-20',
    volunteerHours: 90,
    participationsCount: 11
  },
  {
    id: 'usr-vol-25',
    matricule: '20-25MA',
    poste: 'Volontaire - Membre',
    email: 'amdounatou.baboni@healthdev.ong',
    firstName: 'Amdounatou',
    lastName: 'BABONI',
    role: 'volunteer',
    gender: 'F',
    birthDate: '2001-05-14',
    phone: '+229 01 59 56 00 67',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Étudiante en Droit',
    skills: ['Sensibilisation', 'Distribution de matériel', 'Accueil'],
    interests: ['Droits des femmes', 'Santé sexuelle'],
    availability: 'Temps partiel',
    motivation: 'Sensibiliser mes paires aux enjeux de santé et de protection.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2023-09-10',
    volunteerHours: 85,
    participationsCount: 11
  },
  {
    id: 'usr-vol-26',
    matricule: '27-25MA',
    poste: 'Volontaire - Membre',
    email: 'delphine.yehouessi@healthdev.ong',
    firstName: 'Delphine',
    lastName: 'YEHOUESSI',
    role: 'volunteer',
    gender: 'F',
    birthDate: '1999-09-02',
    phone: '+229 01 90 56 81 00',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Soins de Santé',
    skills: ['Causeries santé', 'Orientation', 'Animation'],
    interests: ['Santé maternelle', 'Hygiène menstruelle'],
    availability: 'Temps partiel',
    motivation: 'Apporter des conseils pratiques d\'hygiène et de bien-être.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2023-10-05',
    volunteerHours: 80,
    participationsCount: 10
  },
  {
    id: 'usr-vol-27',
    matricule: '28-25MA',
    poste: 'Volontaire - Membre',
    email: 'angela.kouassi@healthdev.ong',
    firstName: 'Angéla',
    lastName: 'KOUASSI',
    role: 'volunteer',
    gender: 'F',
    birthDate: '2000-12-18',
    phone: '+229 01 62 27 39 91',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Économie Appliquée',
    skills: ['Animation', 'Saisie de fiches', 'Mobilisation'],
    interests: ['Autonomie financière des femmes', 'Égalité'],
    availability: 'Temps partiel',
    motivation: 'Contribuer à l\'autonomisation socio-économique des jeunes femmes.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2023-11-12',
    volunteerHours: 75,
    participationsCount: 10
  },
  {
    id: 'usr-vol-28',
    matricule: '13-24MA',
    poste: 'Volontaire - Membre',
    email: 'landry.agbeko@healthdev.ong',
    firstName: 'Y. Landry',
    lastName: 'AGBEKO',
    role: 'volunteer',
    gender: 'M',
    birthDate: '1998-04-03',
    phone: '+229 01 67 95 06 60',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Sociologie',
    skills: ['Mobilisation jeunesse', 'Pair-éducation', 'Logistique'],
    interests: ['Cohésion sociale', 'Paix communautaire'],
    availability: 'Temps partiel',
    motivation: 'Promouvoir la tolérance et la paix au sein des groupes de jeunes.',
    avatarUrl: '/default_avatar_m.jpg',
    status: 'active',
    createdAt: '2023-12-01',
    volunteerHours: 70,
    participationsCount: 9
  },
  {
    id: 'usr-vol-29',
    matricule: '29-26MA',
    poste: 'Volontaire - Membre',
    email: 'dieudonne.toko@healthdev.ong',
    firstName: 'Dieu-Donné',
    lastName: 'TOKO',
    role: 'volunteer',
    gender: 'M',
    birthDate: '1999-06-27',
    phone: '+229 01 55 36 08 58',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Étudiant en Sciences Agronomiques',
    skills: ['Sensibilisation environnement', 'Plantation d\'arbres', 'Animation'],
    interests: ['Justice climatique', 'Santé globale'],
    availability: 'Temps partiel',
    motivation: 'Agir pour un environnement sain et propice au développement.',
    avatarUrl: '/default_avatar_m.jpg',
    status: 'active',
    createdAt: '2024-01-15',
    volunteerHours: 65,
    participationsCount: 8
  },
  {
    id: 'usr-vol-30',
    matricule: '33-26MA',
    poste: 'Volontaire - Membre',
    email: 'joanita.dossouyovo@healthdev.ong',
    firstName: 'Joanita',
    lastName: 'DOSSOU-YOVO',
    role: 'volunteer',
    gender: 'F',
    birthDate: '2001-01-30',
    phone: '+229 01 97 00 75 52',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Étudiante en Communication',
    skills: ['Animation réseaux', 'Prise de photos', 'Sensibilisation'],
    interests: ['Communication sociale', 'Droits des filles'],
    availability: 'Temps partiel',
    motivation: 'Raconter les belles histoires d\'impact de notre association.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2024-02-01',
    volunteerHours: 60,
    participationsCount: 8
  },
  {
    id: 'usr-vol-31',
    matricule: '34-26MA',
    poste: 'Volontaire - Membre',
    email: 'natacha.toudonou@healthdev.ong',
    firstName: 'Natacha',
    lastName: 'TOUDONOU',
    role: 'volunteer',
    gender: 'F',
    birthDate: '2000-08-11',
    phone: '+229 01 57 37 86 36',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Licence en Droit Privé',
    skills: ['Sensibilisation VBG', 'Écoute bienveillante', 'Orientation'],
    interests: ['Lutte contre les violences', 'Justice'],
    availability: 'Temps partiel',
    motivation: 'Soutenir les survivantes et sensibiliser pour prévenir les violences.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2024-02-15',
    volunteerHours: 55,
    participationsCount: 7
  },
  {
    id: 'usr-vol-32',
    matricule: '35-26MA',
    poste: 'Volontaire - Membre',
    email: 'felicite.panta@healthdev.ong',
    firstName: 'Félicité',
    lastName: 'PANTA',
    role: 'volunteer',
    gender: 'F',
    birthDate: '2001-03-24',
    phone: '+229 01 47 17 13 40',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Étudiante en Linguistique',
    skills: ['Animation en langues locales (Bariba/Dendi)', 'Sensibilisation de masse'],
    interests: ['Inclusion linguistique', 'Santé des femmes rurales'],
    availability: 'Temps partiel',
    motivation: 'Rendre accessibles nos messages aux femmes ne parlant pas français.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2024-03-01',
    volunteerHours: 50,
    participationsCount: 7
  },
  {
    id: 'usr-vol-33',
    matricule: '36-26MA',
    poste: 'Volontaire - Membre',
    email: 'zabulon.atchikpa@healthdev.ong',
    firstName: 'Zabulon',
    lastName: 'ATCHIKPA',
    role: 'volunteer',
    gender: 'M',
    birthDate: '1999-10-15',
    phone: '+229 01 51 94 67 31',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Étudiant en Sciences Politiques',
    skills: ['Mobilisation des jeunes', 'Prise de parole', 'Logistique'],
    interests: ['Participation citoyenne', 'Leadership'],
    availability: 'Temps partiel',
    motivation: 'Inspirer les jeunes à s\'engager activement dans la vie associative.',
    avatarUrl: '/default_avatar_m.jpg',
    status: 'active',
    createdAt: '2024-03-10',
    volunteerHours: 45,
    participationsCount: 6
  },
  {
    id: 'usr-vol-34',
    matricule: '37-26MA',
    poste: 'Volontaire - Membre',
    email: 'floriane.gandji@healthdev.ong',
    firstName: 'Floriane',
    lastName: 'GANDJI',
    role: 'volunteer',
    gender: 'F',
    birthDate: '2002-02-18',
    phone: '+229 01 97 41 48 97',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Étudiante en Droit',
    skills: ['Animation d\'espaces sûrs', 'Écoute', 'Orientation'],
    interests: ['Sororité', 'Santé reproductive'],
    availability: 'Temps partiel',
    motivation: 'Créer des liens de solidarité et d\'entraide entre jeunes femmes.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2024-03-15',
    volunteerHours: 40,
    participationsCount: 5
  },
  {
    id: 'usr-vol-35',
    matricule: '38-26MA',
    poste: 'Volontaire - Membre',
    email: 'exaucee.ahanssin@healthdev.ong',
    firstName: 'Exaucée',
    lastName: 'AHANSSIN',
    role: 'volunteer',
    gender: 'F',
    birthDate: '2001-07-29',
    phone: '+229 01 97 41 48 97',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Étudiante en Gestion',
    skills: ['Accueil des participants', 'Distribution de matériel', 'Sensibilisation'],
    interests: ['Entraide communautaire', 'Droits des filles'],
    availability: 'Temps partiel',
    motivation: 'Offrir mon temps et mon énergie pour bâtir un environnement plus juste.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2024-03-20',
    volunteerHours: 35,
    participationsCount: 5
  },
  {
    id: 'usr-vol-36',
    matricule: '39-26MA',
    poste: 'Volontaire - Membre',
    email: 'falonne.anala@healthdev.ong',
    firstName: 'Falonne',
    lastName: 'ANALA',
    role: 'volunteer',
    gender: 'F',
    birthDate: '2002-11-14',
    phone: '+229 01 94 03 43 00',
    city: 'Parakou',
    department: 'Borgou',
    address: 'Parakou',
    profession: 'Volontaire - Membre',
    educationLevel: 'Étudiante en Psychologie',
    skills: ['Animation de causeries', 'Écoute active', 'Jeux éducatifs'],
    interests: ['Épanouissement des adolescentes', 'Santé globale'],
    availability: 'Temps partiel',
    motivation: 'Sensibiliser les adolescentes pour leur permettre de réaliser leur plein potentiel.',
    avatarUrl: '/default_avatar_f.jpg',
    status: 'active',
    createdAt: '2024-03-25',
    volunteerHours: 30,
    participationsCount: 4
  }
];

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'part-unfpa',
    name: 'UNFPA (Fonds des Nations Unies pour la Population)',
    type: 'international_donor',
    country: 'Bénin / International',
    description: 'Fonds des Nations Unies pour la Population, engagé pour la santé sexuelle et reproductive, la prévention des VBG et l’autonomisation des femmes et des filles.',
    focusDomains: ['Santé Sexuelle & Reproductive', 'Prévention des VBG', 'Autonomisation'],
    sinceYear: 2024,
    website: 'https://benin.unfpa.org',
    logoUrl: '/unfpa.jpg',
    projectsExecuted: [
      'Projet « Ensemble pour un regard féminin sur le secteur du transport, la SSR et les VBG »'
    ],
    activitiesExecuted: [
      'Sensibilisation et renforcement des capacités des femmes dans les gares routières',
      'Campagnes de sensibilisation aux droits en santé sexuelle et reproductive'
    ],
    fundingScope: 'Partenariat multilatéral & Appui institutionnel',
    interventionZones: ['Bénin', 'Borgou', 'National']
  },
  {
    id: 'part-corridor',
    name: 'Organisation du Corridor Abidjan-Lagos (OCAL)',
    type: 'international_donor',
    country: 'Bénin / Afrique de l\'Ouest',
    description: 'Organisation intergouvernementale de prévention et de promotion de la santé le long du corridor routier Abidjan-Lagos.',
    focusDomains: ['Santé en milieu de transit', 'Prévention des VBG', 'Secteur du Transport'],
    sinceYear: 2024,
    website: 'https://corridor-sante.org',
    logoUrl: '/corridor.jpeg',
    projectsExecuted: [
      'Campagne digitale et communautaire « Au-delà des apparences »'
    ],
    activitiesExecuted: [
      'Sensibilisation des acteurs du transport et usagers du corridor routier',
      'Causeries éducatives et prévention des VBG dans les zones d’échange'
    ],
    fundingScope: 'Financement régional & Appui technique',
    interventionZones: ['Corridor Abidjan-Lagos', 'Parakou', 'Cotonou']
  },
  {
    id: 'part-luxembourg',
    name: 'Luxembourg Aid & Development',
    type: 'international_donor',
    country: 'Luxembourg / Bénin',
    description: 'Coopération luxembourgeoise au développement, appuyant les initiatives féministes, la santé communautaire et le développement durable.',
    focusDomains: ['Aide au Développement', 'Droits des Femmes', 'Santé Communautaire'],
    sinceYear: 2024,
    website: 'https://cooperation.gouvernement.lu',
    logoUrl: '/Luxembourg.png',
    projectsExecuted: [
      'Projet de renforcement du leadership féminin et santé de la reproduction'
    ],
    activitiesExecuted: [
      'Soutien financier et technique aux programmes de plaidoyer et d’autonomisation'
    ],
    fundingScope: 'Bailleur international & Coopération bilatérale',
    interventionZones: ['Bénin', 'Borgou', 'Atacora']
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-pesca',
    title: 'Programme d’Éducation à la Sexualité Complète des Apprentis (PESCA)',
    code: 'PESCA-2024-2026',
    slug: 'programme-education-sexualite-complete-des-apprentis',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
    description: 'Programme initié à l’endroit des apprentis d’un groupement d’artisans. Actuellement développé dans les communes de N’Dali, Parakou, Tchaourou et Abomey-Calavi pour doter les jeunes des connaissances, compétences, attitudes et valeurs nécessaires pour faire des choix éclairés et responsables concernant leur sexualité et leur vie en société.',
    objectives: [
      'Doter les jeunes des connaissances, compétences, attitudes et valeurs nécessaires pour faire des choix éclairés et responsables.',
      'Organiser des causeries éducatives bi-hebdomadaires sur les grossesses non désirées, IST, contraception, avortements clandestins, toxicomanie, camaraderie, amitié, amour, genre et violence.',
      'Mener des séances de plaidoyer à l’endroit des patrons d’ateliers et des rencontres trimestrielles.'
    ],
    domain: 'Santé et Droits Sexuels et Reproductifs',
    location: 'Communes de N’Dali, Parakou, Tchaourou et Abomey-Calavi',
    commune: 'N’Dali, Parakou, Tchaourou, Abomey-Calavi',
    department: 'Borgou & Atlantique',
    startDate: '2024-06-01',
    endDate: '2026-12-31',
    status: 'in_progress',
    budget: 0,
    currency: 'XOF',
    donorOrPartner: 'Cotisations et souscriptions des membres / Projets propres',
    leadResponsible: 'Direction des Programmes',
    teamMembers: ['Équipe exécutive', 'Bénévoles terrain'],
    targetBeneficiaries: 1000,
    actualBeneficiaries: 940,
    womenPercentage: 82,
    youthPercentage: 100,
    progressPercentage: 75,
    documents: [],
    photos: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800'],
    keyResults: [
      '2024 : 95 jeunes apprentis impactés (87 filles et 8 garçons).',
      '2025 : 252 personnes touchées (109 femmes, 116 filles, 06 garçons et 21 hommes).',
      '1er semestre 2026 : 593 jeunes et adolescent.es touchés dans les 3 villes du programme.'
    ],
    createdAt: '2024-06-01'
  },
  {
    id: 'proj-plaidoyer-vbg',
    title: 'Projet Plaidoyer Contre les VBG',
    code: 'PLAIDOYER-VBG-2024',
    slug: 'projet-plaidoyer-contre-les-vbg',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    description: 'Initié dans le cadre des 16 jours d’activisme contre les VBG édition 2024 pour susciter l’implication des leaders religieux et politiques dans la lutte contre les violences basées sur le genre. Financement d’activités par l’ABPF : formation de 30 jeunes activistes de 25 organisations et caravane de mobilisation de 105 jeunes de 30 organisations.',
    objectives: [
      'Susciter l’implication des leaders religieux et politiques dans la lutte contre les VBG.',
      'Former 30 jeunes activistes de 25 organisations et groupements communautaires sur les VBG et le Plaidoyer.',
      'Organiser une caravane de mobilisation sociale et adresser un message de plaidoyer au Maire de Parakou.'
    ],
    domain: 'Genre, Lutte contre les Violences basées sur le Genre',
    location: 'Ville de Parakou',
    commune: 'Parakou',
    department: 'Borgou',
    startDate: '2024-11-25',
    endDate: '2024-12-10',
    status: 'completed',
    budget: 0,
    currency: 'XOF',
    donorOrPartner: 'Association Béninoise pour la Promotion de la Famille (ABPF)',
    leadResponsible: 'HEALTHDEV ONG',
    teamMembers: ['Jeunes activistes', 'Réseaux d’associations'],
    targetBeneficiaries: 135,
    actualBeneficiaries: 135,
    womenPercentage: 70,
    youthPercentage: 100,
    progressPercentage: 100,
    documents: [],
    photos: ['https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800'],
    keyResults: [
      '30 jeunes de 25 organisations formés sur les VBG et le plaidoyer.',
      'Caravane de mobilisation rassemblant 105 jeunes issus de 30 organisations.',
      'Remise du message de plaidoyer au Maire de Parakou.'
    ],
    createdAt: '2024-11-25'
  },
  {
    id: 'proj-jif-2025',
    title: 'Célébration de la Journée Internationale des droits de la Femme',
    code: 'JIF-2025-SR',
    slug: 'celebration-journee-internationale-droits-de-la-femme-2025',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    description: 'Sous-financement du Réseau des Féministes du Bénin et du Global Fund for Women pour favoriser l’accès des jeunes filles apprenties au service d’avortement sécurisé. Orientation sur la loi SR, sensibilisation des apprenties sur les conséquences des avortements clandestins et campagne digitale #WakeUpforWomanRight.',
    objectives: [
      'Favoriser l’accès des jeunes filles apprenties au service d’avortement sécurisé.',
      'Organiser une orientation sur la loi SR et l’harmonisation des discours sur l’avortement.',
      'Sensibiliser les jeunes filles apprenties sur les conséquences des avortements clandestins.',
      'Déployer la campagne digitale WakeUpforWomanRight du 26 Mars au 04 Avril 2025.'
    ],
    domain: 'Santé et Droits Sexuels et Reproductifs',
    location: 'Parakou et En ligne',
    commune: 'Parakou',
    department: 'Borgou',
    startDate: '2025-03-01',
    endDate: '2025-04-10',
    status: 'completed',
    budget: 0,
    currency: 'XOF',
    donorOrPartner: 'Réseau des Féministes du Bénin & Global Fund for Women',
    leadResponsible: 'HEALTHDEV ONG',
    teamMembers: ['Équipe communication', 'Intervenantes féministes'],
    targetBeneficiaries: 120,
    actualBeneficiaries: 120,
    womenPercentage: 92,
    youthPercentage: 90,
    progressPercentage: 100,
    documents: [],
    photos: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'],
    keyResults: [
      '120 personnes touchées par le projet (110 femmes et 10 hommes).',
      'Accroissement de la visibilité digitale via #WakeUpforWomanRight.'
    ],
    createdAt: '2025-03-01'
  },
  {
    id: 'proj-transport-vbg-ssr',
    title: 'Ensemble pour un regard féminin sur les métiers du transport, des VBG et de la SSR',
    code: 'UNFPA-OCAL-2025-2026',
    slug: 'ensemble-regard-feminin-metiers-transport-vbg-ssr',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    description: 'Financé par l’UNFPA et mis en œuvre par l’Organisation du Corridor Abidjan Lagos (OCAL). Exécution d’octobre à décembre 2025 et poursuite en 2026 avec la formation des filles bénéficiaires sur les VBG, la SSR et les techniques d’animation, suivie de causeries en communauté.',
    objectives: [
      'Promouvoir le regard féminin sur le secteur du transport, les VBG et la santé sexuelle et reproductive.',
      'Former les filles bénéficiaires sur les VBG, la SSR et les techniques d’animation.',
      'Animer des séances de sensibilisation en communauté.'
    ],
    domain: 'Genre, Lutte contre les Violences basées sur le Genre',
    location: 'Corridor de transport & Communes d’intervention',
    commune: 'Parakou',
    department: 'Borgou',
    startDate: '2025-10-01',
    endDate: '2026-12-31',
    status: 'in_progress',
    budget: 0,
    currency: 'XOF',
    donorOrPartner: 'UNFPA & Organisation du Corridor Abidjan Lagos (OCAL)',
    leadResponsible: 'HEALTHDEV ONG',
    teamMembers: ['Formatrices VBG/SSR', 'Animatrices'],
    targetBeneficiaries: 250,
    actualBeneficiaries: 160,
    womenPercentage: 85,
    youthPercentage: 90,
    progressPercentage: 60,
    documents: [],
    photos: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'],
    keyResults: [
      'Contribution active à l’exécution du projet d’octobre à décembre 2025.',
      'Poursuite des formations et animations communautaires en 2026.'
    ],
    createdAt: '2025-10-01'
  },
  {
    id: 'proj-balayeuses-fieres',
    title: 'Projet « Balayeuses et Fières »',
    code: 'BALAYEUSES-2024',
    slug: 'projet-balayeuses-et-fieres',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800',
    description: 'Facilité par le Réseau des Féministes du Bénin et financé par EngenderHealth dans le cadre des 16 jours d’activisme contre les VBG. Vise à renforcer les connaissances des femmes balayeuses de la SGDS sur les VBG, leurs droits, les mécanismes de recours et les stratégies d’autoprotection face aux violences et au harcèlement.',
    objectives: [
      'Renforcer les connaissances des femmes balayeuses sur les VBG, leurs droits et recours.',
      'Organiser 6 cercles de parole au profit des balayeuses de la SGDS à Abomey-Calavi et Parakou.'
    ],
    domain: 'Genre, Lutte contre les Violences basées sur le Genre',
    location: 'Abomey-Calavi et Parakou',
    commune: 'Abomey-Calavi, Parakou',
    department: 'Atlantique & Borgou',
    startDate: '2024-11-25',
    endDate: '2024-12-10',
    status: 'completed',
    budget: 0,
    currency: 'XOF',
    donorOrPartner: 'EngenderHealth & Réseau des Féministes du Bénin',
    leadResponsible: 'HEALTHDEV ONG',
    teamMembers: ['Animatrices des cercles de parole'],
    targetBeneficiaries: 90,
    actualBeneficiaries: 90,
    womenPercentage: 100,
    youthPercentage: 80,
    progressPercentage: 100,
    documents: [],
    photos: ['https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800'],
    keyResults: [
      '6 cercles de parole organisés au profit des balayeuses de la SGDS à Abomey-Calavi et Parakou.',
      '90 jeunes femmes touchées et outillées sur l’autoprotection et leurs droits.'
    ],
    createdAt: '2024-11-25'
  },
  {
    id: 'proj-renforcement-membres',
    title: 'Programme de renforcement des capacités des membres',
    code: 'CAPACITES-MEMBRES',
    slug: 'programme-renforcement-capacites-des-membres',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    description: 'Séances d’orientation mensuelles sur les thématiques de la santé sexuelle et reproductive, les violences basées sur le genre, le plaidoyer institutionnel, la protection de l’environnement et la cohésion sociale, organisées en ligne et en présentiel à Parakou et Abomey-Calavi.',
    objectives: [
      'Conduire des séances d’orientation mensuelles pour les membres.',
      'Couvrir la SSR, VBG, plaidoyer, environnement et cohésion sociale.'
    ],
    domain: 'Gouvernance & Renforcement Institutionnel',
    location: 'Parakou, Abomey-Calavi et En ligne',
    commune: 'Parakou, Abomey-Calavi',
    department: 'Borgou & Atlantique',
    startDate: '2024-01-01',
    endDate: '2026-12-31',
    status: 'in_progress',
    budget: 0,
    currency: 'XOF',
    donorOrPartner: 'Cotisations et souscriptions des membres',
    leadResponsible: 'Conseil d’Administration',
    teamMembers: ['Membres bénévoles'],
    targetBeneficiaries: 50,
    actualBeneficiaries: 35,
    womenPercentage: 80,
    youthPercentage: 90,
    progressPercentage: 50,
    documents: [],
    photos: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'],
    keyResults: [
      'Tenue régulière des séances mensuelles d’orientation en présentiel et en ligne.'
    ],
    createdAt: '2024-01-01'
  },
  {
    id: 'proj-journees-statutaires',
    title: 'Célébration des Journées statutaires',
    code: 'JOURNEES-STATUTAIRES',
    slug: 'celebration-des-journees-statutaires',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
    description: 'Organisation d’activités lors des journées clés : Journée Internationale de la Jeunesse, Journée internationale de l’Avortement Sécurisé, Journée Internationale de la Paix, Journée Internationale du Volontariat et la Campagne 16 jours d’activisme contre les VBG.',
    objectives: [
      'Célébrer les journées statutaires et sensibiliser le grand public.'
    ],
    domain: 'Genre, Lutte contre les Violences basées sur le Genre',
    location: 'Parakou & Communes d’intervention',
    commune: 'Parakou',
    department: 'Borgou',
    startDate: '2024-01-01',
    endDate: '2026-12-31',
    status: 'in_progress',
    budget: 0,
    currency: 'XOF',
    donorOrPartner: 'Fonds propres & Réseaux alliés',
    leadResponsible: 'Direction Exécutive',
    teamMembers: ['Bénévoles'],
    targetBeneficiaries: 500,
    actualBeneficiaries: 350,
    womenPercentage: 75,
    youthPercentage: 90,
    progressPercentage: 60,
    documents: [],
    photos: ['https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800'],
    keyResults: [
      'Mobilisation communautaire et médiatique lors des journées statutaires.'
    ],
    createdAt: '2024-01-01'
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-atelier-pesca-ndali-2026',
    title: 'Atelier communautaire d’éducation complète à la sexualité et causerie éducative',
    description: 'Séance interactive d’orientation et de causerie auprès des jeunes apprentis et maîtres artisans sur la prévention des grossesses précoces, les droits reproductifs et la négociation du consentement.',
    projectId: 'proj-pesca',
    projectName: 'Programme d’Éducation à la Sexualité Complète des Apprentis (PESCA)',
    objectives: ['Renforcer les compétences de 60 jeunes apprentis', 'Sensibiliser 25 patrons d’ateliers de couture et coiffure'],
    date: '2026-09-18',
    time: '09:30',
    location: 'Maison des Artisans & Salle polyvalente',
    commune: 'N’Dali',
    department: 'Borgou',
    responsible: 'Néonelle P. HOUNGNISSI',
    teamMembers: ['Néonelle P. HOUNGNISSI', 'Marcelline SOUNNOUKINNY', 'Amour BAKPE'],
    requiredVolunteers: 12,
    registeredVolunteers: [
      { userId: 'usr-vol-9', name: 'Marcelline SOUNNOUKINNY', email: 'marcelline.sounnoukinny@healthdev.ong', phone: '+229 01 97 36 07 44', role: 'volunteer', registeredAt: '2026-09-02 10:15', status: 'confirmed' },
      { userId: 'usr-vol-10', name: 'Murielle AHOUANDJINOU', email: 'murielle.ahouandjinou@healthdev.ong', phone: '+229 01 96 57 85 52', role: 'volunteer', registeredAt: '2026-09-02 11:30', status: 'declared' },
      { userId: 'usr-staff-7', name: 'Amour BAKPE', email: 'amour.bakpe@healthdev.ong', phone: '+229 01 66 58 85 65', role: 'me_manager', registeredAt: '2026-09-03 08:45', status: 'confirmed' }
    ],
    assignedVolunteers: ['Marcelline SOUNNOUKINNY', 'Murielle AHOUANDJINOU', 'Amour BAKPE'],
    actualParticipants: 3,
    targetParticipants: 85,
    status: 'upcoming',
    progressPercent: 25,
    budgetPlanned: 150000,
    budgetUsed: 25000,
    photos: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800'],
    documents: [],
    createdAt: '2026-09-01'
  },
  {
    id: 'act-caravane-sante-parakou-2026',
    title: 'Caravane mobile de dépistage et de sensibilisation aux droits SSR',
    description: 'Déploiement d’une unité mobile de santé avec offre de conseils confidentiels, sensibilisation sur l’avortement sécurisé selon la loi béninoise et distribution de kits d’hygiène menstruelle.',
    projectId: 'proj-jif-2025',
    projectName: 'Santé Reproductive & Droits des Femmes',
    objectives: ['Toucher 300 jeunes filles et usagères de marchés', 'Dépistage et écoute psychologique'],
    date: '2026-09-26',
    time: '08:00',
    location: 'Esplanade du Marché Arzèkè',
    commune: 'Parakou',
    department: 'Borgou',
    responsible: 'Rolland GNANGNI',
    teamMembers: ['Rolland GNANGNI', 'Flaviano GOMEZ', 'Marcelline SOUNNOUKINNY', 'Bénévoles terrain'],
    requiredVolunteers: 20,
    registeredVolunteers: [
      { userId: 'usr-vol-9', name: 'Marcelline SOUNNOUKINNY', email: 'marcelline.sounnoukinny@healthdev.ong', phone: '+229 01 97 36 07 44', role: 'volunteer', registeredAt: '2026-09-03 14:20', status: 'confirmed' },
      { userId: 'usr-staff-6', name: 'Flaviano GOMEZ', email: 'flaviano.gomez@healthdev.ong', phone: '+229 01 40 33 48 79', role: 'comm_manager', registeredAt: '2026-09-03 15:10', status: 'confirmed' }
    ],
    assignedVolunteers: ['Marcelline SOUNNOUKINNY', 'Flaviano GOMEZ'],
    actualParticipants: 2,
    targetParticipants: 300,
    status: 'upcoming',
    progressPercent: 15,
    budgetPlanned: 300000,
    budgetUsed: 50000,
    photos: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'],
    documents: [],
    createdAt: '2026-09-02'
  },
  {
    id: 'act-hygiene-menstruelle',
    title: 'Célébration de la Journée de l’Hygiène menstruelle',
    description: 'Deux séances de sensibilisation organisées à Parakou et à Cotonou respectivement en Mai et Juillet 2024. Ces séances ont permis de renforcer les capacités de 225 jeunes apprentis (135 filles et 90 garçons) sur l’hygiène menstruelle et les bonnes pratiques à adopter en période menstruelle.',
    projectId: 'proj-pesca',
    projectName: 'Programme d’Éducation à la Sexualité Complète des Apprentis (PESCA)',
    objectives: ['Renforcer les capacités de 225 jeunes apprentis sur l’hygiène menstruelle et les bonnes pratiques.'],
    date: '2024-05-28',
    endDate: '2024-07-30',
    time: '09:00',
    location: 'Parakou et Cotonou',
    commune: 'Parakou, Cotonou',
    department: 'Borgou & Littoral',
    responsible: 'Direction des Programmes',
    teamMembers: ['Équipe terrain Parakou', 'Équipe terrain Cotonou'],
    budgetPlanned: 0,
    budgetUsed: 0,
    status: 'completed',
    progressPercent: 100,
    targetParticipants: 225,
    actualParticipants: 225,
    photos: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800'],
    documents: [],
    createdAt: '2024-05-01'
  },
  {
    id: 'act-causeries-pesca-2024',
    title: '12 séances de causeries éducatives PESCA auprès des apprentis',
    description: 'De Juin à Novembre 2024, 12 séances de causeries éducatives sur les notions de grossesses non désirées, IST, contraception, avortements clandestins, la toxicomanie, la camaraderie, l’amitié et l’amour, le genre et la violence. Impact : 95 jeunes apprentis (87 filles et 8 garçons).',
    projectId: 'proj-pesca',
    projectName: 'Programme d’Éducation à la Sexualité Complète des Apprentis (PESCA)',
    objectives: ['Délivrer 12 séances de causeries éducatives aux apprentis à Parakou.'],
    date: '2024-06-01',
    endDate: '2024-11-30',
    time: '14:00',
    location: 'Ateliers d’artisans, Parakou',
    commune: 'Parakou',
    department: 'Borgou',
    responsible: 'A. Natacha ODJRADO',
    teamMembers: ['A. Natacha ODJRADO', 'Prudence AMOUSSOU'],
    budgetPlanned: 0,
    budgetUsed: 0,
    status: 'completed',
    progressPercent: 100,
    targetParticipants: 95,
    actualParticipants: 95,
    photos: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800'],
    documents: [],
    createdAt: '2024-06-01'
  },
  {
    id: 'act-formation-vbg-abpf',
    title: 'Formation des jeunes activistes sur les VBG et le Plaidoyer',
    description: 'Formation ayant rassemblé 30 jeunes issus de 25 organisations, réseaux d’associations et groupements communautaires sur les VBG et les méthodes de plaidoyer, financée par l’ABPF.',
    projectId: 'proj-plaidoyer-vbg',
    projectName: 'Projet Plaidoyer Contre les VBG',
    objectives: ['Former 30 jeunes activistes issus de 25 organisations.'],
    date: '2024-11-28',
    time: '08:30',
    location: 'Parakou',
    commune: 'Parakou',
    department: 'Borgou',
    responsible: 'HEALTHDEV ONG & ABPF',
    teamMembers: ['Formatrices VBG'],
    budgetPlanned: 0,
    budgetUsed: 0,
    status: 'completed',
    progressPercent: 100,
    targetParticipants: 30,
    actualParticipants: 30,
    photos: ['https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800'],
    documents: [],
    createdAt: '2024-11-20'
  },
  {
    id: 'act-caravane-vbg-parakou',
    title: 'Caravane de mobilisation sociale et plaidoyer adressé au Maire',
    description: 'Marche de dénonciation de la recrudescence des violences faites aux filles et aux femmes rassemblant 105 jeunes de 30 organisations, achevée par un message de plaidoyer adressé au Maire de Parakou.',
    projectId: 'proj-plaidoyer-vbg',
    projectName: 'Projet Plaidoyer Contre les VBG',
    objectives: ['Mobiliser 105 jeunes et transmettre le message de plaidoyer au Maire.'],
    date: '2024-12-05',
    time: '08:00',
    location: 'Rues et Mairie de Parakou',
    commune: 'Parakou',
    department: 'Borgou',
    responsible: 'AHO Régina',
    teamMembers: ['AHO Régina', 'Jeunes activistes'],
    budgetPlanned: 0,
    budgetUsed: 0,
    status: 'completed',
    progressPercent: 100,
    targetParticipants: 105,
    actualParticipants: 105,
    photos: ['https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800'],
    documents: [],
    createdAt: '2024-11-25'
  },
  {
    id: 'act-orientation-loi-sr',
    title: 'Orientation sur la loi relative à la SR et harmonisation des discours',
    description: 'Séance d’orientation sur la loi relative à la Santé Sexuelle et Reproductive, les barrières à l’avortement et l’harmonisation des discours sur l’avortement sécurisé.',
    projectId: 'proj-jif-2025',
    projectName: 'Célébration de la Journée Internationale des droits de la Femme',
    objectives: ['Harmoniser les discours sur l’avortement sécurisé.'],
    date: '2025-03-08',
    time: '09:00',
    location: 'Parakou',
    commune: 'Parakou',
    department: 'Borgou',
    responsible: 'AHO Régina',
    teamMembers: ['Intervenantes'],
    budgetPlanned: 0,
    budgetUsed: 0,
    status: 'completed',
    progressPercent: 100,
    targetParticipants: 40,
    actualParticipants: 40,
    photos: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'],
    documents: [],
    createdAt: '2025-03-01'
  },
  {
    id: 'act-sensibilisation-avortements-clandestins',
    title: 'Sensibilisation des jeunes filles apprenties sur les avortements clandestins',
    description: 'Séance de sensibilisation à l’endroit des jeunes filles apprenties sur les conséquences des avortements clandestins et les recours sécurisés.',
    projectId: 'proj-jif-2025',
    projectName: 'Célébration de la Journée Internationale des droits de la Femme',
    objectives: ['Sensibiliser les jeunes filles apprenties aux risques des avortements clandestins.'],
    date: '2025-03-15',
    time: '14:30',
    location: 'Parakou',
    commune: 'Parakou',
    department: 'Borgou',
    responsible: 'Néonelle P. HOUNGNISSI',
    teamMembers: ['Animatrices JIF'],
    budgetPlanned: 0,
    budgetUsed: 0,
    status: 'completed',
    progressPercent: 100,
    targetParticipants: 80,
    actualParticipants: 80,
    photos: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'],
    documents: [],
    createdAt: '2025-03-01'
  },
  {
    id: 'act-campagne-wakeupforwomanright',
    title: 'Campagne digitale « WakeUpforWomanRight »',
    description: 'Campagne digitale menée du 26 Mars au 04 Avril 2025 ayant permis d’accroître la visibilité sur les activités du projet JIF 2025 (120 personnes touchées au total : 110 femmes, 10 hommes).',
    projectId: 'proj-jif-2025',
    projectName: 'Célébration de la Journée Internationale des droits de la Femme',
    objectives: ['Accroître la visibilité sur les droits des femmes et l’avortement sécurisé.'],
    date: '2025-03-26',
    endDate: '2025-04-04',
    time: '00:00',
    location: 'En ligne (Réseaux sociaux)',
    commune: 'Parakou',
    department: 'Borgou',
    responsible: 'Responsable Communication',
    teamMembers: ['Équipe Com'],
    budgetPlanned: 0,
    budgetUsed: 0,
    status: 'completed',
    progressPercent: 100,
    targetParticipants: 120,
    actualParticipants: 120,
    photos: ['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800'],
    documents: [],
    createdAt: '2025-03-20'
  },
  {
    id: 'act-cercles-parole-balayeuses',
    title: '6 Cercles de parole pour les femmes balayeuses de la SGDS',
    description: 'Organisés au profit des balayeuses de la SGDS à Abomey-Calavi et Parakou dans le cadre du projet « Balayeuse et Fière », ayant touché 90 jeunes femmes sur les VBG, leurs droits, recours et autoprotection.',
    projectId: 'proj-balayeuses-fieres',
    projectName: 'Projet « Balayeuses et Fières »',
    objectives: ['Renforcer les connaissances de 90 femmes balayeuses sur les VBG et l’autoprotection.'],
    date: '2024-11-28',
    endDate: '2024-12-08',
    time: '15:00',
    location: 'Abomey-Calavi et Parakou',
    commune: 'Abomey-Calavi, Parakou',
    department: 'Atlantique & Borgou',
    responsible: 'Direction des Programmes',
    teamMembers: ['Animatrices cercles de parole'],
    budgetPlanned: 0,
    budgetUsed: 0,
    status: 'completed',
    progressPercent: 100,
    targetParticipants: 90,
    actualParticipants: 90,
    photos: ['https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800'],
    documents: [],
    createdAt: '2024-11-20'
  }
];

export const INITIAL_ATTENDANCES: ActivityAttendance[] = [
  {
    id: 'att-1',
    activityId: 'act-atelier-pesca-ndali-2026',
    activityTitle: 'Atelier communautaire d’éducation complète à la sexualité et causerie éducative',
    volunteerId: 'usr-vol-9',
    volunteerName: 'Marcelline SOUNNOUKINNY',
    volunteerEmail: 'marcelline.sounnoukinny@healthdev.ong',
    volunteerPhone: '+229 01 97 36 07 44',
    volunteerRole: 'volunteer',
    status: 'confirmed',
    registeredAt: '2026-09-02 10:15',
    hoursCompleted: 0
  },
  {
    id: 'att-2',
    activityId: 'act-atelier-pesca-ndali-2026',
    activityTitle: 'Atelier communautaire d’éducation complète à la sexualité et causerie éducative',
    volunteerId: 'usr-vol-10',
    volunteerName: 'Murielle AHOUANDJINOU',
    volunteerEmail: 'murielle.ahouandjinou@healthdev.ong',
    volunteerPhone: '+229 01 96 57 85 52',
    volunteerRole: 'volunteer',
    status: 'registered',
    registeredAt: '2026-09-02 11:30',
    hoursCompleted: 0
  },
  {
    id: 'att-3',
    activityId: 'act-atelier-pesca-ndali-2026',
    activityTitle: 'Atelier communautaire d’éducation complète à la sexualité et causerie éducative',
    volunteerId: 'usr-staff-7',
    volunteerName: 'Amour BAKPE',
    volunteerEmail: 'amour.bakpe@healthdev.ong',
    volunteerPhone: '+229 01 66 58 85 65',
    volunteerRole: 'me_manager',
    status: 'confirmed',
    registeredAt: '2026-09-03 08:45',
    hoursCompleted: 0
  },
  {
    id: 'att-4',
    activityId: 'act-caravane-sante-parakou-2026',
    activityTitle: 'Caravane mobile de dépistage et de sensibilisation aux droits SSR',
    volunteerId: 'usr-vol-9',
    volunteerName: 'Marcelline SOUNNOUKINNY',
    volunteerEmail: 'marcelline.sounnoukinny@healthdev.ong',
    volunteerPhone: '+229 01 97 36 07 44',
    volunteerRole: 'volunteer',
    status: 'confirmed',
    registeredAt: '2026-09-03 14:20',
    hoursCompleted: 0
  },
  {
    id: 'att-5',
    activityId: 'act-caravane-sante-parakou-2026',
    activityTitle: 'Caravane mobile de dépistage et de sensibilisation aux droits SSR',
    volunteerId: 'usr-staff-6',
    volunteerName: 'Flaviano GOMEZ',
    volunteerEmail: 'flaviano.gomez@healthdev.ong',
    volunteerPhone: '+229 01 40 33 48 79',
    volunteerRole: 'comm_manager',
    status: 'confirmed',
    registeredAt: '2026-09-03 15:10',
    hoursCompleted: 0
  }
];

export const INITIAL_CONTRIBUTIONS: Contribution[] = [];

export const INITIAL_PAYMENTS: Payment[] = [];

export const INITIAL_INDICATORS: MEIndicator[] = [];

export const INITIAL_OPPORTUNITIES: FundingOpportunity[] = [];

export const INITIAL_DOCUMENTS: DocumentItem[] = [];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-independance-benin-2026',
    title: "MESSAGE DE HEALTHDEV ONG À L'OCCASION DE LA FÊTE DE L'INDÉPENDANCE DU BÉNIN",
    slug: 'message-healthdev-ong-fete-de-l-independance-du-benin',
    excerpt: "Il y a 66 ans, le Bénin faisait le choix de la liberté et de la souveraineté. Chez HEALTHDEV ONG, nous célébrons cette journée en renouvelant notre engagement pour un avenir solidaire.",
    summary: "Message commémoratif et d'engagement citoyen de HEALTHDEV ONG à l'occasion de la fête nationale du Bénin.",
    content: `Il y a 66 ans, le Bénin faisait le choix de la liberté, de la souveraineté et de la construction de son propre destin.

Cette journée nous rappelle que l'indépendance n'est pas seulement un héritage historique. C'est aussi une responsabilité collective. Chaque génération est appelée à bâtir un pays plus juste, plus solidaire, plus inclusif et plus durable.

Chez HEALTH and DEVELOPMENT ONG, nous croyons qu'un Bénin fort se construit avec des communautés en bonne santé, des jeunes engagés, des femmes autonomes, un environnement préservé et des citoyens pleinement acteurs du développement.

A l'occasion de cette fête nationale, rendons hommage à celles et ceux qui ont œuvré pour notre liberté, tout en renouvelant notre engagement à agir, chacun à notre niveau, pour un avenir où personne n'est laissée de côté.

Que cette célébration soit une invitation à renforcer notre unité, notre sens du devoir et notre volonté de contribuer au progrès de notre nation.

🇧🇯 Bonne Fête de l'Indépendance à toutes les Béninoises et à tous les Béninois !

Ensemble, faisons de notre indépendance une force au service du développement humain.

#FêteDeLIndépendance #Bénin66 #HealthAndDevelopmentONG`,
    category: 'Institutionnel',
    imageUrl: '/pub13.jpg',
    author: 'HEALTHDEV ONG',
    authorRole: 'Direction Exécutive',
    date: '2026-08-01',
    tags: ['FêteDeLIndépendance', 'Bénin66', 'HealthAndDevelopmentONG', 'Bénin', 'DéveloppementHumain'],
    isFeatured: true,
    isPublished: true,
    readTime: '2 min',
    viewsCount: 460
  },
  {
    id: 'news-cooperative-abike-2026',
    title: "SENSIBILISATION À LA COOPÉRATIVE ABIKÈ (ALAGA, PARAKOU) : SSR, VBG ET AUTONOMISATION DES FEMMES",
    slug: 'sensibilisation-cooperative-abike-alaga-parakou-ssr-vbg-autonomisation',
    excerpt: "Dans le cadre de la campagne « Au-delà des apparences », HEALTHDEV ONG a animé une séance de sensibilisation auprès des apprenantes de la Coopérative Abikè à Alaga (Parakou).",
    summary: "Séance d'échanges interactifs avec les apprenantes de la Coopérative Abikè sur les VBG, la SSR et les stéréotypes dans le transport.",
    content: `L'information est plus efficace lorsqu'elle va à la rencontre des communautés, dans leurs lieux d'apprentissage et de vie.

Dans le cadre de la campagne digitale « Au-delà des apparences », mise en œuvre à travers le projet « Ensemble pour un regard féminin sur le secteur du transport, la SSR et les VBG », HEALTHDEV ONG a animé une séance de sensibilisation au sein de la Coopérative Abikè, située dans le quartier Alaga à Parakou.

Grâce à l'ouverture et à l'accueil favorable des responsables de la coopérative, les apprenantes ont bénéficié d'un cadre d'échanges interactif autour de plusieurs thématiques majeures : les Violences Basées sur le Genre (VBG), la Santé Sexuelle et Reproductive (SSR) ainsi que les stéréotypes qui freinent encore la pleine participation des femmes dans certains secteurs d'activité, notamment le transport.

Les discussions, nourries par des questions, des témoignages et des expériences du quotidien, ont permis de renforcer les connaissances des participantes tout en encourageant une prise de conscience collective sur l'importance du respect des droits, de l'égalité des chances et de la prévention des violences.

Nous adressons nos sincères remerciements aux responsables de la Coopérative Abikè pour avoir accepted d'accueillir cette activité de sensibilisation et d'avoir offert à leurs apprenantes cette opportunité d'échanger sur des enjeux essentiels pour leur épanouissement et leur avenir.

Ensemble, continuons d'aller au-delà des apparences, en rapprochant l'information des communautés et en créant des espaces où chacun et chacune peut apprendre, s'exprimer et agir.

#AuDelàDesApparences #HealthDevONG #SSR #VBG #Autonomisation #CoopérativeAbikè #Parakou #UNFPA #CorridorAbidjanLagos #LuxembourgAidAndDevelopment`,
    category: 'Campagne',
    imageUrl: '/pub12.jpg',
    author: 'HEALTHDEV ONG',
    authorRole: 'Direction des Programmes & Animateurs Terrain',
    date: '2026-09-04',
    tags: ['AuDelàDesApparences', 'HealthDevONG', 'SSR', 'VBG', 'Autonomisation', 'CoopérativeAbikè', 'Parakou', 'UNFPA', 'CorridorAbidjanLagos', 'LuxembourgAidAndDevelopment'],
    isFeatured: false,
    isPublished: true,
    readTime: '3 min',
    viewsCount: 425
  },
  {
    id: 'news-tchatchou-deuxieme-seance-2026',
    title: "SENSIBILISER, C'EST INFORMER. REVENIR, C'EST CONSTRUIRE LA CONFIANCE | DEUXIÈME SÉANCE À TCHATCHOU",
    slug: 'sensibiliser-c-est-informer-revenir-c-est-construire-la-confiance-tchatchou',
    excerpt: "HEALTHDEV ONG a organisé une deuxième séance de sensibilisation à Tchatchou dans le cadre de la campagne « Au-delà des apparences » et du projet transport, SSR et VBG.",
    summary: "Approfondissement des échanges communautaires à Tchatchou sur les VBG, la SSR et l'intégration des femmes dans le transport.",
    content: `Sensibiliser, c'est informer. Revenir, c'est construire la confiance.

Dans le cadre de la campagne digitale « Au-delà des apparences », HEALTHDEV ONG a organisé une deuxième séance de sensibilisation dans l'arrondissement de Tchatchou, toujours dans le cadre du projet « Ensemble pour un regard féminin sur le secteur du transport, la SSR et les VBG ».

Cette nouvelle rencontre a permis d'approfondir les échanges autour des Violences Basées sur le Genre (VBG), de la Santé Sexuelle et Reproductive (SSR) et de la promotion d'un regard plus inclusif sur la place des femmes dans le secteur du transport.

Les discussions, marquées par une forte participation des communautés, ont favorisé la libre expression, la clarification de plusieurs idées reçues et une meilleure compréhension des droits, des responsabilités et des comportements à adopter pour bâtir un environnement plus sûr et plus équitable.

En renouvelant ces espaces de dialogue, HEALTHDEV ONG réaffirme sa conviction que le changement des mentalités est un processus qui se construit dans la durée, à travers une sensibilisation continue, une écoute active et une implication des communautés.

📍 À Tchatchou, le dialogue se poursuit... et chaque échange nous rapproche d'une société où les droits, l'égalité et le respect de la dignité humaine ne sont plus de simples aspirations, mais une réalité partagée.

#AuDelàDesApparences #HealthDevONG #SSR #VBG #FemmesDansLeTransport #DialogueCommunautaire #Tchatchou #UNFPA #CorridorAbidjanLagos #LuxembourgAidAndDevelopment #Bénin`,
    category: 'Campagne',
    imageUrl: '/pub11.jpg',
    author: 'HEALTHDEV ONG',
    authorRole: 'Direction des Programmes & Animateurs Terrain',
    date: '2026-09-04',
    tags: ['AuDelàDesApparences', 'HealthDevONG', 'SSR', 'VBG', 'FemmesDansLeTransport', 'DialogueCommunautaire', 'Tchatchou', 'UNFPA', 'CorridorAbidjanLagos', 'LuxembourgAidAndDevelopment', 'Bénin'],
    isFeatured: false,
    isPublished: true,
    readTime: '3 min',
    viewsCount: 410
  },
  {
    id: 'news-tchatchou-dialogue-2026',
    title: "AU-DELÀ DES APPARENCES | À TCHATCHOU, LE DIALOGUE PREND RACINE",
    slug: 'au-dela-des-apparences-a-tchatchou-le-dialogue-prend-racine',
    excerpt: "Dans le cadre de la campagne « Au-delà des apparences », HEALTHDEV ONG a organisé une séance de sensibilisation et d'échanges dans l'arrondissement de Tchatchou (Tchaourou).",
    summary: "Séance de sensibilisation communautaire à Tchatchou autour des VBG, de la SSR et de l'intégration des femmes dans le transport.",
    content: `AU-DELÀ DES APPARENCES | À TCHATCHOU, LE DIALOGUE PREND RACINE

Chaque communauté possède ses réalités. Chaque échange est une opportunité de faire évoluer les perceptions.

Dans le cadre de la campagne digitale « Au-delà des apparences », mise en œuvre à travers le projet « Ensemble pour un regard féminin sur le secteur du transport, la SSR et les VBG », HEALTHDEV ONG a organisé une séance de sensibilisation et d'échanges dans l'arrondissement de Tchatchou.

Cette rencontre a réuni des membres de la communauté autour de discussions ouvertes sur les Violences Basées sur le Genre (VBG), la Santé Sexuelle et Reproductive (SSR) ainsi que les défis et les opportunités liés à la participation des femmes dans le secteur du transport.

Grâce à une approche participative, les participant·e·s ont partagé leurs points de vue, exprimé leurs préoccupations et proposé des pistes d'action pour construire des communautés plus inclusives, où les droits des femmes et des jeunes sont mieux compris, respectés et protégés.

À Tchatchou, cette activité a une fois de plus démontré qu'un changement durable naît de l'information, du dialogue et de l'engagement collectif.

Ensemble, poursuivons nos efforts pour aller au-delà des apparences et bâtir une société où l'égalité, la dignité et le respect des droits deviennent une réalité pour toutes et tous.

#AuDelàDesApparences #HealthDevONG #SSR #VBG #FemmesDansLeTransport #DialogueCommunautaire #Tchatchou #Parakou #UNFPA #CorridorAbidjanLagos #LuxembourgAidAndDevelopment`,
    category: 'Campagne',
    imageUrl: '/pub10.jpg',
    author: 'HEALTHDEV ONG',
    authorRole: 'Direction des Programmes & Animateurs Terrain',
    date: '2026-09-04',
    tags: ['AuDelàDesApparences', 'HealthDevONG', 'SSR', 'VBG', 'FemmesDansLeTransport', 'DialogueCommunautaire', 'Tchatchou', 'Parakou', 'UNFPA', 'CorridorAbidjanLagos', 'LuxembourgAidAndDevelopment'],
    isFeatured: false,
    isPublished: true,
    readTime: '3 min',
    viewsCount: 385
  },
  {
    id: 'news-dialogue-ganou-2026',
    title: "AU-DELÀ DES APPARENCES | LE DIALOGUE SE POURSUIT À GANOU (PARAKOU)",
    slug: 'au-dela-des-apparences-dialogue-se-poursuit-a-ganou-parakou',
    excerpt: "Après Albarika, la campagne digitale « Au-delà des apparences » poursuit sa mobilisation de proximité dans le quartier Ganou, à Parakou.",
    summary: "Rencontre communautaire à Ganou sur la SSR, les VBG et la place des femmes dans le secteur du transport.",
    content: `🚦 AU-DELÀ DES APPARENCES | LE DIALOGUE SE POURSUIT À GANOU

Après Albarika, la campagne digitale « Au-delà des apparences » poursuit sa mobilisation de proximité.

Cette fois, c'est dans le quartier Ganou, à Parakou, que HEALTHDEV ONG est allée à la rencontre des communautés dans le cadre du projet « Ensemble pour un regard féminin sur le secteur du transport, la SSR et les VBG ».

Cette séance d'échanges a permis d'aborder des questions essentielles liées à la Santé Sexuelle et Reproductive (SSR), aux Violences Basées sur le Genre (VBG) et à la place des femmes dans le secteur du transport. À travers des discussions ouvertes et participatives, les participant·e·s ont partagé leurs expériences, exprimé leurs préoccupations et réfléchi collectivement aux solutions favorisant une société plus inclusive et plus équitable.

Les interactions riches, les témoignages et la qualité des échanges ont une fois de plus démontré que le dialogue communautaire est un levier puissant pour déconstruire les stéréotypes, prévenir les violences et promouvoir le respect des droits de chacun.

Chaque rencontre nous rapproche d'un objectif commun : changer les regards, faire évoluer les mentalités et créer un environnement où les femmes peuvent s'épanouir pleinement, y compris dans le secteur du transport.

La campagne « Au-delà des apparences » continue son parcours. D'autres activités de terrain et actions de sensibilisation viendront renforcer cette dynamique au sein des communautés.

#AuDelàDesApparences #HealthDevONG #Transport #SSR #VBG #Égalité #DialogueCommunautaire #Parakou #UNFPA #CorridorAbidjanLagos #LuxembourgAidAndDevelopment`,
    category: 'Campagne',
    imageUrl: '/pub9.jpg',
    author: 'HEALTHDEV ONG',
    authorRole: 'Direction des Programmes & Animateurs Terrain',
    date: '2026-09-04',
    tags: ['AuDelàDesApparences', 'HealthDevONG', 'Transport', 'SSR', 'VBG', 'Égalité', 'DialogueCommunautaire', 'Parakou', 'UNFPA', 'CorridorAbidjanLagos', 'LuxembourgAidAndDevelopment'],
    isFeatured: false,
    isPublished: true,
    readTime: '3 min',
    viewsCount: 360
  },
  {
    id: 'news-dialogue-albarika-2026',
    title: "DIALOGUE COMMUNAUTAIRE À ALBARIKA (PARAKOU) DANS LE CADRE DE LA CAMPAGNE « AU-DELÀ DES APPARENCES »",
    slug: 'dialogue-communautaire-albarika-parakou-campagne-au-dela-des-apparences',
    excerpt: "Dans le cadre de la campagne « Au-delà des apparences », HEALTHDEV ONG a organisé une activité communautaire participative à Albarika (Parakou) autour des VBG, de la SSR et de la place des femmes dans le transport.",
    summary: "Sensibilisation et échanges communautaires à Albarika sur la SSR, les VBG et l'autonomisation des femmes dans le transport.",
    content: `Les changements les plus durables naissent souvent autour d'une discussion sincère.

Dans le cadre de la campagne digitale « Au-delà des apparences », mise en œuvre à travers le projet « Ensemble pour un regard féminin sur le secteur du transport, la SSR et les VBG », HEALTHDEV ONG a organisé une activité communautaire dans le quartier Albarika, à Parakou.

Cette rencontre a réuni des membres de la communauté autour d'échanges ouverts et participatifs sur trois thématiques essentielles : 
🔸 les Violences Basées sur le Genre (VBG) ; 
🔸 la Santé Sexuelle et Reproductive (SSR) ; 
🔸 la place et les réalités des femmes dans le secteur du transport.

Dans une ambiance conviviale et empreinte de respect, les participant·e·s ont partagé leurs expériences, exprimé leurs perceptions et questionné plusieurs idées reçues qui continuent d'alimenter les discriminations et les inégalités.

Au-delà de la sensibilisation, cette activité a permis de créer un véritable espace de dialogue où chaque voix a trouvé sa place. Car changer les mentalités commence par écouter, comprendre et échanger.

Cette activité marque la continuité d'une série d'actions de proximité qui viendront enrichir la campagne « Au-delà des apparences », avec une même ambition : construire une société où les femmes évoluent librement, en sécurité et avec les mêmes opportunités, quel que soit leur domaine d'activité.

Restons mobilisés. Le dialogue continue.

#AuDelàDesApparences #HealthDevONG #Transport #SSR #VBG #Égalité #Parakou #Sensibilisation #DialogueCommunautaire #UNFPA #OCAL #LuxembourgAidAndDevelopment`,
    category: 'Campagne',
    imageUrl: '/pub8.jpg',
    author: 'HEALTHDEV ONG',
    authorRole: 'Direction des Programmes & Animateurs Terrain',
    date: '2026-09-04',
    tags: ['AuDelàDesApparences', 'HealthDevONG', 'Transport', 'SSR', 'VBG', 'Égalité', 'Parakou', 'Sensibilisation', 'DialogueCommunautaire', 'UNFPA', 'OCAL', 'LuxembourgAidAndDevelopment'],
    isFeatured: false,
    isPublished: true,
    readTime: '3 min',
    viewsCount: 340
  },
  {
    id: 'news-au-dela-des-apparences-2026',
    title: "LANCEMENT DE LA CAMPAGNE DIGITALE « AU-DELÀ DES APPARENCES » : FEMMES, TRANSPORT, SSR ET VBG",
    slug: 'lancement-campagne-digitale-au-dela-des-apparences-femmes-transport',
    excerpt: "HEALTHDEV ONG lance officiellement la deuxième campagne digitale du projet : Ensemble pour un regard féminin sur le secteur du transport, la SSR et les VBG.",
    summary: "Deuxième campagne digitale pour déconstruire les stéréotypes et promouvoir les droits des femmes dans le secteur du transport.",
    content: `LANCEMENT DE LA CAMPAGNE DIGITALE

Les idées reçues circulent parfois plus vite que les véhicules.

« Les femmes ne peuvent pas conduire certains engins. » « Le transport n'est pas un métier pour elles. » « Elles sont trop fragiles pour ce secteur. »

Ces phrases semblent banales. Pourtant, elles alimentent les stéréotypes, les discriminations et les violences qui freinent encore la pleine participation des femmes dans le secteur du transport.

Aujourd'hui, HEALTHDEV ONG lance officiellement la deuxième campagne digitale du projet :
Ensemble pour un regard féminin sur le secteur du transport, la SSR et les VBG

Thème : AU-DELÀ DES APPARENCES

Pendant plusieurs semaines, nous irons à la rencontre des réalités souvent invisibles derrière les préjugés.

Au programme :
• Des micro-trottoirs pour écouter la voix des communautés ;
• Une émission d'échanges avec des personnes ressources ;
• Des activités de terrain au plus près des populations ;
• Des contenus digitaux pour déconstruire les stéréotypes et promouvoir un regard plus juste sur les femmes dans le secteur du transport.

Parce qu'avant de juger une personne, il faut comprendre son parcours. Parce qu'avant de croire un cliché, il faut écouter la réalité. Parce que changer de regard, c'est déjà commencer à changer la société.

Suivez cette campagne, partagez les contenus et prenez part à cette dynamique de sensibilisation en faveur de l'égalité, de la dignité et des droits des femmes.

Ensemble, regardons au-delà des apparences.

#AuDelàDesApparences #HealthDevONG #UNFPA #OCAL #LuxembourgAidAndDevelopment #Transport #SSR #VBG #Égalité #Femmes #Bénin`,
    category: 'Campagne',
    imageUrl: '/pub7.jpg',
    author: 'HEALTHDEV ONG',
    authorRole: 'Direction des Programmes & Communication',
    date: '2026-09-04',
    tags: ['AuDelàDesApparences', 'HealthDevONG', 'UNFPA', 'OCAL', 'LuxembourgAidAndDevelopment', 'Transport', 'SSR', 'VBG', 'Égalité', 'Femmes', 'Bénin'],
    isFeatured: false,
    isPublished: true,
    readTime: '3 min',
    viewsCount: 310
  },
  {
    id: 'news-voix-pour-choix-2026',
    title: "HEALTHDEV ONG PARTICIPE À LA PREMIÈRE DIFFUSION DU DOCUMENTAIRE « VOIX POUR CHOIX » À PARAKOU",
    slug: 'healthdev-ong-premiere-diffusion-documentaire-voix-pour-choix-parakou',
    excerpt: "Le vendredi 12 juin 2026, HEALTHDEV ONG a pris part à la projection publique du documentaire « Voix Pour Choix », organisée par la FJAD à l’Institut Français de Parakou.",
    summary: "Projection du documentaire « Voix Pour Choix » sur les droits en santé sexuelle et reproductive à l'Institut Français de Parakou.",
    content: `HEALTHDEV ONG PARTICIPE À LA PREMIÈRE DIFFUSION DU DOCUMENTAIRE « VOIX POUR CHOIX » À PARAKOU

Le vendredi 12 juin 2026, HEALTHDEV ONG a pris part à la projection publique du documentaire « Voix Pour Choix », organisée par la Fondation des Jeunes Amazones pour le Développement (FJAD) à l’Institut Français de Parakou.

Représentée par ses membres, notre organisation a participé à cette rencontre d’échanges qui a rassemblé plus d’une centaine de jeunes, étudiant·e·s, leaders communautaires, professionnel·le·s des médias, acteurs de la santé et organisations de la société civile autour des enjeux liés aux droits en santé sexuelle et reproductive.

À travers un témoignage cinématographique fort, le documentaire a ouvert des discussions essentielles sur le consentement, l’autonomie corporelle, la stigmatisation sociale, le soutien familial ainsi que l’accès à une information fiable et à des services de santé adaptés.

Pour HEALTHDEV ONG, ces espaces de dialogue sont indispensables pour renforcer la sensibilisation, déconstruire les tabous et promouvoir une société où chaque femme et chaque jeune peut exercer ses droits dans la dignité et en toute connaissance de cause.

Nous adressons nos félicitations à la FJAD, Fondation des Jeunes Amazones pour le Développement pour cette initiative qui contribue à faire avancer les réflexions autour de la justice reproductive au Bénin.

#HEALTHDEVONG #VoixPourChoix #SantéSexuelleEtReproductive #DroitsDesFemmes #JusticeReproductive #JeunesseEngagée #Bénin`,
    category: 'Plaidoyer',
    imageUrl: '/pub6.jpg',
    author: 'HEALTHDEV ONG',
    authorRole: 'Direction des Programmes & Communication',
    date: '2026-06-12',
    tags: ['HEALTHDEVONG', 'VoixPourChoix', 'SantéSexuelleEtReproductive', 'DroitsDesFemmes', 'JusticeReproductive', 'JeunesseEngagée', 'Bénin'],
    isFeatured: false,
    isPublished: true,
    readTime: '3 min',
    viewsCount: 290
  },
  {
    id: 'news-clap-fin-sante-mentale-2026',
    title: "CLAP DE FIN DE LA CAMPAGNE DIGITALE SUR LA SANTÉ MENTALE",
    slug: 'clap-de-fin-campagne-digitale-sante-mentale-consortium-action-synergie',
    excerpt: "La séance de renforcement de capacités sur le bien-être mental a permis aux participants de mieux comprendre les déterminants du bien-être mental et d'identifier les facteurs d'équilibre psychologique.",
    summary: "Bilan et clôture de la campagne digitale sur la santé mentale avec les organisations membres du Consortium Action Synergie.",
    content: `CLAP DE FIN DE LA CAMPAGNE DIGITALE SUR LA SANTÉ MENTALE

La séance de renforcement de capacités sur le bien-être mental a permis aux participants de mieux comprendre les déterminants du bien-être mental et d'identifier les facteurs qui influencent positivement ou négativement leur équilibre psychologique.

Cette activité a contribué au renforcement des connaissances des organisations membres du Consortium Action Synergie et constitue une étape importante de la « Campagne digitale sur la santé mentale ».

#Santementale #bienetremental #Femmentale #consortiumactionsynergie #AgirEnsemble #campagnedigitale`,
    category: 'Santé Mentale',
    imageUrl: '/pub5.jpg',
    author: 'HEALTHDEV ONG',
    authorRole: 'Direction des Programmes & Santé Mentale',
    date: '2026-09-04',
    tags: ['Santementale', 'bienetremental', 'Femmentale', 'consortiumactionsynergie', 'AgirEnsemble', 'campagnedigitale'],
    isFeatured: false,
    isPublished: true,
    readTime: '2 min',
    viewsCount: 245
  },
  {
    id: 'news-sante-mentale-2026',
    title: "CAMPAGNE DIGITALE SUR LA SANTÉ MENTALE : RENFORCEMENT DE CAPACITÉS DES ORGANISATIONS DU CONSORTIUM ACTION SYNERGIE",
    slug: 'campagne-digitale-sante-mentale-consortium-action-synergie',
    excerpt: "Dans le cadre de la « Campagne digitale sur la santé mentale », les organisations du consortium Action Synergie ont entrepris une série d'actions visant à promouvoir une meilleure compréhension de la santé mentale et le bien-être psychologique.",
    summary: "Atelier de renforcement de capacités sur le bien-être mental organisé au siège de l'ONG HAI avec Health-Dev, ALDD, JAIE et HAI.",
    content: `Dans le cadre de la « Campagne digitale sur la santé mentale », les organisations, membres du consortium Action Synergie, ont entrepris une série d'actions visant à promouvoir une meilleure compréhension de la santé mentale et à encourager l'adoption de comportements favorables au bien-être psychologique. 

C'est dans cette dynamique qu'une séance de renforcement de capacités sur le bien-être mental a été organisée au siège de l'ONG Health Access Initiative (HAI), réunissant les représentants de Health Development ONG (Health-Dev ONG), Artisans de la Liberté et du Développement Durable (ALDD), Jeunesse Active pour l'Intégration et l'Education (JAIE) et Health Access Initiative (HAI).

#SantéMentale #ActionSynergie #HealthDev #BienÊtrePsychologique #Consortium`,
    category: 'Santé Mentale',
    imageUrl: '/pub4.jpg',
    author: 'HEALTHDEV ONG',
    authorRole: 'Direction des Programmes & Santé Mentale',
    date: '2026-09-04',
    tags: ['SantéMentale', 'ActionSynergie', 'HealthDev', 'BienÊtrePsychologique', 'HAI', 'ALDD', 'JAIE'],
    isFeatured: false,
    isPublished: true,
    readTime: '3 min',
    viewsCount: 210
  },
  {
    id: 'news-environnement-2026',
    title: "LA PROTECTION DE L'ENVIRONNEMENT, C'EST AUSSI PROTÉGER NOTRE SANTÉ.",
    slug: 'journee-mondiale-de-l-environnement-healthdev-ong',
    excerpt: "À l’occasion de la Journée mondiale de l’environnement, HEALTHDEV ONG réaffirme son engagement en faveur d’un monde plus sain, plus vert et plus résilient.",
    summary: "À l’occasion de la Journée mondiale de l’environnement, HEALTHDEV ONG réaffirme son engagement en faveur d’un monde plus sain, plus vert et plus résilient.",
    content: `La protection de l’environnement, c’est aussi protéger notre santé.

À l’occasion de la Journée mondiale de l’environnement, HEALTHDEV ONG réaffirme son engagement en faveur d’un monde plus sain, plus vert et plus résilient.

L’air que nous respirons, l’eau que nous buvons, les sols qui nous nourrissent et les forêts qui préservent l’équilibre de notre planète sont intimement liés à notre bien-être et à notre qualité de vie.

Face aux défis environnementaux actuels, chaque geste compte : planter un arbre, réduire les déchets, protéger les ressources naturelles, sensibiliser son entourage et adopter des comportements responsables.

Ensemble, construisons des communautés où la santé des populations et la protection de l’environnement avancent main dans la main.

Agissons aujourd’hui pour préserver les générations de demain.

#JournéeMondialeDeLEnvironnement #HealthDev #Environnement #SantéEtEnvironnement #DéveloppementDurable`,
    category: 'Environnement',
    imageUrl: '/pub3.jpg',
    author: 'HEALTHDEV ONG',
    authorRole: 'Direction de la Communication & Environnement',
    date: '2026-09-04',
    tags: ['JournéeMondialeDeLEnvironnement', 'HealthDev', 'Environnement', 'SantéEtEnvironnement', 'DéveloppementDurable'],
    isFeatured: false,
    isPublished: true,
    readTime: '2 min',
    viewsCount: 185
  },
  {
    id: 'news-arbre-2026',
    title: "CHAQUE ARBRE PLANTÉ EST UN ACTE POUR LA VIE.",
    slug: 'journee-nationale-de-l-arbre-healthdev-ong',
    excerpt: "À l'occasion de la Journée Nationale de l'Arbre, HEALTHDEV ONG réaffirme son engagement en faveur d'un environnement sain, condition essentielle au bien-être des communautés.",
    summary: "À l'occasion de la Journée Nationale de l'Arbre, HEALTHDEV ONG réaffirme son engagement en faveur d'un environnement sain et d'un avenir durable.",
    content: `CHAQUE ARBRE PLANTÉ EST UN ACTE POUR LA VIE.

À l'occasion de la Journée Nationale de l'Arbre, HEALTHDEV ONG réaffirme son engagement en faveur d'un environnement sain, condition essentielle au bien-être des communautés.

Planter un arbre, c'est protéger notre santé, préserver la biodiversité, lutter contre les effets du changement climatique et construire un avenir plus résilient pour les générations futures.

Aujourd'hui, faisons le choix d'agir. Chaque geste compte. Chaque arbre compte.

Ensemble, Semons l'espoir.
Ensemble, protégeons notre environnement.
Ensemble, construisons un avenir durable.

#JournéeNationaleDeLArbre #HealthDev #Environnement #DéveloppementDurable`,
    category: 'Environnement',
    imageUrl: '/pub1.jpg',
    author: 'HEALTHDEV ONG',
    authorRole: 'Direction de la Communication & Environnement',
    date: '2026-09-04',
    tags: ['JournéeNationaleDeLArbre', 'HealthDev', 'Environnement', 'DéveloppementDurable'],
    isFeatured: false,
    isPublished: true,
    readTime: '2 min',
    viewsCount: 142
  }
];

export const INITIAL_ZONES: InterventionZone[] = [
  {
    id: 'zone-1',
    department: 'Borgou',
    commune: 'Parakou',
    locationName: 'Siège Social (Bawé, 3e Arrondissement)',
    coordinates: [9.3371, 2.6303],
    activeProjectsCount: 0,
    completedActivitiesCount: 0,
    beneficiariesReached: 0,
    leadContact: 'AHO Régina & Rolland GNANGNI'
  },
  {
    id: 'zone-2',
    department: 'Borgou',
    commune: 'N’Dali',
    locationName: 'Sensibilisation Rurale',
    coordinates: [9.8600, 2.7180],
    activeProjectsCount: 0,
    completedActivitiesCount: 0,
    beneficiariesReached: 0,
    leadContact: 'Néonelle P. HOUNGNISSI'
  },
  {
    id: 'zone-3',
    department: 'Borgou',
    commune: 'Tchaourou',
    locationName: 'Antenne Jeunesse',
    coordinates: [8.8870, 2.5970],
    activeProjectsCount: 0,
    completedActivitiesCount: 0,
    beneficiariesReached: 0,
    leadContact: 'A. Natacha ODJRADO'
  },
  {
    id: 'zone-4',
    department: 'Borgou',
    commune: 'Nikki',
    locationName: 'Pôle Autonomisation',
    coordinates: [9.9400, 3.2100],
    activeProjectsCount: 0,
    completedActivitiesCount: 0,
    beneficiariesReached: 0,
    leadContact: 'Flaviano GOMEZ'
  },
  {
    id: 'zone-5',
    department: 'Alibori',
    commune: 'Kandi',
    locationName: 'Couloir de Transport & Santé Reproductive',
    coordinates: [11.1342, 2.9386],
    activeProjectsCount: 0,
    completedActivitiesCount: 0,
    beneficiariesReached: 0,
    leadContact: 'Marie-Jeanne DEGUENONVO'
  },
  {
    id: 'zone-6',
    department: 'Atacora',
    commune: 'Natitingou',
    locationName: 'Point d\'Appui Plaidoyer & Droits des Filles',
    coordinates: [10.3042, 1.3796],
    activeProjectsCount: 0,
    completedActivitiesCount: 0,
    beneficiariesReached: 0,
    leadContact: 'E. Sandra GANDONOU'
  },
  {
    id: 'zone-7',
    department: 'Atlantique',
    commune: 'Abomey-Calavi',
    locationName: 'Antenne de Sensibilisation',
    coordinates: [6.4485, 2.3556],
    activeProjectsCount: 0,
    completedActivitiesCount: 0,
    beneficiariesReached: 0,
    leadContact: 'Eliane AKLI & Souliya MEVO TAIROU'
  },
  {
    id: 'zone-8',
    department: 'Littoral',
    commune: 'Cotonou',
    locationName: 'Bureau de Liaison & Réseaux Féministes',
    coordinates: [6.3654, 2.4183],
    activeProjectsCount: 0,
    completedActivitiesCount: 0,
    beneficiariesReached: 0,
    leadContact: 'AHO Régina & S. Candide HOUNGBEDJI'
  }
];

export const INITIAL_TRANSACTIONS: FinancialTransaction[] = [];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-init-1',
    targetRole: 'admin',
    title: 'Nouveau don reçu • 50 000 FCFA',
    message: 'Mme Bio Chabi a effectué un don de 50 000 FCFA via MTN Mobile Money en soutien au Programme PESCA.',
    type: 'donation',
    createdAt: new Date(Date.now() - 3600000 * 2).toLocaleString('fr-FR'),
    isRead: false,
    link: 'financials'
  },
  {
    id: 'notif-init-2',
    targetRole: 'admin',
    title: 'Nouvelle candidature bénévole reçue',
    message: 'Mariam SOULEMANE (Parakou) a soumis son inscription de bénévole pour les caravanes de sensibilisation.',
    type: 'volunteer',
    createdAt: new Date(Date.now() - 3600000 * 5).toLocaleString('fr-FR'),
    isRead: false,
    link: 'volunteers'
  },
  {
    id: 'notif-init-3',
    targetRole: 'volunteer',
    title: 'Nouvelle activité publiée pour les bénévoles',
    message: 'L\'activité « Caravane Jeunesse Santé Sexuelle & Droits » est ouverte aux inscriptions à Parakou.',
    type: 'activity',
    createdAt: new Date(Date.now() - 3600000 * 8).toLocaleString('fr-FR'),
    isRead: false,
    link: 'activities'
  },
  {
    id: 'notif-init-4',
    targetRole: 'volunteer',
    title: 'Nouveau programme d\'intervention lancé',
    message: 'Le programme « Autonomisation Économique des Filles Mères (PAEFM) » est disponible avec de nouvelles missions bénévoles.',
    type: 'project',
    createdAt: new Date(Date.now() - 3600000 * 24).toLocaleString('fr-FR'),
    isRead: true,
    link: 'projects'
  }
];

export const INITIAL_MESSAGES: ChatMessage[] = [];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [];

export const INITIAL_VBG_REPORTS: VbgReport[] = [
  {
    id: 'vbg-rep-101',
    trackingCode: 'VBG-2026-1048',
    isAnonymous: true,
    reporterRelation: 'victim',
    victimAgeGroup: 'young_adult',
    victimGender: 'F',
    vbgType: 'sexual',
    vbgTypeLabel: 'Violences Sexuelles & Harcèlement',
    urgencyLevel: 'high',
    department: 'Borgou',
    commune: 'Parakou',
    locationDetails: 'Quartier Titirou, proche du marché',
    incidentDate: '2026-09-01',
    description: 'Harcèlement répété et agression verbale/physique dans le cadre professionnel informel. Besoin d\'accompagnement et de conseils juridiques sécurisés.',
    perpetratorKnown: true,
    perpetratorRelation: 'Employeur/Supérieur',
    supportRequested: ['Assistance Médicale', 'Accompagnement Juridique', 'Soutien Psychologique'],
    status: 'in_progress',
    assignedAgent: 'Mme Rollande GNANGNI (Assistante Sociale VBG)',
    notes: [
      {
        id: 'note-1',
        author: 'Assistante Sociale VBG',
        role: 'HEALTHDEV ONG',
        date: '2026-09-02 10:15',
        text: 'Dossier pris en charge. Prise de contact effectuée avec le centre de santé partenaire pour la prise en charge médicale et psychologique gratuite.',
        isPublicForReporter: true
      },
      {
        id: 'note-2',
        author: 'Juriste Conseil',
        role: 'HEALTHDEV ONG',
        date: '2026-09-03 14:30',
        text: 'Accompagnement juridique gratuit programmé pour constitution du dossier de protection.',
        isPublicForReporter: true
      }
    ],
    createdAt: '2026-09-01T14:20:00Z',
    updatedAt: '2026-09-03T14:30:00Z'
  },
  {
    id: 'vbg-rep-102',
    trackingCode: 'VBG-2026-8912',
    isAnonymous: false,
    reporterName: 'Aïchatou BIO',
    reporterPhone: '+229 97 12 34 56',
    reporterEmail: 'aichatou.bio@example.com',
    reporterRelation: 'relative',
    victimAgeGroup: 'minor',
    victimGender: 'F',
    vbgType: 'forced_marriage',
    vbgTypeLabel: 'Mariage Précoce & Forcé',
    urgencyLevel: 'critical',
    department: 'Alibori',
    commune: 'Kandi',
    locationDetails: 'Village de Sonsoro',
    incidentDate: '2026-09-03',
    description: 'Tentative de mariage forcé imminente d\'une jeune fille mineure de 15 ans. Intervention d\'urgence sollicitée pour médiation et protection juridique.',
    perpetratorKnown: true,
    perpetratorRelation: 'Membre de famille',
    supportRequested: ['Protection & Hébergement', 'Accompagnement Juridique', 'Médiation Sociale'],
    status: 'under_review',
    assignedAgent: 'M. Roland (Coordinateur Protection Enfance)',
    notes: [
      {
        id: 'note-3',
        author: 'Protection Enfance',
        role: 'HEALTHDEV ONG',
        date: '2026-09-03 18:00',
        text: 'Alertes transmises au Centre de Promotion Sociale (CPS) de Kandi et à la Brigade de Protection des Mineurs. Mission de terrain en préparation.',
        isPublicForReporter: true
      }
    ],
    createdAt: '2026-09-03T16:10:00Z',
    updatedAt: '2026-09-03T18:00:00Z'
  },
  {
    id: 'vbg-rep-103',
    trackingCode: 'VBG-2026-4421',
    isAnonymous: true,
    reporterRelation: 'witness',
    victimAgeGroup: 'adult',
    victimGender: 'F',
    vbgType: 'physical',
    vbgTypeLabel: 'Violences Physiques & Conjugales',
    urgencyLevel: 'medium',
    department: 'Littoral',
    commune: 'Cotonou',
    locationDetails: 'Sainte-Rita, 7e Arrondissement',
    incidentDate: '2026-08-28',
    description: 'Violences physiques et agressions récurrentes subies par une résidente du quartier. Demande d\'orientation vers un refuge et appui psychologique.',
    perpetratorKnown: true,
    perpetratorRelation: 'Conjoint/Ex-conjoint',
    supportRequested: ['Écoute & Conseils', 'Accompagnement Juridique'],
    status: 'resolved',
    assignedAgent: 'Mme AHO Régina',
    notes: [
      {
        id: 'note-4',
        author: 'Présidente CA',
        role: 'HEALTHDEV ONG',
        date: '2026-08-29 09:00',
        text: 'Prise en charge effectuée avec orientation vers le Guichet Unique VBG de Cotonou et suivi psychologique individuel assuré avec succès.',
        isPublicForReporter: true
      }
    ],
    createdAt: '2026-08-28T20:45:00Z',
    updatedAt: '2026-08-30T11:00:00Z'
  }
];



