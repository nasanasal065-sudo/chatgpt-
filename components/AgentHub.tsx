import React, { useEffect, useState } from 'react';
import { AI_AGENTS } from '../constants';
import { Agent } from '../types';
import { Icon } from './Icon';

export const AgentHub: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(AI_AGENTS);
  const [metrics, setMetrics] = useState({
    totalTokens: 1245930,
    activeProcesses: 12,
    systemLoad: 45,
    networkLatency: 24
  });

  // Simulate agent activity and metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update Agents
      setAgents(prev => prev.map(agent => {
        const r = Math.random();
        if (r > 0.7) {
            const activities = ['Processing Data', 'Generating Tokens', 'Reviewing SEO', 'Deploying Content', 'Scanning Trends', 'Optimizing Database'];
            const newActivity = activities[Math.floor(Math.random() * activities.length)];
            return {
                ...agent,
                status: r > 0.85 ? 'Thinking' : 'Writing',
                activityLog: [newActivity, ...agent.activityLog.slice(0, 2)]
            };
        }
        return agent;
      }));

      // Update Metrics
      setMetrics(prev => ({
        totalTokens: prev.totalTokens + Math.floor(Math.random() * 50),
        activeProcesses: 10 + Math.floor(Math.random() * 5),
        systemLoad: Math.max(20, Math.min(90, prev.systemLoad + (Math.random() - 0.5) * 10)),
        networkLatency: 20 + Math.floor(Math.random() * 15)
      }));

    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const MetricCard = ({ label, value, unit, icon, color }: any) => (
    <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color} text-white`}>
        <Icon name={icon} className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">{label}</div>
        <div className="text-xl font-black font-mono">
          {typeof value === 'number' && label !== 'System Load' ? value.toLocaleString() : value}
          <span className="text-xs text-gray-400 ml-1">{unit}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8 border-b border-black pb-4">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Autonomous Agent Cluster</h2>
        <p className="text-gray-500 mt-2 font-mono">Real-time control center for synthetic intelligence nodes.</p>
      </div>

      {/* Real-time Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard 
          label="Total Tokens" 
          value={metrics.totalTokens} 
          unit="" 
          icon="file-text" 
          color="bg-purple-600" 
        />
        <MetricCard 
          label="System Load" 
          value={metrics.systemLoad.toFixed(1)} 
          unit="%" 
          icon="cpu" 
          color="bg-red-500" 
        />
        <MetricCard 
          label="Active Threads" 
          value={metrics.activeProcesses} 
          unit="Nodes" 
          icon="zap" 
          color="bg-yellow-500" 
        />
        <MetricCard 
          label="Network Latency" 
          value={metrics.networkLatency} 
          unit="ms" 
          icon="globe" 
          color="bg-blue-500" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map(agent => (
          <div key={agent.id} className="border border-gray-200 bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
            {/* Status Indicator */}
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-colors duration-500 ${
              agent.status === 'Thinking' ? 'bg-blue-500' : agent.status === 'Writing' ? 'bg-green-500' : 'bg-gray-500'
            }`} />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-black text-white rounded-lg">
                  <Icon name="bot" className="w-6 h-6" />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded border ${
                   agent.status === 'Thinking' ? 'bg-blue-50 text-blue-600 border-blue-200 animate-pulse' : 
                   agent.status === 'Writing' ? 'bg-green-50 text-green-600 border-green-200' : 
                   'bg-gray-50 text-gray-500 border-gray-200'
                }`}>
                  {agent.status.toUpperCase()}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
              <p className="text-xs text-gray-400 font-mono uppercase mb-4">{agent.role}</p>
              
              <div className="bg-gray-50 rounded p-3 text-xs font-mono space-y-1 h-20 overflow-hidden border border-gray-100">
                 {agent.activityLog.map((log, i) => (
                   <div key={i} className="truncate text-gray-600">
                     <span className="text-gray-300 mr-2">&gt;</span>{log}
                   </div>
                 ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};