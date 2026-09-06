import { useState, useEffect, useCallback } from 'react';
import { projectService } from '../services/project.service';

/**
 * Custom hook to manage fetching and mutating research projects.
 * Extracts business logic and loading/error state management from the UI components.
 */
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError(err.response?.data?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = async (projectData) => {
    setLoading(true);
    setError(null);
    try {
      const newProject = await projectService.createProject(projectData);
      setProjects((prev) => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      console.error('Failed to create project:', err);
      setError(err.response?.data?.message || 'Failed to create project');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id, projectData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedProject = await projectService.updateProject(id, projectData);
      setProjects((prev) =>
        prev.map((proj) => (proj._id === id ? updatedProject : proj))
      );
      return updatedProject;
    } catch (err) {
      console.error('Failed to update project:', err);
      setError(err.response?.data?.message || 'Failed to update project');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await projectService.deleteProject(id);
      setProjects((prev) => prev.filter((proj) => proj._id !== id));
    } catch (err) {
      console.error('Failed to delete project:', err);
      setError(err.response?.data?.message || 'Failed to delete project');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}
