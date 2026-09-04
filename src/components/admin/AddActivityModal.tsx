import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ActivityStatus } from '../../types';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Plus,
  FileText,
  Building,
  Target
} from 'lucide-react';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddActivityModal: React.FC<AddActivityModalProps> = ({ isOpen, onClose }) => {
  const { addActivity, projects, currentUser } = useApp();

  // Form states with the requested core fields: Nom, Description, Date, Heure
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(() => {
    // Default to tomorrow or today's date
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('09:00');
  
  // Additional helpful contextual fields with sensible defaults
  const [location, setLocation] = useState('');
  const [commune, setCommune] = useState('Parakou');
  const [department, setDepartment] = useState('Borgou');
  const [projectId, setProjectId] = useState(projects[0]?.id || 'proj-pesca');
  const [responsible, setResponsible] = useState(currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Direction des Programmes');
  const [requiredVolunteers, setRequiredVolunteers] = useState<number>(10);
  const [targetParticipants, setTargetParticipants] = useState<number>(50);
  const [expectedResults, setExpectedResults] = useState('');
  const [status, setStatus] = useState<ActivityStatus>('upcoming');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;
  if (currentUser?.role === 'volunteer') return null;

  const departmentsList = ['Borgou', 'Alibori', 'Donga', 'Atacora', 'Collines', 'Atlantique', 'Littoral', 'Ouémé', 'Mono', 'Couffo', 'Zou', 'Plateau'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (currentUser?.role === 'volunteer') {
      setError('Les bénévoles ne sont pas autorisés à publier des activités.');
      return;
    }

    // Validation
    if (!title.trim()) {
      setError('Veuillez renseigner le nom de l\'activité.');
      return;
    }
    if (!description.trim()) {
      setError('Veuillez fournir une description détaillée de l\'activité.');
      return;
    }
    if (!date) {
      setError('Veuillez choisir une date pour l\'événement.');
      return;
    }
    if (!time) {
      setError('Veuillez indiquer l\'heure de début de l\'événement.');
      return;
    }

    setIsSubmitting(true);

    const selectedProj = projects.find(p => p.id === projectId);

    addActivity({
      title: title.trim(),
      description: description.trim(),
      date,
      time,
      location: location.trim() || 'Salle Polyvalente, Parakou',
      commune: commune.trim() || 'Parakou',
      department,
      projectId,
      projectName: selectedProj ? selectedProj.title : 'Programme Propre HEALTHDEV ONG',
      objectives: [
        'Mobilisation citoyenne et sensibilisation communautaire',
        'Promotion de la santé et des droits humains'
      ],
      responsible: responsible.trim() || 'Direction des Programmes',
      teamMembers: [responsible.trim() || 'Équipe terrain HEALTHDEV'],
      assignedVolunteers: [],
      registeredVolunteers: [],
      requiredVolunteers: Number(requiredVolunteers) || 10,
      targetParticipants: Number(targetParticipants) || 50,
      actualParticipants: 0,
      expectedResults: expectedResults.trim() || 'Participation effective et renforcement des capacités des bénéficiaires.',
      budgetPlanned: 150000,
      budgetUsed: 0,
      status,
      progressPercent: 0,
      photos: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800'],
      documents: []
    });

    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                Administration Événements
              </span>
              <span className="text-xs text-slate-400 font-medium">Création d'activité</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-1">
              Publier une Nouvelle Activité
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Renseignez le nom, la description, la date et l'heure pour ouvrir les inscriptions aux bénévoles.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback alert */}
        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-rose-800 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Activité publiée avec succès ! Les bénévoles recevront une notification pour se déclarer.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Core field 1: Nom de l'activité */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block text-xs">
              Nom / Titre de l'activité <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Atelier de formation des jeunes pairs éducateurs sur la SSR et les VBG"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 font-medium focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:bg-white text-xs sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Core field 2: Description */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block text-xs">
              Description détaillée <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez les objectifs, le public cible, le déroulement et ce que les bénévoles feront durant cet événement..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 font-medium focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:bg-white leading-relaxed text-xs"
              required
            />
          </div>

          {/* Core fields 3 & 4: Date et Heure (prominently grouped) */}
          <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-100/80 space-y-3">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-xs">
              <Calendar className="w-4 h-4 text-teal-700" />
              <span>Date et Heure de l'événement</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700 block">
                  Date de l'événement <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-teal-200 rounded-xl text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-teal-600 text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700 block">
                  Heure de début <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-teal-200 rounded-xl text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-teal-600 text-xs"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1 sm:col-span-1">
              <label className="font-semibold text-slate-700 block">
                Département
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
              >
                {departmentsList.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1 sm:col-span-1">
              <label className="font-semibold text-slate-700 block">
                Commune
              </label>
              <input
                type="text"
                value={commune}
                onChange={(e) => setCommune(e.target.value)}
                placeholder="Parakou, N'Dali..."
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div className="space-y-1 sm:col-span-1">
              <label className="font-semibold text-slate-700 block">
                Lieu précis
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Maison des Jeunes"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          {/* Project & Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1 sm:col-span-1">
              <label className="font-semibold text-slate-700 block">
                Projet associé
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 truncate"
              >
                {projects.map(proj => (
                  <option key={proj.id} value={proj.id}>{proj.title}</option>
                ))}
                <option value="proj-propre">Activités statutaires / Projets propres</option>
              </select>
            </div>

            <div className="space-y-1 sm:col-span-1">
              <label className="font-semibold text-slate-700 block">
                Bénévoles requis
              </label>
              <input
                type="number"
                min={1}
                max={500}
                value={requiredVolunteers}
                onChange={(e) => setRequiredVolunteers(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 font-bold"
              />
            </div>

            <div className="space-y-1 sm:col-span-1">
              <label className="font-semibold text-slate-700 block">
                Statut initial
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ActivityStatus)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 font-semibold"
              >
                <option value="upcoming">À venir (Inscriptions ouvertes)</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Déjà réalisée</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={isSubmitting || success}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-md shadow-teal-600/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>Publier l'activité</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
