import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';
import { 
  X, 
  Upload, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Check, 
  Camera, 
  Sparkles,
  Tag,
  Plus,
  Trash2,
  Calendar,
  Heart,
  Save,
  Clock,
  IdCard,
  Image as ImageIcon
} from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser?: UserProfile | null;
}

const PRESET_AVATARS = [
  '/default_avatar_f.jpg',
  '/default_avatar_m.jpg',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
];

const BENIN_DEPARTMENTS = [
  'Borgou',
  'Alibori',
  'Atacora',
  'Donga',
  'Atlantique',
  'Littoral',
  'Ouémé',
  'Plateau',
  'Zou',
  'Collines',
  'Mono',
  'Couffo'
];

const SUGGESTED_SKILLS = [
  'Santé sexuelle & reproductive',
  'Animation de causeries éducatives',
  'Plaidoyer féministe',
  'Sensibilisation communautaire',
  'Communication digitale',
  'Logistique de caravane',
  'Suivi & Évaluation (M&E)',
  'Premiers secours',
  'Traduction Bariba / Dendi',
  'Mobilisation des jeunes'
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  targetUser
}) => {
  const { currentUser, updateProfile } = useApp();
  const user = targetUser || currentUser;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('Borgou');
  const [address, setAddress] = useState('');
  const [profession, setProfession] = useState('');
  const [poste, setPoste] = useState('');
  const [matricule, setMatricule] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [gender, setGender] = useState<'female' | 'male' | 'other' | 'F' | 'M' | 'Autre'>('F');
  const [birthDate, setBirthDate] = useState('');
  const [availability, setAvailability] = useState('');
  const [motivation, setMotivation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkillInput, setNewSkillInput] = useState('');

  const [activeTab, setActiveTab] = useState<'info' | 'avatar' | 'skills'>('info');
  const [isSaved, setIsSaved] = useState(false);
  const [avatarMode, setAvatarMode] = useState<'upload' | 'preset' | 'url'>('upload');
  const [customUrlInput, setCustomUrlInput] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when user or modal opens
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setPhone(user.phone || '');
      setCity(user.city || '');
      setDepartment(user.department || 'Borgou');
      setAddress(user.address || '');
      setProfession(user.profession || '');
      setPoste(user.poste || user.profession || '');
      setMatricule(user.matricule || `HD-BEN-${(user.id || '01').replace(/\D/g, '').slice(-4).padStart(4, '0')}`);
      setEducationLevel(user.educationLevel || '');
      setGender(user.gender || 'F');
      setBirthDate(user.birthDate || '');
      setAvailability(user.availability || '');
      setMotivation(user.motivation || '');
      setAvatarUrl(user.avatarUrl || PRESET_AVATARS[0]);
      setCustomUrlInput(user.avatarUrl || '');
      setSkills(Array.isArray(user.skills) ? [...user.skills] : []);
      setIsSaved(false);
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  // Handle local file upload via FileReader (base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Veuillez sélectionner une image de moins de 5 Mo.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setAvatarUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    updateProfile(user.id, {
      firstName,
      lastName,
      phone,
      city,
      department,
      address,
      profession,
      poste,
      matricule,
      educationLevel,
      gender,
      birthDate,
      availability,
      motivation,
      avatarUrl,
      skills
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black font-display text-white">
                Modifier mon Profil & Photo
              </h2>
              <p className="text-xs text-slate-400">
                Mise à jour des coordonnées personnelles, de la photo et des compétences
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Bar */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3.5">
            <div className="relative group">
              <img
                src={avatarUrl || '/default_avatar.jpg'}
                alt="Aperçu avatar"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-600 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setActiveTab('avatar')}
                className="absolute -bottom-1 -right-1 p-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-sm text-[10px] cursor-pointer"
                title="Changer la photo"
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>

            <div>
              <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span>{firstName || 'Prénom'} {lastName || 'Nom'}</span>
                <span className="px-2 py-0.5 bg-teal-100 text-teal-800 text-[10px] font-black rounded-md uppercase">
                  {user.role === 'volunteer' ? 'Bénévole' : user.role}
                </span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{city || 'Ville'}, {department || 'Bénin'}</span>
                <span className="text-slate-300">•</span>
                <span>{profession || 'Profession non définie'}</span>
              </div>
            </div>
          </div>

          {/* Quick Sub-tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold w-full sm:w-auto overflow-x-auto justify-between sm:justify-start">
            <button
              type="button"
              onClick={() => setActiveTab('info')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap text-center flex-1 sm:flex-none ${
                activeTab === 'info' ? 'bg-[#144D32] text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Infos Générales
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('avatar')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap text-center flex-1 sm:flex-none ${
                activeTab === 'avatar' ? 'bg-[#144D32] text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Camera className="w-3 h-3" />
              <span>Photo</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('skills')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap text-center flex-1 sm:flex-none ${
                activeTab === 'skills' ? 'bg-[#144D32] text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Tag className="w-3 h-3" />
              <span>Compétences ({skills.length})</span>
            </button>
          </div>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
            
            {/* TAB 1: GENERAL INFORMATIONS */}
            {activeTab === 'info' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Prénom <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Ex: Marcelline"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Nom de famille <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Ex: Bio Sounon"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Numéro de Téléphone (WhatsApp) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+229 97 00 00 00"
                        className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Adresse Email (Identifiant de connexion)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full pl-9 pr-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Genre
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium cursor-pointer"
                    >
                      <option value="F">Féminin</option>
                      <option value="M">Masculin</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Ville de Résidence <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex: Parakou"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Département (Bénin) <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium cursor-pointer"
                    >
                      {BENIN_DEPARTMENTS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Badge & Official Accreditation Info */}
                <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-teal-900 font-black text-xs uppercase tracking-wider">
                      <IdCard className="w-4 h-4 text-teal-700" />
                      <span>Accréditation & Badge Officiel HEALTHDEV</span>
                    </div>
                    {(currentUser?.role === 'super_admin' || currentUser?.role === 'admin') ? (
                      <span className="px-2 py-0.5 bg-teal-600 text-white text-[10px] font-bold rounded-md uppercase">
                        Mode Édition Admin / RH
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded-md uppercase flex items-center gap-1">
                        <Lock className="w-3 h-3 text-slate-500" />
                        Attribué par RH
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">
                        Poste officiel accordé (sur le badge) <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-teal-700 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={poste}
                          onChange={(e) => setPoste(e.target.value)}
                          disabled={currentUser?.role !== 'super_admin' && currentUser?.role !== 'admin'}
                          placeholder="Ex: Bénévole Terrain, Sage-femme..."
                          className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border font-semibold text-slate-900 text-sm ${
                            currentUser?.role === 'super_admin' || currentUser?.role === 'admin'
                              ? 'bg-white border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500'
                              : 'bg-slate-100/90 border-slate-200 cursor-not-allowed text-slate-700'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-teal-800 font-medium mt-1 block">
                        {currentUser?.role === 'super_admin' || currentUser?.role === 'admin'
                          ? "Vous pouvez modifier le titre officiel attribué à ce compte pour son badge."
                          : "Ce poste est accordé par la Direction RH & l'Administration de l'ONG et apparaît sur votre badge."}
                      </span>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-800 mb-1">
                        Matricule Officiel du Membre
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={matricule}
                          onChange={(e) => setMatricule(e.target.value)}
                          disabled={currentUser?.role !== 'super_admin' && currentUser?.role !== 'admin'}
                          placeholder="HD-BEN-XXXX"
                          className={`w-full px-3.5 py-2.5 rounded-xl border font-mono font-black text-sm ${
                            currentUser?.role === 'super_admin' || currentUser?.role === 'admin'
                              ? 'bg-white border-teal-300 text-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-500'
                              : 'bg-slate-100/90 border-slate-200 cursor-not-allowed text-slate-700'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        Numéro unique d'accréditation officiel délivré par l'Administration.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Profession / Occupation
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        placeholder="Ex: Sage-femme, Juriste, Étudiant(e)..."
                        className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Niveau d'études / Diplôme
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={educationLevel}
                        onChange={(e) => setEducationLevel(e.target.value)}
                        placeholder="Ex: Licence en Santé Publique, Master..."
                        className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Disponibilité pour les missions
                    </label>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium cursor-pointer"
                    >
                      <option value="">Sélectionner une disponibilité...</option>
                      <option value="Week-ends uniquement">Week-ends uniquement</option>
                      <option value="En semaine (matin ou après-midi)">En semaine (matin ou après-midi)</option>
                      <option value="Temps plein / Disponible immédiatement">Temps plein / Disponible immédiatement</option>
                      <option value="Caravanes ponctuelles & vacances">Caravanes ponctuelles & vacances</option>
                      <option value="Télétravail / En ligne (Média, com)">Télétravail / En ligne (Média, com)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Date de naissance
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Motivation & Biographie personnelle (Courte présentation)
                  </label>
                  <textarea
                    rows={3}
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    placeholder="Décrivez votre engagement pour les droits des femmes, la santé sexuelle et le développement communautaire..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: PROFILE PICTURE (AVATAR) */}
            {activeTab === 'avatar' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="bg-teal-50/50 p-4 rounded-2xl border border-teal-200 flex items-start gap-3">
                  <Camera className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="font-black text-teal-900 text-sm">
                      Personnalisez votre Photo de Profil
                    </h4>
                    <p className="text-teal-800 leading-relaxed text-[11px]">
                      Votre photo apparaîtra sur votre <strong>badge officiel d'accréditation HEALTHDEV ONG</strong>, 
                      dans la liste des présences aux activités et dans l'annuaire de l'équipe.
                    </p>
                  </div>
                </div>

                {/* Avatar mode switcher */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <button
                    type="button"
                    onClick={() => setAvatarMode('upload')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      avatarMode === 'upload' 
                        ? 'bg-[#144D32] text-white shadow-xs' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Téléverser un fichier</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatarMode('preset')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      avatarMode === 'preset' 
                        ? 'bg-[#144D32] text-white shadow-xs' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Galerie d'avatars</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatarMode('url')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      avatarMode === 'url' 
                        ? 'bg-[#144D32] text-white shadow-xs' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Lien image externe</span>
                  </button>
                </div>

                {/* Option 1: File Upload */}
                {avatarMode === 'upload' && (
                  <div className="space-y-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/30 hover:bg-teal-50/60 rounded-3xl p-8 text-center cursor-pointer transition-all space-y-3 group"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-teal-100 group-hover:scale-105 transition-transform text-teal-700 flex items-center justify-center mx-auto shadow-xs">
                        <Upload className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-800 block">
                          Cliquez pour choisir une photo depuis votre appareil
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Formats acceptés : JPG, PNG, WEBP (Max 5 Mo). L'image est automatiquement ajustée pour le badge.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="px-4 py-2 bg-[#144D32] text-white rounded-xl font-bold hover:bg-[#0e3b26] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Sélectionner mon image</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Option 2: Presets */}
                {avatarMode === 'preset' && (
                  <div className="space-y-3">
                    <p className="font-bold text-slate-700">
                      Choisissez un avatar parmi la sélection officielle :
                    </p>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                      {PRESET_AVATARS.map((url, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatarUrl(url)}
                          className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition-all cursor-pointer group ${
                            avatarUrl === url 
                              ? 'border-teal-600 ring-4 ring-teal-500/20 scale-105' 
                              : 'border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          <img 
                            src={url} 
                            alt={`Preset ${idx + 1}`} 
                            className="w-full h-full object-cover" 
                          />
                          {avatarUrl === url && (
                            <div className="absolute inset-0 bg-teal-900/40 flex items-center justify-center">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Option 3: Custom URL */}
                {avatarMode === 'url' && (
                  <div className="space-y-3">
                    <label className="block font-bold text-slate-700">
                      URL de l'image
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={customUrlInput}
                        onChange={(e) => setCustomUrlInput(e.target.value)}
                        placeholder="https://mon-serveur.com/ma-photo.jpg"
                        className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (customUrlInput.trim()) {
                            setAvatarUrl(customUrlInput.trim());
                          }
                        }}
                        className="px-4 py-2.5 bg-[#144D32] hover:bg-[#0e3b26] text-white rounded-xl font-bold cursor-pointer"
                      >
                        Appliquer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SKILLS & INTERESTS */}
            {activeTab === 'skills' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="space-y-2">
                  <label className="block font-bold text-slate-700">
                    Vos Compétences & Domaines d'expertise
                  </label>
                  <p className="text-slate-500 text-[11px]">
                    Ces compétences aident les coordinateurs de projets à vous assigner aux activités terrain appropriées.
                  </p>

                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill(newSkillInput);
                        }
                      }}
                      placeholder="Ajouter une compétence (ex: Animation, Plaidoyer, Bariba)..."
                      className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddSkill(newSkillInput)}
                      className="px-4 py-2 bg-[#144D32] hover:bg-[#0e3b26] text-white rounded-xl font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter</span>
                    </button>
                  </div>
                </div>

                {/* Current Skills Chips */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-600 block">
                    Compétences enregistrées ({skills.length}) :
                  </span>
                  {skills.length === 0 ? (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-400 text-center">
                      Aucune compétence renseignée. Cliquez sur les suggestions ci-dessous pour en ajouter rapidement.
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 font-bold"
                        >
                          <Tag className="w-3 h-3 text-teal-600" />
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-teal-400 hover:text-rose-600 cursor-pointer ml-1"
                            title="Retirer"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Suggested Skills */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <span className="font-bold text-slate-500 block">
                    Suggestions rapides (Cliquez pour ajouter) :
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_SKILLS.filter(s => !skills.includes(s)).map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleAddSkill(s)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-600 font-medium transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3 text-slate-400" />
                        <span>{s}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-bold cursor-pointer transition-colors"
            >
              Annuler
            </button>

            <div className="flex items-center gap-2">
              {isSaved && (
                <span className="text-emerald-700 font-bold flex items-center gap-1 animate-in fade-in">
                  <Check className="w-4 h-4" />
                  Profil enregistré avec succès !
                </span>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#144D32] hover:bg-[#0e3b26] text-white rounded-xl font-black flex items-center gap-2 transition-all shadow-md shadow-[#144D32]/20 cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#F5C84F]" />
                <span>Enregistrer mon profil</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
