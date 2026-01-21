import { useState } from 'react';
import { ArrowLeft, ArrowRight, Award, Maximize2, Info } from 'lucide-react';

interface DockingResultsProps {
  dockingSetup: any;
  onContinue: (data: any) => void;
  onBack: () => void;
}

const mockDockingResults = [
  { id: 1, compound: 'Curcumin', target: 'COX-2', engine: 'PLACER', score: -9.2, rank: 1, binding_energy: -45.3 },
  { id: 2, compound: 'Curcumin', target: 'COX-2', engine: 'BOLTZ', score: -8.9, rank: 2, binding_energy: -43.8 },
  { id: 3, compound: 'Curcumin', target: 'NF-κB', engine: 'PLACER', score: -8.5, rank: 3, binding_energy: -41.2 },
  { id: 4, compound: 'Curcumin', target: 'NF-κB', engine: 'BOLTZ', score: -8.7, rank: 2, binding_energy: -42.1 },
  { id: 5, compound: 'Demethoxycurcumin', target: 'COX-2', engine: 'PLACER', score: -8.3, rank: 4, binding_energy: -40.5 },
  { id: 6, compound: 'Demethoxycurcumin', target: 'COX-2', engine: 'BOLTZ', score: -8.1, rank: 5, binding_energy: -39.8 },
  { id: 7, compound: 'Demethoxycurcumin', target: 'NF-κB', engine: 'PLACER', score: -7.9, rank: 6, binding_energy: -38.4 },
  { id: 8, compound: 'Demethoxycurcumin', target: 'NF-κB', engine: 'BOLTZ', score: -8.0, rank: 5, binding_energy: -39.1 },
];

export function DockingResults({ dockingSetup, onContinue, onBack }: DockingResultsProps) {
  const [selectedResult, setSelectedResult] = useState(0);
  const [sortBy, setSortBy] = useState<'score' | 'rank'>('score');

  const sortedResults = [...mockDockingResults].sort((a, b) => 
    sortBy === 'score' ? a.score - b.score : a.rank - b.rank
  );

  const result = sortedResults[selectedResult];

  const getScoreColor = (score: number) => {
    if (score <= -8.5) return 'text-green-600 bg-green-100';
    if (score <= -7.5) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const getAIExplanation = (result: any) => {
    if (result.score <= -8.5) {
      return `Excellent binding affinity detected! ${result.compound} shows strong interaction with ${result.target}. The binding score of ${result.score} kcal/mol indicates high stability of the protein-ligand complex. Key interactions include hydrogen bonding in the active site and hydrophobic contacts with key residues. This compound is a promising candidate for further development.`;
    } else if (result.score <= -7.5) {
      return `Moderate binding affinity observed. ${result.compound} demonstrates reasonable interaction with ${result.target}. The score of ${result.score} kcal/mol suggests stable binding, though optimization may enhance potency. Multiple interaction points contribute to complex stabilization.`;
    }
    return `Weak binding affinity detected. ${result.compound} shows limited interaction with ${result.target}. Consider structural modifications to improve binding.`;
  };

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
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h1 className="text-3xl text-gray-900">Docking Results</h1>
              </div>
              <p className="text-gray-600 ml-15">
                Molecular docking simulation results
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'score' | 'rank')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="score">Binding Score</option>
                <option value="rank">Rank</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Total Results</p>
              <p className="text-2xl text-purple-700">{mockDockingResults.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Best Score</p>
              <p className="text-2xl text-green-700">{Math.min(...mockDockingResults.map(r => r.score)).toFixed(1)}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Avg Score</p>
              <p className="text-2xl text-blue-700">
                {(mockDockingResults.reduce((sum, r) => sum + r.score, 0) / mockDockingResults.length).toFixed(1)}
              </p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <p className="text-sm text-gray-600 mb-1">Strong Binders</p>
              <p className="text-2xl text-indigo-700">
                {mockDockingResults.filter(r => r.score <= -8.5).length}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Results Table */}
            <div className="md:col-span-1">
              <h3 className="text-lg text-gray-900 mb-4">All Results</h3>
              <div className="border border-gray-200 rounded-xl overflow-hidden max-h-[600px] overflow-y-auto">
                {sortedResults.map((res, idx) => (
                  <button
                    key={res.id}
                    onClick={() => setSelectedResult(idx)}
                    className={`w-full text-left p-4 border-b border-gray-100 transition-colors ${
                      selectedResult === idx
                        ? 'bg-purple-50 border-l-4 border-l-purple-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-gray-900 mb-1">{res.compound}</p>
                        <p className="text-sm text-gray-600">{res.target}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${getScoreColor(res.score)}`}>
                        {res.score}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="px-2 py-0.5 bg-gray-100 rounded">{res.engine}</span>
                      <span>Rank #{res.rank}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed View */}
            <div className="md:col-span-2 space-y-6">
              {/* Header */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl text-gray-900 mb-2">
                      {result.compound} × {result.target}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {result.engine}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        Rank #{result.rank}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Binding Score</p>
                    <p className="text-3xl text-purple-700">{result.score}</p>
                    <p className="text-xs text-gray-500">kcal/mol</p>
                  </div>
                </div>
              </div>

              {/* 3D Visualization */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm text-gray-600">3D Protein-Ligand Complex</h4>
                  <Maximize2 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-xl h-80 relative overflow-hidden">
                  {/* Simplified 3D visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 300 300" className="w-full h-full opacity-80">
                      {/* Protein backbone */}
                      <path
                        d="M 50 150 Q 100 100, 150 150 T 250 150"
                        stroke="#6366f1"
                        strokeWidth="8"
                        fill="none"
                        opacity="0.6"
                      />
                      <path
                        d="M 60 180 Q 110 130, 160 180 T 260 180"
                        stroke="#8b5cf6"
                        strokeWidth="6"
                        fill="none"
                        opacity="0.5"
                      />
                      
                      {/* Ligand */}
                      <circle cx="150" cy="150" r="25" fill="#10b981" opacity="0.8" />
                      <circle cx="130" cy="140" r="10" fill="#34d399" opacity="0.9" />
                      <circle cx="170" cy="140" r="10" fill="#34d399" opacity="0.9" />
                      <circle cx="150" cy="170" r="12" fill="#059669" opacity="0.9" />
                      
                      {/* Binding pocket */}
                      <circle cx="150" cy="150" r="50" stroke="#fbbf24" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.6" />
                      
                      {/* Interactions */}
                      <line x1="150" y1="150" x2="100" y2="110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" opacity="0.7" />
                      <line x1="150" y1="150" x2="200" y2="110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" opacity="0.7" />
                    </svg>
                  </div>
                  <div className="absolute bottom-4 left-4 text-xs text-gray-300 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span>Protein</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span>Ligand</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-1 bg-amber-500"></div>
                      <span>H-bonds</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Binding Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Binding Energy</p>
                  <p className="text-2xl text-gray-900">{result.binding_energy} kJ/mol</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Docking Score</p>
                  <p className="text-2xl text-gray-900">{result.score} kcal/mol</p>
                </div>
              </div>

              {/* AI Explanation */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-gray-900 mb-2">AI Analysis</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {getAIExplanation(result)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => onContinue({ results: mockDockingResults })}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
            >
              Proceed to Network Pharmacology
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
