import { useState } from 'react';
import { ArrowLeft, ArrowRight, Download, RotateCw, Maximize2 } from 'lucide-react';

interface SmilesStructureViewProps {
  compounds: any[];
  onContinue: () => void;
  onBack: () => void;
}

const mockSmilesData = [
  {
    id: 1,
    name: 'Curcumin',
    smiles: 'O=C(\\C=C\\c1ccc(O)c(OC)c1)CC(=O)\\C=C\\c1ccc(O)c(OC)c1',
    molecular_formula: 'C21H20O6',
    molecular_weight: 368.38
  },
  {
    id: 2,
    name: 'Demethoxycurcumin',
    smiles: 'COc1cc(\\C=C\\C(=O)CC(=O)\\C=C\\c2ccc(O)cc2)ccc1O',
    molecular_formula: 'C20H18O5',
    molecular_weight: 338.35
  },
  {
    id: 3,
    name: 'Turmerone',
    smiles: 'CC(C)=CCCC(C)C(=O)C=C(C)C',
    molecular_formula: 'C15H22O',
    molecular_weight: 218.33
  },
];

export function SmilesStructureView({ compounds, onContinue, onBack }: SmilesStructureViewProps) {
  const [selectedCompound, setSelectedCompound] = useState(0);

  const downloadSmiles = () => {
    const csv = mockSmilesData.map(c => `${c.name},${c.smiles}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'smiles.csv';
    a.click();
  };

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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl text-gray-900 mb-2">SMILES & Structure View</h1>
              <p className="text-gray-600">
                Generated molecular structures for {mockSmilesData.length} compounds
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={downloadSmiles}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download SMILES.csv
              </button>
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download SDF
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Compound List */}
            <div className="space-y-2">
              <h3 className="text-sm text-gray-600 mb-3">Compounds</h3>
              {mockSmilesData.map((compound, idx) => (
                <button
                  key={compound.id}
                  onClick={() => setSelectedCompound(idx)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedCompound === idx
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <p className="text-gray-900 mb-1">{compound.name}</p>
                  <p className="text-xs text-gray-500">{compound.molecular_formula}</p>
                </button>
              ))}
            </div>

            {/* Structure Views */}
            <div className="md:col-span-2 space-y-6">
              {/* SMILES String */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-sm text-gray-600 mb-3">SMILES String</h3>
                <div className="bg-gray-50 p-4 rounded font-mono text-sm break-all">
                  {mockSmilesData[selectedCompound].smiles}
                </div>
              </div>

              {/* 2D Structure */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm text-gray-600">2D Structure</h3>
                  <Maximize2 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                </div>
                <div className="bg-gray-50 rounded-lg h-64 flex items-center justify-center">
                  <svg viewBox="0 0 300 200" className="w-full h-full">
                    {/* Simple 2D molecular representation */}
                    <line x1="50" y1="100" x2="100" y2="70" stroke="#333" strokeWidth="2" />
                    <line x1="100" y1="70" x2="150" y2="100" stroke="#333" strokeWidth="2" />
                    <line x1="150" y1="100" x2="200" y2="70" stroke="#333" strokeWidth="2" />
                    <line x1="200" y1="70" x2="250" y2="100" stroke="#333" strokeWidth="2" />
                    <line x1="100" y1="70" x2="100" y2="40" stroke="#333" strokeWidth="2" />
                    <line x1="250" y1="100" x2="250" y2="130" stroke="#333" strokeWidth="2" />
                    
                    <circle cx="50" cy="100" r="8" fill="#3b82f6" />
                    <circle cx="100" cy="70" r="8" fill="#333" />
                    <circle cx="150" cy="100" r="8" fill="#333" />
                    <circle cx="200" cy="70" r="8" fill="#333" />
                    <circle cx="250" cy="100" r="8" fill="#333" />
                    <circle cx="100" cy="40" r="8" fill="#ef4444" />
                    <circle cx="250" cy="130" r="8" fill="#ef4444" />
                    
                    <text x="50" y="105" textAnchor="middle" fill="white" fontSize="10">C</text>
                    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="10">C</text>
                    <text x="150" y="105" textAnchor="middle" fill="white" fontSize="10">C</text>
                    <text x="200" y="75" textAnchor="middle" fill="white" fontSize="10">C</text>
                    <text x="250" y="105" textAnchor="middle" fill="white" fontSize="10">C</text>
                    <text x="100" y="45" textAnchor="middle" fill="white" fontSize="10">O</text>
                    <text x="250" y="135" textAnchor="middle" fill="white" fontSize="10">O</text>
                  </svg>
                </div>
              </div>

              {/* 3D Preview */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm text-gray-600">3D Structure Preview</h3>
                  <RotateCw className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                  {/* Simplified 3D-like representation */}
                  <div className="relative">
                    <svg viewBox="0 0 200 200" className="w-48 h-48">
                      {/* Ball-and-stick representation */}
                      <defs>
                        <radialGradient id="carbon" cx="30%" cy="30%">
                          <stop offset="0%" stopColor="#666" />
                          <stop offset="100%" stopColor="#333" />
                        </radialGradient>
                        <radialGradient id="oxygen" cx="30%" cy="30%">
                          <stop offset="0%" stopColor="#ff6b6b" />
                          <stop offset="100%" stopColor="#ee5a5a" />
                        </radialGradient>
                      </defs>
                      
                      <line x1="100" y1="100" x2="140" y2="80" stroke="#888" strokeWidth="3" />
                      <line x1="100" y1="100" x2="60" y2="80" stroke="#888" strokeWidth="3" />
                      <line x1="100" y1="100" x2="100" y2="140" stroke="#888" strokeWidth="3" />
                      <line x1="140" y1="80" x2="160" y2="110" stroke="#888" strokeWidth="3" />
                      <line x1="60" y1="80" x2="40" y2="110" stroke="#888" strokeWidth="3" />
                      
                      <circle cx="100" cy="100" r="12" fill="url(#carbon)" />
                      <circle cx="140" cy="80" r="12" fill="url(#carbon)" />
                      <circle cx="60" cy="80" r="12" fill="url(#carbon)" />
                      <circle cx="100" cy="140" r="12" fill="url(#oxygen)" />
                      <circle cx="160" cy="110" r="12" fill="url(#oxygen)" />
                      <circle cx="40" cy="110" r="12" fill="url(#carbon)" />
                    </svg>
                  </div>
                  <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                    Click to rotate • Scroll to zoom
                  </div>
                </div>
              </div>

              {/* Molecular Properties */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Molecular Formula</p>
                  <p className="text-lg text-gray-900">{mockSmilesData[selectedCompound].molecular_formula}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Molecular Weight</p>
                  <p className="text-lg text-gray-900">{mockSmilesData[selectedCompound].molecular_weight} g/mol</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onContinue}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
            >
              Proceed to Descriptor Analysis
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
