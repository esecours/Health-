import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { NGO_INFO } from '../../data/initialData';
import { 
  Search, 
  X, 
  FolderGit2, 
  Calendar, 
  FileText, 
  Users, 
  Building2, 
  MapPin, 
  ArrowRight,
  Sparkles,
  Shield,
  Heart,
  ExternalLink
} from 'lucide-react';

interface SpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPaymentModal: () => void;
}

export const SpotlightModal: React.FC<SpotlightModalProps> = ({
  isOpen,
  onClose,
  onOpenPaymentModal
}) => {
  const { 
    projects = [], 
    activities = [], 
    news = [], 
    documents = [],
    resources = [], 
    setCurrentView, 
    setSelectedProjectId, 
    setSelectedActivityId, 
    setSelectedArticleId 
  } = useApp();

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'projects' | 'activities' | 'news' | 'docs' | 'actions'>('all');

  // Keyboard shortcut listener for ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter items based on query
  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    const docList = resources && resources.length > 0 ? resources : (documents || []);

    const matchedProjects = (projects || []).filter(p => 
      !q || (p.title || '').toLowerCase().includes(q) || (p.domain || '').toLowerCase().includes(q) || (p.location || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)
    ).map(p => ({
      id: p.id,
      type: 'project' as const,
      title: p.title,
      subtitle: `${p.domain || ''} • ${p.location || ''}`,
      badge: `${p.progressPercentage || 0}% réalisé`,
      icon: <FolderGit2 className="w-4 h-4 text-teal-600" />,
      action: () => {
        setSelectedProjectId(p.id);
        setCurrentView('projects');
        onClose();
      }
    }));

    const matchedActivities = (activities || []).filter(a => 
      !q || (a.title || '').toLowerCase().includes(q) || (a.commune || '').toLowerCase().includes(q) || (a.responsible || '').toLowerCase().includes(q)
    ).map(a => ({
      id: a.id,
      type: 'activity' as const,
      title: a.title,
      subtitle: `${a.date || ''} • ${a.commune || ''} (${a.department || ''})`,
      badge: a.status === 'completed' ? 'Terminée' : 'À venir',
      icon: <Calendar className="w-4 h-4 text-blue-600" />,
      action: () => {
        setSelectedActivityId(a.id);
        setCurrentView('activities');
        onClose();
      }
    }));

    const matchedNews = (news || []).filter(n => 
      !q || (n.title || '').toLowerCase().includes(q) || (n.category || '').toLowerCase().includes(q) || (n.excerpt || '').toLowerCase().includes(q)
    ).map(n => ({
      id: n.id,
      type: 'news' as const,
      title: n.title,
      subtitle: `${n.date || ''} • ${n.category || ''}`,
      badge: 'Actualité',
      icon: <FileText className="w-4 h-4 text-amber-600" />,
      action: () => {
        setSelectedArticleId(n.id);
        setCurrentView('news');
        onClose();
      }
    }));

    const matchedDocs = docList.filter(r => 
      !q || (r.title || '').toLowerCase().includes(q) || (r.category || '').toLowerCase().includes(q) || (r.description || '').toLowerCase().includes(q)
    ).map(r => ({
      id: r.id,
      type: 'doc' as const,
      title: r.title,
      subtitle: `${r.category} • Réf: ${r.fileSize}`,
      badge: 'Document',
      icon: <Shield className="w-4 h-4 text-purple-600" />,
      action: () => {
        setCurrentView('resources');
        onClose();
      }
    }));

    const quickActions = [
      {
        id: 'action-donate',
        type: 'action' as const,
        title: 'Faire un Don Sécurisé (Mobile Money / Carte)',
        subtitle: 'Soutenir les activités de terrain pour les filles et femmes',
        badge: 'Action Don',
        icon: <Heart className="w-4 h-4 text-rose-600" />,
        action: () => {
          onClose();
          onOpenPaymentModal();
        }
      },
      {
        id: 'action-volunteer',
        type: 'action' as const,
        title: 'Devenir Bénévole / Volontaire',
        subtitle: 'Rejoindre les équipes d\'action communautaire à Parakou et au Bénin',
        badge: 'Engagement',
        icon: <Users className="w-4 h-4 text-emerald-600" />,
        action: () => {
          setCurrentView('volunteer-register');
          onClose();
        }
      },
      {
        id: 'action-about',
        type: 'action' as const,
        title: 'À propos de HEALTHDEV ONG (Statuts & Historique)',
        subtitle: `Enreg. MISP: ${NGO_INFO.registrationNumber} • Présidence AHO Régina`,
        badge: 'Institutionnel',
        icon: <Building2 className="w-4 h-4 text-slate-700" />,
        action: () => {
          setCurrentView('about');
          onClose();
        }
      }
    ].filter(a => !q || a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q));

    let combined = [];
    if (activeCategory === 'all') {
      combined = [...quickActions, ...matchedProjects, ...matchedActivities, ...matchedNews, ...matchedDocs];
    } else if (activeCategory === 'projects') {
      combined = matchedProjects;
    } else if (activeCategory === 'activities') {
      combined = matchedActivities;
    } else if (activeCategory === 'news') {
      combined = matchedNews;
    } else if (activeCategory === 'docs') {
      combined = matchedDocs;
    } else {
      combined = quickActions;
    }

    return combined;
  }, [query, activeCategory, projects, activities, news, resources, documents, setCurrentView, setSelectedProjectId, setSelectedActivityId, setSelectedArticleId, onOpenPaymentModal, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-teal-600 shrink-0" />
          <input
            type="text"
            placeholder="Rechercher un projet, une activité, un article, un document légal..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-semibold focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2 py-1 bg-slate-200/80 hover:bg-slate-200 rounded-lg shrink-0 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs bg-white">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-lg font-bold transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tout ({filteredResults.length})
          </button>
          <button
            onClick={() => setActiveCategory('projects')}
            className={`px-3 py-1 rounded-lg font-bold transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'projects' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Projets
          </button>
          <button
            onClick={() => setActiveCategory('activities')}
            className={`px-3 py-1 rounded-lg font-bold transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'activities' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Activités
          </button>
          <button
            onClick={() => setActiveCategory('news')}
            className={`px-3 py-1 rounded-lg font-bold transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'news' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Actualités
          </button>
          <button
            onClick={() => setActiveCategory('docs')}
            className={`px-3 py-1 rounded-lg font-bold transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'docs' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Ressources
          </button>
          <button
            onClick={() => setActiveCategory('actions')}
            className={`px-3 py-1 rounded-lg font-bold transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'actions' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Actions Rapides
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1 grow">
          {filteredResults.length === 0 ? (
            <div className="text-center py-12 px-4 text-slate-500">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-sm">Aucun résultat trouvé pour « {query} »</p>
              <p className="text-xs text-slate-400 mt-1">Essayez un autre mot-clé (ex: PESCA, Parakou, VBG, Statuts, Don)</p>
            </div>
          ) : (
            filteredResults.map((item) => (
              <button
                key={`${item.type}-${item.id}`}
                onClick={item.action}
                className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 truncate group-hover:text-teal-700 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-teal-100 group-hover:text-teal-800 transition-colors">
                    {item.badge}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>HEALTHDEV ONG • Moteur de recherche unifié & index en temps réel</span>
          </div>
          <span className="text-[11px] text-slate-400">Appuyez sur Entrée pour ouvrir</span>
        </div>
      </div>
    </div>
  );
};
