/**
 * Centralized API endpoints for the MERN application.
 * All service layer functions must import their paths from this constant.
 */
export const API_URLS = {
  PORTFOLIO: {
    BASE: '/api/portfolio',
    DETAIL: (id) => `/api/portfolio/${id}`,
    STATS: '/api/portfolio/stats',
  }
};
