import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  Users, 
  Building2, 
  Coins, 
  HeartHandshake, 
  ArrowLeft, 
  LogIn 
} from 'lucide-react';

interface DemoUserItem {
  id: string;
  name: string;
  poste: string;
  category: 'direction' | 'ca' | 'finances' | 'volunteers';
  roleBadge: string;
  roleBadgeColor: string;
  email: string;
  matricule: string;
  avatarUrl: string;
  permissions: string;
  phone: string;
}

export const DemoAccountsView: React.FC = () => {
  const { login, setCurrentView } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const demoUsers: DemoUserItem[] = [
    // Direction Exécutive & Staff
    {
      id: 'usr-staff-1',
      name: 'Rolland GNANGNI',
      poste: 'Directeur Exécutif (DE)',
      category: 'direction',
      roleBadge: 'Super Admin • Direction',
      roleBadgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      email: 'rolland.gnangni@healthdev.ong',
      matricule: '02-21MF',
      avatarUrl: '/default_avatar_m.jpg',
      permissions: 'Accès intégral à l\'ERP, validation générale, gestion des programmes, rapports bailleurs & PTF.',
      phone: '+229 01 96 65 65 31'
    },
    {
      id: 'usr-staff-2',
      name: 'Néonelle P. HOUNGNISSI',
      poste: 'Coordonnatrice des Programmes (CoP)',
      category: 'direction',
      roleBadge: 'Coordination • Programmes',
      roleBadgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      email: 'neonelle.houngnissi@healthdev.ong',
      matricule: '07-23MA',
      avatarUrl: '/default_avatar_f.jpg',
      permissions: 'Coordination des projets (PESCA, VBG, JIF), suivi des activités et affectation des missions terrain.',
      phone: '+229 01 96 60 04 21'
    },
    {
      id: 'usr-staff-3',
      name: 'Flaviano GOMEZ',
      poste: 'Chargé de Communication (CCom)',
      category: 'direction',
      roleBadge: 'Communication Digitale',
      roleBadgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      email: 'flaviano.gomez@healthdev.ong',
      matricule: '08-23MA',
      avatarUrl: '/default_avatar_m.jpg',
      permissions: 'Gestion des actualités, communiqués officiels, médias, publications et relations presse.',
      phone: '+229 01 62 10 45 88'
    },
    {
      id: 'usr-staff-4',
      name: 'Amour BAKPE',
      poste: 'Gestionnaire de Base de Données (M&E)',
      category: 'direction',
      roleBadge: 'Suivi & Évaluation (M&E)',
      roleBadgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      email: 'amour.bakpe@healthdev.ong',
      matricule: '09-23MA',
      avatarUrl: '/default_avatar_m.jpg',
      permissions: 'Collecte et analyse d\'indicateurs d\'impact, statistiques de terrain, exports de données.',
      phone: '+229 01 97 15 20 33'
    },
    {
      id: 'usr-staff-5',
      name: 'Emmanuel DAHANDE',
      poste: 'Assistant Logistique & Événements',
      category: 'direction',
      roleBadge: 'Logistique & Opérations',
      roleBadgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
      email: 'emmanuel.dahande@healthdev.ong',
      matricule: '10-23MA',
      avatarUrl: '/default_avatar_m.jpg',
      permissions: 'Coordination logistique, inventaire matériel, déploiement sur les événements communautaires.',
      phone: '+229 01 61 40 77 90'
    },

    // Conseil d'Administration (Gouvernance)
    {
      id: 'usr-ca-1',
      name: 'Régina AHO',
      poste: 'Présidente du Conseil d\'Administration (PCA)',
      category: 'ca',
      roleBadge: 'Présidente CA • Gouvernance',
      roleBadgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      email: 'ahoregina12@gmail.com',
      matricule: '01-21MF',
      avatarUrl: '/default_avatar_f.jpg',
      permissions: 'Supervision institutionnelle, validation stratégique, orientations des statuts et du CA.',
      phone: '+229 01 61 55 76 95'
    },
    {
      id: 'usr-ca-2',
      name: 'C. Rodrigue HOUNKPATIN',
      poste: 'Trésorier Général (TG/CA)',
      category: 'finances',
      roleBadge: 'Trésorerie Générale',
      roleBadgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      email: 'rodrigue.hounkpatin@healthdev.ong',
      matricule: '13-241MA',
      avatarUrl: '/default_avatar_m.jpg',
      permissions: 'Supervision financière, validation des décaissements, validation des cotisations et comptes.',
      phone: '+229 01 97 00 75 52'
    },
    {
      id: 'usr-ca-3',
      name: 'Moïse AHISSOU',
      poste: 'Commissaire aux Comptes (CAC)',
      category: 'ca',
      roleBadge: 'Contrôle Interne & Audit',
      roleBadgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      email: 'moise.ahissou@healthdev.ong',
      matricule: '06-21MF',
      avatarUrl: '/default_avatar_m.jpg',
      permissions: 'Audit financier et opérationnel, contrôle de régularité, rapports statutaires.',
      phone: '+229 01 97 32 44 11'
    },
    {
      id: 'usr-ca-4',
      name: 'Ruth DOHOU',
      poste: 'Secrétaire Générale du CA',
      category: 'ca',
      roleBadge: 'Secrétariat Général CA',
      roleBadgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      email: 'ruth.dohou@healthdev.ong',
      matricule: '04-21MF',
      avatarUrl: '/default_avatar_f.jpg',
      permissions: 'Procès-verbaux des AG, convocations, suivi des résolutions du Conseil d\'Administration.',
      phone: '+229 01 96 11 22 33'
    },

    // Finances & Comptabilité
    {
      id: 'usr-staff-6',
      name: 'Eliane AKLI',
      poste: 'Comptable & Gestionnaire Financière',
      category: 'finances',
      roleBadge: 'Finances & Comptabilité',
      roleBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      email: 'eliane.akli@healthdev.ong',
      matricule: '11-23MA',
      avatarUrl: '/default_avatar_f.jpg',
      permissions: 'Tenue des registres de recettes/dépenses, reçus de dons, validation Mobile Money.',
      phone: '+229 01 95 88 44 20'
    },
    {
      id: 'usr-staff-7',
      name: 'Sandra GANDONOU',
      poste: 'Secrétaire Comptable',
      category: 'finances',
      roleBadge: 'Secrétariat Comptable',
      roleBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      email: 'sandra.gandonou@healthdev.ong',
      matricule: '12-23MA',
      avatarUrl: '/default_avatar_f.jpg',
      permissions: 'Enregistrement des cotisations des membres, bordereaux de versement et pièces justificatives.',
      phone: '+229 01 66 70 80 90'
    },

    // Bénévoles & Membres
    {
      id: 'usr-vol-1',
      name: 'Marcelline SOUNNOUKINNY',
      poste: 'Bénévole Terrain & Pairs Éducateurs',
      category: 'volunteers',
      roleBadge: 'Bénévole Accréditée',
      roleBadgeColor: 'bg-green-100 text-green-800 border-green-200',
      email: 'marcelline.sounnoukinny@healthdev.ong',
      matricule: '14-241MA',
      avatarUrl: '/default_avatar_f.jpg',
      permissions: 'Espace membre adhérent, badge officiel, consultation des missions, paiement cotisations.',
      phone: '+229 01 60 12 34 56'
    },
    {
      id: 'usr-vol-2',
      name: 'Murielle AHOUANDJINOU',
      poste: 'Bénévole Sensibilisation VBG',
      category: 'volunteers',
      roleBadge: 'Bénévole Terrain',
      roleBadgeColor: 'bg-green-100 text-green-800 border-green-200',
      email: 'murielle.ahouandjinou@healthdev.ong',
      matricule: '15-241MA',
      avatarUrl: '/default_avatar_f.jpg',
      permissions: 'Participation aux ateliers de proximité, signalements de terrain, badge et attestations.',
      phone: '+229 01 64 22 33 44'
    },
    {
      id: 'usr-vol-3',
      name: 'Jacques KOUESSI',
      poste: 'Bénévole Logistique & Mobilisation',
      category: 'volunteers',
      roleBadge: 'Bénévole Terrain',
      roleBadgeColor: 'bg-green-100 text-green-800 border-green-200',
      email: 'jacques.kouessi@healthdev.ong',
      matricule: '18-241MA',
      avatarUrl: '/default_avatar_m.jpg',
      permissions: 'Suivi des activités communautaires, inscription aux campagnes de santé, profil membre.',
      phone: '+229 01 97 88 99 00'
    }
  ];

  const handle1ClickLogin = (userEmail: string) => {
    const success = login(userEmail, 'password123');
    if (success) {
      setCurrentView('dashboard');
    }
  };

  const filteredUsers = demoUsers.filter(user => {
    const matchesCategory = selectedCategory === 'all' || user.category === selectedCategory;
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.poste.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.permissions.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Breadcrumb & Return navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 transition-colors shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'accueil</span>
          </button>

          <button
            onClick={() => setCurrentView('login')}
            className="flex items-center gap-2 text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-xl border border-teal-200 transition-colors shadow-xs cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Accéder à la Connexion classique</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-[#0F172A] to-[#144D32] text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden space-y-4">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-400/30 rounded-full text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C84F]" />
            <span>Portail Démonstration • URL directe : /demo</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
            Comptes de Démonstration & Accès Test
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Explorez l'ERP intégré de HEALTHDEV ONG avec l'ensemble des profils opérationnels. Cliquez sur <span className="font-bold text-[#F5C84F]">« Se connecter »</span> sur le rôle de votre choix pour vous authentifier instantanément et visualiser ses tableaux de bord et permissions.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par nom, rôle, e-mail, matricule..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Tous ({demoUsers.length})
              </button>
              <button
                onClick={() => setSelectedCategory('direction')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedCategory === 'direction'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Direction</span>
              </button>
              <button
                onClick={() => setSelectedCategory('ca')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedCategory === 'ca'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Conseil d'Admin (CA)</span>
              </button>
              <button
                onClick={() => setSelectedCategory('finances')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedCategory === 'finances'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Finances</span>
              </button>
              <button
                onClick={() => setSelectedCategory('volunteers')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedCategory === 'volunteers'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Bénévoles</span>
              </button>
            </div>
          </div>
        </div>

        {/* Demo Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-3xl border border-slate-200 hover:border-teal-500/60 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                {/* Header card: role and matricule */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${user.roleBadgeColor}`}>
                    {user.roleBadge}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                    {user.matricule}
                  </span>
                </div>

                {/* Identity */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-teal-400 font-display font-black text-lg flex items-center justify-center shadow-xs border border-slate-700 shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-black text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                      {user.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 truncate">
                      {user.poste}
                    </p>
                  </div>
                </div>

                {/* Permissions scope */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-800 block mb-0.5">Permissions & Modules :</span>
                  {user.permissions}
                </div>
              </div>

              {/* Action Button: 1-Click Login */}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handle1ClickLogin(user.email)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 group-hover:scale-[1.01] cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-[#F5C84F]" />
                  <span>Se connecter avec ce compte</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <p className="text-slate-500 text-sm">
              Aucun profil démo ne correspond à votre recherche « {searchTerm} ».
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
