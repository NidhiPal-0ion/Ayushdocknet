import { useState } from 'react';
import { ArrowLeft, ArrowRight, Loader, Zap } from 'lucide-react';

interface DockingSetupProps {
  compounds: any[];
  targets: any[];
  onContinue: (data: any) => void;
  onBack: () => void;
}

const dockingEngines = [
  { id: 'placer', name: 'PLACER', description: 'Ultra-fast AI-powered docking', speed: 'Fast', accuracy: 'High' },
  { id: 'boltz', name: 'BOLTZ', description: 'Deep learning molecular dynamics', speed: 'Medium', accuracy: 'Very High' },
  { id: 'dta', name: 'DTA', description: 'Drug-target affinity prediction', speed: 'Fast', accuracy: 'High' },
  { id: 'pandadock', name: 'PANDADOCK', description: 'Ensemble docking approach', speed: 'Slow', accuracy: 'Very High' },
];

export function DockingSetup({ compounds, targets, onContinue, onBack }: DockingSetupProps) {
  const [selectedCompounds, setSelectedCompounds] = useState<number[]>([1, 2]);
  const [selectedTargets, setSelectedTargets] = useState<string[]>(['COX-2', 'NF-κB']);
  const [selectedEngines, setSelectedEngines] = useState<string[]>(['placer', 'boltz']);
  const [isRunning, setIsRunning] = useState(false);

  const mockCompounds = [
    { id: 1, name: 'Curcumin' },
    { id: 2, name: 'Demethoxycurcumin' },
    { id: 3, name: 'Turmerone' }
  ];

  const mockTargets = ['COX-2', 'NF-κB', 'TNF-α', 'IL-6', 'STAT3'];

  const toggleCompound = (id: number) => {
    if (selectedCompounds.includes(id)) {
      setSelectedCompounds(selectedCompounds.filter(cid => cid !== id));
    } else {
      setSelectedCompounds([...selectedCompounds, id]);
    }
  };

  const toggleTarget = (target: string) => {
    if (selectedTargets.includes(target)) {
      setSelectedTargets(selectedTargets.filter(t => t !== target));
    } else {
      setSelectedTargets([...selectedTargets, target]);
    }
  };

  const toggleEngine = (id: string) => {
    if (selectedEngines.includes(id)) {
      setSelectedEngines(selectedEngines.filter(e => e !== id));
    } else {
      setSelectedEngines([...selectedEngines, id]);
    }
  };

  const handleRunDocking = () => {
    setIsRunning(true);
    setTimeout(() => {
      onContinue({
        compounds: selectedCompounds,
        targets: selectedTargets,
        engines: selectedEngines
      });
    }, 3000);
  };

  const totalJobs = selectedCompounds.length * selectedTargets.length * selectedEngines.length;

  return (
    <div className="min-h-screen py-12 px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <Zap className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl text-gray-900">Docking Setup</h1>
          </div>
          <p className="text-gray-600 mb-8 ml-15">
            Configure molecular docking simulations
          </p>

          {isRunning ? (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-12 text-center">
              <Loader className="w-16 h-16 text-indigo-600 mx-auto mb-6 animate-spin" />
              <h2 className="text-2xl text-gray-900 mb-3">Running Docking Simulations</h2>
              <p className="text-gray-600 mb-6">
                Processing {totalJobs} docking jobs across {selectedEngines.length} engine{selectedEngines.length > 1 ? 's' : ''}
              </p>
              <div className="max-w-md mx-auto">
                <div className="bg-gray-200 rounded-full h-3 mb-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
                <p className="text-sm text-gray-500">This may take a few minutes...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Select Compounds */}
              <div>
                <h3 className="text-lg text-gray-900 mb-4">1. Select Compounds</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {mockCompounds.map((compound) => (
                    <label
                      key={compound.id}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedCompounds.includes(compound.id)
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCompounds.includes(compound.id)}
                        onChange={() => toggleCompound(compound.id)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-gray-900">{compound.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Select Targets */}
              <div>
                <h3 className="text-lg text-gray-900 mb-4">2. Select Protein Targets</h3>
                <div className="grid md:grid-cols-5 gap-3">
                  {mockTargets.map((target) => (
                    <label
                      key={target}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTargets.includes(target)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTargets.includes(target)}
                        onChange={() => toggleTarget(target)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-gray-900">{target}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Select Engines */}
              <div>
                <h3 className="text-lg text-gray-900 mb-4">3. Select Docking Engines</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {dockingEngines.map((engine) => (
                    <label
                      key={engine.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedEngines.includes(engine.id)
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedEngines.includes(engine.id)}
                          onChange={() => toggleEngine(engine.id)}
                          className="w-4 h-4 rounded border-gray-300 mt-1"
                        />
                        <div className="flex-1">
                          <div className="text-gray-900 mb-1">{engine.name}</div>
                          <p className="text-sm text-gray-600 mb-2">{engine.description}</p>
                          <div className="flex gap-3 text-xs">
                            <span className={`px-2 py-1 rounded ${
                              engine.speed === 'Fast' ? 'bg-green-100 text-green-700' :
                              engine.speed === 'Medium' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {engine.speed}
                            </span>
                            <span className={`px-2 py-1 rounded ${
                              engine.accuracy === 'Very High' ? 'bg-purple-100 text-purple-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {engine.accuracy}
                            </span>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-gray-900 mb-4">Summary</h3>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl text-indigo-700">{selectedCompounds.length}</p>
                    <p className="text-sm text-gray-600">Compounds</p>
                  </div>
                  <div>
                    <p className="text-2xl text-blue-700">{selectedTargets.length}</p>
                    <p className="text-sm text-gray-600">Targets</p>
                  </div>
                  <div>
                    <p className="text-2xl text-purple-700">{selectedEngines.length}</p>
                    <p className="text-sm text-gray-600">Engines</p>
                  </div>
                  <div>
                    <p className="text-2xl text-emerald-700">{totalJobs}</p>
                    <p className="text-sm text-gray-600">Total Jobs</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleRunDocking}
                  disabled={selectedCompounds.length === 0 || selectedTargets.length === 0 || selectedEngines.length === 0}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Run Docking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
