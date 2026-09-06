const projectService = require('./project.service');
const logService = require('./log.service');

const statsService = {
  /**
   * Generates summary statistics by aggregating data across services
   */
  async getSummaryStats() {
    const projects = await projectService.getAllProjects();
    const logs = await logService.getAllLogs();

    // Unique domains count
    const domains = new Set(projects.map(p => p.domain).filter(Boolean));

    return {
      totalProjects: projects.length,
      activeDomains: domains.size || 4, // Default to 4 if empty
      totalLogs: logs.length,
      completedProjectsCount: projects.filter(p => p.status === 'Completed').length
    };
  }
};

module.exports = statsService;
