import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { ArrowRight, User } from 'lucide-react';

/**
 * Project card for presenting a research project.
 */
export default function ProjectCard({ project }) {
  const { _id, title, domain, status, abstract, author, createdAt } = project;

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

  const formattedDate = createdAt 
    ? new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : 'N/A';

  return (
    <Card hoverEffect={true} className="flex flex-col justify-between h-full">
      <div>
        <div class="flex justify-between items-center mb-4">
          <Badge variant="neutral">{domain}</Badge>
          <Badge variant={getStatusVariant(status)}>{status}</Badge>
        </div>

        <Link to={`/projects/${_id}`} class="group">
          <h3 class="font-sans text-xl font-bold text-dot-dark group-hover:text-dot-accent transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
        </Link>

        <p class="font-accent-italic text-lg text-dot-teal mt-2 line-clamp-3">
          {abstract || 'No abstract provided.'}
        </p>
      </div>

      <div class="mt-6 pt-4 border-t border-dot-border flex items-center justify-between">
        <div class="flex items-center space-x-2 text-dot-neutral font-space-mono text-xs">
          <User className="w-3.5 h-3.5" />
          <span class="truncate max-w-[120px]">{author || 'Anonymous'}</span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>

        <Link 
          to={`/projects/${_id}`}
          class="text-dot-dark hover:text-dot-accent flex items-center space-x-1 font-space-mono text-xs uppercase tracking-wider transition-colors duration-200"
        >
          <span>Open</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
}
