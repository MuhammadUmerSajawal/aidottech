import React, { useState } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';

export default function PortfolioPage() {
  const {
    items,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    createItem,
    deleteItem,
  } = usePortfolio();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('E-commerce');

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || !description) return;
    try {
      await createItem({ name, description, domain });
      setName('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="portfolio-page max-w-4xl mx-auto py-8">
      <h1 className="text-display font-bold mb-2">Online AI Services Dashboard</h1>
      <p className="text-body text-dot-teal mb-6">Manage brand deployment nodes and services configurations.</p>
      
      {error && <div className="text-red-500 bg-red-100/10 p-3 rounded border border-red-500/20 text-sm font-space-mono mb-4">{error}</div>}

      <div className="my-6">
        <input 
          type="text" 
          placeholder="Search services..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md h-[40px] px-4 rounded-lg border border-dot-inputborder bg-white dark:bg-white/5 text-dot-navy dark:text-dot-warmwhite focus:outline-none text-small"
        />
      </div>

      <form onSubmit={handleCreate} className="space-y-4 border border-dot-softblue dark:border-white/10 p-6 rounded-xl bg-white dark:bg-white/5 max-w-md my-6">
        <h3 className="font-space-mono text-sm uppercase text-dot-blue font-bold">Add Service Presence</h3>
        
        <div>
          <label className="block text-xs font-space-mono uppercase text-dot-cedar mb-1">Service Name</label>
          <input 
            type="text" 
            placeholder="e.g. dot SEO Ranker" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[40px] px-3 rounded-lg border border-dot-inputborder bg-white dark:bg-white/5 text-dot-navy dark:text-dot-warmwhite text-small focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-space-mono uppercase text-dot-cedar mb-1">Category Domain</label>
          <input 
            type="text" 
            placeholder="e.g. E-commerce" 
            value={domain} 
            onChange={(e) => setDomain(e.target.value)}
            className="w-full h-[40px] px-3 rounded-lg border border-dot-inputborder bg-white dark:bg-white/5 text-dot-navy dark:text-dot-warmwhite text-small focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-space-mono uppercase text-dot-cedar mb-1">Treatise / Description</label>
          <textarea 
            placeholder="Description of the online branding service..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-3 rounded-lg border border-dot-inputborder bg-white dark:bg-white/5 text-dot-navy dark:text-dot-warmwhite text-small focus:outline-none"
          />
        </div>

        <button type="submit" className="w-full bg-dot-blue text-white hover:bg-dot-navy transition-colors font-space-mono text-xs uppercase p-3 rounded-lg">
          Submit Configuration
        </button>
      </form>

      {loading ? (
        <p className="font-space-mono text-sm text-dot-cedar">Loading services...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {items.map(item => (
            <div key={item._id} className="border border-dot-softblue dark:border-white/10 p-5 rounded-xl bg-white dark:bg-white/5 flex flex-col justify-between">
              <div>
                <span className="font-space-mono text-[10px] uppercase text-dot-blue font-bold px-2 py-0.5 rounded border border-dot-blue bg-dot-blue/5 inline-block mb-3">
                  {item.domain}
                </span>
                <h2 className="font-sans font-bold text-h1 text-dot-navy dark:text-dot-warmwhite">{item.name}</h2>
                <p className="text-small text-dot-teal mt-2">{item.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-dot-softblue dark:border-white/10 flex justify-end">
                <button 
                  onClick={() => deleteItem(item._id)} 
                  className="text-red-500 hover:text-red-700 font-space-mono text-xs transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
