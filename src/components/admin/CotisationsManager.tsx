import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Contribution } from '../../types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign, 
  Users, 
  Globe, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  AlertCircle,
  X,
  CreditCard,
  FileText,
  Smartphone
} from 'lucide-react';

interface CotisationsManagerProps {
  onOpenPaymentModalFor?: (contrib: Contribution) => void;
}

export const CotisationsManager: React.FC<CotisationsManagerProps> = ({ onOpenPaymentModalFor }) => {
  const { contributions = [], addContribution, updateContribution, deleteContribution, payments = [] } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContrib, setEditingContrib] = useState<Contribution | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(5000);
  const [deadline, setDeadline] = useState('2025-12-31');
  const [targetYear, setTargetYear] = useState<number>(new Date().getFullYear());
  const [targetAudience, setTargetAudience] = useState<'volunteers_only' | 'public'>('volunteers_only');
  const [instructions, setInstructions] = useState('Paiement via Mobile Money (MTN / Moov) ou carte bancaire.');
  const [frequency, setFrequency] = useState('Annuelle');
  const [status, setStatus] = useState<'active' | 'closed'>('active');

  const openAddModal = () => {
    setEditingContrib(null);
    setTitle('');
    setDescription('');
    setAmount(10000);
    setDeadline(`${new Date().getFullYear()}-12-31`);
    setTargetYear(new Date().getFullYear());
    setTargetAudience('volunteers_only');
    setInstructions('Paiement par MTN MoMo / Moov Money ou Espèces à la caisse du siège.');
    setFrequency('Annuelle');
    setStatus('active');
    setIsModalOpen(true);
  };

  const openEditModal = (contrib: Contribution) => {
    setEditingContrib(contrib);
    setTitle(contrib.title);
    setDescription(contrib.description || '');
    setAmount(contrib.amount);
    setDeadline(contrib.deadline || `${new Date().getFullYear()}-12-31`);
    setTargetYear(contrib.targetYear || new Date().getFullYear());
    setTargetAudience(contrib.targetAudience === 'public' ? 'public' : 'volunteers_only');
    setInstructions(contrib.instructions || '');
    setFrequency(contrib.frequency || 'Annuelle');
    setStatus(contrib.status || 'active');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || amount <= 0) return;

    if (editingContrib) {
      updateContribution(editingContrib.id, {
        title,
        description,
        amount,
        deadline,
        targetYear,
        targetAudience,
        instructions,
        frequency,
        status
      });
    } else {
      addContribution({
        title,
        description,
        amount,
        currency: 'FCFA',
        deadline,
        targetYear,
        targetAudience,
        instructions,
        frequency,
        status
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, contribTitle: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la cotisation "${contribTitle}" ?`)) {
      deleteContribution(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Gestion des Cotisations & Appels de Fonds
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
              Secrétariat & Trésorerie
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Créez et paramétrez les paiements de cotisation. Choisissez la visibilité (Bénévoles uniquement vs Grand Public / Visiteurs).
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Créer une Cotisation</span>
        </button>
      </div>

      {/* Grid of Cotisations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {contributions.map((contrib) => {
          const contribPayments = payments.filter(p => p.contributionId === contrib.id && p.status === 'paid');
          const totalCollected = contribPayments.reduce((acc, p) => acc + p.amount, 0);
          const isPublic = contrib.targetAudience === 'public';

          return (
            <div 
              key={contrib.id} 
              className={`bg-white rounded-2xl border transition-all shadow-xs hover:shadow-md overflow-hidden flex flex-col justify-between ${
                contrib.status === 'closed' ? 'border-slate-200 bg-slate-50/50 opacity-80' : 'border-slate-200 hover:border-teal-300'
              }`}
            >
              <div className="p-5 space-y-4">
                {/* Status & Target Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 ${
                    isPublic 
                      ? 'bg-purple-50 text-purple-800 border border-purple-200' 
                      : 'bg-blue-50 text-blue-800 border border-blue-200'
                  }`}>
                    {isPublic ? (
                      <>
                        <Globe className="w-3.5 h-3.5 text-purple-600" />
                        <span>Grand Public & Visiteurs</span>
                      </>
                    ) : (
                      <>
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                        <span>Uniquement Bénévoles</span>
                      </>
                    )}
                  </span>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    contrib.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {contrib.status === 'active' ? 'Active' : 'Clôturée'}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {contrib.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {contrib.description || 'Aucune description spécifique renseignée.'}
                  </p>
                </div>

                {/* Main Price Tag */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Montant requis</span>
                  <span className="text-lg font-black text-teal-700 font-display">
                    {contrib.amount.toLocaleString()} FCFA
                  </span>
                </div>

                {/* Progress / Stats */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between font-semibold">
                    <span>Recouvrement :</span>
                    <span className="text-slate-900 font-bold">{totalCollected.toLocaleString()} FCFA ({contribPayments.length} paiements)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Échéance :</span>
                    <span className="font-medium text-slate-700">{contrib.deadline}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(contrib)}
                    className="p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-200/60 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                    title="Modifier la cotisation"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Éditer</span>
                  </button>

                  <button
                    onClick={() => handleDelete(contrib.id, contrib.title)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                    title="Supprimer la cotisation"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {onOpenPaymentModalFor && contrib.status === 'active' && (
                  <button
                    onClick={() => onOpenPaymentModalFor(contrib)}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Tester Paiement</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add/Edit Cotisation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {editingContrib ? 'Modifier la Cotisation' : 'Créer une Nouvelle Cotisation'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Définissez le montant, le nom et le public cible pour la perception
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nom / Intitulé de la Cotisation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Cotisation Annuelle Bénévoles 2025"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Montant à Payer (FCFA) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={500}
                    step={500}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-teal-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Fréquence / Type
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  >
                    <option value="Annuelle">Annuelle</option>
                    <option value="Mensuelle">Mensuelle</option>
                    <option value="Trimestrielle">Trimestrielle</option>
                    <option value="Ponctuelle / Projet">Ponctuelle / Projet</option>
                    <option value="Appel à don libre">Appel à don libre</option>
                  </select>
                </div>
              </div>

              {/* Visibilité / Target Audience Selection */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Visibilité & Audience Cible <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label 
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      targetAudience === 'volunteers_only' 
                        ? 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="targetAudience"
                      checked={targetAudience === 'volunteers_only'}
                      onChange={() => setTargetAudience('volunteers_only')}
                      className="sr-only"
                    />
                    <Users className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Uniquement Bénévoles</div>
                      <div className="text-[10px] text-slate-500">Accessible uniquement aux membres enregistrés</div>
                    </div>
                  </label>

                  <label 
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      targetAudience === 'public' 
                        ? 'border-purple-500 bg-purple-50/70 ring-2 ring-purple-500/20' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="targetAudience"
                      checked={targetAudience === 'public'}
                      onChange={() => setTargetAudience('public')}
                      className="sr-only"
                    />
                    <Globe className="w-5 h-5 text-purple-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Grand Public & Visiteurs</div>
                      <div className="text-[10px] text-slate-500">Visible sur le site public pour tous les visiteurs</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date limite d'échéance
                  </label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Statut du paiement
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'active' | 'closed')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  >
                    <option value="active">Active (Paiements Ouverts)</option>
                    <option value="closed">Clôturée (Paiements Fermés)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description / Objet de la cotisation
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Expliquez à quoi servira cette cotisation..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Consignes / Instructions de paiement
                </label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Ex: Récupérer le reçu électronique après validation MoMo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold cursor-pointer shadow-sm flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingContrib ? 'Enregistrer les modifications' : 'Créer la Cotisation'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
