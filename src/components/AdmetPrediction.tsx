import { useState } from 'react';
import { ArrowLeft, ArrowRight, Activity, Download, Loader } from 'lucide-react';

interface AdmetPredictionProps {
  compounds: any[];
  onContinue: (data: any) => void;
  onBack: () => void;
}

const mockAdmetData = [
  {
    id: 1,
    name: 'Curcumin',
    absorption: { value: 'High', risk: 'Low', confidence: 0.89 },
    distribution: { value: 'Moderate', risk: 'Low', confidence: 0.82 },
    metabolism: { value: 'Extensive', risk: 'Moderate', confidence: 0.76 },
    excretion: { value: 'Rapid', risk: 'Low', confidence: 0.85 },
    toxicity: { value: 'Low', risk: 'Low', confidence: 0.91 },
    selected: true
  },
  {
    id: 2,
    name: 'Demethoxycurcumin',
    absorption: { value: 'High', risk: 'Low', confidence: 0.87 },
    distribution: { value: 'Good', risk: 'Low', confidence: 0.84 },
    metabolism: { value: 'Moderate', risk: 'Low', confidence: 0.79 },
    excretion: { value: 'Normal', risk: 'Low', confidence: 0.83 },
    toxicity: { value: 'Low', risk: 'Low', confidence: 0.88 },
    selected: true
  },
  {
    id: 3,
    name: 'Turmerone',
    absorption: { value: 'Moderate', risk: 'Moderate', confidence: 0.75 },
    distribution: { value: 'Limited', risk: 'Moderate', confidence: 0.71 },
    metabolism: { value: 'Slow', risk: 'Moderate', confidence: 0.68 },
    excretion: { value: 'Slow', risk: 'Moderate', confidence: 0.73 },
    toxicity: { value: 'Moderate', risk: 'Moderate', confidence: 0.79 },
    selected: true
  },
];

export function AdmetPrediction({ compounds, onContinue, onBack }: AdmetPredictionProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedCompounds, setSelectedCompounds] = useState<number[]>([1, 2, 3]);

  const handleRunPrediction = () => {
    setIsRunning(true);
    setTimeout(() => {
      setResults(mockAdmetData);
      setIsRunning(false);
    }, 2000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-amber-600 bg-amber-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const toggleCompound = (id: number) => {
    if (selectedCompounds.includes(id)) {
      setSelectedCompounds(selectedCompounds.filter(cid => cid !== id));
    } else {
      setSelectedCompounds([...selectedCompounds, id]);
    }
  };

  const handleContinue = () => {
    const selected = results.filter(r => selectedCompounds.includes(r.id));
    onContinue({ admetResults: selected });
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
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
                <h1 className="text-3xl text-gray-900">ADMET Prediction</h1>
              </div>
              <p className="text-gray-600 ml-15">
                Predict Absorption, Distribution, Metabolism, Excretion & Toxicity
              </p>
            </div>
            {results.length === 0 && (
              <button
                onClick={handleRunPrediction}
                disabled={isRunning}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isRunning ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Running Models...
                  </>
                ) : (
                  'Run ADMET Models'
                )}
              </button>
            )}
          </div>

          {/* Loading State */}
          {isRunning && (
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-12 text-center">
              <Loader className="w-12 h-12 text-purple-600 mx-auto mb-4 animate-spin" />
              <p className="text-lg text-gray-900 mb-2">Running ADMET Predictions...</p>
              <p className="text-sm text-gray-600">
                Analyzing molecular properties using machine learning models
              </p>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <>
              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Low Risk</p>
                  <p className="text-2xl text-green-700">
                    {results.filter(r => r.toxicity.risk === 'Low').length}
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <p className="text-sm text-gray-600 mb-1">Moderate Risk</p>
                  <p className="text-2xl text-amber-700">
                    {results.filter(r => r.toxicity.risk === 'Moderate').length}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-gray-600 mb-1">Avg. Confidence</p>
                  <p className="text-2xl text-purple-700">
                    {(results.reduce((acc, r) => acc + r.toxicity.confidence, 0) / results.length * 100).toFixed(0)}%
                  </p>
                </div>
              </div>

              {/* Download Button */}
              <div className="flex justify-end mb-4">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download ADMET.csv
                </button>
              </div>

              {/* Results Table */}
              <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-50 to-indigo-50">
                        <th className="px-4 py-3 text-left text-sm text-gray-700">
                          <input
                            type="checkbox"
                            checked={selectedCompounds.length === results.length}
                            onChange={() => {
                              if (selectedCompounds.length === results.length) {
                                setSelectedCompounds([]);
                              } else {
                                setSelectedCompounds(results.map(r => r.id));
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                        </th>
                        <th className="px-4 py-3 text-left text-sm text-gray-700">Compound</th>
                        <th className="px-4 py-3 text-left text-sm text-gray-700">Absorption</th>
                        <th className="px-4 py-3 text-left text-sm text-gray-700">Distribution</th>
                        <th className="px-4 py-3 text-left text-sm text-gray-700">Metabolism</th>
                        <th className="px-4 py-3 text-left text-sm text-gray-700">Excretion</th>
                        <th className="px-4 py-3 text-left text-sm text-gray-700">Toxicity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, idx) => (
                        <tr
                          key={result.id}
                          className={`border-t border-gray-100 ${
                            idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                          }`}
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedCompounds.includes(result.id)}
                              onChange={() => toggleCompound(result.id)}
                              className="w-4 h-4 rounded border-gray-300"
                            />
                          </td>
                          <td className="px-4 py-3 text-gray-900">{result.name}</td>
                          <td className="px-4 py-3">
                            <div>
                              <span className={`px-2 py-1 rounded text-xs ${getRiskColor(result.absorption.risk)}`}>
                                {result.absorption.value}
                              </span>
                              <div className="text-xs text-gray-500 mt-1">
                                {(result.absorption.confidence * 100).toFixed(0)}% conf.
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <span className={`px-2 py-1 rounded text-xs ${getRiskColor(result.distribution.risk)}`}>
                                {result.distribution.value}
                              </span>
                              <div className="text-xs text-gray-500 mt-1">
                                {(result.distribution.confidence * 100).toFixed(0)}% conf.
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <span className={`px-2 py-1 rounded text-xs ${getRiskColor(result.metabolism.risk)}`}>
                                {result.metabolism.value}
                              </span>
                              <div className="text-xs text-gray-500 mt-1">
                                {(result.metabolism.confidence * 100).toFixed(0)}% conf.
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <span className={`px-2 py-1 rounded text-xs ${getRiskColor(result.excretion.risk)}`}>
                                {result.excretion.value}
                              </span>
                              <div className="text-xs text-gray-500 mt-1">
                                {(result.excretion.confidence * 100).toFixed(0)}% conf.
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <span className={`px-2 py-1 rounded text-xs ${getRiskColor(result.toxicity.risk)}`}>
                                {result.toxicity.value}
                              </span>
                              <div className="text-xs text-gray-500 mt-1">
                                {(result.toxicity.confidence * 100).toFixed(0)}% conf.
                              </div>
                            </div>
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
                  <strong>Confidence Scores:</strong> Indicate prediction reliability (higher is better)
                  <br />
                  <strong>Risk Levels:</strong> Green = Low, Amber = Moderate, Red = High
                  <br />
                  Select compounds to proceed to target prediction
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleContinue}
                  disabled={selectedCompounds.length === 0}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Proceed to Target Prediction ({selectedCompounds.length} selected)
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
