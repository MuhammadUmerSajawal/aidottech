import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import Card from '../components/common/Card';
import { 
  ArrowLeft, 
  Check, 
  X, 
  Loader2, 
  HelpCircle,
  FilePlus2
} from 'lucide-react';

export default function NewProject() {
  const navigate = useNavigate();
  const { createProject } = useProjects();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState('Draft');
  const [abstract, setAbstract] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const tagsArray = tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const newProject = await createProject({
        title,
        domain,
        status,
        abstract,
        content,
        author,
        tags: tagsArray,
      });
      
      // Redirect to the newly created project page
      navigate(`/projects/${newProject._id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to submit research project. Please verify inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div class="space-y-8 max-w-4xl mx-auto">
      {/* Back button */}
      <div>
        <Link 
          to="/projects" 
          class="inline-flex items-center space-x-2 text-xs font-space-mono text-dot-neutral hover:text-dot-dark uppercase tracking-wider transition-colors duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Registry</span>
        </Link>
      </div>

      {/* Title */}
      <div class="border-b border-dot-border pb-6 flex items-center space-x-3">
        <FilePlus2 className="w-8 h-8 text-dot-accent" />
        <div>
          <span class="font-space-mono text-xs uppercase tracking-widest text-dot-accent">Initiation</span>
          <h1 class="text-3xl md:text-4xl font-accent-italic text-dot-dark mt-1">
            Publish New Framework
          </h1>
        </div>
      </div>

      {error && (
        <div class="bg-red-50 border border-red-200 text-red-800 p-4 font-space-mono text-xs">
          {error}
        </div>
      )}

      {/* Main Form container */}
      <Card hoverEffect={false} className="bg-white">
        <form onSubmit={handleSubmit} class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div class="md:col-span-2">
              <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2">
                Project Title / Formulation
              </label>
              <input
                type="text"
                placeholder="e.g. Quantum Decoherence Dynamics in Semiconductor Substrates"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                class="dot-input text-sm"
                required
              />
            </div>

            {/* Author */}
            <div>
              <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2">
                Lead Researcher / Author
              </label>
              <input
                type="text"
                placeholder="e.g. Dr. Arthur Vance"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
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
                placeholder="e.g. Quantum Computing, Nanotechnology"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                class="dot-input text-sm"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2">
                Initial Milestone Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
              <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2 flex items-center justify-between">
                <span>Taxonomy Tags</span>
                <span class="text-[9px] text-dot-neutral font-normal lowercase">comma-separated</span>
              </label>
              <input
                type="text"
                placeholder="quantum, physics, semiconductor"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                class="dot-input text-sm"
              />
            </div>
          </div>

          {/* Abstract */}
          <div>
            <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2">
              Abstract (Instrument Serif Italic Target)
            </label>
            <textarea
              placeholder="Provide a high-level summary of the thesis, research objectives, and theoretical models..."
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              rows="3"
              class="dot-input text-sm"
              required
            />
          </div>

          {/* Treatise Content */}
          <div>
            <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2">
              Treatise Core Content
            </label>
            <textarea
              placeholder="Draft core equations, methodology description, experimental trials, and detailed conclusions..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="12"
              class="dot-input text-sm font-sans"
              required
            />
          </div>

          {/* Actions */}
          <div class="flex items-center space-x-3 pt-4 border-t border-dot-border justify-end">
            <Link
              to="/projects"
              class="dot-btn-secondary text-xs flex items-center space-x-2 py-2"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </Link>
            <button
              type="submit"
              disabled={submitting}
              class="dot-btn-primary text-xs flex items-center space-x-2 py-2"
            >
              {submitting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
              <span>Commit Project</span>
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
