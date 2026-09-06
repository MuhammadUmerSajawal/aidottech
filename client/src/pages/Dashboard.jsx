import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { useLogs } from '../hooks/useLogs';
import { useStats } from '../hooks/useStats';
import MetricCard from '../components/shared/MetricCard';
import ProjectCard from '../components/shared/ProjectCard';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { 
  FileText, 
  Terminal, 
  Layers, 
  CheckSquare, 
  Send,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();
  const { logs, loading: logsLoading, createLog } = useLogs();
  const { stats, loading: statsLoading } = useStats();

  const [newLogText, setNewLogText] = useState('');
  const [newLogCategory, setNewLogCategory] = useState('General');
  const [submittingLog, setSubmittingLog] = useState(false);

  const handleQuickLogSubmit = async (e) => {
    e.preventDefault();
    if (!newLogText.trim()) return;

    setSubmittingLog(true);
    try {
      await createLog({
        content: newLogText,
        category: newLogCategory,
        author: 'Lead Researcher' // Mock default author
      });
      setNewLogText('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingLog(false);
    }
  };

  // Compute stats on the fly in case the stats service falls back or is loading
  const totalProjectsCount = stats?.totalProjects ?? projects.length;
  const totalLogsCount = stats?.totalLogs ?? logs.length;
  const uniqueDomains = Array.from(new Set(projects.map(p => p.domain))).filter(Boolean);
  const activeDomainsCount = stats?.activeDomains ?? (uniqueDomains.length || 4);

  const completedProjects = projects.filter(p => p.status?.toLowerCase() === 'completed').length;
  const completionPercentage = totalProjectsCount > 0 
    ? Math.round((completedProjects / totalProjectsCount) * 100) 
    : 0;

  const recentProjects = projects.slice(0, 3);
  const recentLogs = logs.slice(0, 5);

  const isGlobalLoading = projectsLoading && logsLoading && statsLoading;

  if (isGlobalLoading) {
    return (
      <div class="flex flex-col items-center justify-center py-24 space-y-4">
        <Loader2 class="w-8 h-8 text-dot-accent animate-spin" />
        <span class="font-space-mono text-xs uppercase tracking-widest text-dot-neutral">Initializing Hub...</span>
      </div>
    );
  }

  return (
    <div class="space-y-12">
      {/* Editorial Title Header */}
      <div class="border-b border-dot-border pb-8">
        <span class="font-space-mono text-xs uppercase tracking-widest text-dot-accent">Dashboard</span>
        <h1 class="text-4xl md:text-5xl font-accent-italic text-dot-dark mt-2">
          Research Synthesis & Insights
        </h1>
        <p class="font-sans text-dot-teal mt-3 max-w-2xl text-lg">
          Welcome to the .dot project ecosystem. Track theoretical progress, audit observation logs, and manage research milestones.
        </p>
      </div>

      {/* KPI Metric Cards Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Total Projects" 
          value={totalProjectsCount} 
          subtext="Active Research Files" 
          icon={FileText} 
        />
        <MetricCard 
          label="Active Domains" 
          value={activeDomainsCount} 
          subtext="Theoretical Spheres" 
          icon={Layers} 
        />
        <MetricCard 
          label="Logs Generated" 
          value={totalLogsCount} 
          subtext="Empirical Entries" 
          icon={Terminal} 
        />
        <MetricCard 
          label="Completion Index" 
          value={`${completionPercentage}%`} 
          subtext={`${completedProjects} Completed Tracks`} 
          icon={CheckSquare} 
        />
      </div>

      {projectsError && (
        <div class="bg-red-50 border border-red-200 text-red-800 p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span class="font-space-mono text-xs">{projectsError}</span>
        </div>
      )}

      {/* Two-Column Layout: Projects on Left, Observations Timeline on Right */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Projects (takes 2 spans) */}
        <div class="lg:col-span-2 space-y-8">
          <div class="flex justify-between items-end border-b border-dot-border pb-4">
            <h2 class="font-space-mono text-sm uppercase tracking-wider text-dot-dark font-bold">
              Active Projects
            </h2>
            <Link 
              to="/projects" 
              class="text-xs font-space-mono text-dot-accent hover:text-dot-dark uppercase tracking-wider"
            >
              View All Projects ({projects.length})
            </Link>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div key={project._id} class="h-full">
                  <ProjectCard project={project} />
                </div>
              ))
            ) : (
              <div class="col-span-2 py-12 border border-dashed border-dot-border text-center bg-white">
                <p class="font-accent-italic text-xl text-dot-neutral">No projects cataloged yet.</p>
                <Link to="/projects/new" class="mt-4 inline-block dot-btn-secondary text-xs">
                  Create First Project
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Observation Log & Quick Logger */}
        <div class="space-y-8">
          <div class="border-b border-dot-border pb-4">
            <h2 class="font-space-mono text-sm uppercase tracking-wider text-dot-dark font-bold">
              Empirical Timeline
            </h2>
          </div>

          {/* Quick Logger Form */}
          <Card hoverEffect={false} className="bg-white">
            <form onSubmit={handleQuickLogSubmit} class="space-y-4">
              <div class="flex justify-between items-center">
                <label class="font-space-mono text-[10px] uppercase tracking-widest text-dot-neutral font-bold">
                  Publish Lab Snippet
                </label>
                <select
                  value={newLogCategory}
                  onChange={(e) => setNewLogCategory(e.target.value)}
                  class="font-space-mono text-[10px] uppercase bg-transparent border-b border-dot-border text-dot-teal focus:outline-none focus:border-dot-accent py-0.5"
                >
                  <option value="General">General</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Theoretical">Theory</option>
                </select>
              </div>

              <textarea
                value={newLogText}
                onChange={(e) => setNewLogText(e.target.value)}
                placeholder="Log a research snippet or observations..."
                rows="3"
                class="dot-input text-sm resize-none"
                required
              />

              <button
                type="submit"
                disabled={submittingLog}
                class="dot-btn-primary w-full flex items-center justify-center space-x-2 text-xs py-2"
              >
                {submittingLog ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>Commit Snippet</span>
              </button>
            </form>
          </Card>

          {/* Timeline Stream */}
          <div class="space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {recentLogs.length > 0 ? (
              recentLogs.map((log) => (
                <div 
                  key={log._id} 
                  class="p-4 border border-dot-border bg-white space-y-2 relative"
                >
                  <div class="flex justify-between items-center">
                    <Badge variant="neutral" className="text-[9px]">
                      {log.category || 'General'}
                    </Badge>
                    <span class="font-space-mono text-[9px] text-dot-neutral">
                      {log.createdAt ? new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                    </span>
                  </div>
                  <p class="font-sans text-xs text-dot-dark leading-relaxed">
                    {log.content}
                  </p>
                  <div class="font-space-mono text-[9px] text-dot-neutral text-right italic">
                    — {log.author || 'Lead Researcher'}
                  </div>
                </div>
              ))
            ) : (
              <div class="py-8 text-center border border-dashed border-dot-border bg-white text-dot-neutral">
                <span class="font-space-mono text-xs">No entries recorded today.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
