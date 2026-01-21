import { useState } from 'react';
import { ArrowLeft, ArrowRight, Leaf, Search } from 'lucide-react';

interface PlantInputProps {
  onContinue: (data: any) => void;
  onBack: () => void;
}

const commonPlants = [
  'Curcuma longa (Turmeric)',
  'Withania somnifera (Ashwagandha)',
  'Azadirachta indica (Neem)',
  'Ocimum sanctum (Tulsi)',
  'Tinospora cordifolia (Guduchi)',
  'Bacopa monnieri (Brahmi)',
  'Centella asiatica (Gotu Kola)',
  'Terminalia chebula (Haritaki)'
];

const plantParts = ['Leaf', 'Root', 'Bark', 'Seed', 'Flower', 'Fruit', 'Whole Plant', 'Rhizome'];

export function PlantInput({ onContinue, onBack }: PlantInputProps) {
  const [plantName, setPlantName] = useState('');
  const [selectedPart, setSelectedPart] = useState('');
  const [traditionalUse, setTraditionalUse] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Database selections
  const [databases, setDatabases] = useState({
    imppat: true,
    knapsack: true,
    drdukes: true
  });
  
  // Dr. Duke's filters
  const [dukesFilters, setDukesFilters] = useState({
    withActivities: false,
    excludeUbiquitous: false
  });

  const filteredPlants = commonPlants.filter(plant =>
    plant.toLowerCase().includes(plantName.toLowerCase())
  );

  const handleSubmit = () => {
    if (plantName && selectedPart) {
      onContinue({
        plantName,
        plantPart: selectedPart,
        traditionalUse,
        databases,
        dukesFilters
      });
    }
  };

  return (
    <div className="min-h-screen py-12 px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-3xl text-gray-900">Plant Input</h1>
          </div>
          <p className="text-gray-600 mb-8 ml-15">
            Enter details about the Ayurvedic plant you want to study
          </p>

          <div className="space-y-6">
            {/* Plant Name */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Plant Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={plantName}
                    onChange={(e) => {
                      setPlantName(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search or enter plant name..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                {showSuggestions && plantName && filteredPlants.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredPlants.map((plant, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setPlantName(plant);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center gap-2">
                          <Leaf className="w-4 h-4 text-emerald-600" />
                          <span className="text-gray-900">{plant}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Include scientific name for best results (e.g., Curcuma longa)
              </p>
            </div>

            {/* Plant Part */}
            <div>
              <label className="block text-sm text-gray-700 mb-3">
                Plant Part <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {plantParts.map((part) => (
                  <button
                    key={part}
                    onClick={() => setSelectedPart(part)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      selectedPart === part
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-emerald-300 text-gray-700'
                    }`}
                  >
                    {part}
                  </button>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <label className="block text-sm text-gray-700 mb-3">Databases</label>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={databases.imppat}
                    onChange={(e) => setDatabases({ ...databases, imppat: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-gray-700">IMPPAT</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={databases.knapsack}
                    onChange={(e) => setDatabases({ ...databases, knapsack: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-gray-700">Knapsack</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={databases.drdukes}
                    onChange={(e) => setDatabases({ ...databases, drdukes: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-gray-700">Dr. Duke's</span>
                </label>
              </div>

              {/* Dr. Duke's Filters */}
              {databases.drdukes && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <label className="block text-sm text-gray-700 mb-3">Dr. Duke's Filters</label>
                  <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dukesFilters.withActivities}
                        onChange={(e) => setDukesFilters({ ...dukesFilters, withActivities: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-gray-700">With Activities</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dukesFilters.excludeUbiquitous}
                        onChange={(e) => setDukesFilters({ ...dukesFilters, excludeUbiquitous: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-gray-700">Exclude Ubiquitous</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Traditional Use */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Traditional Use <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                value={traditionalUse}
                onChange={(e) => setTraditionalUse(e.target.value)}
                placeholder="Describe traditional Ayurvedic applications (e.g., anti-inflammatory, digestive aid, immune support...)"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>What happens next:</strong> We'll search our database for known phytochemicals 
                from this plant part and retrieve their molecular structures automatically.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSubmit}
                disabled={!plantName || !selectedPart}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Fetch Phytochemicals
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}