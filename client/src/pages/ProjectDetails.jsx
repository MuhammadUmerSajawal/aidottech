import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { projectService } from '../services/project.service';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Tag, 
  BookOpen, 
  Edit3, 
  Trash2, 
  Check, 
  X,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateProject, deleteProject } = useProjects();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDomain, setEditDomain] = useState('');
  const [editStatus, setEditStatus] = useState('Draft');
  const [editAbstract, setEditAbstract] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editTags, setEditTags] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchProjectDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.getProjectById(id);
      setProject(data);
      
      // Initialize edit fields
      setEditTitle(data.title || '');
      setEditDomain(data.domain || '');
      setEditStatus(data.status || 'Draft');
      setEditAbstract(data.abstract || '');
      setEditContent(data.content || '');
      setEditAuthor(data.author || '');
      setEditTags(data.tags ? data.tags.join(', ') : '');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Project configuration not found.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const tagsArray = editTags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const updated = await updateProject(id, {
        title: editTitle,
        domain: editDomain,
        status: editStatus,
        abstract: editAbstract,
        content: editContent,
        author: editAuthor,
        tags: tagsArray,
      });
      
      setProject(updated);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Confirm complete removal of this research file from database?')) return;
    
    try {
      await deleteProject(id);
      navigate('/projects');
    } catch (err) {
      console.error(err);
      alert('Deletion failed. Check system console.');
    }
  };

  if (loading) {
    return (
      <div class="flex flex-col items-center justify-center py-24 space-y-4">
        <Loader2 class="w-8 h-8 text-dot-accent animate-spin" />
        <span class="font-space-mono text-xs uppercase tracking-widest text-dot-neutral">Loading File details...</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div class="space-y-6">
        <div class="bg-red-50 border border-red-200 text-red-800 p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span class="font-space-mono text-xs">{error || 'Project data could not be retrieved.'}</span>
        </div>
        <Link to="/projects" class="dot-btn-secondary inline-flex items-center space-x-2 text-xs">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Registry</span>
        </Link>
      </div>
    );
  }

  const getStatusVariant = (statusStr) => {
    switch (statusStr?.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'in progress':
        return 'primary';
      case 'under review':
        return 'default';
      case 'draft':
      default:
        return 'neutral';
    }
  };

  return (
    <div class="space-y-8">
      {/* Back to Registry link */}
      <div>
        <Link 
          to="/projects" 
          class="inline-flex items-center space-x-2 text-xs font-space-mono text-dot-neutral hover:text-dot-dark uppercase tracking-wider transition-colors duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Registry</span>
        </Link>
      </div>

      {!isEditing ? (
        /* Read Mode Layout */
        <div class="space-y-12">
          {/* Header block with grid alignment */}
          <div class="border-b border-dot-border pb-8 flex flex-col md:flex-row justify-between items-start gap-6">
            <div class="space-y-4 flex-grow">
              <div class="flex flex-wrap gap-2.5 items-center">
                <Badge variant="neutral">{project.domain}</Badge>
                <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
              </div>
              <h1 class="text-4xl md:text-5xl font-sans font-bold text-dot-dark leading-tight max-w-4xl">
                {project.title}
              </h1>
            </div>

            <div class="flex items-center space-x-3 w-full md:w-auto">
              <button
                onClick={() => setIsEditing(true)}
                class="dot-btn-secondary flex items-center justify-center space-x-2 text-xs py-2 w-full md:w-auto"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Modify File</span>
              </button>
              <button
                onClick={handleDelete}
                class="border border-red-200 text-red-700 bg-red-50 hover:bg-red-700 hover:text-white px-4 py-2.5 font-space-mono text-xs uppercase tracking-wider transition-colors duration-200 flex items-center justify-center space-x-2 w-full md:w-auto"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Archive</span>
              </button>
            </div>
          </div>

          {/* Abstract callout (Instrument Serif Italic Accent) */}
          <div class="bg-white border-l-4 border-dot-accent p-8 italic">
            <p class="font-accent-italic text-2xl text-dot-dark leading-relaxed">
              "{project.abstract || 'No abstract documented.'}"
            </p>
          </div>

          {/* Metadata Sidebar & Content Grid */}
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Detailed Content on Left (2 columns) */}
            <div class="lg:col-span-2 space-y-6">
              <div class="flex items-center space-x-2 border-b border-dot-border pb-3">
                <BookOpen className="w-4 h-4 text-dot-teal" />
                <h2 class="font-space-mono text-sm uppercase tracking-wider text-dot-dark font-bold">
                  Theoretical Treatise
                </h2>
              </div>
              <div class="font-sans text-dot-dark text-base leading-relaxed space-y-4 whitespace-pre-line bg-white border border-dot-border p-8">
                {project.content || 'Treatise core draft is currently blank.'}
              </div>
            </div>

            {/* Metadata and Stats Sidebar on Right */}
            <div class="space-y-8">
              <div class="flex items-center space-x-2 border-b border-dot-border pb-3">
                <Calendar className="w-4 h-4 text-dot-teal" />
                <h2 class="font-space-mono text-sm uppercase tracking-wider text-dot-dark font-bold">
                  Metadata Audit
                </h2>
              </div>

              <Card hoverEffect={false} className="bg-white">
                <div class="space-y-6 font-space-mono text-xs">
                  {/* Author */}
                  <div>
                    <span class="text-dot-neutral block mb-1 uppercase tracking-widest text-[10px]">Lead Researcher</span>
                    <div class="flex items-center space-x-2 text-dot-dark font-bold">
                      <User className="w-4 h-4 text-dot-teal" />
                      <span>{project.author || 'Anonymous'}</span>
                    </div>
                  </div>

                  {/* Dates */}
                  <div>
                    <span class="text-dot-neutral block mb-1 uppercase tracking-widest text-[10px]">Initialized On</span>
                    <span class="text-dot-dark font-bold">
                      {project.createdAt ? new Date(project.createdAt).toLocaleString() : 'N/A'}
                    </span>
                  </div>

                  <div>
                    <span class="text-dot-neutral block mb-1 uppercase tracking-widest text-[10px]">Last Synced</span>
                    <span class="text-dot-dark font-bold">
                      {project.updatedAt ? new Date(project.updatedAt).toLocaleString() : 'N/A'}
                    </span>
                  </div>

                  {/* Tags */}
                  <div>
                    <span class="text-dot-neutral block mb-2 uppercase tracking-widest text-[10px]">Taxonomy tags</span>
                    <div class="flex flex-wrap gap-1.5">
                      {project.tags && project.tags.length > 0 ? (
                        project.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            class="px-2 py-0.5 border border-dot-border bg-[#FBFBFA] text-dot-teal text-[10px]"
                          >
                            #{tag}
                          </span>
                        ))
                      ) : (
                        <span class="text-dot-neutral italic text-[11px]">No tags assigned.</span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        /* Edit Mode Layout */
        <Card hoverEffect={false} className="bg-white max-w-4xl mx-auto">
          <form onSubmit={handleUpdate} class="space-y-6">
            <div class="border-b border-dot-border pb-4 flex justify-between items-center">
              <h2 class="font-space-mono text-sm uppercase tracking-wider text-dot-dark font-bold">
                Modify Research File Configuration
              </h2>
              <div class="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  class="p-2 border border-dot-border text-dot-neutral hover:bg-gray-50 rounded-none transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div class="md:col-span-2">
                <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  class="dot-input text-sm"
                  required
                />
              </div>

              {/* Author */}
              <div>
                <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2">
                  Lead Researcher
                </label>
                <input
                  type="text"
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                  class="dot-input text-sm"
                  required
                />
              </div>

              {/* Domain */}
              <div>
                <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2">
                  Theoretical Sphere / Domain
                </label>
                <input
                  type="text"
                  value={editDomain}
                  onChange={(e) => setEditDomain(e.target.value)}
                  class="dot-input text-sm"
                  placeholder="e.g. Cognitive Systems, Electrodynamics"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2">
                  Milestone Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  class="dot-input text-sm"
                >
                  <option value="Draft">Draft</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2">
                  Taxonomy Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                  class="dot-input text-sm"
                  placeholder="neural, network, physics"
                />
              </div>
            </div>

            {/* Abstract */}
            <div>
              <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2">
                Abstract (Instrument Serif Italic Target)
              </label>
              <textarea
                value={editAbstract}
                onChange={(e) => setEditAbstract(e.target.value)}
                rows="3"
                class="dot-input text-sm"
                placeholder="A concise summarization of thesis outcomes..."
                required
              />
            </div>

            {/* Treatise Content */}
            <div>
              <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2">
                Treatise Core Content
              </label>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows="10"
                class="dot-input text-sm font-sans"
                placeholder="Detailed findings and formulations..."
                required
              />
            </div>

            {/* Action buttons */}
            <div class="flex items-center space-x-3 pt-4 border-t border-dot-border justify-end">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                class="dot-btn-secondary text-xs flex items-center space-x-2 py-2"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                disabled={saving}
                class="dot-btn-primary text-xs flex items-center space-x-2 py-2"
              >
                {saving ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>Commit Modifications</span>
              </button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
