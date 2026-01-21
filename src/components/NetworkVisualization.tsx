import { useState } from 'react';
import { ArrowLeft, ArrowRight, Download, Zap, TrendingUp } from 'lucide-react';

interface NetworkVisualizationProps {
  networkData: any;
  onContinue: () => void;
  onBack: () => void;
}

const hubTargets = [
  { target: 'COX-2', degree: 12, betweenness: 0.45, pathways: ['Inflammation', 'Arachidonic acid metabolism'] },
  { target: 'NF-κB', degree: 10, betweenness: 0.42, pathways: ['Inflammation', 'Immune response', 'Apoptosis'] },
  { target: 'TNF-α', degree: 9, betweenness: 0.38, pathways: ['Inflammation', 'Cell signaling', 'Apoptosis'] },
  { target: 'STAT3', degree: 8, betweenness: 0.35, pathways: ['Cell proliferation', 'Immune response'] },
  { target: 'IL-6', degree: 7, betweenness: 0.31, pathways: ['Inflammation', 'Immune response'] },
];

const pathwayEnrichment = [
  { pathway: 'Inflammatory response', pValue: 0.00012, genes: 8, enrichment: 4.2 },
  { pathway: 'Apoptosis signaling', pValue: 0.00045, genes: 6, enrichment: 3.8 },
  { pathway: 'Immune system process', pValue: 0.00089, genes: 7, enrichment: 3.5 },
  { pathway: 'Cell proliferation', pValue: 0.0015, genes: 5, enrichment: 3.1 },
  { pathway: 'Oxidative stress response', pValue: 0.0032, genes: 4, enrichment: 2.8 },
];

export function NetworkVisualization({ networkData, onContinue, onBack }: NetworkVisualizationProps) {
  const [viewMode, setViewMode] = useState<'network' | 'sankey' | 'hubs'>('network');

  return (
    <div className="min-h-screen py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl text-gray-900 mb-2">Network Pharmacology</h1>
              <p className="text-gray-600">
                Multi-level plant-compound-target interaction network
              </p>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Network
            </button>
          </div>

          {/* View Mode Tabs */}
          <div className="flex gap-2 mb-8 border-b border-gray-200">
            <button
              onClick={() => setViewMode('network')}
              className={`px-6 py-3 transition-colors ${
                viewMode === 'network'
                  ? 'border-b-2 border-cyan-500 text-cyan-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Network Graph
            </button>
            <button
              onClick={() => setViewMode('sankey')}
              className={`px-6 py-3 transition-colors ${
                viewMode === 'sankey'
                  ? 'border-b-2 border-cyan-500 text-cyan-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sankey Diagram
            </button>
            <button
              onClick={() => setViewMode('hubs')}
              className={`px-6 py-3 transition-colors ${
                viewMode === 'hubs'
                  ? 'border-b-2 border-cyan-500 text-cyan-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Hub Analysis
            </button>
          </div>

          {viewMode === 'network' && (
            <div className="space-y-6">
              {/* Network Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                  <p className="text-sm text-gray-600 mb-1">Nodes</p>
                  <p className="text-2xl text-emerald-700">24</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                  <p className="text-sm text-gray-600 mb-1">Edges</p>
                  <p className="text-2xl text-teal-700">58</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                  <p className="text-sm text-gray-600 mb-1">Avg. Degree</p>
                  <p className="text-2xl text-cyan-700">4.8</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Clustering</p>
                  <p className="text-2xl text-blue-700">0.62</p>
                </div>
              </div>

              {/* Network Visualization */}
              <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                <div className="bg-white rounded-lg h-[500px] relative overflow-hidden">
                  <svg viewBox="0 0 800 500" className="w-full h-full">
                    {/* Draw edges */}
                    <g opacity="0.3">
                      <line x1="200" y1="250" x2="400" y2="150" stroke="#6366f1" strokeWidth="2" />
                      <line x1="200" y1="250" x2="400" y2="250" stroke="#6366f1" strokeWidth="2" />
                      <line x1="200" y1="250" x2="400" y2="350" stroke="#6366f1" strokeWidth="2" />
                      <line x1="400" y1="150" x2="600" y2="100" stroke="#8b5cf6" strokeWidth="2" />
                      <line x1="400" y1="150" x2="600" y2="200" stroke="#8b5cf6" strokeWidth="2" />
                      <line x1="400" y1="250" x2="600" y2="200" stroke="#8b5cf6" strokeWidth="2" />
                      <line x1="400" y1="250" x2="600" y2="300" stroke="#8b5cf6" strokeWidth="2" />
                      <line x1="400" y1="350" x2="600" y2="300" stroke="#8b5cf6" strokeWidth="2" />
                      <line x1="400" y1="350" x2="600" y2="400" stroke="#8b5cf6" strokeWidth="2" />
                    </g>

                    {/* Plants (green) */}
                    <g>
                      <circle cx="200" cy="250" r="30" fill="#10b981" opacity="0.9" />
                      <text x="200" y="255" textAnchor="middle" fill="white" fontSize="12">Plant</text>
                    </g>

                    {/* Compounds (teal) */}
                    <g>
                      <circle cx="400" cy="150" r="25" fill="#14b8a6" opacity="0.9" />
                      <text x="400" y="155" textAnchor="middle" fill="white" fontSize="10">C1</text>
                      
                      <circle cx="400" cy="250" r="25" fill="#14b8a6" opacity="0.9" />
                      <text x="400" y="255" textAnchor="middle" fill="white" fontSize="10">C2</text>
                      
                      <circle cx="400" cy="350" r="25" fill="#14b8a6" opacity="0.9" />
                      <text x="400" y="355" textAnchor="middle" fill="white" fontSize="10">C3</text>
                    </g>

                    {/* Targets (purple) - varying sizes for hub targets */}
                    <g>
                      <circle cx="600" cy="100" r="35" fill="#8b5cf6" opacity="0.9" />
                      <text x="600" y="105" textAnchor="middle" fill="white" fontSize="11">COX-2</text>
                      
                      <circle cx="600" cy="200" r="32" fill="#8b5cf6" opacity="0.9" />
                      <text x="600" y="205" textAnchor="middle" fill="white" fontSize="11">NF-κB</text>
                      
                      <circle cx="600" cy="300" r="28" fill="#8b5cf6" opacity="0.9" />
                      <text x="600" y="305" textAnchor="middle" fill="white" fontSize="10">TNF-α</text>
                      
                      <circle cx="600" cy="400" r="24" fill="#8b5cf6" opacity="0.9" />
                      <text x="600" y="405" textAnchor="middle" fill="white" fontSize="10">IL-6</text>
                    </g>

                    {/* Legend */}
                    <g transform="translate(20, 20)">
                      <circle cx="10" cy="10" r="8" fill="#10b981" />
                      <text x="25" y="15" fontSize="12" fill="#666">Plants</text>
                      
                      <circle cx="10" cy="35" r="8" fill="#14b8a6" />
                      <text x="25" y="40" fontSize="12" fill="#666">Compounds</text>
                      
                      <circle cx="10" cy="60" r="8" fill="#8b5cf6" />
                      <text x="25" y="65" fontSize="12" fill="#666">Targets</text>
                    </g>
                  </svg>
                  <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                    Interactive • Drag nodes • Zoom to explore
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'sankey' && (
            <div className="space-y-6">
              <p className="text-sm text-gray-600 mb-4">
                Flow diagram showing plant → compound → target relationships
              </p>
              <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                <div className="bg-white rounded-lg h-[500px] relative overflow-hidden">
                  <svg viewBox="0 0 800 500" className="w-full h-full">
                    {/* Sankey flows */}
                    {/* Plants to Compounds */}
                    <path d="M 150 250 Q 275 200, 400 180" fill="none" stroke="#10b981" strokeWidth="30" opacity="0.3" />
                    <path d="M 150 250 Q 275 250, 400 250" fill="none" stroke="#10b981" strokeWidth="25" opacity="0.3" />
                    <path d="M 150 250 Q 275 300, 400 320" fill="none" stroke="#10b981" strokeWidth="20" opacity="0.3" />
                    
                    {/* Compounds to Targets */}
                    <path d="M 500 180 Q 575 150, 650 120" fill="none" stroke="#14b8a6" strokeWidth="20" opacity="0.3" />
                    <path d="M 500 180 Q 575 180, 650 200" fill="none" stroke="#14b8a6" strokeWidth="15" opacity="0.3" />
                    <path d="M 500 250 Q 575 240, 650 200" fill="none" stroke="#14b8a6" strokeWidth="18" opacity="0.3" />
                    <path d="M 500 250 Q 575 270, 650 280" fill="none" stroke="#14b8a6" strokeWidth="16" opacity="0.3" />
                    <path d="M 500 320 Q 575 310, 650 280" fill="none" stroke="#14b8a6" strokeWidth="14" opacity="0.3" />
                    <path d="M 500 320 Q 575 340, 650 360" fill="none" stroke="#14b8a6" strokeWidth="12" opacity="0.3" />

                    {/* Node labels */}
                    <g>
                      <rect x="100" y="220" width="100" height="60" fill="#10b981" rx="4" />
                      <text x="150" y="255" textAnchor="middle" fill="white" fontSize="14">Plants</text>
                    </g>
                    <g>
                      <rect x="400" y="160" width="100" height="40" fill="#14b8a6" rx="4" />
                      <text x="450" y="185" textAnchor="middle" fill="white" fontSize="12">Curcumin</text>
                      
                      <rect x="400" y="230" width="100" height="40" fill="#14b8a6" rx="4" />
                      <text x="450" y="255" textAnchor="middle" fill="white" fontSize="12">Demethoxy</text>
                      
                      <rect x="400" y="300" width="100" height="40" fill="#14b8a6" rx="4" />
                      <text x="450" y="325" textAnchor="middle" fill="white" fontSize="12">Turmerone</text>
                    </g>
                    <g>
                      <rect x="650" y="100" width="100" height="40" fill="#8b5cf6" rx="4" />
                      <text x="700" y="125" textAnchor="middle" fill="white" fontSize="12">COX-2</text>
                      
                      <rect x="650" y="180" width="100" height="40" fill="#8b5cf6" rx="4" />
                      <text x="700" y="205" textAnchor="middle" fill="white" fontSize="12">NF-κB</text>
                      
                      <rect x="650" y="260" width="100" height="40" fill="#8b5cf6" rx="4" />
                      <text x="700" y="285" textAnchor="middle" fill="white" fontSize="12">TNF-α</text>
                      
                      <rect x="650" y="340" width="100" height="40" fill="#8b5cf6" rx="4" />
                      <text x="700" y="365" textAnchor="middle" fill="white" fontSize="12">IL-6</text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'hubs' && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Hub Targets */}
              <div>
                <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  Hub Targets
                </h3>
                <div className="space-y-3">
                  {hubTargets.map((hub, idx) => (
                    <div key={hub.target} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl text-purple-600">#{idx + 1}</span>
                          <h4 className="text-gray-900">{hub.target}</h4>
                        </div>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          Degree: {hub.degree}
                        </span>
                      </div>
                      <div className="mb-2">
                        <div className="text-xs text-gray-600 mb-1">Betweenness Centrality</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                              style={{ width: `${hub.betweenness * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{hub.betweenness.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {hub.pathways.map(pathway => (
                          <span key={pathway} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                            {pathway}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pathway Enrichment */}
              <div>
                <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  Pathway Enrichment
                </h3>
                <div className="space-y-3">
                  {pathwayEnrichment.map((pathway) => (
                    <div key={pathway.pathway} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-gray-900 flex-1">{pathway.pathway}</h4>
                        <span className="text-xs text-gray-600 ml-2">{pathway.genes} genes</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-xs text-gray-600 mb-1">p-value</div>
                          <div className={`${
                            pathway.pValue < 0.001 ? 'text-green-600' :
                            pathway.pValue < 0.01 ? 'text-amber-600' : 'text-gray-600'
                          }`}>
                            {pathway.pValue.toExponential(2)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Fold Enrichment</div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                                style={{ width: `${Math.min(pathway.enrichment / 5 * 100, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{pathway.enrichment}×</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI Summary */}
          <div className="mt-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
            <h3 className="text-gray-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-600" />
              Mechanism of Action Summary
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Network analysis reveals a multi-target mechanism of action for the phytochemical compounds from Curcuma longa. 
              The primary therapeutic effects are mediated through modulation of key inflammatory regulators (COX-2, NF-κB, TNF-α), 
              with COX-2 emerging as a central hub target. Pathway enrichment indicates strong involvement in inflammatory response 
              pathways (p {'<'} 0.001), suggesting potential efficacy in inflammatory conditions. The network topology demonstrates 
              synergistic potential through multiple compound-target interactions, supporting the traditional use of turmeric in 
              Ayurvedic medicine for inflammation-related disorders.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onContinue}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
            >
              Generate Final Report
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
