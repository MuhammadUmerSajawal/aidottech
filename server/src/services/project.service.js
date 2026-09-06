const Project = require('../models/project.model');
const mongoose = require('mongoose');

// Seed data for fallback mode
let mockProjects = [
  {
    _id: 'mock_proj_1',
    title: 'Electromagnetic Wave Modulation in High-Aspect Carbon Nanotubes',
    domain: 'Nanomaterials',
    status: 'Completed',
    abstract: 'Investigation of gigahertz electromagnetic frequency scattering and structural absorption resonances inside single-walled carbon nanostructures under thermal equilibrium.',
    content: 'This paper analyzes the transmission coefficients of electromagnetic wave propagation through aligned carbon nanotube arrays.\n\nExperimental readouts show a peak attenuation of -40dB at 12.4 GHz, suggesting robust electromagnetic shielding characteristics. Future applications involve quantum Faraday cages and super-conductor routing pathways.',
    author: 'Dr. Elena Rostova',
    tags: ['nanotech', 'physics', 'shielding'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    _id: 'mock_proj_2',
    title: 'Distributed Consensus Protocols for Asynchronous Graph Networks',
    domain: 'Distributed Systems',
    status: 'In Progress',
    abstract: 'Formulation of mathematical proofs validating convergence bounds of Byzantine Fault Tolerant state machines operating over randomized geometric routing typologies.',
    content: 'By employing decentralized leaderless gossip mechanisms, we prove that arbitrary node clusters can establish finality with high probability in O(log N) messaging rounds.\n\nNumerical simulations verify consistency thresholds under 33% network splits. Next milestone is simulating network latency spikes above 500ms.',
    author: 'Prof. Marcus Vance',
    tags: ['consensus', 'algorithms', 'networks'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48)
  },
  {
    _id: 'mock_proj_3',
    title: 'Neuromorphic Synaptic Grid Synthesis via Silicon-Germanium Junctions',
    domain: 'Cognitive Systems',
    status: 'Under Review',
    abstract: 'An examination of low-power solid-state transistors replicating biological plasticity curves and spike-timing-dependent learning rules.',
    content: 'This report introduces a three-terminal memristive framework using alloyed silicon-germanium structures.\n\nWe demonstrate tunable conductance curves exhibiting long-term potentiation (LTP) and long-term depression (LTD) with energy dissipation under 10 femtojoules per spike event. Results represent a 50x efficiency optimization over modern CMOS neural nets.',
    author: 'Dr. Kenji Tanaka',
    tags: ['neuromorphic', 'hardware', 'semiconductors'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 240), // 10 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 96)
  }
];

const isDbConnected = () => mongoose.connection.readyState === 1;

const projectService = {
  async getAllProjects() {
    if (isDbConnected()) {
      return await Project.find().sort({ createdAt: -1 });
    }
    return [...mockProjects].sort((a, b) => b.createdAt - a.createdAt);
  },

  async getProjectById(id) {
    if (isDbConnected()) {
      return await Project.findById(id);
    }
    const found = mockProjects.find(p => p._id === id);
    if (!found) throw new Error('Project not found');
    return found;
  },

  async createProject(projectData) {
    if (isDbConnected()) {
      return await Project.create(projectData);
    }
    const newProject = {
      _id: 'mock_proj_' + Date.now(),
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockProjects.push(newProject);
    return newProject;
  },

  async updateProject(id, projectData) {
    if (isDbConnected()) {
      return await Project.findByIdAndUpdate(id, projectData, {
        new: true,
        runValidators: true
      });
    }
    const idx = mockProjects.findIndex(p => p._id === id);
    if (idx === -1) throw new Error('Project not found');
    const updated = {
      ...mockProjects[idx],
      ...projectData,
      updatedAt: new Date()
    };
    mockProjects[idx] = updated;
    return updated;
  },

  async deleteProject(id) {
    if (isDbConnected()) {
      return await Project.findByIdAndDelete(id);
    }
    const idx = mockProjects.findIndex(p => p._id === id);
    if (idx === -1) throw new Error('Project not found');
    mockProjects.splice(idx, 1);
    return { success: true };
  }
};

module.exports = projectService;
