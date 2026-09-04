import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, ActivityRegisteredVolunteer } from '../../types';
import {
  X,
  Users,
  Search,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  UserCheck,
  UserX,
  Copy,
  Download,
  Calendar,
  MapPin,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface ActivityParticipantsModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ActivityParticipantsModal: React.FC<ActivityParticipantsModalProps> = ({
  activity,
  isOpen,
  onClose
}) => {
  const { updateParticipantStatus, cancelActivityRegistration, users } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'declared' | 'confirmed' | 'attended' | 'cancelled'>('all');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  if (!isOpen || !activity) return null;

  // Retrieve declared participants from activity.registeredVolunteers, with fallback to assignedVolunteers
  const declaredList: ActivityRegisteredVolunteer[] = (activity.registeredVolunteers || []).length > 0
    ? activity.registeredVolunteers!
    : (activity.assignedVolunteers || []).map((name, idx) => {
        const matchingUser = users.find(u => `${u.firstName} ${u.lastName}`.toLowerCase() === name.toLowerCase());
        return {
          userId: matchingUser ? matchingUser.id : `vol-${idx}`,
          name,
          email: matchingUser ? matchingUser.email : 'contact@healthdev.ong',
          phone: matchingUser?.phone || '+229 01 00 00 00',
          role: matchingUser?.role || 'volunteer',
          registeredAt: activity.createdAt || '2026-09-01',
          status: 'confirmed' as const
        };
      });

  // Filter participants
  const filteredParticipants = declaredList.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.email && p.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.phone && p.phone.includes(searchTerm));

    const matchesStatus = statusFilter === 'all' || (p.status || 'declared') === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const countDeclared = declaredList.filter(p => (p.status || 'declared') === 'declared').length;
  const countConfirmed = declaredList.filter(p => p.status === 'confirmed').length;
  const countAttended = declaredList.filter(p => p.status === 'attended').length;

  const copyContacts = (type: 'phones' | 'emails') => {
    const items = declaredList
      .map(p => type === 'phones' ? p.phone : p.email)
      .filter(Boolean);
    
    navigator.clipboard.writeText(items.join(', '));
    setCopiedNotification(`Liste des ${type === 'phones' ? 'numéros' : 'adresses email'} copiée !`);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'attended':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3" /> Présence confirmée
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-300">
            <UserCheck className="w-3 h-3" /> Inscription validée
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <UserX className="w-3 h-3" /> Désisté
          </span>
        );
      case 'declared':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
            <Clock className="w-3 h-3 text-amber-700" /> Déclaré(e) participant(e)
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 bg-linear-to-r from-slate-900 via-slate-800 to-teal-950 text-white flex items-start justify-between gap-4 border-b border-slate-700">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-teal-500/20 text-teal-300 border border-teal-500/40 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                Registre des inscriptions
              </span>
              <span className="text-xs text-slate-300">
                {declaredList.length} participant(s) déclaré(s)
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              {activity.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-400" />
                {activity.date} à {activity.time || '09:00'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                {activity.location || activity.commune || 'Borgou'}
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-teal-300">
                <Users className="w-3.5 h-3.5" />
                Objectif : {activity.requiredVolunteers || 10} bénévoles
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Copy Notification Toast */}
        {copiedNotification && (
          <div className="bg-teal-700 text-white text-xs font-bold px-4 py-2 text-center animate-in fade-in flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{copiedNotification}</span>
          </div>
        )}

        {/* Filter bar & Quick actions */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher nom, email, tél..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-600 text-xs"
            />
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tous ({declaredList.length})
            </button>
            <button
              onClick={() => setStatusFilter('declared')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                statusFilter === 'declared'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-200'
              }`}
            >
              Déclarés ({countDeclared})
            </button>
            <button
              onClick={() => setStatusFilter('confirmed')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                statusFilter === 'confirmed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-200'
              }`}
            >
              Confirmés ({countConfirmed})
            </button>
            <button
              onClick={() => setStatusFilter('attended')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                statusFilter === 'attended'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-200'
              }`}
            >
              Présents ({countAttended})
            </button>
          </div>

          {/* Copy actions */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => copyContacts('phones')}
              title="Copier tous les numéros de téléphone pour diffusion WhatsApp"
              className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span>Copier téléphones</span>
            </button>
            <button
              onClick={() => copyContacts('emails')}
              title="Copier les adresses emails pour envoi groupé"
              className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>Copier emails</span>
            </button>
          </div>
        </div>

        {/* Participants Table / List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filteredParticipants.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Users className="w-7 h-7" />
              </div>
              <p className="text-slate-800 font-bold text-sm">
                Aucun participant trouvé pour ces critères
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {searchTerm
                  ? 'Aucun participant ne correspond à votre recherche.'
                  : 'Aucun bénévole ou utilisateur ne s\'est encore déclaré pour cette activité.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              {filteredParticipants.map((participant, index) => {
                return (
                  <div
                    key={`${participant.userId}-${index}`}
                    className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    {/* Participant identity */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 font-black text-sm flex items-center justify-center shrink-0 border border-teal-200 shadow-2xs">
                        {participant.name.slice(0, 2).toUpperCase()}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">
                            {participant.name}
                          </h4>
                          {getStatusBadge(participant.status)}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          {participant.email && (
                            <a
                              href={`mailto:${participant.email}`}
                              className="inline-flex items-center gap-1 hover:text-teal-600 transition-colors"
                            >
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span>{participant.email}</span>
                            </a>
                          )}
                          {participant.phone && (
                            <a
                              href={`tel:${participant.phone}`}
                              className="inline-flex items-center gap-1 hover:text-teal-600 transition-colors font-medium text-slate-700"
                            >
                              <Phone className="w-3 h-3 text-slate-400" />
                              <span>{participant.phone}</span>
                            </a>
                          )}
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                            <Clock className="w-3 h-3" />
                            Inscrit le {participant.registeredAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Admin status actions */}
                    <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                      {participant.status !== 'confirmed' && (
                        <button
                          onClick={() => updateParticipantStatus(activity.id, participant.userId, 'confirmed')}
                          className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-blue-200"
                          title="Confirmer la candidature du bénévole"
                        >
                          Valider
                        </button>
                      )}

                      {participant.status !== 'attended' && (
                        <button
                          onClick={() => updateParticipantStatus(activity.id, participant.userId, 'attended')}
                          className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-emerald-200"
                          title="Marquer présent sur le terrain"
                        >
                          Présent
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (confirm(`Retirer ${participant.name} de la liste des participants pour cette activité ?`)) {
                            cancelActivityRegistration(activity.id, participant.userId);
                          }
                        }}
                        className="px-2 py-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        title="Retirer ce participant"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">
              Total déclaré : {declaredList.length} participant(s)
            </span>
            <span>•</span>
            <span className="text-slate-500">
              Bénévoles requis : {activity.requiredVolunteers || 10}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
