import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile, UserRole } from '../../types';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  ShieldCheck, 
  Key, 
  CheckCircle2, 
  X, 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  Shield, 
  Lock,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award
} from 'lucide-react';
import { UserBadgeModal } from '../profile/UserBadgeModal';

export const ALL_SECTIONS = [
  { id: 'overview', label: 'Vue d\'ensemble' },
  { id: 'projects', label: 'Projets & Programmes' },
  { id: 'activities', label: 'Activités Terrain' },
  { id: 'volunteers', label: 'Bénévoles & Gestion des Comptes' },
  { id: 'finances', label: 'Trésorerie & Cotisations' },
  { id: 'me', label: 'Suivi-Évaluation (M&E)' },
  { id: 'news', label: 'Actualités & Publications' },
  { id: 'documents', label: 'Base Documentaire & Rapports' },
  { id: 'partners', label: 'Partenaires' },
  { id: 'zones', label: 'Zones d\'intervention' }
];

export const UsersManager: React.FC = () => {
  const { 
    users = [], 
    addUser, 
    updateUser, 
    deleteUser, 
    updateUserStatus, 
    updateUserRole, 
    updateUserSections,
    currentUser 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('Tous');
  const [statusFilter, setStatusFilter] = useState<string>('Tous');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'ca' | 'cci' | 'staff' | 'volunteers'>('all');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);

  // Badge Modal state
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [selectedBadgeUser, setSelectedBadgeUser] = useState<UserProfile | null>(null);

  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Parakou');
  const [department, setDepartment] = useState('Borgou');
  const [gender, setGender] = useState<'F' | 'M' | 'Autre'>('F');
  const [profession, setProfession] = useState('');
  const [poste, setPoste] = useState('');
  const [matricule, setMatricule] = useState('');
  const [role, setRole] = useState<UserRole>('volunteer');
  const [status, setStatus] = useState<'pending' | 'active' | 'suspended' | 'inactive'>('active');
  const [allowedSections, setAllowedSections] = useState<string[]>(['overview', 'volunteers']);

  const getUserCategory = (u: UserProfile): 'ca' | 'cci' | 'staff' | 'volunteers' => {
    if (u.id.startsWith('usr-ca-') || u.poste?.includes('/CA') || u.poste?.includes('Conseil d\'Administration')) return 'ca';
    if (u.id.startsWith('usr-cci-') || u.poste?.includes('/CCI') || u.poste?.includes('Contrôle Interne') || u.poste?.includes('Commissaire')) return 'cci';
    if (u.id.startsWith('usr-staff-') || u.poste?.includes('(DE)') || u.poste?.includes('(CoP)') || u.poste?.includes('(RAF)') || u.poste?.includes('(RP)') || u.poste?.includes('(ME)') || u.poste?.includes('Chargé') || u.poste?.includes('Coordonnatrice') || u.poste?.includes('Directeur')) return 'staff';
    return 'volunteers';
  };

  const caCount = users.filter(u => getUserCategory(u) === 'ca').length;
  const cciCount = users.filter(u => getUserCategory(u) === 'cci').length;
  const staffCount = users.filter(u => getUserCategory(u) === 'staff').length;
  const volCount = users.filter(u => getUserCategory(u) === 'volunteers').length;

  const openAddModal = () => {
    setEditingUser(null);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('+229 01 ');
    setCity('Parakou');
    setDepartment('Borgou');
    setGender('F');
    setProfession('Volontaire - Membre');
    setPoste('Volontaire - Membre');
    setMatricule('');
    setRole('volunteer');
    setStatus('active');
    setAllowedSections(['overview', 'projects', 'activities']);
    setIsModalOpen(true);
  };

  const openEditModal = (user: UserProfile) => {
    setEditingUser(user);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone || '');
    setCity(user.city || 'Parakou');
    setDepartment(user.department || 'Borgou');
    setGender(user.gender as 'F' | 'M' | 'Autre');
    setProfession(user.profession || '');
    setPoste(user.poste || user.profession || '');
    setMatricule(user.matricule || `HD-BEN-${(user.id || '01').replace(/\D/g, '').slice(-4).padStart(4, '0')}`);
    setRole(user.role);
    setStatus(user.status);
    setAllowedSections(user.allowedSections || (
      user.role === 'super_admin' || user.role === 'admin'
        ? ALL_SECTIONS.map(s => s.id)
        : user.role === 'secretary' || user.role === 'financial_manager'
        ? ['overview', 'finances', 'volunteers', 'documents']
        : ['overview', 'activities']
    ));
    setIsModalOpen(true);
  };

  const toggleSection = (sectionId: string) => {
    setAllowedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const selectAllSections = () => {
    setAllowedSections(ALL_SECTIONS.map(s => s.id));
  };

  const deselectAllSections = () => {
    setAllowedSections([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return;

    if (editingUser) {
      updateUser(editingUser.id, {
        firstName,
        lastName,
        email,
        phone,
        city,
        department,
        gender,
        profession,
        poste,
        matricule,
        role,
        status,
        allowedSections
      });
    } else {
      addUser({
        firstName,
        lastName,
        email,
        phone,
        city,
        department,
        gender,
        profession,
        poste,
        matricule,
        skills: ['Coordination', 'Droits Humains'],
        interests: ['Santé', 'Égalité de genre'],
        role,
        status,
        allowedSections
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (userId: string, name: string) => {
    if (userId === currentUser?.id) {
      alert('Vous ne pouvez pas supprimer votre propre compte actuellement connecté.');
      return;
    }
    if (window.confirm(`Êtes-vous certain de vouloir supprimer définitivement le compte de ${name} ?`)) {
      deleteUser(userId);
    }
  };

  const filteredUsers = users.filter(u => {
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.phone?.includes(searchTerm) ||
                          u.matricule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.poste?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'Tous' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'Tous' || u.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || getUserCategory(u) === categoryFilter;
    return matchesSearch && matchesRole && matchesStatus && matchesCategory;
  });

  const getRoleLabel = (r: UserRole) => {
    switch (r) {
      case 'super_admin': return 'Super Admin (DE)';
      case 'admin': return 'Présidence CA / Admin';
      case 'secretary': return 'Secrétaire Générale';
      case 'financial_manager': return 'Trésorier / RAF';
      case 'program_manager': return 'Coord. Programmes';
      case 'me_manager': return 'Chargé M&E';
      case 'comm_manager': return 'Chargé Comms';
      case 'partner': return 'Partenaire';
      case 'volunteer': return 'Bénévole / Membre';
      default: return r;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Gestion des Comptes & Permissions (HEALTHDEV ONG)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300">
              {users.length} membres enregistrés
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Répertoire officiel des membres du Conseil d'Administration, Commission de Contrôle Interne, Personnel & Technique et Bénévoles (Volontaires / Membres Engagés).
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Créer un Compte</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
            categoryFilter === 'all'
              ? 'bg-[#144D32] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>Tous les Comptes</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${categoryFilter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
            {users.length}
          </span>
        </button>

        <button
          onClick={() => setCategoryFilter('ca')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
            categoryFilter === 'ca'
              ? 'bg-[#144D32] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>Conseil d'Administration (CA)</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${categoryFilter === 'ca' ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-800 font-bold'}`}>
            {caCount}
          </span>
        </button>

        <button
          onClick={() => setCategoryFilter('cci')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
            categoryFilter === 'cci'
              ? 'bg-[#144D32] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>Contrôle Interne (CCI)</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${categoryFilter === 'cci' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-800 font-bold'}`}>
            {cciCount}
          </span>
        </button>

        <button
          onClick={() => setCategoryFilter('staff')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
            categoryFilter === 'staff'
              ? 'bg-[#144D32] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>Personnel & Technique</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${categoryFilter === 'staff' ? 'bg-white/20 text-white' : 'bg-purple-50 text-purple-800 font-bold'}`}>
            {staffCount}
          </span>
        </button>

        <button
          onClick={() => setCategoryFilter('volunteers')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
            categoryFilter === 'volunteers'
              ? 'bg-[#144D32] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>Volontaires & Bénévoles</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${categoryFilter === 'volunteers' ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-800 font-bold'}`}>
            {volCount}
          </span>
        </button>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom, matricule, téléphone, ville..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
          >
            <option value="Tous">Tous les Rôles</option>
            <option value="super_admin">Super Admin (DE)</option>
            <option value="admin">Admin / Présidence CA</option>
            <option value="secretary">Secrétaire Générale</option>
            <option value="financial_manager">Resp. Financier</option>
            <option value="program_manager">Resp. Programmes</option>
            <option value="me_manager">Resp. M&E</option>
            <option value="volunteer">Bénévoles</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
          >
            <option value="Tous">Tous les Statuts</option>
            <option value="active">Actif</option>
            <option value="pending">En attente</option>
            <option value="suspended">Suspendu</option>
          </select>
        </div>
      </div>

      {/* Table of Users */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Utilisateur</th>
                <th className="py-3.5 px-4">Rôle</th>
                <th className="py-3.5 px-4">Statut</th>
                <th className="py-3.5 px-4">Sections Autorisées</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => {
                const isSuper = u.role === 'super_admin';
                const sectionCount = u.allowedSections?.length || (isSuper ? ALL_SECTIONS.length : 2);
                const cat = getUserCategory(u);

                return (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatarUrl || '/default_avatar.jpg'}
                          alt={u.firstName}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-900 text-sm">
                              {u.firstName} {u.lastName}
                            </span>
                            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-800 border border-slate-300 rounded font-mono font-bold text-[10px]">
                              {u.matricule || `HD-BEN-${(u.id || '01').replace(/\D/g, '').slice(-4).padStart(4, '0')}`}
                            </span>
                            <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold border ${
                              cat === 'ca' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' :
                              cat === 'cci' ? 'bg-blue-50 text-blue-900 border-blue-300' :
                              cat === 'staff' ? 'bg-purple-50 text-purple-900 border-purple-300' :
                              'bg-amber-50 text-amber-900 border-amber-300'
                            }`}>
                              {cat === 'ca' ? 'CA' : cat === 'cci' ? 'CCI' : cat === 'staff' ? 'Personnel' : 'Bénévole'}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className="text-emerald-800 font-semibold">{u.poste || u.profession || 'Membre'}</span>
                            {u.city && (
                              <>
                                <span>•</span>
                                <span className="text-slate-600">{u.city}</span>
                              </>
                            )}
                            {u.phone && (
                              <>
                                <span>•</span>
                                <span className="text-slate-600">{u.phone}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                        u.role === 'super_admin' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                        u.role === 'admin' ? 'bg-teal-50 text-teal-800 border-teal-200' :
                        u.role === 'secretary' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        u.role === 'financial_manager' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {getRoleLabel(u.role)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                        u.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {u.status === 'active' ? 'Actif' : u.status === 'pending' ? 'En attente' : 'Suspendu'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 flex-wrap max-w-xs">
                        <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-md text-[10px] font-bold flex items-center gap-1">
                          <Lock className="w-3 h-3 text-teal-600" />
                          <span>{sectionCount} section(s) d'accès</span>
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setSelectedBadgeUser(u);
                            setIsBadgeModalOpen(true);
                          }}
                          className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg font-bold text-xs transition-all cursor-pointer flex items-center gap-1 border border-amber-200"
                          title="Générer / Imprimer le badge officiel"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          <span>Badge</span>
                        </button>

                        <button
                          onClick={() => openEditModal(u)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold text-xs transition-all cursor-pointer flex items-center gap-1 border border-slate-200"
                        >
                          <Edit className="w-3.5 h-3.5 text-teal-600" />
                          <span>Gérer</span>
                        </button>

                        <button
                          onClick={() => handleDelete(u.id, `${u.firstName} ${u.lastName}`)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                          title="Supprimer le compte"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit User & Access Permissions */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {editingUser ? `Gérer le compte : ${editingUser.firstName} ${editingUser.lastName}` : 'Nouveau Compte Utilisateur'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Définissez le rôle, les détails du compte et attribuez les sections de gestion autorisées.
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

            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              {/* Identity Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Prénom <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nom <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Téléphone MoMo</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rôle Principal</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-teal-800 focus:outline-none focus:border-teal-500"
                  >
                    <option value="super_admin">Super Administrateur</option>
                    <option value="admin">Administrateur RH / Dir.</option>
                    <option value="secretary">Secrétaire Générale</option>
                    <option value="financial_manager">Responsable Financier</option>
                    <option value="program_manager">Responsable Programmes</option>
                    <option value="me_manager">Responsable M&E</option>
                    <option value="comm_manager">Responsable Comms</option>
                    <option value="partner">Partenaire</option>
                    <option value="volunteer">Bénévole</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Statut du compte</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  >
                    <option value="active">Actif</option>
                    <option value="pending">En attente de validation</option>
                    <option value="suspended">Suspendu</option>
                    <option value="inactive">Inactif</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ville</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Poste et Matricule Officiel pour Badge */}
              <div className="p-4 bg-teal-50/80 rounded-2xl border border-teal-200 space-y-3">
                <div className="flex items-center gap-2 text-teal-900 font-black text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4 text-teal-700" />
                  <span>Accréditation & Badge Officiel</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Poste occupé (sur le badge)</label>
                    <input
                      type="text"
                      value={poste}
                      onChange={(e) => setPoste(e.target.value)}
                      placeholder="Ex: Bénévole Terrain, Sage-femme..."
                      className="w-full px-3.5 py-2 bg-white rounded-xl border border-teal-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Matricule Officiel</label>
                    <input
                      type="text"
                      value={matricule}
                      onChange={(e) => setMatricule(e.target.value)}
                      placeholder="HD-BEN-XXXX"
                      className="w-full px-3.5 py-2 bg-white rounded-xl border border-teal-200 text-sm font-mono font-black text-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* GRANULAR PERMISSIONS: ALLOWED SECTIONS */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-teal-600" />
                      <span>Accès aux sections de la plateforme pour la gestion</span>
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Cochez les modules du tableau de bord auxquels cet utilisateur aura accès
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={selectAllSections}
                      className="text-teal-700 hover:underline font-bold cursor-pointer"
                    >
                      Tout cocher
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={deselectAllSections}
                      className="text-slate-500 hover:underline cursor-pointer"
                    >
                      Tout décocher
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {ALL_SECTIONS.map((sec) => {
                    const isChecked = allowedSections.includes(sec.id);
                    return (
                      <label
                        key={sec.id}
                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isChecked 
                            ? 'bg-teal-50/80 border-teal-300 text-teal-950 font-bold' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs">{sec.label}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSection(sec.id)}
                          className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
                        />
                      </label>
                    );
                  })}
                </div>
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
                  <span>Enregistrer les paramètres du compte</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* User Badge Modal */}
      {isBadgeModalOpen && selectedBadgeUser && (
        <UserBadgeModal
          isOpen={isBadgeModalOpen}
          onClose={() => {
            setIsBadgeModalOpen(false);
            setSelectedBadgeUser(null);
          }}
          targetUser={selectedBadgeUser}
        />
      )}
    </div>
  );
};
