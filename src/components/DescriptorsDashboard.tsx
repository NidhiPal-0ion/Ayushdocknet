import { useState } from 'react';
import { ArrowLeft, ArrowRight, Filter, AlertTriangle, CheckCircle } from 'lucide-react';

interface DescriptorsDashboardProps {
  compounds: any[];
  onContinue: (data: any) => void;
  onBack: () => void;
}

const mockDescriptorData = [
  {
    id: 1,
    name: 'Curcumin',
    mw: 368.38,
    logP: 3.2,
    hbd: 2,
    hba: 6,
    lipinskiPass: true,
    npLikeness: 0.85,
    painsFlag: false,
    toxicophore: false
  },
  {
    id: 2,
    name: 'Demethoxycurcumin',
    mw: 338.35,
    logP: 2.9,
    hbd: 2,
    hba: 5,
    lipinskiPass: true,
    npLikeness: 0.82,
    painsFlag: false,
    toxicophore: false
  },
  {
    id: 3,
    name: 'Turmerone',
    mw: 218.33,
    logP: 4.1,
    hbd: 0,
    hba: 1,
    lipinskiPass: true,
    npLikeness: 0.91,
    painsFlag: false,
    toxicophore: true
  },
  {
    id: 4,
    name: 'Test Compound A',
    mw: 520.45,
    logP: 5.8,
    hbd: 3,
    hba: 8,
    lipinskiPass: false,
    npLikeness: 0.45,
    painsFlag: true,
    toxicophore: true
  },
];

export function DescriptorsDashboard({ compounds, onContinue, onBack }: DescriptorsDashboardProps) {
  const [showToxicOnly, setShowToxicOnly] = useState(false);
  const [showLipinskiFail, setShowLipinskiFail] = useState(false);

  const filteredData = mockDescriptorData.filter(item => {
    if (showToxicOnly && !item.toxicophore) return false;
    if (showLipinskiFail && item.lipinskiPass) return false;
    return true;
  });

  const toxicCount = mockDescriptorData.filter(d => d.toxicophore).length;
  const lipinskiFailCount = mockDescriptorData.filter(d => !d.lipinskiPass).length;

  const handleContinue = () => {
    const toxicCompounds = mockDescriptorData.filter(d => d.toxicophore);
    onContinue({
      descriptors: mockDescriptorData,
      toxicCompounds
    });
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
          <h1 className="text-3xl text-gray-900 mb-2">Descriptors & Toxicity Dashboard</h1>
          <p className="text-gray-600 mb-8">
            Molecular descriptors and drug-likeness analysis
          </p>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <p className="text-sm text-gray-600 mb-1">Total Compounds</p>
              <p className="text-2xl text-emerald-700">{mockDescriptorData.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Lipinski Pass</p>
              <p className="text-2xl text-green-700">{mockDescriptorData.length - lipinskiFailCount}</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <p className="text-sm text-gray-600 mb-1">PAINS Alerts</p>
              <p className="text-2xl text-amber-700">{mockDescriptorData.filter(d => d.painsFlag).length}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <p className="text-sm text-gray-600 mb-1">Toxicophores</p>
              <p className="text-2xl text-red-700">{toxicCount}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Filters:</span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showToxicOnly}
                onChange={(e) => setShowToxicOnly(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Show only toxic compounds</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showLipinskiFail}
                onChange={(e) => setShowLipinskiFail(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Show Lipinski failures</span>
            </label>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-50 to-teal-50">
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Compound</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">MW</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">LogP</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">HBD</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">HBA</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Lipinski</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">NP-likeness</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">PAINS</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Toxicophore</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`border-t border-gray-100 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      } ${item.toxicophore ? 'bg-red-50/30' : ''}`}
                    >
                      <td className="px-4 py-3 text-gray-900">{item.name}</td>
                      <td className="px-4 py-3 text-gray-700">{item.mw.toFixed(2)}</td>
                      <td className="px-4 py-3 text-gray-700">{item.logP.toFixed(1)}</td>
                      <td className="px-4 py-3 text-gray-700">{item.hbd}</td>
                      <td className="px-4 py-3 text-gray-700">{item.hba}</td>
                      <td className="px-4 py-3">
                        {item.lipinskiPass ? (
                          <span className="inline-flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Pass
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-600">
                            <AlertTriangle className="w-4 h-4" />
                            Fail
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[60px]">
                            <div
                              className="bg-emerald-500 h-2 rounded-full"
                              style={{ width: `${item.npLikeness * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{item.npLikeness.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {item.painsFlag ? (
                          <span className="text-amber-600 text-sm">⚠ Alert</span>
                        ) : (
                          <span className="text-green-600 text-sm">✓ Clear</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {item.toxicophore ? (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                            YES
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            NO
                          </span>
                        )}
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
              <strong>Lipinski Rule of Five:</strong> MW {'<'} 500, LogP {'<'} 5, HBD {'<'} 5, HBA {'<'} 10
              <br />
              <strong>PAINS:</strong> Pan-Assay Interference Compounds (potential false positives)
              <br />
              <strong>Toxicophore:</strong> Structural alert for potential toxicity
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleContinue}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
            >
              Run Toxicity Decision
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
