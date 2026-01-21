import { useState } from 'react';
import { ArrowLeft, ArrowRight, AlertTriangle, Sparkles, Check } from 'lucide-react';

interface ToxicophoreSubstitutionProps {
  toxicCompounds: any[];
  onContinue: (data: any) => void;
  onBack: () => void;
}

const mockToxicData = [
  {
    id: 1,
    name: 'Turmerone',
    toxicGroup: 'Epoxide',
    originalSmiles: 'CC(C)=CCCC(C)C(=O)C=C(C)C',
    variants: [
      { id: 'v1', name: 'Variant 1', smiles: 'CC(C)=CCCC(C)C(=O)CC(C)C', mw: 220.35, logP: 3.8, toxicity: 'Low' },
      { id: 'v2', name: 'Variant 2', smiles: 'CC(C)=CCCC(C)C(O)C=C(C)C', mw: 220.35, logP: 3.5, toxicity: 'None' },
      { id: 'v3', name: 'Variant 3', smiles: 'CC(C)CCCCC(C)C(=O)C=C(C)C', mw: 220.35, logP: 4.0, toxicity: 'Low' }
    ],
    selectedVariant: null
  },
  {
    id: 2,
    name: 'Test Compound A',
    toxicGroup: 'Nitro group',
    originalSmiles: 'CC(C)Cc1ccc(cc1)C(C)C(O)=O',
    variants: [
      { id: 'v1', name: 'Variant 1', smiles: 'CC(C)Cc1ccc(cc1)C(C)C(O)=O', mw: 190.28, logP: 3.2, toxicity: 'None' },
      { id: 'v2', name: 'Variant 2', smiles: 'CC(C)Cc1ccc(cc1)CC(O)=O', mw: 178.23, logP: 2.9, toxicity: 'None' }
    ],
    selectedVariant: null
  }
];

export function ToxicophoreSubstitution({ toxicCompounds, onContinue, onBack }: ToxicophoreSubstitutionProps) {
  const [compounds, setCompounds] = useState(mockToxicData);

  const handleSelectVariant = (compoundId: number, variantId: string) => {
    setCompounds(compounds.map(c =>
      c.id === compoundId ? { ...c, selectedVariant: variantId } : c
    ));
  };

  const allSelected = compounds.every(c => c.selectedVariant !== null);

  const handleContinue = () => {
    const substitutions = compounds.map(c => ({
      original: c.name,
      variant: c.variants.find(v => v.id === c.selectedVariant)
    }));
    onContinue({ substitutions });
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
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-600" />
            </div>
            <h1 className="text-3xl text-gray-900">Toxicophore Substitution</h1>
          </div>
          <p className="text-gray-600 mb-8 ml-15">
            Review and select optimized variants for compounds with toxic functional groups
          </p>

          {/* Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-900 mb-1">
                {compounds.length} compound{compounds.length > 1 ? 's' : ''} with toxicophores detected
              </p>
              <p className="text-sm text-amber-700">
                Our AI has generated safer structural variants while maintaining drug-likeness. Review and select the best option for each compound.
              </p>
            </div>
          </div>

          {/* Compound Cards */}
          <div className="space-y-8">
            {compounds.map((compound) => (
              <div key={compound.id} className="border-2 border-gray-200 rounded-xl p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl text-gray-900 mb-2">{compound.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                        Toxic group: {compound.toxicGroup}
                      </span>
                      {compound.selectedVariant && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Variant selected
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Original Structure */}
                <div className="mb-6">
                  <h4 className="text-sm text-gray-600 mb-3">Original Structure (with toxicophore)</h4>
                  <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      {/* Simple structure visualization */}
                      <div className="w-32 h-32 bg-white rounded border border-red-300 flex items-center justify-center">
                        <div className="text-center">
                          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                          <p className="text-xs text-gray-500">Toxic structure</p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 mb-1">SMILES:</p>
                        <p className="font-mono text-sm text-gray-800 bg-white p-2 rounded break-all">
                          {compound.originalSmiles}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Variants */}
                <div>
                  <h4 className="text-sm text-gray-600 mb-3">Suggested Variants (toxicophore removed)</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {compound.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => handleSelectVariant(compound.id, variant.id)}
                        className={`text-left p-4 rounded-lg border-2 transition-all ${
                          compound.selectedVariant === variant.id
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-gray-900">{variant.name}</span>
                          {compound.selectedVariant === variant.id && (
                            <Check className="w-5 h-5 text-emerald-600" />
                          )}
                        </div>
                        
                        {/* Mini structure */}
                        <div className="w-full h-24 bg-white rounded border border-gray-200 flex items-center justify-center mb-3">
                          <svg viewBox="0 0 80 60" className="w-16 h-12">
                            <circle cx="20" cy="30" r="6" fill="#3b82f6" />
                            <circle cx="40" cy="20" r="6" fill="#333" />
                            <circle cx="60" cy="30" r="6" fill="#10b981" />
                            <line x1="20" y1="30" x2="40" y2="20" stroke="#666" strokeWidth="2" />
                            <line x1="40" y1="20" x2="60" y2="30" stroke="#666" strokeWidth="2" />
                          </svg>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">MW:</span>
                            <span className="text-gray-900">{variant.mw}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">LogP:</span>
                            <span className="text-gray-900">{variant.logP}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Toxicity:</span>
                            <span className={`${
                              variant.toxicity === 'None' ? 'text-green-600' : 'text-amber-600'
                            }`}>
                              {variant.toxicity}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleContinue}
              disabled={!allSelected}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Approve Variants & Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
