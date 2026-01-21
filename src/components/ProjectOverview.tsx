import { ArrowLeft, Play, CheckCircle, Circle, Clock } from 'lucide-react';
import { Project } from '../App';

interface ProjectOverviewProps {
  project: Project;
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const steps = [
  { id: 0, name: 'Entry Point Selection', screen: 'entry-point' },
  { id: 1, name: 'Phytochemical Ingestion', screen: 'plant-input' },
  { id: 2, name: 'SMILES Upload', screen: 'smiles-upload' },
  { id: 3, name: 'Descriptors & Toxicity', screen: 'descriptors' },
  { id: 4, name: 'Toxicophore Substitution', screen: 'toxicophore-substitution' },
  { id: 5, name: 'ADMET Prediction', screen: 'admet' },
  { id: 6, name: 'Target Prediction', screen: 'target-prediction' },
  { id: 7, name: 'Docking Setup', screen: 'docking-setup' },
  { id: 8, name: 'Docking Results', screen: 'docking-results' },
  { id: 9, name: 'Network Pharmacology', screen: 'network-setup' },
  { id: 10, name: 'Reports & Exports', screen: 'reports' },
];

export function ProjectOverview({ project, onNavigate, onBack }: ProjectOverviewProps) {
  return (
    <div className="min-h-screen py-12 px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Project Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl text-gray-900 mb-2">{project.name}</h1>
              <p className="text-gray-600 mb-4">{project.description}</p>
              {project.objective && (
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <span className="text-emerald-700">Objective:</span> {project.objective}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-500 mb-1">Created</p>
              <p className="text-gray-900">{project.createdDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Last Updated</p>
              <p className="text-gray-900">{project.lastUpdated}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <p className="text-gray-900">{project.status}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline Progress */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl text-gray-900 mb-6">Pipeline Progress</h2>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Overall Progress</span>
              <span className="text-sm text-gray-900">{Math.round((project.currentStep / 10) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(project.currentStep / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Next Step */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Next Step</p>
                <p className="text-xl text-gray-900">
                  {project.currentStep === 0 
                    ? 'Start Your Research Pipeline'
                    : steps.find(s => s.id === project.currentStep)?.name || 'Continue Pipeline'}
                </p>
              </div>
              <button
                onClick={() => {
                  if (project.currentStep === 0) {
                    onNavigate('entry-point');
                  } else {
                    const nextStep = steps.find(s => s.id === project.currentStep);
                    if (nextStep) onNavigate(nextStep.screen);
                  }
                }}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Sidebar */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl text-gray-900 mb-6">Pipeline Steps</h2>
          <div className="space-y-3">
            {steps.map((step) => {
              const isCompleted = project.currentStep > step.id;
              const isCurrent = project.currentStep === step.id;
              const isLocked = project.currentStep < step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => !isLocked && onNavigate(step.screen)}
                  disabled={isLocked}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all text-left ${
                    isCompleted
                      ? 'bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200'
                      : isCurrent
                      ? 'bg-teal-50 hover:bg-teal-100 border-2 border-teal-400'
                      : 'bg-gray-50 border-2 border-gray-200 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    ) : isCurrent ? (
                      <Play className="w-6 h-6 text-teal-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`${
                      isCompleted
                        ? 'text-emerald-900'
                        : isCurrent
                        ? 'text-teal-900'
                        : 'text-gray-500'
                    }`}>
                      {step.name}
                    </div>
                  </div>
                  {isCompleted && (
                    <span className="text-xs text-emerald-600 px-2 py-1 bg-emerald-100 rounded">
                      Completed
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-xs text-teal-600 px-2 py-1 bg-teal-100 rounded">
                      Current
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
