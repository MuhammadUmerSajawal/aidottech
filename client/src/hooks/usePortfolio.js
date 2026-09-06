import { useAppStore } from '../store/useAppStore';
import { useState, useMemo } from 'react';

/**
 * Custom Hook (Logic Layer) managing portfolio data aggregation, search filtering, and CRUD bindings.
 */
export function usePortfolio() {
  const {
    items,
    stats,
    loading,
    error,
    activeItemId,
    setActiveItemId,
    refetch,
    createItem,
    updateItem,
    deleteItem
  } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterDomain, setFilterDomain] = useState('All');

  // Filtered list computed logically
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = 
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.techStack?.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDomain = filterDomain === 'All' || item.domain === filterDomain;

      return matchesSearch && matchesDomain;
    });
  }, [items, searchQuery, filterDomain]);

  // Unique domains list
  const domains = useMemo(() => {
    return ['All', ...new Set(items.map(item => item.domain).filter(Boolean))];
  }, [items]);

  // Find active item object
  const activeItem = useMemo(() => {
    return items.find(item => item._id === activeItemId) || null;
  }, [items, activeItemId]);

  return {
    items: filteredItems,
    allItemsCount: items.length,
    stats,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    filterDomain,
    setFilterDomain,
    domains,
    activeItem,
    setActiveItemId,
    refetch,
    createItem,
    updateItem,
    deleteItem,
  };
}
