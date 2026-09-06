import api from './api';
import { API_URLS } from '../utils/constants/api-url.constant';

/**
 * Service layer for Portfolio operations.
 * Coordinates requests to MERN backend.
 */
export const portfolioService = {
  /**
   * Fetches all portfolio items
   */
  async getAllItems() {
    const response = await api.get(API_URLS.PORTFOLIO.BASE);
    return response.data;
  },

  /**
   * Fetches a single portfolio item by ID
   */
  async getItemById(id) {
    const response = await api.get(API_URLS.PORTFOLIO.DETAIL(id));
    return response.data;
  },

  /**
   * Creates a new portfolio item
   */
  async createItem(itemData) {
    const response = await api.post(API_URLS.PORTFOLIO.BASE, itemData);
    return response.data;
  },

  /**
   * Updates an existing portfolio item
   */
  async updateItem(id, itemData) {
    const response = await api.put(API_URLS.PORTFOLIO.DETAIL(id), itemData);
    return response.data;
  },

  /**
   * Deletes a portfolio item by ID
   */
  async deleteItem(id) {
    const response = await api.delete(API_URLS.PORTFOLIO.DETAIL(id));
    return response.data;
  },

  /**
   * Fetches portfolio metrics/statistics
   */
  async getStats() {
    const response = await api.get(API_URLS.PORTFOLIO.STATS);
    return response.data;
  }
};
