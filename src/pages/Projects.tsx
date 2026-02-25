import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FolderOpen, Clock, Trash2, Edit2, Play, Archive } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string | null;
  status: 'draft' | 'in_progress' | 'completed' | 'archived';
  movie_ids: string[];
  metadata: any;
  last_opened_at: string;
  created_at: string;
  updated_at: string;
}

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'draft' | 'in_progress' | 'completed' | 'archived'>('all');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
      return;
    }
    setUser(user);
    loadProjects();
  };

  const loadProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('last_opened_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!newProjectName.trim()) return;

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          name: newProjectName,
          description: newProjectDescription,
          status: 'draft',
        })
        .select()
        .single();

      if (error) throw error;

      setProjects([data, ...projects]);
      setShowNewProjectModal(false);
      setNewProjectName('');
      setNewProjectDescription('');
    } catch (error: any) {
      console.error('Error creating project:', error);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProjects(projects.filter(p => p.id !== id));
    } catch (error: any) {
      console.error('Error deleting project:', error);
    }
  };

  const updateProjectStatus = async (id: string, status: Project['status']) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      setProjects(projects.map(p => p.id === id ? { ...p, status } : p));
    } catch (error: any) {
      console.error('Error updating project:', error);
    }
  };

  const openProject = async (id: string) => {
    try {
      await supabase
        .from('projects')
        .update({ last_opened_at: new Date().toISOString() })
        .eq('id', id);

      navigate(`/tools?project=${id}`);
    } catch (error: any) {
      console.error('Error opening project:', error);
    }
  };

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
      case 'in_progress': return 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30';
      case 'completed': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'archived': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              My Projects
            </h1>
            <p className="text-white/60">Manage and organize your video editing projects</p>
          </div>

          <button
            onClick={() => setShowNewProjectModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            New Project
          </button>
        </div>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {['all', 'draft', 'in_progress', 'completed', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                filter === status
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <FolderOpen size={64} className="text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white/40 mb-2">No projects yet</h3>
            <p className="text-white/30 mb-6">Create your first project to get started</p>
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="px-6 py-3 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-xl font-semibold hover:bg-cyan-500/30 transition-all"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/20 transition-all group"
              >
                <div
                  onClick={() => openProject(project.id)}
                  className="aspect-video bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center cursor-pointer relative overflow-hidden"
                >
                  {project.thumbnail_url ? (
                    <img src={project.thumbnail_url} alt={project.name} className="w-full h-full object-cover" />
                  ) : (
                    <FolderOpen size={48} className="text-cyan-400/40" />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={48} className="text-white" />
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold mb-1 truncate">{project.name}</h3>
                      {project.description && (
                        <p className="text-sm text-white/60 line-clamp-2">{project.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(project.status)}`}>
                      {project.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-white/40 flex items-center gap-1">
                      <Clock size={12} />
                      {formatDate(project.last_opened_at)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openProject(project.id)}
                      className="flex-1 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg text-sm font-semibold hover:bg-cyan-500/30 transition-all"
                    >
                      Open
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextStatus = project.status === 'archived' ? 'draft' : 'archived';
                        updateProjectStatus(project.id, nextStatus);
                      }}
                      className="px-4 py-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-all"
                      title={project.status === 'archived' ? 'Unarchive' : 'Archive'}
                    >
                      <Archive size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(project.id);
                      }}
                      className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Create New Project</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Project Name</label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="My Awesome Video"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                <textarea
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  placeholder="What's this project about?"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowNewProjectModal(false);
                  setNewProjectName('');
                  setNewProjectDescription('');
                }}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={createProject}
                disabled={!newProjectName.trim()}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
