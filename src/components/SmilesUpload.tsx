import { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface SmilesUploadProps {
  onContinue: (data: any) => void;
  onBack: () => void;
}

export function SmilesUpload({ onContinue, onBack }: SmilesUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [validSmiles, setValidSmiles] = useState(5);
  const [invalidSmiles, setInvalidSmiles] = useState(1);
  const [duplicates, setDuplicates] = useState(2);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const handleContinue = () => {
    const mockData = [
      { id: 1, name: 'Compound 1', smiles: 'CC(C)Cc1ccc(cc1)C(C)C(O)=O' },
      { id: 2, name: 'Compound 2', smiles: 'CC(=O)Oc1ccccc1C(=O)O' },
      { id: 3, name: 'Compound 3', smiles: 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C' },
      { id: 4, name: 'Compound 4', smiles: 'CC(C)NCC(COc1ccccc1)O' },
      { id: 5, name: 'Compound 5', smiles: 'CC1=C(C(=O)N(N1C)c2ccccc2)N(C)CS(=O)(=O)O' }
    ];
    onContinue(mockData);
  };

  return (
    <div className="min-h-screen py-12 px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl text-gray-900 mb-2">Upload SMILES</h1>
          <p className="text-gray-600 mb-8">
            Upload a CSV or TXT file containing SMILES strings
          </p>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 mb-8 hover:border-emerald-500 transition-colors">
            <div className="text-center">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700 mb-2">Drag and drop your file here, or</p>
              <label className="inline-block">
                <span className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer">
                  Browse Files
                </span>
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supported formats: CSV, TXT
              </p>
            </div>
          </div>

          {/* File Format Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h3 className="text-sm text-gray-900 mb-2">Expected File Format:</h3>
            <div className="bg-white rounded p-3 font-mono text-sm">
              <div>CompoundName,SMILES</div>
              <div className="text-gray-500">Aspirin,CC(=O)Oc1ccccc1C(=O)O</div>
              <div className="text-gray-500">Caffeine,CN1C=NC2=C1C(=O)N(C(=O)N2C)C</div>
            </div>
          </div>

          {/* Validation Results */}
          {uploadedFile && (
            <div className="space-y-4 mb-8">
              <h3 className="text-lg text-gray-900">Validation Results</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-gray-600">Valid SMILES</p>
                  </div>
                  <p className="text-2xl text-green-700">{validSmiles}</p>
                </div>

                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-center gap-3 mb-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <p className="text-sm text-gray-600">Invalid SMILES</p>
                  </div>
                  <p className="text-2xl text-red-700">{invalidSmiles}</p>
                </div>

                <div className="border border-amber-200 rounded-lg p-4 bg-amber-50">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <p className="text-sm text-gray-600">Duplicates Removed</p>
                  </div>
                  <p className="text-2xl text-amber-700">{duplicates}</p>
                </div>
              </div>

              {/* Uploaded File Info */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Uploaded File</p>
                    <p className="text-gray-900">{uploadedFile}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Total Processed</p>
                    <p className="text-gray-900">{validSmiles + invalidSmiles + duplicates} entries</p>
                  </div>
                </div>
              </div>

              {/* Warnings */}
              {invalidSmiles > 0 && (
                <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <div className="flex gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-900 mb-1">Invalid SMILES Detected</p>
                      <p className="text-sm text-red-700">
                        {invalidSmiles} SMILES string{invalidSmiles > 1 ? 's were' : ' was'} found to be invalid and will be excluded from analysis.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {duplicates > 0 && (
                <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-900 mb-1">Duplicate SMILES Removed</p>
                      <p className="text-sm text-amber-700">
                        {duplicates} duplicate structure{duplicates > 1 ? 's were' : ' was'} automatically removed.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleContinue}
              disabled={!uploadedFile}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Confirm & Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
