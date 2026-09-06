import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/shared/ProjectCard';
import { Search, SlidersHorizontal, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Projects() {
  const { projects, loading, error } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Extract unique domains dynamically
  const domains = ['All', ...new Set(projects.map((p) => p.domain).filter(Boolean))];
  const statuses = ['All', 'Draft', 'In Progress', 'Under Review', 'Completed'];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.abstract?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.author?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain = selectedDomain === 'All' || project.domain === selectedDomain;
    const matchesStatus = selectedStatus === 'All' || project.status?.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesDomain && matchesStatus;
  });

  if (loading && projects.length === 0) {
    return (
      <div class="flex flex-col items-center justify-center py-24 space-y-4">
        <Loader2 class="w-8 h-8 text-dot-accent animate-spin" />
        <span class="font-space-mono text-xs uppercase tracking-widest text-dot-neutral">Loading Projects...</span>
      </div>
    );
  }

  return (
    <div class="space-y-12">
      {/* Title block */}
      <div class="border-b border-dot-border pb-8 flex flex-col md:flex-row md:justify-between md:items-end">
        <div>
          <span class="font-space-mono text-xs uppercase tracking-widest text-dot-accent">Registry</span>
          <h1 class="text-4xl md:text-5xl font-accent-italic text-dot-dark mt-2">
            Research Repositories
          </h1>
          <p class="font-sans text-dot-teal mt-3 max-w-xl text-lg">
            A comprehensive catalog of theoretical frameworks, technological audits, and experimental paradigms.
          </p>
        </div>
        <div class="mt-4 md:mt-0">
          <Link to="/projects/new" class="dot-btn-primary block text-center text-xs">
            Initiate Project
          </Link>
        </div>
      </div>

      {error && (
        <div class="bg-red-50 border border-red-200 text-red-800 p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span class="font-space-mono text-xs">{error}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div class="bg-white border border-dot-border p-6 space-y-6">
        <div class="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div class="relative flex-grow">
            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-dot-neutral pointer-events-none">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search by Title, Abstract, or Author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              class="dot-input pl-10 text-sm"
            />
          </div>

          {/* Domain Selector */}
          <div class="w-full md:w-48">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              class="dot-input text-sm"
            >
              <option disabled>Select Domain</option>
              {domains.map((dom) => (
                <option key={dom} value={dom}>
                  Domain: {dom}
                </option>
              ))}
            </select>
          </div>

          {/* Status Selector */}
          <div class="w-full md:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              class="dot-input text-sm"
            >
              <option disabled>Select Status</option>
              {statuses.map((stat) => (
                <option key={stat} value={stat}>
                  Status: {stat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Info row */}
        <div class="flex items-center space-x-2 text-xs font-space-mono text-dot-neutral border-t border-dot-border pt-4">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Showing {filteredProjects.length} of {projects.length} recorded frameworks</span>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project._id} class="h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div class="py-24 text-center border border-dashed border-dot-border bg-white">
          <span class="font-accent-italic text-2xl text-dot-neutral block mb-4">
            No research configurations match this query.
          </span>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedDomain('All'); setSelectedStatus('All'); }}
            class="dot-btn-secondary text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
