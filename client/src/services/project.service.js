import axios from 'axios';
import { API_URLS } from '../utils/constants/api-url.constant';

/**
 * Service layer for Projects.
 * Handles network requests to backend endpoints.
 */
export const projectService = {
  /**
   * Fetches all projects
   * @returns {Promise<Array>} List of projects
   */
  async getAllProjects() {
    const response = await axios.get(API_URLS.PROJECTS.BASE);
    return response.data;
  },

  /**
   * Fetches a single project by ID
   * @param {string} id - Project ID
   * @returns {Promise<Object>} Project object
   */
  async getProjectById(id) {
    const response = await axios.get(API_URLS.PROJECTS.DETAIL(id));
    return response.data;
  },

  /**
   * Creates a new research project
   * @param {Object} projectData - Project details
   * @returns {Promise<Object>} Created project
   */
  async createProject(projectData) {
    const response = await axios.post(API_URLS.PROJECTS.BASE, projectData);
    return response.data;
  },

  /**
   * Updates an existing project
   * @param {string} id - Project ID
   * @param {Object} projectData - Updated fields
   * @returns {Promise<Object>} Updated project
   */
  async updateProject(id, projectData) {
    const response = await axios.put(API_URLS.PROJECTS.DETAIL(id), projectData);
    return response.data;
  },

  /**
   * Deletes a project by ID
   * @param {string} id - Project ID
   * @returns {Promise<Object>} Deletion result confirmation
   */
  async deleteProject(id) {
    const response = await axios.delete(API_URLS.PROJECTS.DETAIL(id));
    return response.data;
  }
};
