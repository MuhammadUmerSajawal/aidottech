import axios from 'axios';
import { API_URLS } from '../utils/constants/api-url.constant';

/**
 * Service layer for Research Logs / Snippets.
 */
export const logService = {
  /**
   * Fetches all research snippets/logs
   * @returns {Promise<Array>} List of logs
   */
  async getAllLogs() {
    const response = await axios.get(API_URLS.LOGS.BASE);
    return response.data;
  },

  /**
   * Creates a new research log
   * @param {Object} logData - Log snippet details
   * @returns {Promise<Object>} Created log
   */
  async createLog(logData) {
    const response = await axios.post(API_URLS.LOGS.BASE, logData);
    return response.data;
  }
};
