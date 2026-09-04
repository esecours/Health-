import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VbgReport, VbgStatus, VbgUrgencyLevel } from '../../types';
import {
  ShieldAlert,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  UserCheck,
  EyeOff,
  MapPin,
  Calendar,
  PhoneCall,
  FileText,
  User,
  ShieldCheck,
  Building2,
  X,
  MessageSquare
} from 'lucide-react';

export const VbgManager: React.FC = () => {
  const { vbgReports, updateVbgReportStatus, addVbgReportNote, currentUser } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');

  const [selectedReport, setSelectedReport] = useState<VbgReport | null>(null);

  // Modal Editing State
  const [newStatus, setNewStatus] = useState<VbgStatus>('submitted');
  const [assignedAgent, setAssignedAgent] = useState('');
  const [noteText, setNoteText] = useState('');
  const [isPublicNote, setIsPublicNote] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  // Filtering
  const filteredReports = vbgReports.filter(rep => {
    const matchesSearch =
      rep.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.commune.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.vbgTypeLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rep.reporterName && rep.reporterName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || rep.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'all' || rep.urgencyLevel === urgencyFilter;

    return matchesSearch && matchesStatus && matchesUrgency;
  });

  // KPI Stats
  const totalCount = vbgReports.length;
  const criticalCount = vbgReports.filter(r => r.urgencyLevel === 'critical').length;
  const inProgressCount = vbgReports.filter(r => r.status === 'in_progress' || r.status === 'assigned').length;
  const resolvedCount = vbgReports.filter(r => r.status === 'resolved').length;
  const anonymousCount = vbgReports.filter(r => r.isAnonymous).length;

  const handleOpenReport = (rep: VbgReport) => {
    setSelectedReport(rep);
    setNewStatus(rep.status);
    setAssignedAgent(rep.assignedAgent || '');
    setNoteText('');
    setSuccessMsg('');
  };

  const handleUpdateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport) return;

    updateVbgReportStatus(
      selectedReport.id,
      newStatus,
      assignedAgent,
      noteText,
      isPublicNote
    );

    setSuccessMsg('Mise à jour enregistrée avec succès !');
    setTimeout(() => setSuccessMsg(''), 2500);

    // Refresh selected object from state
    const updated = vbgReports.find(r => r.id === selectedReport.id);
    if (updated) {
      setSelectedReport({
        ...updated,
        status: newStatus,
        assignedAgent,
        notes: [
          ...(updated.notes || []),
          ...(noteText.trim()
            ? [
                {
                  id: `note-${Date.now()}`,
                  author: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'HEALTHDEV ONG',
                  role: currentUser?.poste || 'Cellule VBG',
                  date: new Date().toLocaleString('fr-FR'),
                  text: noteText.trim(),
                  isPublicForReporter: isPublicNote
                }
              ]
            : [])
        ]
      });
    }
    setNoteText('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 p-6 rounded-3xl border border-rose-900/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black font-display text-white">
              Gestion & Suivi des Signalements VBG
            </h2>
            <p className="text-xs text-slate-300">
              Cellule Nationale d'Écoute, de Protection et de Prise en Charge (Violences Basées sur le Genre).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-xs font-bold border border-rose-500/30">
            Confidentialité Réseau Sécurisée
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Signalements</span>
          <p className="text-2xl font-black text-white mt-1">{totalCount}</p>
        </div>

        <div className="bg-rose-950/60 p-4 rounded-2xl border border-rose-700/50">
          <span className="text-[10px] font-bold text-rose-300 uppercase flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            Urgences Vitales
          </span>
          <p className="text-2xl font-black text-rose-200 mt-1">{criticalCount}</p>
        </div>

        <div className="bg-teal-950/60 p-4 rounded-2xl border border-teal-700/50">
          <span className="text-[10px] font-bold text-teal-300 uppercase">En Prise en Charge</span>
          <p className="text-2xl font-black text-teal-200 mt-1">{inProgressCount}</p>
        </div>

        <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-700/50">
          <span className="text-[10px] font-bold text-emerald-300 uppercase">Dossiers Résolus</span>
          <p className="text-2xl font-black text-emerald-200 mt-1">{resolvedCount}</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Signalements Anonymes</span>
          <p className="text-2xl font-black text-amber-300 mt-1">{anonymousCount}</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Rechercher code, commune, département..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white cursor-pointer focus:outline-none focus:border-teal-500"
          >
            <option value="all">Tous les Statuts</option>
            <option value="submitted">Enregistrés</option>
            <option value="under_review">En cours d'analyse</option>
            <option value="assigned">Agent assigné</option>
            <option value="in_progress">Prise en charge active</option>
            <option value="resolved">Résolus / Pris en charge</option>
          </select>

          <select
            value={urgencyFilter}
            onChange={e => setUrgencyFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white cursor-pointer focus:outline-none focus:border-teal-500"
          >
            <option value="all">Toutes Urgences</option>
            <option value="critical">🔴 Danger Immédiat</option>
            <option value="high">Élevée</option>
            <option value="medium">Moyenne</option>
            <option value="low">Faible</option>
          </select>
        </div>
      </div>

      {/* Table of Reports */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">Code & Confidentialité</th>
                <th className="p-3.5">Nature VBG</th>
                <th className="p-3.5">Urgence</th>
                <th className="p-3.5">Localisation</th>
                <th className="p-3.5">Statut</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 text-xs">
                    Aucun signalement VBG ne correspond à vos critères.
                  </td>
                </tr>
              ) : (
                filteredReports.map(report => (
                  <tr key={report.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-teal-300">{report.trackingCode}</span>
                        {report.isAnonymous ? (
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[9px] font-bold flex items-center gap-1 border border-slate-700">
                            <EyeOff className="w-2.5 h-2.5" />
                            Anonyme
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-teal-950 text-teal-300 text-[9px] font-bold flex items-center gap-1 border border-teal-800">
                            <UserCheck className="w-2.5 h-2.5" />
                            Identifié
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {new Date(report.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </td>

                    <td className="p-3.5 font-bold text-white max-w-xs truncate">
                      {report.vbgTypeLabel}
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                        report.urgencyLevel === 'critical'
                          ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                          : report.urgencyLevel === 'high'
                          ? 'bg-orange-950 text-orange-300 border-orange-700'
                          : report.urgencyLevel === 'medium'
                          ? 'bg-amber-950 text-amber-300 border-amber-700'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {report.urgencyLevel === 'critical' ? '🔴 Danger Vitale' : report.urgencyLevel}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-bold text-slate-200">{report.commune}</span>
                      <span className="text-[10px] text-slate-400 block">({report.department})</span>
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        report.status === 'resolved'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                          : report.status === 'in_progress'
                          ? 'bg-teal-950 text-teal-300 border-teal-700'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {report.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenReport(report)}
                        className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 ml-auto cursor-pointer transition-all shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspecter</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* Inspect & Action Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              type="button"
              onClick={() => setSelectedReport(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center cursor-pointer transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4 pr-10">
              <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-black text-amber-400">{selectedReport.trackingCode}</span>
                  {selectedReport.isAnonymous ? (
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold border border-slate-700">
                      Anonyme
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-teal-950 text-teal-300 text-[10px] font-bold border border-teal-800">
                      Déclarant Identifié
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedReport.vbgTypeLabel}</h3>
              </div>
            </div>

            {/* Detailed Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Localisation</span>
                <p className="font-bold text-white">{selectedReport.commune} ({selectedReport.department})</p>
                {selectedReport.locationDetails && (
                  <p className="text-[11px] text-slate-300">{selectedReport.locationDetails}</p>
                )}
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Déclarant / Victime</span>
                <p className="font-bold text-slate-200">
                  {selectedReport.isAnonymous
                    ? 'Déclarant Anonyme'
                    : `${selectedReport.reporterName || 'N/A'} (${selectedReport.reporterPhone || 'N/A'})`}
                </p>
                <p className="text-[11px] text-slate-400">
                  Genre: {selectedReport.victimGender} • Âge: {selectedReport.victimAgeGroup}
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 sm:col-span-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Description des faits</span>
                <p className="text-slate-200 leading-relaxed font-sans mt-1">{selectedReport.description}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 sm:col-span-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Prise en charge & Appuis requis</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedReport.supportRequested.map((sup, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-teal-950 text-teal-300 text-[11px] font-bold border border-teal-800">
                      {sup}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Form for Admin */}
            <form onSubmit={handleUpdateReport} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Mettre à jour la Prise en Charge & Réponse</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Nouveau Statut Dossier :</label>
                  <select
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value as VbgStatus)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 cursor-pointer"
                  >
                    <option value="submitted">1. Enregistré / Nouveau</option>
                    <option value="under_review">2. En cours d'analyse</option>
                    <option value="assigned">3. Agent assigné</option>
                    <option value="in_progress">4. Prise en charge active</option>
                    <option value="resolved">5. Résolu / Pris en charge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Assistante Sociale / Agent Référent :</label>
                  <input
                    type="text"
                    value={assignedAgent}
                    onChange={e => setAssignedAgent(e.target.value)}
                    placeholder="Ex: Mme Rollande GNANGNI (Assistante Sociale)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Consigne de sécurité / Message d'avancement pour le déclarant :
                </label>
                <textarea
                  rows={3}
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  placeholder="Inscrivez les mesures de protection prises ou les instructions à transmettre au déclarant via son code de suivi..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublicNote}
                    onChange={e => setIsPublicNote(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-teal-600 focus:ring-0 cursor-pointer"
                  />
                  <span>Rendre ce message visible sur le code de suivi du déclarant</span>
                </label>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enregistrer les Mises à jour</span>
                </button>
              </div>

              {successMsg && (
                <p className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{successMsg}</span>
                </p>
              )}
            </form>

            {/* Existing Notes Log */}
            {selectedReport.notes && selectedReport.notes.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-400 uppercase">Historique des interventions ({selectedReport.notes.length})</h5>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {selectedReport.notes.map((n, i) => (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-bold text-teal-300">{n.author} ({n.role})</span>
                        <span>{n.date}</span>
                      </div>
                      <p className="text-slate-300 mt-1 font-sans">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
