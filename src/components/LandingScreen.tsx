import { Plus, FolderOpen, FlaskConical, Calendar, Clock, Activity } from 'lucide-react';
import { Project } from '../App';

interface LandingScreenProps {
  projects: Project[];
  onCreateNew: () => void;
  onOpenProject: (project: Project) => void;
}

export function LandingScreen({ projects, onCreateNew, onOpenProject }: LandingScreenProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <FlaskConical className="w-12 h-12" />
            <h1 className="text-5xl">AYUSH-DockNet</h1>
          </div>
          <p className="text-xl text-emerald-50 max-w-3xl">
            Ayurvedic Unified Screening, Docking & Network Pharmacology Platform
          </p>
          <p className="mt-3 text-emerald-100 max-w-2xl">
            Accelerate your drug discovery research from traditional plants to molecular targets
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-6xl mx-auto w-full px-8 -mt-8">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <button
            onClick={onCreateNew}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-emerald-500"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                <Plus className="w-7 h-7 text-emerald-600" />
              </div>
              <h2 className="text-2xl text-gray-900">Create New Project</h2>
            </div>
            <p className="text-gray-600 text-left">
              Start a new drug discovery workflow from plants or molecules
            </p>
          </button>

          <button
            onClick={() => projects.length > 0 && onOpenProject(projects[0])}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-teal-500"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center">
                <FolderOpen className="w-7 h-7 text-teal-600" />
              </div>
              <h2 className="text-2xl text-gray-900">Open Existing Project</h2>
            </div>
            <p className="text-gray-600 text-left">
              Continue working on your research projects
            </p>
          </button>
        </div>
      </div>

      {/* Past Projects */}
      <div className="max-w-6xl mx-auto w-full px-8 pb-16">
        <h2 className="text-2xl mb-6 text-gray-800">Recent Projects</h2>
        
        {projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FlaskConical className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No projects yet. Create your first project to get started!</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200">
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Project Name</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Created</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Last Updated</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Progress</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, idx) => (
                    <tr
                      key={project.id}
                      className={`border-b border-gray-100 hover:bg-emerald-50/50 transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-gray-900 mb-1">{project.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-2 flex-wrap">
                            {project.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{project.createdDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{project.lastUpdated}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Activity
                            className={`w-4 h-4 ${
                              project.status === 'Completed'
                                ? 'text-green-500'
                                : project.status === 'In Progress'
                                ? 'text-blue-500'
                                : 'text-gray-400'
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              project.status === 'Completed'
                                ? 'text-green-700'
                                : project.status === 'In Progress'
                                ? 'text-blue-700'
                                : 'text-gray-600'
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[120px]">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all"
                              style={{ width: `${(project.currentStep / 16) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {project.currentStep}/16
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => onOpenProject(project)}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
