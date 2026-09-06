import axios from 'axios';
import { API_URLS } from '../utils/constants/api-url.constant';

/**
 * Service layer for Analytics & Statistics.
 */
export const statsService = {
  /**
   * Fetches summary statistics for the dashboard
   * @returns {Promise<Object>} Aggregated metrics
   */
  async getSummaryStats() {
    const response = await axios.get(API_URLS.STATS.SUMMARY);
    return response.data;
  }
};
