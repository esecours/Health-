import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NGO_INFO } from '../../data/initialData';
import { 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  ShieldCheck, 
  Award,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const VolunteerRegisterView: React.FC = () => {
  const { registerVolunteer, setCurrentView } = useApp();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dossierNumber, setDossierNumber] = useState('');

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+229 ');
  const [gender, setGender] = useState<'female' | 'male' | 'other'>('female');
  const [city, setCity] = useState('Parakou');
  const [department, setDepartment] = useState('Borgou');
  const [profession, setProfession] = useState('');
  const [educationLevel, setEducationLevel] = useState('Licence / Master');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [availability, setAvailability] = useState('Week-ends et missions ponctuelles');
  const [motivation, setMotivation] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const skillsOptions = [
    'Animation communautaire & Mobilisation',
    'Sensibilisation Santé & SDSR',
    'Plaidoyer & Droits des femmes',
    'Support psychologique & écoute VBG',
    'Communication digitale & Réseaux sociaux',
    'Photographie & Montage vidéo',
    'Gestion de projet & Logistique terrain',
    'Suivi-Évaluation & Collecte de données'
  ];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleDomain = (domainTitle: string) => {
    setSelectedDomains(prev => 
      prev.includes(domainTitle) ? prev.filter(d => d !== domainTitle) : [...prev, domainTitle]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;

    setLoading(true);
    const res = await registerVolunteer({
      firstName,
      lastName,
      email,
      phone,
      gender,
      city,
      department,
      profession,
      educationLevel,
      skills: selectedSkills,
      interests: selectedDomains,
      availability,
      motivation
    });

    setLoading(false);
    if (res.success) {
      setDossierNumber(`VOL-HD-2025-${Math.floor(1000 + Math.random() * 9000)}`);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  if (submitted) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-xl w-full p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-200">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Candidature Transmise avec Succès
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Bienvenue dans la Famille HEALTHDEV ONG !
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Merci pour votre engagement féministe, <strong>{firstName} {lastName}</strong>. 
              Votre dossier a été enregistré sous le numéro de référence :
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block font-mono font-bold text-lg text-teal-700">
            {dossierNumber}
          </div>

          <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-100 text-left text-xs text-teal-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Prochaines étapes :</span>
            </div>
            <p>1. Notre Responsable RH étudiera vos disponibilités et compétences sous 48h.</p>
            <p>2. Vous recevrez une invitation à l'atelier d'orientation féministe au siège de Parakou.</p>
            <p>3. Votre compte ERP Bénévole est d'ores et déjà actif pour suivre nos activités.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Accéder à mon Espace Bénévole
            </button>
            <button
              onClick={() => setCurrentView('activities')}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition-colors cursor-pointer"
            >
              Voir les prochaines activités
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Engagement Citoyen & Féministe
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
            Devenir Bénévole à HEALTHDEV ONG
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Rejoignez une communauté bienveillante de plus de 80 jeunes volontaires engagés pour la santé, l'égalité des sexes et le développement au Bénin.
          </p>
        </div>

        {/* Stepper Progress */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          {[
            { num: 1, label: 'Identité' },
            { num: 2, label: 'Compétences' },
            { num: 3, label: 'Disponibilité' },
            { num: 4, label: 'Motivation' }
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                step === s.num
                  ? 'bg-teal-600 text-white shadow-xs'
                  : step > s.num
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-400'
              }`}>
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${
                step === s.num ? 'text-slate-900' : 'text-slate-400'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* STEP 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
                  1. Informations Personnelles & Résidence
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Prénom(s) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Yasmine"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nom de famille *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: SOUNNOUKINNY"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Genre *</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                    >
                      <option value="female">Femme</option>
                      <option value="male">Homme</option>
                      <option value="other">Autre / Préfère ne pas préciser</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Numéro WhatsApp / Téléphone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+229 01 92 43 15 95"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@healthdev.ong"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Ville / Commune de résidence *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex: Parakou, N'Dali..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Département (Bénin) *</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                    >
                      <option value="Borgou">Borgou (Siège)</option>
                      <option value="Alibori">Alibori</option>
                      <option value="Donga">Donga</option>
                      <option value="Atacora">Atacora</option>
                      <option value="Collines">Collines</option>
                      <option value="Zou">Zou</option>
                      <option value="Atlantique">Atlantique</option>
                      <option value="Littoral">Littoral (Cotonou)</option>
                      <option value="Ouémé">Ouémé</option>
                      <option value="Plateau">Plateau</option>
                      <option value="Mono">Mono</option>
                      <option value="Couffo">Couffo</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (firstName && lastName && email && phone) setStep(2);
                    }}
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Étape suivante</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Skills */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
                  2. Profil & Compétences Clés
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Profession / Études actuelles *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Étudiante en Droit / Sage-femme"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Niveau d'études *</label>
                    <select
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                    >
                      <option value="Secondaire / BAC">Secondaire / BAC</option>
                      <option value="Licence / BAC+3">Licence / BAC+3</option>
                      <option value="Master / Doctorat">Master / Doctorat</option>
                      <option value="Autre formation professionnelle">Autre formation professionnelle</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Sélectionnez vos domaines d'aptitudes (Plusieurs choix possibles) :
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {skillsOptions.map(skill => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '} {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Étape suivante</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Availability & Domains */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
                  3. Disponibilités & Centres d'Intérêt
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Vos disponibilités habituelles *
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  >
                    <option value="Week-ends et missions ponctuelles">Week-ends et missions ponctuelles</option>
                    <option value="Quelques heures en semaine (soirées)">Quelques heures en semaine (soirées)</option>
                    <option value="Plein temps / Disponible pour missions terrain">Plein temps / Disponible pour missions terrain</option>
                    <option value="Télétravail (Communication / Rédaction)">Télétravail (Communication / Rédaction)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Domaines dans lesquels vous souhaitez vous investir en priorité :
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {NGO_INFO.domains.map(dom => {
                      const isSelected = selectedDomains.includes(dom.title);
                      return (
                        <button
                          key={dom.id}
                          type="button"
                          onClick={() => toggleDomain(dom.title)}
                          className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '} {dom.title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Étape suivante</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Motivation & Ethics Pledge */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
                  4. Motivation & Engagement Féministe
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Qu'est-ce qui vous motive à rejoindre HEALTHDEV ONG ? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Parlez-nous de vos convictions féministes, de votre désir d'aider les adolescentes et communautés de votre région..."
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 leading-relaxed focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  ></textarea>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 text-teal-600 rounded-md border-slate-300 focus:ring-teal-500 cursor-pointer"
                    />
                    <label htmlFor="agree" className="text-xs text-slate-700 leading-snug cursor-pointer">
                      J'adhère sans réserve aux <strong>valeurs féministes, à la charte d'éthique et aux principes de tolérance zéro contre les violences et l'exploitation</strong> de HEALTHDEV ONG. Je certifie l'exactitude des informations fournies.
                    </label>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour</span>
                  </button>

                  <button
                    type="submit"
                    disabled={!agreeTerms || loading}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                      agreeTerms && !loading
                        ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enregistrement en cours...</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 fill-white" />
                        <span>Soumettre ma candidature de bénévole</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
