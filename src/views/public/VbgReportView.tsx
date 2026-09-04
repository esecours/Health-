import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VbgUrgencyLevel, VbgReport } from '../../types';
import {
  ShieldAlert,
  Lock,
  UserCheck,
  EyeOff,
  PhoneCall,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Copy,
  Download,
  Send,
  HeartHandshake,
  HelpCircle,
  Calendar,
  MapPin,
  User,
  ShieldCheck,
  FileCheck,
  Printer,
  ChevronRight,
  Info,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const BENIN_DEPARTMENTS = [
  'Alibori',
  'Atacora',
  'Atlantique',
  'Borgou',
  'Collines',
  'Couffo',
  'Donga',
  'Littoral',
  'Mono',
  'Ouémé',
  'Plateau',
  'Zou'
];

const COMMUNES_BY_DEPT: Record<string, string[]> = {
  Alibori: ['Kandi', 'Banikoara', 'Gogounou', 'Karimama', 'Malanville', 'Ségbana'],
  Atacora: ['Natitingou', 'Boukoumbé', 'Cobly', 'Kérou', 'Kouandé', 'Matéri', 'Péhunco', 'Tanguiéta', 'Toucountouna'],
  Atlantique: ['Abomey-Calavi', 'Allada', 'Kérou', 'Kpomassè', 'Ouidah', 'Sô-Ava', 'Toffo', 'Tori-Bossito', 'Zè'],
  Borgou: ['Parakou', 'Bembèrèkè', 'Kalalè', 'N\'Dali', 'Nikki', 'Pèrèrè', 'Sinendé', 'Tchaourou'],
  Collines: ['Dassa-Zoumè', 'Glazoué', 'Bantè', 'Savalou', 'Savè', 'Ouèssè'],
  Couffo: ['Dogbo', 'Aplahoué', 'Djakotomey', 'Klopé', 'Lalo', 'Toviklin'],
  Donga: ['Djougou', 'Bassila', 'Copargo', 'Ouaké'],
  Littoral: ['Cotonou'],
  Mono: ['Lokossa', 'Bopa', 'Comé', 'Grand-Popo', 'Houéyogbé', 'Athiémé'],
  Ouémé: ['Porto-Novo', 'Adjarra', 'Adjohoun', 'Aguégués', 'Akpro-Missérété', 'Avrankou', 'Bonou', 'Dangbo', 'Sèmè-Kpodji'],
  Plateau: ['Pobè', 'Adja-Ouèrè', 'Ifangni', 'Kétou', 'Sakété'],
  Zou: ['Abomey', 'Bohicon', 'Agbangnizoun', 'Covè', 'Djidja', 'Ouinhi', 'Za-Kpota', 'Zagnanado', 'Zogbodomey']
};

export const VbgReportView: React.FC = () => {
  const { addVbgReport, getVbgReportByCode, addVbgReportNote, setCurrentView } = useApp();

  const [activeTab, setActiveTab] = useState<'report' | 'track' | 'guide'>('report');

  // Form State
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [reporterRelation, setReporterRelation] = useState<'victim' | 'witness' | 'relative' | 'health_worker' | 'other'>('victim');

  const [victimAgeGroup, setVictimAgeGroup] = useState<'minor' | 'young_adult' | 'adult' | 'elderly'>('young_adult');
  const [victimGender, setVictimGender] = useState<'F' | 'M' | 'Autre'>('F');

  const [vbgType, setVbgType] = useState<string>('sexual');
  const [vbgTypeLabel, setVbgTypeLabel] = useState<string>('Violences Sexuelles & Harcèlement');
  const [urgencyLevel, setUrgencyLevel] = useState<VbgUrgencyLevel>('medium');

  const [department, setDepartment] = useState('Borgou');
  const [commune, setCommune] = useState('Parakou');
  const [locationDetails, setLocationDetails] = useState('');
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const [perpetratorKnown, setPerpetratorKnown] = useState<boolean>(false);
  const [perpetratorRelation, setPerpetratorRelation] = useState('');

  const [selectedSupports, setSelectedSupports] = useState<string[]>([
    'Assistance Médicale d\'Urgence',
    'Accompagnement Juridique',
    'Soutien Psychologique'
  ]);

  // Submission Result State
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tracking State
  const [searchCode, setSearchCode] = useState('');
  const [searchedReport, setSearchedReport] = useState<VbgReport | null | undefined>(undefined);
  const [trackingNoteText, setTrackingNoteText] = useState('');
  const [noteSuccessMsg, setNoteSuccessMsg] = useState(false);

  const VBG_TYPES_GRID = [
    {
      id: 'sexual',
      label: 'Violences Sexuelles & Harcèlement',
      desc: 'Viol, tentative de viol, attouchements non consentis, harcèlement sexuel au travail ou en milieu scolaire.'
    },
    {
      id: 'physical',
      label: 'Violences Physiques & Conjugales',
      desc: 'Coups, blessures, agressions physiques, séquestration, brutalités au sein du foyer ou en public.'
    },
    {
      id: 'forced_marriage',
      label: 'Mariage Précoce ou Forcé',
      desc: 'Projet de mariage imposé sans consentement libre, union forcée impliquant une mineure.'
    },
    {
      id: 'mutilation',
      label: 'Mutilations Génitales Féminines (MGF)',
      desc: 'Excision, mutilation sexuelle traditionnelle ou médicale pratiquée ou programmée sur une fille/femme.'
    },
    {
      id: 'psychological',
      label: 'Violences Psychologiques & Intimidations',
      desc: 'Insultes répétées, menaces de mort, humiliation, rejet familial, chantage et contrôle coercitif.'
    },
    {
      id: 'cyber_harassment',
      label: 'Cyber-harcèlement & Chantage',
      desc: 'Diffusion non consentie d\'images intimes, chantage à la nudité en ligne, harcèlement sur les réseaux.'
    },
    {
      id: 'economic',
      label: 'Violences Économiques & Privations',
      desc: 'Privation de ressources financières, interdiction de travailler, spoliation de biens, dépendance forcée.'
    },
    {
      id: 'other',
      label: 'Autre Forme de Violence Basée sur le Genre',
      desc: 'Toute autre pratique discriminatoire ou violente portant atteinte aux droits et à la dignité.'
    }
  ];

  const SUPPORT_OPTIONS = [
    'Assistance Médicale d\'Urgence',
    'Accompagnement & Protection Juridique',
    'Soutien & Prise en charge Psychologique',
    'Hébergement Sécurisé & Refuge',
    'Médiation Sociale & Protection de l\'Enfance',
    'Écoute, Conseils & Orientation'
  ];

  const handleSupportToggle = (option: string) => {
    setSelectedSupports(prev =>
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  const handleDepartmentChange = (dept: string) => {
    setDepartment(dept);
    const comms = COMMUNES_BY_DEPT[dept] || [];
    setCommune(comms[0] || '');
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Veuillez fournir une description même sommaire des faits pour nous permettre d\'agir efficacement.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = addVbgReport({
        isAnonymous,
        reporterName: isAnonymous ? undefined : reporterName,
        reporterPhone: isAnonymous ? undefined : reporterPhone,
        reporterEmail: isAnonymous ? undefined : reporterEmail,
        reporterRelation,
        victimAgeGroup,
        victimGender,
        vbgType,
        vbgTypeLabel,
        urgencyLevel,
        department,
        commune,
        locationDetails,
        incidentDate,
        description,
        perpetratorKnown,
        perpetratorRelation: perpetratorKnown ? perpetratorRelation : undefined,
        supportRequested: selectedSupports
      });

      setCreatedCode(res.trackingCode);
      setIsSubmitting(false);
    }, 600);
  };

  const handleCopyCode = () => {
    if (createdCode) {
      navigator.clipboard.writeText(createdCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleSearchTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;
    const found = getVbgReportByCode(searchCode.trim());
    setSearchedReport(found || null);
  };

  const handleAddTrackingNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchedReport || !trackingNoteText.trim()) return;
    addVbgReportNote(searchedReport.id, trackingNoteText.trim(), true);
    setTrackingNoteText('');
    setNoteSuccessMsg(true);
    setTimeout(() => setNoteSuccessMsg(false), 3000);
    // Refresh search
    const updated = getVbgReportByCode(searchedReport.trackingCode);
    setSearchedReport(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      
      {/* Top Banner Urgence & Numéros Verts */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border-b border-rose-900/40 p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0 shadow-inner">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 text-[10px] font-black uppercase tracking-wider border border-rose-500/30">
                  SOS Urgence Vitale & Confidentialité
                </span>
                <span className="text-xs text-rose-200/80 hidden sm:inline">• Bénin</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-black font-display text-white mt-0.5">
                Système de Dénonciation & Protection VBG
              </h1>
              <p className="text-xs text-slate-300 max-w-2xl mt-1">
                Violences Basées sur le Genre : Dénoncez en <strong className="text-white underline">Anonymat Total</strong> ou identifié. Prise en charge médicale, juridique et psychologique gratuite par HEALTHDEV ONG.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
            <a
              href="tel:138"
              className="px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-lg shadow-rose-950/50 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-rose-200" />
              <span>N° Vert 138</span>
            </a>
            <a
              href="tel:160"
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>160 (Protection)</span>
            </a>
            <a
              href="tel:+2290192431595"
              className="px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-lg shadow-teal-950/50 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>HEALTHDEV (+229)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-6">

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 max-w-2xl mx-auto mb-8 shadow-lg">
          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'report'
                ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-md shadow-rose-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Faire une Dénonciation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('track')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'track'
                ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md shadow-teal-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Suivi de Signalement</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-gradient-to-r from-slate-800 to-slate-700 text-amber-300 border border-slate-600'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Droits & Secours</span>
          </button>
        </div>


        {/* ================= TAB 1: FORMULAIRE DE DÉNONCIATION VBG ================= */}
        {activeTab === 'report' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Modal de Confirmation si le signalement est soumis */}
            {createdCode ? (
              <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-2xl max-w-2xl mx-auto my-8">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-700/50">
                    Signalement Reçu & Sécurisé
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
                    Votre Dénonciation a été Enregistrée
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    L'équipe de prise en charge et d'assistance sociale VBG de HEALTHDEV ONG a été notifiée immédiatement.
                  </p>
                </div>

                {/* Box du Code Confidentiel */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 max-w-lg mx-auto text-left relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 font-bold text-amber-400">
                      <Lock className="w-3.5 h-3.5" />
                      Code de Suivi Confidentiel
                    </span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                      À CONSERVER ABSOLUMENT
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-700">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-400 tracking-wider">
                      {createdCode}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
                    >
                      {copiedCode ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedCode ? 'Copié !' : 'Copier'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-normal">
                    Ce code unique vous permettra de suivre l'avancement de la prise en charge, d'échanger de manière anonyme avec nos conseillères et de recevoir un soutien juridique/médical.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchCode(createdCode);
                      setActiveTab('track');
                      const reportObj = getVbgReportByCode(createdCode);
                      setSearchedReport(reportObj);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all"
                  >
                    <Search className="w-4 h-4" />
                    <span>Suivre mon dossier maintenant</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCreatedCode(null);
                      setDescription('');
                    }}
                    className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold border border-slate-700 cursor-pointer transition-all"
                  >
                    Faire un autre signalement
                  </button>
                </div>
              </div>
            ) : (

              /* Formulaire Principal de Signalement */
              <form onSubmit={handleSubmitReport} className="bg-slate-900 rounded-3xl border border-slate-800 p-4 sm:p-8 space-y-8 shadow-2xl">
                
                {/* Step 1: Choix Anonymat ou Identifié */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <span className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 font-black text-xs flex items-center justify-center border border-rose-500/30">
                      1
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-white font-display">
                      Modalité de Dénonciation & Confidentialité
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAnonymous(true)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 relative ${
                        isAnonymous
                          ? 'bg-rose-950/40 border-rose-500 text-white shadow-lg shadow-rose-950/30'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isAnonymous ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <EyeOff className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-white">Anonymat Total</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[9px] font-bold border border-emerald-700/50">
                            Conseillé
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Aucun nom, prénom, téléphone ou email n'est requis. Seul votre code confidentiel vous servira de suivi.
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsAnonymous(false)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 relative ${
                        !isAnonymous
                          ? 'bg-teal-950/40 border-teal-500 text-white shadow-lg shadow-teal-950/30'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${!isAnonymous ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-white">Identité Renseignée</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Fournissez vos coordonnées pour permettre à notre équipe sociale de vous recontacter par téléphone ou email.
                        </p>
                      </div>
                    </button>
                  </div>

                  {/* Champs de contact si non-anonyme */}
                  {!isAnonymous && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Nom & Prénoms</label>
                        <input
                          type="text"
                          value={reporterName}
                          onChange={e => setReporterName(e.target.value)}
                          placeholder="Ex: Aïchatou BIO"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Numéro Téléphone / WhatsApp</label>
                        <input
                          type="text"
                          value={reporterPhone}
                          onChange={e => setReporterPhone(e.target.value)}
                          placeholder="Ex: +229 97 00 00 00"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Adresse Email (optionnelle)</label>
                        <input
                          type="email"
                          value={reporterEmail}
                          onChange={e => setReporterEmail(e.target.value)}
                          placeholder="votre@email.com"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Qui effectue la dénonciation */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-300 mb-2">Vous effectuez ce signalement en qualité de :</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { id: 'victim', label: 'Victime Directe' },
                        { id: 'witness', label: 'Témoin Direct' },
                        { id: 'relative', label: 'Parent / Proche' },
                        { id: 'health_worker', label: 'Agent Santé / Enseignant' },
                        { id: 'other', label: 'Autre Intervenant' }
                      ].map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setReporterRelation(item.id as any)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            reporterRelation === item.id
                              ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                              : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>


                {/* Step 2: Nature des Violences VBG */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <span className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 font-black text-xs flex items-center justify-center border border-rose-500/30">
                      2
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-white font-display">
                      Nature de la Violence Basée sur le Genre
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {VBG_TYPES_GRID.map(typeItem => (
                      <button
                        key={typeItem.id}
                        type="button"
                        onClick={() => {
                          setVbgType(typeItem.id);
                          setVbgTypeLabel(typeItem.label);
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                          vbgType === typeItem.id
                            ? 'bg-rose-950/50 border-rose-500 text-white ring-1 ring-rose-500'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          vbgType === typeItem.id ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          <ShieldAlert className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xs text-white">{typeItem.label}</h3>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{typeItem.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Urgence Level Selection */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-300 mb-2">Niveau d'Urgence Estimé :</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'low', label: 'Faible', color: 'bg-slate-800 text-slate-300 border-slate-700' },
                        { id: 'medium', label: 'Moyenne (Besoin sous 48h)', color: 'bg-amber-950/60 text-amber-300 border-amber-700/50' },
                        { id: 'high', label: 'Élevée (Danger sous 24h)', color: 'bg-orange-950/80 text-orange-300 border-orange-600' },
                        { id: 'critical', label: '🔴 Danger Immédiat', color: 'bg-rose-600 text-white border-rose-500 animate-pulse' }
                      ].map(urg => (
                        <button
                          key={urg.id}
                          type="button"
                          onClick={() => setUrgencyLevel(urg.id as VbgUrgencyLevel)}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            urgencyLevel === urg.id
                              ? `${urg.color} ring-2 ring-white/20 shadow-md`
                              : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {urg.label}
                        </button>
                      ))}
                    </div>

                    {urgencyLevel === 'critical' && (
                      <div className="mt-2 p-3 bg-rose-950/80 border border-rose-600 rounded-xl text-xs text-rose-200 flex items-start gap-2 animate-in fade-in">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>En cas de danger immédiat pour la vie :</strong> Appelez directement le <strong>138</strong>, la Police au <strong>117</strong> ou le SAMU au <strong>112</strong> en parallèle de cette dénonciation.
                        </span>
                      </div>
                    )}
                  </div>
                </div>


                {/* Step 3: Localisation & Détails des faits */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <span className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 font-black text-xs flex items-center justify-center border border-rose-500/30">
                      3
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-white font-display">
                      Localisation au Bénin & Description
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Département :</label>
                      <select
                        value={department}
                        onChange={e => handleDepartmentChange(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 cursor-pointer"
                      >
                        {BENIN_DEPARTMENTS.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Commune :</label>
                      <select
                        value={commune}
                        onChange={e => setCommune(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 cursor-pointer"
                      >
                        {(COMMUNES_BY_DEPT[department] || []).map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Date des faits (approximative) :</label>
                      <input
                        type="date"
                        value={incidentDate}
                        onChange={e => setIncidentDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Quartier, Village ou Précisions de Localisation (Optionnel) :
                    </label>
                    <input
                      type="text"
                      value={locationDetails}
                      onChange={e => setLocationDetails(e.target.value)}
                      placeholder="Ex: Quartier Guéma, près de l'école primaire publique"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Description détaillée des événements <span className="text-rose-400">*</span> :
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Décrivez précisément ce qui s'est passé ou ce que vous avez observé (lieu, contexte, nature des faits, besoin de sécurité urgent)..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-500 leading-relaxed"
                    />
                  </div>
                </div>


                {/* Step 4: Auteur & Besoins de Prise en Charge */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <span className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 font-black text-xs flex items-center justify-center border border-rose-500/30">
                      4
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-white font-display">
                      Prise en Charge & Accompagnement Souhaité
                    </h2>
                  </div>

                  {/* Informations sur l'auteur */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300">L'auteur présumé des faits est-il identifié ?</label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPerpetratorKnown(true)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            perpetratorKnown ? 'bg-slate-700 text-white border-slate-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          Oui
                        </button>
                        <button
                          type="button"
                          onClick={() => setPerpetratorKnown(false)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            !perpetratorKnown ? 'bg-slate-700 text-white border-slate-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          Non / Inconnu
                        </button>
                      </div>
                    </div>

                    {perpetratorKnown && (
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Lien ou rôle de l'auteur par rapport à la victime :</label>
                        <select
                          value={perpetratorRelation}
                          onChange={e => setPerpetratorRelation(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 cursor-pointer"
                        >
                          <option value="Conjoint/Ex-conjoint">Conjoint / Ex-conjoint</option>
                          <option value="Membre de famille">Membre de la famille / Parent</option>
                          <option value="Employeur/Supérieur">Employeur / Supérieur hiérarchique</option>
                          <option value="Enseignant/Professeur">Enseignant / Encadreur</option>
                          <option value="Voisin/Connaissance">Voisin / Connaissance</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Appuis sollicités */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      Sélectionnez les services et appuis dont la victime a besoin :
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SUPPORT_OPTIONS.map(opt => {
                        const isChecked = selectedSupports.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleSupportToggle(opt)}
                            className={`p-2.5 rounded-xl text-xs font-bold border text-left flex items-center justify-between transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-teal-950/60 border-teal-500 text-teal-200'
                                : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <span>{opt}</span>
                            <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isChecked ? 'bg-teal-500 border-teal-400 text-slate-950' : 'border-slate-700'
                            }`}>
                              {isChecked && <CheckCircle2 className="w-3.5 h-3.5 font-black" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dénonciation transmise de manière sécurisée et confidentielle sous chiffrement.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-rose-950/50 cursor-pointer transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Enregistrement sécurisé...</span>
                    ) : (
                      <>
                        <ShieldAlert className="w-5 h-5" />
                        <span>Envoyer la Dénonciation VBG</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        )}


        {/* ================= TAB 2: SUIVI SÉCURISÉ DE SIGNALEMENT ================= */}
        {activeTab === 'track' && (
          <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto">
            
            {/* Recherche par Code */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
              <div className="text-center space-y-2">
                <span className="px-3 py-1 bg-teal-950 text-teal-300 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-700/50">
                  Espace Anonyme & Sécurisé
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-display text-white">
                  Suivi de votre Signalement VBG
                </h2>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Saisissez le code de suivi confidentiel (ex: <code className="text-amber-400 font-bold">VBG-2026-1048</code>) attribué lors de votre dénonciation.
                </p>
              </div>

              <form onSubmit={handleSearchTracking} className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto pt-2">
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchCode}
                    onChange={e => setSearchCode(e.target.value)}
                    placeholder="Saisir votre code (ex: VBG-2026-XXXX)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white font-mono placeholder:font-sans focus:outline-none focus:border-teal-500 uppercase tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>Consulter</span>
                </button>
              </form>
            </div>

            {/* Résultat du Suivi */}
            {searchedReport === null && (
              <div className="bg-slate-900 border border-rose-900/50 rounded-3xl p-6 text-center text-xs text-rose-300 space-y-2">
                <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto" />
                <p className="font-bold">Aucun signalement trouvé pour le code "{searchCode}".</p>
                <p className="text-slate-400">Vérifiez l'orthographe exacte de votre code confidentiel (ex: VBG-2026-1048).</p>
              </div>
            )}

            {searchedReport && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
                
                {/* Header du dossier */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-lg font-black text-amber-400">
                        {searchedReport.trackingCode}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        searchedReport.status === 'resolved'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-700/50'
                          : searchedReport.status === 'in_progress'
                          ? 'bg-teal-950 text-teal-300 border-teal-700/50'
                          : 'bg-amber-950 text-amber-300 border-amber-700/50'
                      }`}>
                        {searchedReport.status === 'submitted' && 'Enregistré'}
                        {searchedReport.status === 'under_review' && 'En cours d\'analyse'}
                        {searchedReport.status === 'assigned' && 'Agent assigné'}
                        {searchedReport.status === 'in_progress' && 'Prise en charge active'}
                        {searchedReport.status === 'resolved' && 'Dossier Pris en Charge / Résolu'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mt-1">
                      {searchedReport.vbgTypeLabel}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Commune : {searchedReport.commune} ({searchedReport.department}) • Enregistré le {new Date(searchedReport.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>

                  {searchedReport.assignedAgent && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-right">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Assistante Sociale Référente</span>
                      <span className="text-xs font-bold text-teal-300">{searchedReport.assignedAgent}</span>
                    </div>
                  )}
                </div>

                {/* Timeline des Notes & Échanges Sécurisés */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-400" />
                    <span>Historique des Consignes & Prise en Charge</span>
                  </h4>

                  <div className="space-y-3 pl-2">
                    {searchedReport.notes?.filter(n => n.isPublicForReporter).map((note, idx) => (
                      <div key={note.id || idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1 relative">
                        <div className="flex items-center justify-between text-slate-400 text-[11px]">
                          <span className="font-bold text-teal-400">{note.author} ({note.role})</span>
                          <span>{note.date}</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed font-sans">{note.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Zone de message de l'utilisateur vers l'ONG */}
                <form onSubmit={handleAddTrackingNote} className="pt-4 border-t border-slate-800 space-y-3">
                  <label className="block text-xs font-bold text-slate-300">
                    Transmettre un complément d'information anonyme à notre équipe :
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={trackingNoteText}
                      onChange={e => setTrackingNoteText(e.target.value)}
                      placeholder="Ajouter une précision ou poser une question..."
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Envoyer</span>
                    </button>
                  </div>

                  {noteSuccessMsg && (
                    <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 animate-in fade-in">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Votre message additionnel a été enregistré confidentiellement.</span>
                    </p>
                  )}
                </form>

              </div>
            )}

          </div>
        )}


        {/* ================= TAB 3: DROITS & RESSOURCES D'URGENCE VBG ================= */}
        {activeTab === 'guide' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Intro Droits au Bénin */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-display text-white">
                    Cadre Légal & Droits des Victimes de VBG au Bénin
                  </h2>
                  <p className="text-xs text-slate-300">
                    Loi N° 2011-26 du 09 Janvier 2012 portant prévention et répression des violences faites aux femmes en République du Bénin.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h3 className="text-sm font-bold text-amber-400">Gratuité des Soins d'Urgence</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Toute victime d'agression sexuelle ou de violence physique grave a droit à une prise en charge médicale d'urgence et un certificat médical gratuit délivré par les centres de santé homologués.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h3 className="text-sm font-bold text-rose-400">Interdiction Strict des MGF & Mariage Forcé</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    La loi punit sévèrement les mutilations génitales féminines et tout mariage forcé ou précoce impliquant une mineure en République du Bénin.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h3 className="text-sm font-bold text-teal-400">Assistance Juridique Gratuite</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    HEALTHDEV ONG et la Clinique Juridique mettent à disposition des juristes pour accompagner gratuitement les victimes devant les juridictions.
                  </p>
                </div>
              </div>
            </div>

            {/* Centres de Prise en Charge */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Building2 className="w-5 h-5 text-teal-400" />
                <span>Centres de Promotion Sociale (CPS) & Guichets Uniques</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    city: 'Parakou (Borgou)',
                    name: 'Siège HEALTHDEV ONG & CPS Parakou',
                    phone: '+229 01 92 43 15 95',
                    address: 'Quartier Bawé, 3e Arrondissement'
                  },
                  {
                    city: 'Cotonou (Littoral)',
                    name: 'Guichet Unique VBG & CPS Sainte-Rita',
                    phone: '+229 21 30 00 00 / 138',
                    address: 'Avenue de la Paix, Sainte-Rita'
                  },
                  {
                    city: 'Kandi (Alibori)',
                    name: 'Centre de Promotion Sociale de Kandi',
                    phone: '+229 160 / +229 97 12 00 00',
                    address: 'Face au Tribunal de Kandi'
                  },
                  {
                    city: 'Djougou (Donga)',
                    name: 'Cellule d\'Écoute & Protection Djougou',
                    phone: '+229 138',
                    address: 'Quartier Taïfa, Djougou'
                  },
                  {
                    city: 'Abomey-Calavi (Atlantique)',
                    name: 'Guichet Unique VBG Abomey-Calavi',
                    phone: '+229 138',
                    address: 'Près de la Mairie d\'Abomey-Calavi'
                  },
                  {
                    city: 'Natitingou (Atacora)',
                    name: 'CPS & Maison de la Justice Natitingou',
                    phone: '+229 160',
                    address: 'Centre-ville Natitingou'
                  }
                ].map((center, idx) => (
                  <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                    <span className="text-[10px] font-bold uppercase text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                      {center.city}
                    </span>
                    <h4 className="font-bold text-xs text-white mt-1">{center.name}</h4>
                    <p className="text-[11px] text-slate-400">{center.address}</p>
                    <a
                      href={`tel:${center.phone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors pt-1"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{center.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
