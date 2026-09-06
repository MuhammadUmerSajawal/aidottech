const Portfolio = require('../models/portfolio.model');
const mongoose = require('mongoose');

// Seed data representing Brand AI Presence / Online Services
let mockPortfolio = [
  {
    _id: 'mock_port_1',
    name: 'dot Copywriter',
    domain: 'Content & Branding',
    accentQuote: 'Automated high-conversion marketing copy.',
    description: 'Generate optimized landing page headings, brand slogans, and newsletter scripts custom-tailored to target audiences using our fine-tuned branding engines.',
    techStack: ['openai', 'gpt-4o', 'branding-engine'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
  },
  {
    _id: 'mock_port_2',
    name: 'dot SEO Ranker',
    domain: 'SEO & Discovery',
    accentQuote: 'Intelligent content mapping for top search engine visibility.',
    description: 'Audit site structures, discover organic ranking opportunities, and auto-generate meta tags and schema markers matching semantic search criteria.',
    techStack: ['seo-crawler', 'semantic-analysis', 'node-agent'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
  },
  {
    _id: 'mock_port_3',
    name: 'dot Storefront',
    domain: 'E-commerce',
    accentQuote: 'Instantly publish and scale merchant portals.',
    description: 'Launch custom digital storefronts integrated with AI product recommenders, dynamic pricing models, and automated inventory classification systems.',
    techStack: ['shopify-sdk', 'react-ssr', 'agentic-pricing'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)
  }
];

const isDbConnected = () => mongoose.connection.readyState === 1;

const portfolioService = {
  async getAllItems() {
    if (isDbConnected()) {
      return await Portfolio.find().sort({ createdAt: -1 });
    }
    return [...mockPortfolio].sort((a, b) => b.createdAt - a.createdAt);
  },

  async getItemById(id) {
    if (isDbConnected()) {
      return await Portfolio.findById(id);
    }
    const found = mockPortfolio.find(item => item._id === id);
    if (!found) throw new Error('AI presence service config not found');
    return found;
  },

  async createItem(itemData) {
    if (isDbConnected()) {
      return await Portfolio.create(itemData);
    }
    const newItem = {
      _id: 'mock_port_' + Date.now(),
      ...itemData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockPortfolio.push(newItem);
    return newItem;
  },

  async updateItem(id, itemData) {
    if (isDbConnected()) {
      return await Portfolio.findByIdAndUpdate(id, itemData, {
        new: true,
        runValidators: true
      });
    }
    const idx = mockPortfolio.findIndex(item => item._id === id);
    if (idx === -1) throw new Error('AI presence service not found');
    const updated = {
      ...mockPortfolio[idx],
      ...itemData,
      updatedAt: new Date()
    };
    mockPortfolio[idx] = updated;
    return updated;
  },

  async deleteItem(id) {
    if (isDbConnected()) {
      return await Portfolio.findByIdAndDelete(id);
    }
    const idx = mockPortfolio.findIndex(item => item._id === id);
    if (idx === -1) throw new Error('AI presence service not found');
    mockPortfolio.splice(idx, 1);
    return { success: true };
  },

  async getStats() {
    const items = await this.getAllItems();
    const domains = new Set(items.map(item => item.domain).filter(Boolean));
    
    return {
      totalItems: items.length,
      activeDomains: domains.size,
      totalIntegrations: items.reduce((acc, curr) => acc + (curr.techStack?.length || 0), 0) + 12
    };
  }
};

module.exports = portfolioService;
