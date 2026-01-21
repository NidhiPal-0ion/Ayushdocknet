import { useState } from 'react';
import { ArrowLeft, ArrowRight, Network, TrendingUp } from 'lucide-react';
import { Project } from '../App';

interface NetworkSetupProps {
  project: Project;
  onContinue: (data: any) => void;
  onBack: () => void;
}

export function NetworkSetup({ project, onContinue, onBack }: NetworkSetupProps) {
  const [selectedPlants, setSelectedPlants] = useState<string[]>(['Curcuma longa']);
  const [selectedCompounds, setSelectedCompounds] = useState<string[]>(['Curcumin', 'Demethoxycurcumin']);
  const [selectedTargets, setSelectedTargets] = useState<string[]>(['COX-2', 'NF-κB', 'TNF-α']);
  const [threshold, setThreshold] = useState(0.7);

  const plants = ['Curcuma longa', 'Withania somnifera', 'Azadirachta indica'];
  const compounds = ['Curcumin', 'Demethoxycurcumin', 'Turmerone', 'Withanolide A'];
  const targets = ['COX-2', 'NF-κB', 'TNF-α', 'IL-6', 'STAT3', 'p53'];

  const toggleItem = (item: string, list: string[], setter: (list: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleBuildNetwork = () => {
    onContinue({
      plants: selectedPlants,
      compounds: selectedCompounds,
      targets: selectedTargets,
      threshold
    });
  };

  return (
    <div className="min-h-screen py-12 px-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
              <Network className="w-6 h-6 text-cyan-600" />
            </div>
            <h1 className="text-3xl text-gray-900">Network Pharmacology Setup</h1>
          </div>
          <p className="text-gray-600 mb-8 ml-15">
            Configure plant-compound-target network analysis
          </p>

          <div className="space-y-8">
            {/* Select Plants */}
            <div>
              <h3 className="text-lg text-gray-900 mb-4">1. Select Plants</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {plants.map((plant) => (
                  <label
                    key={plant}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPlants.includes(plant)
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedPlants.includes(plant)}
                      onChange={() => toggleItem(plant, selectedPlants, setSelectedPlants)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-gray-900 text-sm">{plant}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Select Compounds */}
            <div>
              <h3 className="text-lg text-gray-900 mb-4">2. Select Compounds</h3>
              <div className="grid md:grid-cols-4 gap-3">
                {compounds.map((compound) => (
                  <label
                    key={compound}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCompounds.includes(compound)
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCompounds.includes(compound)}
                      onChange={() => toggleItem(compound, selectedCompounds, setSelectedCompounds)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-gray-900 text-sm">{compound}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Select Targets */}
            <div>
              <h3 className="text-lg text-gray-900 mb-4">3. Select Targets</h3>
              <div className="grid md:grid-cols-6 gap-3">
                {targets.map((target) => (
                  <label
                    key={target}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTargets.includes(target)
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTargets.includes(target)}
                      onChange={() => toggleItem(target, selectedTargets, setSelectedTargets)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-gray-900 text-sm">{target}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Probability Threshold */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <TrendingUp className="w-5 h-5 text-cyan-600" />
                <label className="text-gray-900">Interaction Probability Threshold</label>
              </div>
              <div className="flex items-center gap-6">
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={threshold}
                  onChange={(e) => setThreshold(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(threshold - 0.1) / 0.8 * 100}%, #e5e7eb ${(threshold - 0.1) / 0.8 * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="w-20 text-center">
                  <div className="text-2xl text-cyan-700">{threshold.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">threshold</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Only include interactions with probability ≥ {threshold.toFixed(2)}
              </p>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-gray-900 mb-4">Network Summary</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl text-emerald-700">{selectedPlants.length}</p>
                  <p className="text-sm text-gray-600">Plants</p>
                </div>
                <div>
                  <p className="text-2xl text-teal-700">{selectedCompounds.length}</p>
                  <p className="text-sm text-gray-600">Compounds</p>
                </div>
                <div>
                  <p className="text-2xl text-cyan-700">{selectedTargets.length}</p>
                  <p className="text-sm text-gray-600">Targets</p>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Network Analysis:</strong> Visualizes multi-level interactions between plants, phytochemicals, and protein targets
                <br />
                <strong>Output:</strong> Interactive network graph, hub target identification, pathway enrichment analysis
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleBuildNetwork}
                disabled={selectedPlants.length === 0 || selectedCompounds.length === 0 || selectedTargets.length === 0}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Network className="w-5 h-5" />
                Build Network
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
