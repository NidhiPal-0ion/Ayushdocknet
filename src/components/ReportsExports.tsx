import { ArrowLeft, Download, FileText, Database, Image, Package, CheckCircle } from 'lucide-react';
import { Project } from '../App';

interface ReportsExportsProps {
  project: Project;
  onBack: () => void;
  onComplete: () => void;
}

export function ReportsExports({ project, onBack, onComplete }: ReportsExportsProps) {
  const downloadItems = [
    {
      icon: Package,
      title: 'Full Project ZIP',
      description: 'Complete project archive with all data and results',
      size: '124 MB',
      color: 'purple'
    },
    {
      icon: Database,
      title: 'Compound Data (CSV)',
      description: 'SMILES, descriptors, ADMET predictions',
      size: '2.4 MB',
      color: 'emerald'
    },
    {
      icon: Database,
      title: 'Target Predictions (CSV)',
      description: 'Compound-target interactions with probabilities',
      size: '1.8 MB',
      color: 'teal'
    },
    {
      icon: Database,
      title: 'Docking Results (CSV)',
      description: 'Binding scores and rankings for all simulations',
      size: '3.2 MB',
      color: 'cyan'
    },
    {
      icon: FileText,
      title: 'Molecular Structures (SDF)',
      description: '3D conformations for all compounds',
      size: '8.7 MB',
      color: 'blue'
    },
    {
      icon: FileText,
      title: 'Docked Complexes (PDB)',
      description: 'Protein-ligand complex structures',
      size: '45 MB',
      color: 'indigo'
    },
    {
      icon: Image,
      title: 'Network Visualizations (PNG)',
      description: 'High-resolution network graphs and plots',
      size: '12 MB',
      color: 'pink'
    },
    {
      icon: FileText,
      title: 'Comprehensive Report (PDF)',
      description: 'Complete analysis report with all findings',
      size: '18 MB',
      color: 'amber'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: any = {
      purple: 'bg-purple-100 text-purple-600',
      emerald: 'bg-emerald-100 text-emerald-600',
      teal: 'bg-teal-100 text-teal-600',
      cyan: 'bg-cyan-100 text-cyan-600',
      blue: 'bg-blue-100 text-blue-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      pink: 'bg-pink-100 text-pink-600',
      amber: 'bg-amber-100 text-amber-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
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
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-3xl text-gray-900">Reports & Exports</h1>
          </div>
          <p className="text-gray-600 mb-8 ml-15">
            Download your research results and generated reports
          </p>

          {/* Success Message */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 mb-8">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h2 className="text-xl text-gray-900 mb-2">Pipeline Completed Successfully!</h2>
                <p className="text-gray-700 mb-4">
                  Your drug discovery workflow for <strong>{project.name}</strong> has been completed. 
                  All analyses have been performed and results are ready for download.
                </p>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-gray-600 mb-1">Compounds Analyzed</p>
                    <p className="text-xl text-green-700">8</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-gray-600 mb-1">Targets Predicted</p>
                    <p className="text-xl text-green-700">12</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-gray-600 mb-1">Docking Jobs</p>
                    <p className="text-xl text-green-700">48</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-gray-600 mb-1">Network Nodes</p>
                    <p className="text-xl text-green-700">24</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Options */}
          <h2 className="text-xl text-gray-900 mb-6">Available Downloads</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {downloadItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  className="flex items-start gap-4 p-5 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all text-left group"
                >
                  <div className={`w-12 h-12 rounded-lg ${getColorClasses(item.color)} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h3>
                      <Download className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 flex-shrink-0 ml-2" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <span className="text-xs text-gray-500">{item.size}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download All
              </button>
              <button className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                View Report
              </button>
              <button className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <Package className="w-4 h-4" />
                Share Project
              </button>
            </div>
          </div>

          {/* Citation */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
            <h3 className="text-gray-900 mb-3">Cite This Work</h3>
            <div className="bg-white rounded-lg p-4 border border-gray-200 font-mono text-sm text-gray-700 mb-4">
              {project.name}. Generated using AYUSH-DockNet Platform. {new Date().toISOString().split('T')[0]}.
            </div>
            <p className="text-xs text-gray-600">
              If you use these results in your research, please cite the AYUSH-DockNet platform and relevant tools used in the analysis.
            </p>
          </div>

          {/* Summary Stats */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200 mb-8">
            <h3 className="text-gray-900 mb-4">Project Summary</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="text-gray-700 mb-3">Pipeline Steps Completed</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Phytochemical extraction
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Descriptor analysis & toxicity screening
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    ADMET predictions
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Target predictions
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Molecular docking simulations
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Network pharmacology analysis
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-gray-700 mb-3">Key Findings</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• 8 drug-like compounds identified</li>
                  <li>• COX-2 identified as primary hub target</li>
                  <li>• Strong anti-inflammatory pathway enrichment</li>
                  <li>• Curcumin shows best docking score (-9.2 kcal/mol)</li>
                  <li>• All compounds passed ADMET screening</li>
                  <li>• Network reveals multi-target synergy</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={onComplete}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Complete & Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
