import { ArrowLeft, Leaf, FlaskRound } from 'lucide-react';

interface EntryPointSelectionProps {
  onSelectPlant: () => void;
  onSelectSmiles: () => void;
  onBack: () => void;
}

export function EntryPointSelection({ onSelectPlant, onSelectSmiles, onBack }: EntryPointSelectionProps) {
  return (
    <div className="min-h-screen py-12 px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Project
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-12">
          <h1 className="text-3xl text-gray-900 mb-3 text-center">Choose Your Starting Point</h1>
          <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Select how you want to begin your drug discovery workflow
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Plant Path */}
            <button
              onClick={onSelectPlant}
              className="group bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-8 hover:shadow-2xl transition-all border-2 border-transparent hover:border-emerald-400 hover:scale-105"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-200 group-hover:bg-emerald-300 flex items-center justify-center mx-auto mb-6 transition-colors">
                <Leaf className="w-10 h-10 text-emerald-700" />
              </div>
              <h2 className="text-2xl text-gray-900 mb-4 text-center">Start from Plant</h2>
              <p className="text-gray-700 text-center mb-6">
                Begin with traditional Ayurvedic plants and extract phytochemicals from our database
              </p>
              <div className="bg-white/50 rounded-lg p-4 text-sm text-gray-600">
                <p className="mb-2">This path includes:</p>
                <ul className="space-y-1 text-left">
                  <li>• Plant selection & part specification</li>
                  <li>• Automated phytochemical extraction</li>
                  <li>• SMILES generation</li>
                  <li>• 3D structure prediction</li>
                </ul>
              </div>
            </button>

            {/* SMILES Path */}
            <button
              onClick={onSelectSmiles}
              className="group bg-gradient-to-br from-cyan-50 to-blue-100 rounded-2xl p-8 hover:shadow-2xl transition-all border-2 border-transparent hover:border-cyan-400 hover:scale-105"
            >
              <div className="w-20 h-20 rounded-full bg-cyan-200 group-hover:bg-cyan-300 flex items-center justify-center mx-auto mb-6 transition-colors">
                <FlaskRound className="w-10 h-10 text-cyan-700" />
              </div>
              <h2 className="text-2xl text-gray-900 mb-4 text-center">Upload SMILES</h2>
              <p className="text-gray-700 text-center mb-6">
                Directly upload molecular structures using SMILES notation
              </p>
              <div className="bg-white/50 rounded-lg p-4 text-sm text-gray-600">
                <p className="mb-2">This path includes:</p>
                <ul className="space-y-1 text-left">
                  <li>• CSV/TXT file upload</li>
                  <li>• SMILES validation</li>
                  <li>• Duplicate removal</li>
                  <li>• Structure verification</li>
                </ul>
              </div>
            </button>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-blue-50 rounded-lg px-6 py-4 border border-blue-200">
              <p className="text-sm text-gray-700">
                💡 <strong>Pro tip:</strong> Both paths converge at the descriptor analysis stage, 
                so you can choose based on your starting materials
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
