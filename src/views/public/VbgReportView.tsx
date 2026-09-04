import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { VbgUrgencyLevel } from '../../types';
import {
  ShieldAlert,
  Lock,
  UserCheck,
  EyeOff,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Copy,
  Send,
  ShieldCheck,
  Mic,
  Square,
  Volume2,
  Trash2,
  Play,
  Info,
  Calendar,
  MapPin,
  ChevronRight,
  User,
  FileText
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
  const { addVbgReport, getVbgReportByCode, addVbgReportNote } = useApp();

  const [activeTab, setActiveTab] = useState<'report' | 'track'>('report');

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
    'Soutien & Prise en charge Psychologique'
  ]);

  // Feedback fields requested by user
  const [wantFeedback, setWantFeedback] = useState<boolean>(false);
  const [reporterAddress, setReporterAddress] = useState('');

  // Voice recording states
  const [reportMethod, setReportMethod] = useState<'text' | 'voice'>('text');
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'recorded'>('idle');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<any>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Submission Result State
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tracking State
  const [searchCode, setSearchCode] = useState('');
  const [searchedReport, setSearchedReport] = useState<any>(undefined);
  const [trackingNoteText, setTrackingNoteText] = useState('');
  const [noteSuccessMsg, setNoteSuccessMsg] = useState(false);

  // Clean up recording state on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        // Convert blob to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          setAudioBase64(reader.result as string);
        };
        reader.readAsDataURL(audioBlob);

        // Stop all tracks to release mic
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecordingState('recording');
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error("Microphone access denied or unsupported", err);
      alert("Impossible d'accéder au microphone. Veuillez autoriser l'accès ou utiliser le formulaire écrit.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'recording') {
      mediaRecorderRef.current.stop();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setRecordingState('recorded');
    }
  };

  const resetRecording = () => {
    setAudioUrl(null);
    setAudioBase64(null);
    setRecordingState('idle');
    setRecordingDuration(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const VBG_TYPES_GRID = [
    {
      id: 'sexual',
      label: 'Violences Sexuelles & Harcèlement',
      desc: 'Viol, tentative de viol, attouchements non consentis, harcèlement sexuel.'
    },
    {
      id: 'physical',
      label: 'Violences Physiques & Conjugales',
      desc: 'Coups, blessures, agressions physiques, brutalités au sein du foyer.'
    },
    {
      id: 'forced_marriage',
      label: 'Mariage Précoce ou Forcé',
      desc: 'Projet de mariage imposé sans consentement libre, union forcée.'
    },
    {
      id: 'mutilation',
      label: 'Mutilations Génitales (MGF)',
      desc: 'Excision, mutilation sexuelle traditionnelle pratiquée ou programmée.'
    },
    {
      id: 'psychological',
      label: 'Violences Psychologiques',
      desc: 'Insultes répétées, menaces de mort, humiliation, chantage.'
    },
    {
      id: 'cyber_harassment',
      label: 'Cyber-harcèlement & Chantage',
      desc: 'Diffusion d\'images intimes sans accord, chantage en ligne.'
    },
    {
      id: 'economic',
      label: 'Violences Économiques',
      desc: 'Privation de ressources financières, interdiction de travailler.'
    },
    {
      id: 'other',
      label: 'Autre Forme de VBG',
      desc: 'Toute autre pratique discriminatoire ou violente.'
    }
  ];

  const SUPPORT_OPTIONS = [
    'Assistance Médicale d\'Urgence',
    'Accompagnement & Protection Juridique',
    'Soutien & Prise en charge Psychologique',
    'Hébergement Sécurisé & Refuge',
    'Médiation Sociale & Protection de l\'Enfance'
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

    if (reportMethod === 'text' && !description.trim()) {
      alert('Veuillez fournir une description écrite des faits.');
      return;
    }

    if (reportMethod === 'voice' && !audioBase64) {
      alert('Veuillez d\'abord procéder à l\'enregistrement de votre message vocal.');
      return;
    }

    setIsSubmitting(true);

    const finalDescription = reportMethod === 'voice'
      ? `[Enregistrement Vocal Déposé] (Durée: ${recordingDuration}s)`
      : description.trim();

    setTimeout(() => {
      const res = addVbgReport({
        isAnonymous,
        reporterName: isAnonymous ? undefined : reporterName,
        reporterPhone: wantFeedback ? reporterPhone : (isAnonymous ? undefined : reporterPhone),
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
        description: finalDescription,
        perpetratorKnown,
        perpetratorRelation: perpetratorKnown ? perpetratorRelation : undefined,
        supportRequested: selectedSupports,
        audioRecording: reportMethod === 'voice' ? audioBase64 || undefined : undefined,
        wantFeedback,
        reporterAddress: wantFeedback ? reporterAddress : undefined,
      });

      setCreatedCode(res.trackingCode);
      setIsSubmitting(false);
      resetRecording();
    }, 800);
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
    
    const updated = getVbgReportByCode(searchedReport.trackingCode);
    setSearchedReport(updated);
  };

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 pb-20">
      
      {/* Top Banner focused only on Action */}
      <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-6 shadow-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0 shadow-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-wider border border-rose-200">
                  Signalement Rapide & Sécurisé
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">• Bénin</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-black font-display text-slate-900 mt-0.5">
                Portail de Dénonciation VBG
              </h1>
              <p className="text-xs text-slate-600 max-w-2xl mt-1">
                Faites un signalement confidentiel par écrit ou par message vocal. Un code secret vous sera remis à la fin pour le suivi de votre dossier.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 pt-6 space-y-6">

        {/* Procédure Simple Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 shrink-0 mt-0.5">
              <Info className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-teal-800 uppercase tracking-wider">Comment faire votre dénonciation ?</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                1. Choisissez la méthode (Formulaire écrit ou Enregistrement vocal).<br/>
                2. Spécifiez la localisation et la nature de la violence.<br/>
                3. Optionnel : Laissez vos coordonnées de retour pour être tenu(e) au courant.<br/>
                4. Validez pour obtenir votre code de suivi.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 max-w-md mx-auto shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'report'
                ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Faire un Signalement</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('track')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'track'
                ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Suivre mon Dossier</span>
          </button>
        </div>

        {/* TAB 1: FORMULAIRE DE DÉNONCIATION VBG */}
        {activeTab === 'report' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Modal de Confirmation après soumission */}
            {createdCode ? (
              <div className="bg-slate-50 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-md max-w-xl mx-auto my-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-bold uppercase tracking-wider border border-emerald-200">
                    Dénonciation Sécurisée & Enregistrée
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Votre signalement a été transmis
                  </h2>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    L'équipe sociale de HEALTHDEV ONG a été alertée en toute confidentialité. Conservez précieusement le code ci-dessous.
                  </p>
                </div>

                {/* Box du Code Confidentiel */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 text-left animate-in fade-in">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-bold text-amber-600">
                      <Lock className="w-3.5 h-3.5" />
                      Code Secret de Suivi
                    </span>
                    <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                      À NOTER
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="font-mono text-2xl font-black text-emerald-600 tracking-wider">
                      {createdCode}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shrink-0"
                    >
                      {copiedCode ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copié' : 'Copier'}</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-slate-500 leading-normal">
                    Ce code vous servira à communiquer anonymement avec nos conseillères sur l'onglet "Suivre mon Dossier" pour échanger ou transmettre de nouveaux détails.
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
                     className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                  >
                    <Search className="w-4 h-4" />
                    <span>Accéder au suivi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCreatedCode(null);
                      setDescription('');
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 cursor-pointer transition-all"
                  >
                    Nouveau signalement
                  </button>
                </div>
              </div>
            ) : (

              /* Formulaire Principal */
              <form onSubmit={handleSubmitReport} className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-7 space-y-6 shadow-sm">
                
                {/* Section 1: Mode d'enregistrement */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 font-bold text-xs flex items-center justify-center border border-rose-200">
                      1
                    </span>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900">
                      Comment préférez-vous dénoncer les faits ?
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setReportMethod('text')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        reportMethod === 'text'
                          ? 'bg-rose-50/50 border-rose-500 text-slate-900 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${reportMethod === 'text' ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">Formulaire écrit classique</span>
                        <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                          Rédigez manuellement la description détaillée des événements constatés.
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setReportMethod('voice')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        reportMethod === 'voice'
                          ? 'bg-rose-50/50 border-rose-500 text-slate-900 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${reportMethod === 'voice' ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        <Mic className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">Enregistrement vocal direct</span>
                        <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                          Exprimez-vous au micro à vive voix sans avoir à écrire l'histoire.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Section d'enregistrement vocal ou écrite dynamique */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  {reportMethod === 'voice' ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Enregistrement audio en direct</span>
                        <span className="text-[10px] bg-rose-50 border border-rose-200 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                          Anonyme & Chiffré
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-slate-200 space-y-4 shadow-sm">
                        
                        {recordingState === 'idle' && (
                          <div className="text-center space-y-3">
                            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200 shadow-sm mx-auto">
                              <Mic className="w-6 h-6 text-slate-500" />
                            </div>
                            <p className="text-xs text-slate-500 max-w-xs">
                              Cliquez ci-dessous pour démarrer l'enregistrement de votre témoignage audio.
                            </p>
                            <button
                              type="button"
                              onClick={startRecording}
                              className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm mx-auto"
                            >
                              <Mic className="w-4 h-4 animate-pulse" />
                              Démarrer l'enregistrement
                            </button>
                          </div>
                        )}

                        {recordingState === 'recording' && (
                          <div className="text-center space-y-3">
                            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-300 animate-pulse mx-auto">
                              <span className="w-3 h-3 rounded-full bg-rose-600" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-mono font-bold text-rose-600 animate-pulse">
                                ENREGISTREMENT EN COURS : {formatDuration(recordingDuration)}
                              </p>
                              <p className="text-[10px] text-slate-500">Exprimez-vous clairement à proximité de votre micro.</p>
                            </div>
                            <button
                              type="button"
                              onClick={stopRecording}
                              className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer mx-auto"
                            >
                              <Square className="w-4 h-4 text-rose-600" />
                              Arrêter & Valider
                            </button>
                          </div>
                        )}

                        {recordingState === 'recorded' && (
                          <div className="text-center space-y-3 w-full">
                            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 mx-auto">
                              <Volume2 className="w-6 h-6 text-emerald-500" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-emerald-700">Enregistrement capturé avec succès</p>
                              <p className="text-[10px] text-slate-500">Durée totale : {formatDuration(recordingDuration)}</p>
                            </div>

                            {/* Audio Player */}
                            {audioUrl && (
                              <div className="max-w-md mx-auto w-full pt-1">
                                <audio src={audioUrl} controls className="w-full h-10 rounded-lg bg-slate-100 px-2 focus:outline-none" />
                              </div>
                            )}

                            <div className="flex items-center justify-center gap-2 pt-2">
                              <button
                                type="button"
                                onClick={resetRecording}
                                className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-300 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-slate-500" />
                                Recommencer
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700">
                          Description écrite des faits <span className="text-rose-600">*</span> :
                        </label>
                        <span className="text-[10px] text-slate-500">Confidentialité garantie</span>
                      </div>
                      <textarea
                        rows={4}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Décrivez précisément ce qui s'est passé (contexte, date, heure, lieu précis, besoins urgents)..."
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-rose-500 leading-relaxed placeholder:text-slate-400"
                      />
                    </div>
                  )}
                </div>

                {/* Section 2: Localisation */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 font-bold text-xs flex items-center justify-center border border-rose-200">
                      2
                    </span>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900">
                      Où et quand se sont déroulés les faits ?
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Département :</label>
                      <select
                        value={department}
                        onChange={e => handleDepartmentChange(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500 cursor-pointer animate-in fade-in"
                      >
                        {BENIN_DEPARTMENTS.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Commune :</label>
                      <select
                        value={commune}
                        onChange={e => setCommune(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500 cursor-pointer"
                      >
                        {(COMMUNES_BY_DEPT[department] || []).map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Date approximative :</label>
                      <input
                        type="date"
                        value={incidentDate}
                        onChange={e => setIncidentDate(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Quartier / Village / Précisions de localisation :</label>
                    <input
                      type="text"
                      value={locationDetails}
                      onChange={e => setLocationDetails(e.target.value)}
                      placeholder="Ex: Quartier Guéma, derrière le grand marché"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Section 3: Nature de la violence */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 font-bold text-xs flex items-center justify-center border border-rose-200">
                      3
                    </span>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900">
                      Type de Violence & Niveau d'urgence
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {VBG_TYPES_GRID.map(typeItem => (
                      <button
                        key={typeItem.id}
                        type="button"
                        onClick={() => {
                          setVbgType(typeItem.id);
                          setVbgTypeLabel(typeItem.label);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                          vbgType === typeItem.id
                            ? 'bg-rose-50/50 border-rose-500 text-slate-900 ring-1 ring-rose-500'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          vbgType === typeItem.id ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <ShieldAlert className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xs text-slate-800">{typeItem.label}</h3>
                          <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{typeItem.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Niveau d'Urgence :</label>
                      <div className="flex gap-1">
                        {[
                          { id: 'medium', label: 'Standard', color: 'bg-slate-100 border-slate-300 text-slate-800' },
                          { id: 'high', label: 'Haute (Inquiétude)', color: 'bg-orange-50 border-orange-200 text-orange-800' },
                          { id: 'critical', label: '🔴 Urgent / Immédiat', color: 'bg-rose-600 border-rose-500 text-white animate-pulse' }
                        ].map(u => (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => setUrgencyLevel(u.id as VbgUrgencyLevel)}
                            className={`flex-1 py-2 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                              urgencyLevel === u.id
                                ? `${u.color} shadow-sm`
                                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {u.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Rapport avec la victime :</label>
                      <select
                        value={reporterRelation}
                        onChange={e => setReporterRelation(e.target.value as any)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500 cursor-pointer"
                      >
                        <option value="victim">Je suis la victime elle-même</option>
                        <option value="witness">Je suis témoin direct des faits</option>
                        <option value="relative">Je suis un proche / parent</option>
                        <option value="health_worker">Je suis agent de santé / travailleur social</option>
                        <option value="other">Autre situation</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 4: Retour de dénonciation - OPTIONNEL (Explicitement demandé par l'utilisateur) */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 font-bold text-xs flex items-center justify-center border border-emerald-200">
                      4
                    </span>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900">
                      Souhaitez-vous recevoir un retour sur l'avancement ?
                    </h2>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wantFeedback}
                        onChange={e => {
                          setWantFeedback(e.target.checked);
                          if (e.target.checked) {
                            setIsAnonymous(false);
                          } else {
                            setIsAnonymous(true);
                          }
                        }}
                        className="mt-0.5 rounded border-slate-300 bg-white text-teal-600 focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <span className="block text-xs font-bold text-slate-800">Oui, je souhaite que HEALTHDEV me tienne informé(e)</span>
                        <span className="block text-[10px] text-slate-500 leading-normal mt-0.5">
                          En cochant cette option, vous pouvez renseigner vos coordonnées ci-dessous pour recevoir le suivi directement. Vos données restent strictement confidentielles.
                        </span>
                      </div>
                    </label>

                    {wantFeedback && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 animate-in fade-in">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Votre adresse (Email ou Domicile / Ville) <span className="text-rose-600">*</span> :
                          </label>
                          <input
                            type="text"
                            required={wantFeedback}
                            value={reporterAddress}
                            onChange={e => setReporterAddress(e.target.value)}
                            placeholder="Ex: Cotonou, quartier Fidjrossè ou email@domaine.com"
                            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Votre numéro de téléphone / WhatsApp <span className="text-rose-600">*</span> :
                          </label>
                          <input
                            type="text"
                            required={wantFeedback}
                            value={reporterPhone}
                            onChange={e => setReporterPhone(e.target.value)}
                            placeholder="Ex: +229 97 00 00 00"
                            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">Votre Nom & Prénom (Optionnel) :</label>
                          <input
                            type="text"
                            value={reporterName}
                            onChange={e => setReporterName(e.target.value)}
                            placeholder="Ex: Aïchatou SOULEYMANE"
                            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Action Block */}
                <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>HEALTHDEV ONG garantit la sécurité absolue de vos enregistrements et écrits.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Transmission cryptée en cours...</span>
                    ) : (
                      <>
                        <ShieldAlert className="w-4 h-4" />
                        <span>Envoyer le Signalement VBG</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

        {/* TAB 2: SUIVI SÉCURISÉ DE SIGNALEMENT */}
        {activeTab === 'track' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Recherche par Code */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm text-center">
              <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-[10px] font-bold uppercase tracking-wider border border-teal-200">
                Espace de Suivi Anonyme
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Consulter l'avancement de votre dossier
              </h2>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Saisissez votre code confidentiel (ex : <code className="text-amber-600 font-bold">VBG-2026-XXXX</code>) pour suivre les étapes et les messages de HEALTHDEV.
              </p>

              <form onSubmit={handleSearchTracking} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto pt-2">
                <input
                  type="text"
                  value={searchCode}
                  onChange={e => setSearchCode(e.target.value)}
                  placeholder="Ex: VBG-2026-1234"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono placeholder:font-sans focus:outline-none focus:border-teal-500 uppercase tracking-wider"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>Rechercher</span>
                </button>
              </form>
            </div>

            {/* Aucun signalement trouvé */}
            {searchedReport === null && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center text-xs text-rose-700 space-y-1 animate-in fade-in">
                <AlertTriangle className="w-6 h-6 text-rose-500 mx-auto" />
                <p className="font-bold">Aucun signalement trouvé pour le code "{searchCode}".</p>
                <p className="text-slate-500">Veuillez vérifier l'orthographe ou réessayer.</p>
              </div>
            )}

            {/* Affichage des détails si trouvé */}
            {searchedReport && (
              <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 space-y-5 shadow-sm animate-in zoom-in-95 duration-150">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-black text-amber-600">
                        {searchedReport.trackingCode}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                        searchedReport.status === 'resolved'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : searchedReport.status === 'in_progress'
                          ? 'bg-teal-50 text-teal-700 border-teal-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {searchedReport.status === 'submitted' && 'Reçu'}
                        {searchedReport.status === 'under_review' && 'En cours d\'analyse'}
                        {searchedReport.status === 'assigned' && 'Agent affecté'}
                        {searchedReport.status === 'in_progress' && 'Accompagnement actif'}
                        {searchedReport.status === 'resolved' && 'Dossier clos / Pris en charge'}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 mt-1">
                      {searchedReport.vbgTypeLabel}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Commune : {searchedReport.commune} • Signalé le {new Date(searchedReport.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>

                  {searchedReport.assignedAgent && (
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="block text-[9px] text-slate-500 uppercase font-bold">Conseillère dédiée</span>
                      <span className="text-xs font-bold text-teal-700">{searchedReport.assignedAgent}</span>
                    </div>
                  )}
                </div>

                {/* Play recorded voice if present */}
                {searchedReport.audioRecording && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-rose-200 space-y-1">
                    <span className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5" />
                      Enregistrement Vocal Déposé
                    </span>
                    <audio src={searchedReport.audioRecording} controls className="w-full h-8 mt-1 focus:outline-none" />
                  </div>
                )}

                {/* Timeline des notes d'avancement */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>Échanges & Avancement du dossier</span>
                  </h4>

                  <div className="space-y-2.5 pl-2">
                    {searchedReport.notes?.filter((n: any) => n.isPublicForReporter).map((note: any, idx: number) => (
                      <div key={note.id || idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center justify-between text-slate-500 text-[10px]">
                          <span className="font-bold text-teal-700">{note.author} ({note.role})</span>
                          <span>{note.date}</span>
                        </div>
                        <p className="text-slate-800 leading-relaxed">{note.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form de complément d'informations */}
                <form onSubmit={handleAddTrackingNote} className="pt-4 border-t border-slate-200 space-y-2.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Écrire un message ou un complément d'information à notre équipe :
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={trackingNoteText}
                      onChange={e => setTrackingNoteText(e.target.value)}
                      placeholder="Tapez votre message ici..."
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-all shrink-0"
                    >
                      <Send className="w-3 h-3" />
                      <span>Envoyer</span>
                    </button>
                  </div>

                  {noteSuccessMsg && (
                    <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Message envoyé avec succès.</span>
                    </p>
                  )}
                </form>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
