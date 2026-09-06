import { useState, useEffect, useCallback } from 'react';
import { logService } from '../services/log.service';

/**
 * Custom hook to manage fetching and posting research logs / snippets.
 */
export function useLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await logService.getAllLogs();
      setLogs(data);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
      setError(err.response?.data?.message || 'Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  }, []);

  const createLog = async (logData) => {
    setError(null);
    try {
      const newLog = await logService.createLog(logData);
      setLogs((prev) => [newLog, ...prev]);
      return newLog;
    } catch (err) {
      console.error('Failed to create log:', err);
      setError(err.response?.data?.message || 'Failed to create log');
      throw err;
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    loading,
    error,
    refetch: fetchLogs,
    createLog,
  };
}
