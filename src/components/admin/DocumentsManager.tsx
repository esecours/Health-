import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentItem } from '../../types';
import { Plus, Edit, Trash2, FileText, Download, CheckCircle2, X } from 'lucide-react';

export const DocumentsManager: React.FC = () => {
  const { documents = [], addDocument, updateDocument, deleteDocument } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<DocumentItem | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DocumentItem['category']>('rapport');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('#');
  const [fileType, setFileType] = useState('PDF');
  const [fileSize, setFileSize] = useState('2.4 MB');

  const openAddModal = () => {
    setEditingDoc(null);
    setTitle('');
    setCategory('rapport');
    setDescription('');
    setFileUrl('#');
    setFileType('PDF');
    setFileSize('1.8 MB');
    setIsModalOpen(true);
  };

  const openEditModal = (doc: DocumentItem) => {
    setEditingDoc(doc);
    setTitle(doc.title);
    setCategory(doc.category);
    setDescription(doc.description || '');
    setFileUrl(doc.fileUrl || '#');
    setFileType(doc.fileType || 'PDF');
    setFileSize(doc.fileSize || '2.0 MB');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingDoc) {
      updateDocument(editingDoc.id, {
        title,
        category,
        description,
        fileUrl,
        fileType,
        fileSize
      });
    } else {
      addDocument({
        title,
        category,
        description,
        fileUrl,
        fileType,
        fileSize,
        publishDate: new Date().toISOString().split('T')[0],
        downloadUrl: fileUrl,
        size: fileSize,
        format: fileType
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, docTitle: string) => {
    if (window.confirm(`Supprimer le document "${docTitle}" ?`)) {
      deleteDocument(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            Gestion de la Base Documentaire & Rapports
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Ajoutez, éditez ou supprimez les rapports d'activités, bilans financiers, études et politiques internes.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un Document</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Intitulé du Document</th>
                <th className="py-3.5 px-4">Catégorie</th>
                <th className="py-3.5 px-4">Taille / Format</th>
                <th className="py-3.5 px-4">Date de Publication</th>
                <th className="py-3.5 px-4">Téléchargements</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                      <div>
                        <div>{doc.title}</div>
                        <div className="text-[10px] text-slate-400 font-normal line-clamp-1">{doc.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] uppercase">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600">{doc.fileType || doc.format} • {doc.fileSize || doc.size}</td>
                  <td className="py-3.5 px-4 text-slate-500">{doc.publishDate}</td>
                  <td className="py-3.5 px-4 font-bold text-teal-700">{doc.downloadsCount || 0} fois</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditModal(doc)}
                        className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded-lg cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id, doc.title)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">
                {editingDoc ? 'Modifier le document' : 'Déposer un nouveau document'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Titre du document *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  >
                    <option value="rapport">Rapport d'activité</option>
                    <option value="finance">Rapport Financier</option>
                    <option value="politique">Politique interne / Charte</option>
                    <option value="etude">Étude / Publication</option>
                    <option value="autre">Autre document</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Format / Taille</label>
                  <input
                    type="text"
                    value={fileSize}
                    onChange={(e) => setFileSize(e.target.value)}
                    placeholder="Ex: PDF • 2.4 MB"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lien / Fichier URL</label>
                <input
                  type="text"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none"
                />
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
