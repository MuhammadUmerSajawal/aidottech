import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { portfolioService } from '../services/portfolio.service';

const AppStoreContext = createContext(null);

/**
 * Global App Store Provider.
 * Wraps the app to manage global portfolio and system states.
 */
export function AppStoreProvider({ children }) {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);

  // Theme support: basic starting theme is dark
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('dot-theme') || 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('dot-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const allItems = await portfolioService.getAllItems();
      setItems(allItems);

      const computedStats = await portfolioService.getStats();
      setStats(computedStats);
    } catch (err) {
      console.error('Failed to load store data:', err);
      setError(err.response?.data?.message || 'Synchronization failure with .dot grid server');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Actions
  const createItem = async (itemData) => {
    try {
      const newItem = await portfolioService.createItem(itemData);
      setItems(prev => [newItem, ...prev]);
      // Refetch stats
      const computedStats = await portfolioService.getStats();
      setStats(computedStats);
      return newItem;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateItem = async (id, itemData) => {
    try {
      const updatedItem = await portfolioService.updateItem(id, itemData);
      setItems(prev => prev.map(item => item._id === id ? updatedItem : item));
      return updatedItem;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteItem = async (id) => {
    try {
      await portfolioService.deleteItem(id);
      setItems(prev => prev.filter(item => item._id !== id));
      if (activeItemId === id) setActiveItemId(null);
      // Refetch stats
      const computedStats = await portfolioService.getStats();
      setStats(computedStats);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const value = {
    items,
    stats,
    loading,
    error,
    activeItemId,
    setActiveItemId,
    refetch: fetchAllData,
    createItem,
    updateItem,
    deleteItem,
    theme,
    toggleTheme
  };

  return (
    <AppStoreContext.Provider value={value}>
      {children}
    </AppStoreContext.Provider>
  );
}

/**
 * Custom Hook to access global state.
 */
export function useAppStore() {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppStoreProvider');
  }
  return context;
}
