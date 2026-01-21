import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, X, Database, Download } from 'lucide-react';

interface PhytochemicalReviewProps {
  plantData: any;
  onContinue: (compounds: any[]) => void;
  onBack: () => void;
}

// Mock phytochemical data
const mockCompounds = [
  { id: 1, name: 'Curcumin', source: 'PubChem', selected: true },
  { id: 2, name: 'Demethoxycurcumin', source: 'ChEMBL', selected: true },
  { id: 3, name: 'Bisdemethoxycurcumin', source: 'PubChem', selected: true },
  { id: 4, name: 'Turmerone', source: 'COCONUT', selected: true },
  { id: 5, name: 'Ar-turmerone', source: 'PubChem', selected: true },
  { id: 6, name: 'Curlone', source: 'ChEMBL', selected: false },
  { id: 7, name: 'Zingiberene', source: 'COCONUT', selected: true },
  { id: 8, name: 'Beta-sesquiphellandrene', source: 'PubChem', selected: false },
];

// Mock SMILES and 3D structure data for download
const compoundStructureData = [
  {
    id: 1,
    name: 'Curcumin',
    smiles: 'O=C(\\\\C=C\\\\c1ccc(O)c(OC)c1)CC(=O)\\\\C=C\\\\c1ccc(O)c(OC)c1',
    molecular_formula: 'C21H20O6',
    molecular_weight: 368.38,
    inchi: 'InChI=1S/C21H20O6/c1-26-20-11-14(5-9-18(20)24)3-7-16(22)13-17(23)8-4-15-6-10-19(25)21(12-15)27-2/h3-12,24-25H,13H2,1-2H3',
    structure_3d: 'MOL_3D_COORDINATES_FILE'
  },
  {
    id: 2,
    name: 'Demethoxycurcumin',
    smiles: 'COc1cc(\\\\C=C\\\\C(=O)CC(=O)\\\\C=C\\\\c2ccc(O)cc2)ccc1O',
    molecular_formula: 'C20H18O5',
    molecular_weight: 338.35,
    inchi: 'InChI=1S/C20H18O5/c1-24-19-13-15(7-11-18(19)23)3-9-17(22)14-16(21)8-4-20-10-12-25-20/h3-13,23H,14H2,1H3',
    structure_3d: 'MOL_3D_COORDINATES_FILE'
  },
  {
    id: 3,
    name: 'Bisdemethoxycurcumin',
    smiles: 'O=C(\\\\C=C\\\\c1ccc(O)cc1)CC(=O)\\\\C=C\\\\c1ccc(O)cc1',
    molecular_formula: 'C19H16O4',
    molecular_weight: 308.33,
    inchi: 'InChI=1S/C19H16O4/c20-15-7-1-13(2-8-15)5-11-17(22)12-18(23)10-6-14-3-9-16(21)4-14/h1-11,20-21H,12H2',
    structure_3d: 'MOL_3D_COORDINATES_FILE'
  },
  {
    id: 4,
    name: 'Turmerone',
    smiles: 'CC(C)=CCCC(C)C(=O)C=C(C)C',
    molecular_formula: 'C15H22O',
    molecular_weight: 218.33,
    inchi: 'InChI=1S/C15H22O/c1-12(2)7-6-8-13(3)15(16)10-9-14(4)5/h7,9-10,13H,6,8H2,1-5H3',
    structure_3d: 'MOL_3D_COORDINATES_FILE'
  },
  {
    id: 5,
    name: 'Ar-turmerone',
    smiles: 'CC1=C(C(=O)C=C(C1)C)C(C)CCC=C(C)C',
    molecular_formula: 'C15H20O',
    molecular_weight: 216.32,
    inchi: 'InChI=1S/C15H20O/c1-11(2)6-5-7-12(3)15-13(4)8-9-14(16)10-15/h6,8-10,12H,5,7H2,1-4H3',
    structure_3d: 'MOL_3D_COORDINATES_FILE'
  },
  {
    id: 6,
    name: 'Curlone',
    smiles: 'CC1CCC(=C(C)C)C(=O)C1C(=C)C',
    molecular_formula: 'C15H24O',
    molecular_weight: 220.35,
    inchi: 'InChI=1S/C15H24O/c1-10(2)6-7-12(4)15(16)14-11(3)9-13(5)8-14/h11-14H,1,6-9H2,2-5H3',
    structure_3d: 'MOL_3D_COORDINATES_FILE'
  },
  {
    id: 7,
    name: 'Zingiberene',
    smiles: 'CC1=CCC(C(=C)CCC=C(C)C)CC1',
    molecular_formula: 'C15H24',
    molecular_weight: 204.35,
    inchi: 'InChI=1S/C15H24/c1-13(2)6-5-7-14(3)15-10-8-12(4)9-11-15/h6,8,15H,3,5,7,9-11H2,1-2,4H3',
    structure_3d: 'MOL_3D_COORDINATES_FILE'
  },
  {
    id: 8,
    name: 'Beta-sesquiphellandrene',
    smiles: 'CC1=CCC(C(C)(C)C=C)CC1',
    molecular_formula: 'C15H24',
    molecular_weight: 204.35,
    inchi: 'InChI=1S/C15H24/c1-6-15(4,5)14-11-9-13(3)10-12-14/h6,10,14H,1,9,11-12H2,2-5H3',
    structure_3d: 'MOL_3D_COORDINATES_FILE'
  }
];

export function PhytochemicalReview({ plantData, onContinue, onBack }: PhytochemicalReviewProps) {
  const [compounds, setCompounds] = useState(mockCompounds);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleCompound = (id: number) => {
    setCompounds(compounds.map(c => 
      c.id === id ? { ...c, selected: !c.selected } : c
    ));
  };

  const removeCompound = (id: number) => {
    setCompounds(compounds.filter(c => c.id !== id));
  };

  const selectedCount = compounds.filter(c => c.selected).length;

  const handleContinue = () => {
    const selectedCompounds = compounds.filter(c => c.selected);
    onContinue(selectedCompounds);
  };

  const handleDownloadSmilesCSV = () => {
    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      const selectedCompounds = compounds.filter(c => c.selected);
      const selectedData = compoundStructureData.filter(d => 
        selectedCompounds.some(c => c.id === d.id)
      );
      
      // Create CSV header
      const header = 'Compound Name,SMILES,Molecular Formula,Molecular Weight (g/mol),InChI,3D Structure File\n';
      
      // Create CSV rows
      const rows = selectedData.map(compound => 
        `"${compound.name}","${compound.smiles}","${compound.molecular_formula}",${compound.molecular_weight},"${compound.inchi}","${compound.structure_3d}"`
      ).join('\n');
      
      const csv = header + rows;
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${plantData?.plantName?.replace(/\s+/g, '_')}_phytochemicals_smiles_3d.csv`;
      link.click();
      URL.revokeObjectURL(url);
      
      setIsGenerating(false);
    }, 1500);
  };

  const handleDownloadSDF = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const selectedCompounds = compounds.filter(c => c.selected);
      const selectedData = compoundStructureData.filter(d => 
        selectedCompounds.some(c => c.id === d.id)
      );
      
      // Create mock SDF content
      let sdfContent = '';
      selectedData.forEach(compound => {
        sdfContent += `${compound.name}\n`;
        sdfContent += `  Generated by AYUSH-DockNet\n\n`;
        sdfContent += `  0  0  0  0  0  0  0  0  0  0999 V2000\n`;
        sdfContent += `M  END\n`;
        sdfContent += `> <SMILES>\n${compound.smiles}\n\n`;
        sdfContent += `> <MOLECULAR_FORMULA>\n${compound.molecular_formula}\n\n`;
        sdfContent += `> <MOLECULAR_WEIGHT>\n${compound.molecular_weight}\n\n`;
        sdfContent += `$$$$\n`;
      });
      
      const blob = new Blob([sdfContent], { type: 'chemical/x-mdl-sdfile' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${plantData?.plantName?.replace(/\s+/g, '_')}_phytochemicals_3d.sdf`;
      link.click();
      URL.revokeObjectURL(url);
      
      setIsGenerating(false);
    }, 1500);
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
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
              <Database className="w-6 h-6 text-teal-600" />
            </div>
            <h1 className="text-3xl text-gray-900">Phytochemical Review</h1>
          </div>
          <p className="text-gray-600 mb-6 ml-15">
            Found {compounds.length} compounds from <strong>{plantData?.plantName}</strong> ({plantData?.plantPart})
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <p className="text-sm text-gray-600 mb-1">Total Found</p>
              <p className="text-2xl text-emerald-700">{compounds.length}</p>
            </div>
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
              <p className="text-sm text-gray-600 mb-1">Selected</p>
              <p className="text-2xl text-teal-700">{selectedCount}</p>
            </div>
            <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
              <p className="text-sm text-gray-600 mb-1">Databases</p>
              <p className="text-2xl text-cyan-700">3</p>
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-50 to-teal-50">
                    <th className="px-6 py-4 text-left text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={selectedCount === compounds.length}
                        onChange={() => {
                          const allSelected = selectedCount === compounds.length;
                          setCompounds(compounds.map(c => ({ ...c, selected: !allSelected })));
                        }}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Compound Name</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Source Database</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {compounds.map((compound, idx) => (
                    <tr
                      key={compound.id}
                      className={`border-t border-gray-100 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      } hover:bg-emerald-50/30 transition-colors`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={compound.selected}
                          onChange={() => toggleCompound(compound.id)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 text-gray-900">{compound.name}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {compound.source}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {compound.selected ? (
                          <span className="flex items-center gap-2 text-emerald-600">
                            <Check className="w-4 h-4" />
                            Selected
                          </span>
                        ) : (
                          <span className="text-gray-400">Deselected</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => removeCompound(compound.id)}
                          className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
                        >
                          <X className="w-4 h-4" />
                          Remove
                        </button>
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
              <strong>Next step:</strong> We'll generate SMILES strings and 3D structures for the 
              {selectedCount} selected compound{selectedCount !== 1 ? 's' : ''}.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            {/* Download Options */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5">
              <h3 className="text-sm text-gray-700 mb-3 flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-600" />
                <strong>Download SMILES & 3D Structures</strong>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Export generated structures without viewing them on screen
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadSmilesCSV}
                  disabled={selectedCount === 0 || isGenerating}
                  className="flex-1 px-5 py-3 bg-white border-2 border-emerald-500 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? 'Generating...' : 'Download CSV'}
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDownloadSDF}
                  disabled={selectedCount === 0 || isGenerating}
                  className="flex-1 px-5 py-3 bg-white border-2 border-emerald-500 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? 'Generating...' : 'Download SDF'}
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Continue to Next Step */}
            <button
              onClick={handleContinue}
              disabled={selectedCount === 0}
              className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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