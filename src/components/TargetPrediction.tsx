import { useState } from 'react';
import { ArrowLeft, ArrowRight, Target, TrendingUp } from 'lucide-react';

interface TargetPredictionProps {
  compounds: any[];
  onContinue: (data: any) => void;
  onBack: () => void;
}

const mockTargetData = [
  { id: 1, compound: 'Curcumin', target: 'COX-2', probability: 0.92, source: 'SwissTargetPrediction' },
  { id: 2, compound: 'Curcumin', target: 'NF-κB', probability: 0.88, source: 'SEA' },
  { id: 3, compound: 'Curcumin', target: 'TNF-α', probability: 0.85, source: 'SwissTargetPrediction' },
  { id: 4, compound: 'Curcumin', target: 'IL-6', probability: 0.79, source: 'SEA' },
  { id: 5, compound: 'Demethoxycurcumin', target: 'COX-2', probability: 0.87, source: 'SwissTargetPrediction' },
  { id: 6, compound: 'Demethoxycurcumin', target: 'NF-κB', probability: 0.82, source: 'SEA' },
  { id: 7, compound: 'Demethoxycurcumin', target: 'STAT3', probability: 0.76, source: 'SwissTargetPrediction' },
  { id: 8, compound: 'Turmerone', target: 'GABAA receptor', probability: 0.71, source: 'SEA' },
  { id: 9, compound: 'Turmerone', target: '5-HT receptor', probability: 0.68, source: 'SwissTargetPrediction' },
  { id: 10, compound: 'Turmerone', target: 'Acetylcholinesterase', probability: 0.62, source: 'SEA' },
];

export function TargetPrediction({ compounds, onContinue, onBack }: TargetPredictionProps) {
  const [threshold, setThreshold] = useState(0.7);
  const [selectedTargets, setSelectedTargets] = useState<number[]>(
    mockTargetData.filter(t => t.probability >= threshold).map(t => t.id)
  );

  const filteredTargets = mockTargetData.filter(t => t.probability >= threshold);

  const handleThresholdChange = (value: number) => {
    setThreshold(value);
    setSelectedTargets(
      mockTargetData.filter(t => t.probability >= value).map(t => t.id)
    );
  };

  const toggleTarget = (id: number) => {
    if (selectedTargets.includes(id)) {
      setSelectedTargets(selectedTargets.filter(tid => tid !== id));
    } else {
      setSelectedTargets([...selectedTargets, id]);
    }
  };

  const handleContinue = () => {
    const selected = mockTargetData.filter(t => selectedTargets.includes(t.id));
    onContinue({ targets: selected });
  };

  const uniqueTargets = [...new Set(mockTargetData.map(t => t.target))].length;
  const uniqueCompounds = [...new Set(mockTargetData.map(t => t.compound))].length;

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
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl text-gray-900">Human Target Prediction</h1>
          </div>
          <p className="text-gray-600 mb-8 ml-15">
            Predicted protein targets for your compounds
          </p>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Total Predictions</p>
              <p className="text-2xl text-blue-700">{mockTargetData.length}</p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <p className="text-sm text-gray-600 mb-1">Unique Targets</p>
              <p className="text-2xl text-indigo-700">{uniqueTargets}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Compounds</p>
              <p className="text-2xl text-purple-700">{uniqueCompounds}</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <p className="text-sm text-gray-600 mb-1">Above Threshold</p>
              <p className="text-2xl text-emerald-700">{filteredTargets.length}</p>
            </div>
          </div>

          {/* Threshold Slider */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <label className="text-gray-900">Probability Threshold</label>
            </div>
            <div className="flex items-center gap-6">
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={threshold}
                onChange={(e) => handleThresholdChange(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(threshold - 0.1) / 0.8 * 100}%, #e5e7eb ${(threshold - 0.1) / 0.8 * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="w-20 text-center">
                <div className="text-2xl text-blue-700">{threshold.toFixed(2)}</div>
                <div className="text-xs text-gray-500">threshold</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Only show predictions with probability ≥ {threshold.toFixed(2)}
            </p>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <th className="px-4 py-3 text-left text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={selectedTargets.length === filteredTargets.length && filteredTargets.length > 0}
                        onChange={() => {
                          if (selectedTargets.length === filteredTargets.length) {
                            setSelectedTargets([]);
                          } else {
                            setSelectedTargets(filteredTargets.map(t => t.id));
                          }
                        }}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Compound</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Target</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Probability</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTargets.map((target, idx) => (
                    <tr
                      key={target.id}
                      className={`border-t border-gray-100 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      } hover:bg-blue-50/30 transition-colors`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedTargets.includes(target.id)}
                          onChange={() => toggleTarget(target.id)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                      </td>
                      <td className="px-4 py-3 text-gray-900">{target.compound}</td>
                      <td className="px-4 py-3 text-gray-900">{target.target}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                              style={{ width: `${target.probability * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900 w-12">
                            {(target.probability * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {target.source}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Target Prediction Sources:</strong> SwissTargetPrediction, SEA (Similarity Ensemble Approach)
              <br />
              <strong>Probability:</strong> Likelihood of compound-target interaction (0-1 scale)
              <br />
              Select targets for molecular docking simulation
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleContinue}
              disabled={selectedTargets.length === 0}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Proceed to Docking ({selectedTargets.length} selected)
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
