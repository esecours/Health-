import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InterventionZone } from '../../types';
import { Plus, Edit, Trash2, MapPin, Users, CheckCircle2, X } from 'lucide-react';

export const ZonesManager: React.FC = () => {
  const { zones = [], addZone, updateZone, deleteZone } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<InterventionZone | null>(null);

  const [department, setDepartment] = useState('Borgou');
  const [commune, setCommune] = useState('Parakou');
  const [activeProjectsCount, setActiveProjectsCount] = useState<number>(2);
  const [beneficiariesCount, setBeneficiariesCount] = useState<number>(1200);
  const [focalPointName, setFocalPointName] = useState('Déléguée Communale');
  const [focalPointPhone, setFocalPointPhone] = useState('+229 01 00 00 00');

  const openAddModal = () => {
    setEditingZone(null);
    setDepartment('Borgou');
    setCommune('');
    setActiveProjectsCount(1);
    setBeneficiariesCount(500);
    setFocalPointName('');
    setFocalPointPhone('+229 01 ');
    setIsModalOpen(true);
  };

  const openEditModal = (zone: InterventionZone) => {
    setEditingZone(zone);
    setDepartment(zone.department);
    setCommune(zone.commune);
    setActiveProjectsCount(zone.activeProjectsCount || 1);
    setBeneficiariesCount(zone.beneficiariesCount || 0);
    setFocalPointName(zone.focalPointName || '');
    setFocalPointPhone(zone.focalPointPhone || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commune.trim()) return;

    if (editingZone) {
      updateZone(editingZone.id, {
        department,
        commune,
        activeProjectsCount,
        beneficiariesCount,
        focalPointName,
        focalPointPhone
      });
    } else {
      addZone({
        department,
        commune,
        arrondissements: ['Centre', 'Sud'],
        activeProjectsCount,
        beneficiariesCount,
        focalPointName,
        focalPointPhone
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, zoneName: string) => {
    if (window.confirm(`Supprimer la zone "${zoneName}" ?`)) {
      deleteZone(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            Gestion des Zones d'Intervention
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Gérez les communes, départements et points focaux de présence territoriale de HEALTHDEV ONG.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une Zone</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {zones.map((zone) => (
          <div key={zone.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                {zone.department}
              </span>
              <div className="flex items-center gap-1">
                <button onClick={() => openEditModal(zone)} className="p-1.5 text-slate-600 hover:text-teal-700 rounded-lg cursor-pointer">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(zone.id, zone.commune)} className="p-1.5 text-red-500 hover:text-red-700 rounded-lg cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>Commune de {zone.commune}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">Point focal: {zone.focalPointName || 'Non assigné'}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-50 rounded-xl">
                <div className="text-[10px] text-slate-400">Projets Actifs</div>
                <div className="font-bold text-teal-700 text-sm">{zone.activeProjectsCount}</div>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl">
                <div className="text-[10px] text-slate-400">Bénéficiaires</div>
                <div className="font-bold text-slate-900 text-sm">{zone.beneficiariesCount?.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">
                {editingZone ? 'Modifier la zone' : 'Nouvelle zone d\'intervention'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Département *</label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Commune *</label>
                  <input
                    type="text"
                    required
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Point focal (Nom)</label>
                  <input
                    type="text"
                    value={focalPointName}
                    onChange={(e) => setFocalPointName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Téléphone</label>
                  <input
                    type="text"
                    value={focalPointPhone}
                    onChange={(e) => setFocalPointPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl cursor-pointer">
                  Annuler
                </button>
                <button type="submit" className="px-5 py-2 bg-teal-600 text-white text-xs font-bold rounded-xl cursor-pointer">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
