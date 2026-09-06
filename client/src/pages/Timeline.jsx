import React, { useState } from 'react';
import { useLogs } from '../hooks/useLogs';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { Send, Loader2, Calendar, User, Search, Filter } from 'lucide-react';

export default function Timeline() {
  const { logs, loading, error, createLog } = useLogs();
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newAuthor, setNewAuthor] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    setSubmitting(true);
    try {
      await createLog({
        content: newContent,
        category: newCategory,
        author: newAuthor.trim() || 'Lead Researcher',
      });
      setNewContent('');
      setNewAuthor('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.author?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || log.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'General', 'Hardware', 'Software', 'Theoretical'];

  return (
    <div class="space-y-12">
      {/* Title */}
      <div class="border-b border-dot-border pb-8">
        <span class="font-space-mono text-xs uppercase tracking-widest text-dot-accent">Empirical Record</span>
        <h1 class="text-4xl md:text-5xl font-accent-italic text-dot-dark mt-2">
          Observation Timeline
        </h1>
        <p class="font-sans text-dot-teal mt-3 max-w-2xl text-lg">
          A real-time chronicle of experimental readouts, technical commits, and theoretical updates from the laboratory.
        </p>
      </div>

      {/* Grid: Form on Left, Timeline List on Right */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Form */}
        <div class="lg:col-span-1 space-y-6">
          <div class="border-b border-dot-border pb-3">
            <h2 class="font-space-mono text-sm uppercase tracking-wider text-dot-dark font-bold">
              Append Lab Observation
            </h2>
          </div>

          <Card hoverEffect={false} className="bg-white">
            <form onSubmit={handleSubmit} class="space-y-6">
              <div>
                <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2">
                  Researcher Identity
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. A. Vance (Optional)"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  class="dot-input text-sm"
                />
              </div>

              <div>
                <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2">
                  Observation Sphere
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  class="dot-input text-sm"
                >
                  <option value="General">General</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Theoretical">Theoretical Theory</option>
                </select>
              </div>

              <div>
                <label class="block font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold mb-2">
                  Empirical Findings
                </label>
                <textarea
                  placeholder="Record immediate readouts or theoretical breakthroughs..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows="5"
                  class="dot-input text-sm resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                class="dot-btn-primary w-full flex items-center justify-center space-x-2 text-xs py-2.5"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Commit Observation</span>
              </button>
            </form>
          </Card>
        </div>

        {/* Right Column: List & Filters */}
        <div class="lg:col-span-2 space-y-6">
          {/* Filters card */}
          <div class="bg-white border border-dot-border p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div class="relative w-full md:flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dot-neutral pointer-events-none" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                class="dot-input pl-10 text-xs py-2"
              />
            </div>
            
            <div class="flex items-center space-x-2 w-full md:w-auto">
              <Filter className="w-3.5 h-3.5 text-dot-neutral" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                class="dot-input text-xs py-2 w-full md:w-36"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Timeline Feed */}
          {loading && logs.length === 0 ? (
            <div class="flex flex-col items-center justify-center py-12 space-y-3">
              <Loader2 className="w-6 h-6 text-dot-accent animate-spin" />
              <span class="font-space-mono text-xs uppercase tracking-wider text-dot-neutral">Loading Record...</span>
            </div>
          ) : filteredLogs.length > 0 ? (
            <div class="relative pl-6 border-l border-dot-border space-y-8">
              {filteredLogs.map((log) => (
                <div key={log._id} class="relative space-y-3 bg-white border border-dot-border p-6 dot-card-hover">
                  {/* Timeline bullet dot */}
                  <span class="absolute -left-[30px] top-6 w-2 h-2 rounded-full bg-dot-accent border-4 border-dot-bg ring-4 ring-white"></span>
                  
                  <div class="flex flex-wrap justify-between items-center gap-2">
                    <div class="flex items-center space-x-2">
                      <Badge variant="primary">{log.category}</Badge>
                    </div>
                    <div class="flex items-center space-x-1.5 font-space-mono text-[10px] text-dot-neutral">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {log.createdAt 
                          ? new Date(log.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) 
                          : 'N/A'}
                      </span>
                    </div>
                  </div>

                  <p class="font-sans text-dot-dark text-sm leading-relaxed whitespace-pre-line">
                    {log.content}
                  </p>

                  <div class="border-t border-dot-border pt-3 flex items-center justify-end space-x-1.5 font-space-mono text-[10px] text-dot-neutral italic">
                    <User className="w-3 h-3 text-dot-teal" />
                    <span>Commited by {log.author || 'Anonymous'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div class="py-16 text-center border border-dashed border-dot-border bg-white text-dot-neutral">
              <span class="font-accent-italic text-2xl block mb-2">No observations recorded here.</span>
              <span class="font-space-mono text-xs">Try shifting the categories or writing a new observation log.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
