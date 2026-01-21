import { useState } from 'react';
import { LandingScreen } from './components/LandingScreen';
import { CreateProject } from './components/CreateProject';
import { ProjectOverview } from './components/ProjectOverview';
import { EntryPointSelection } from './components/EntryPointSelection';
import { PlantInput } from './components/PlantInput';
import { PhytochemicalReview } from './components/PhytochemicalReview';
import { SmilesStructureView } from './components/SmilesStructureView';
import { SmilesUpload } from './components/SmilesUpload';
import { DescriptorsDashboard } from './components/DescriptorsDashboard';
import { ToxicophoreSubstitution } from './components/ToxicophoreSubstitution';
import { AdmetPrediction } from './components/AdmetPrediction';
import { TargetPrediction } from './components/TargetPrediction';
import { DockingSetup } from './components/DockingSetup';
import { DockingResults } from './components/DockingResults';
import { NetworkSetup } from './components/NetworkSetup';
import { NetworkVisualization } from './components/NetworkVisualization';
import { ReportsExports } from './components/ReportsExports';

export interface Project {
  id: string;
  name: string;
  description: string;
  objective: string;
  tags: string[];
  createdDate: string;
  lastUpdated: string;
  status: string;
  currentStep: number;
  data?: any;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('landing');
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Turmeric Anti-inflammatory Study',
      description: 'Investigating curcuminoids for anti-inflammatory properties',
      objective: 'Identify key compounds and protein targets',
      tags: ['Ayurveda', 'inflammation', 'turmeric'],
      createdDate: '2025-12-15',
      lastUpdated: '2026-01-05',
      status: 'In Progress',
      currentStep: 7
    },
    {
      id: '2',
      name: 'Ashwagandha Neuroprotection',
      description: 'Withanolides for cognitive enhancement',
      objective: 'Screen for blood-brain barrier permeability',
      tags: ['Ayurveda', 'neuroprotection', 'ashwagandha'],
      createdDate: '2025-11-20',
      lastUpdated: '2025-12-28',
      status: 'Completed',
      currentStep: 16
    }
  ]);

  const handleCreateProject = (project: Omit<Project, 'id' | 'createdDate' | 'lastUpdated' | 'status' | 'currentStep'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'New',
      currentStep: 0
    };
    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
    setCurrentScreen('project-overview');
  };

  const handleOpenProject = (project: Project) => {
    setCurrentProject(project);
    setCurrentScreen('project-overview');
  };

  const updateProjectData = (data: any) => {
    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        data: { ...currentProject.data, ...data },
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setCurrentProject(updatedProject);
      setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    }
  };

  const updateProjectStep = (step: number) => {
    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        currentStep: Math.max(currentProject.currentStep, step),
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setCurrentProject(updatedProject);
      setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return (
          <LandingScreen
            projects={projects}
            onCreateNew={() => setCurrentScreen('create-project')}
            onOpenProject={handleOpenProject}
          />
        );
      case 'create-project':
        return (
          <CreateProject
            onCreateProject={handleCreateProject}
            onBack={() => setCurrentScreen('landing')}
          />
        );
      case 'project-overview':
        return (
          <ProjectOverview
            project={currentProject!}
            onNavigate={setCurrentScreen}
            onBack={() => setCurrentScreen('landing')}
          />
        );
      case 'entry-point':
        return (
          <EntryPointSelection
            onSelectPlant={() => setCurrentScreen('plant-input')}
            onSelectSmiles={() => setCurrentScreen('smiles-upload')}
            onBack={() => setCurrentScreen('project-overview')}
          />
        );
      case 'plant-input':
        return (
          <PlantInput
            onContinue={(data) => {
              updateProjectData({ plantData: data });
              updateProjectStep(1);
              setCurrentScreen('phytochemical-review');
            }}
            onBack={() => setCurrentScreen('entry-point')}
          />
        );
      case 'phytochemical-review':
        return (
          <PhytochemicalReview
            plantData={currentProject?.data?.plantData}
            onContinue={(data) => {
              updateProjectData({ compounds: data });
              updateProjectStep(2);
              setCurrentScreen('descriptors');
            }}
            onBack={() => setCurrentScreen('plant-input')}
          />
        );
      case 'smiles-structure':
        return (
          <SmilesStructureView
            compounds={currentProject?.data?.compounds}
            onContinue={() => {
              updateProjectStep(3);
              setCurrentScreen('descriptors');
            }}
            onBack={() => setCurrentScreen('phytochemical-review')}
          />
        );
      case 'smiles-upload':
        return (
          <SmilesUpload
            onContinue={(data) => {
              updateProjectData({ compounds: data });
              updateProjectStep(3);
              setCurrentScreen('descriptors');
            }}
            onBack={() => setCurrentScreen('entry-point')}
          />
        );
      case 'descriptors':
        return (
          <DescriptorsDashboard
            compounds={currentProject?.data?.compounds}
            onContinue={(data) => {
              updateProjectData({ descriptors: data });
              updateProjectStep(4);
              if (data.toxicCompounds?.length > 0) {
                setCurrentScreen('toxicophore-substitution');
              } else {
                setCurrentScreen('admet');
              }
            }}
            onBack={() => setCurrentScreen('phytochemical-review')}
          />
        );
      case 'toxicophore-substitution':
        return (
          <ToxicophoreSubstitution
            toxicCompounds={currentProject?.data?.descriptors?.toxicCompounds}
            onContinue={(data) => {
              updateProjectData({ substitutions: data });
              updateProjectStep(5);
              setCurrentScreen('admet');
            }}
            onBack={() => setCurrentScreen('descriptors')}
          />
        );
      case 'admet':
        return (
          <AdmetPrediction
            compounds={currentProject?.data?.compounds}
            onContinue={(data) => {
              updateProjectData({ admet: data });
              updateProjectStep(6);
              setCurrentScreen('target-prediction');
            }}
            onBack={() => setCurrentScreen('descriptors')}
          />
        );
      case 'target-prediction':
        return (
          <TargetPrediction
            compounds={currentProject?.data?.compounds}
            onContinue={(data) => {
              updateProjectData({ targets: data });
              updateProjectStep(7);
              setCurrentScreen('docking-setup');
            }}
            onBack={() => setCurrentScreen('admet')}
          />
        );
      case 'docking-setup':
        return (
          <DockingSetup
            compounds={currentProject?.data?.compounds}
            targets={currentProject?.data?.targets}
            onContinue={(data) => {
              updateProjectData({ dockingSetup: data });
              updateProjectStep(8);
              setCurrentScreen('docking-results');
            }}
            onBack={() => setCurrentScreen('target-prediction')}
          />
        );
      case 'docking-results':
        return (
          <DockingResults
            dockingSetup={currentProject?.data?.dockingSetup}
            onContinue={(data) => {
              updateProjectData({ dockingResults: data });
              updateProjectStep(9);
              setCurrentScreen('network-setup');
            }}
            onBack={() => setCurrentScreen('docking-setup')}
          />
        );
      case 'network-setup':
        return (
          <NetworkSetup
            project={currentProject!}
            onContinue={(data) => {
              updateProjectData({ networkSetup: data });
              updateProjectStep(10);
              setCurrentScreen('network-visualization');
            }}
            onBack={() => setCurrentScreen('docking-results')}
          />
        );
      case 'network-visualization':
        return (
          <NetworkVisualization
            networkData={currentProject?.data?.networkSetup}
            onContinue={() => {
              updateProjectStep(11);
              setCurrentScreen('reports');
            }}
            onBack={() => setCurrentScreen('network-setup')}
          />
        );
      case 'reports':
        return (
          <ReportsExports
            project={currentProject!}
            onBack={() => setCurrentScreen('network-visualization')}
            onComplete={() => {
              updateProjectStep(16);
              setCurrentScreen('project-overview');
            }}
          />
        );
      default:
        return <LandingScreen projects={projects} onCreateNew={() => setCurrentScreen('create-project')} onOpenProject={handleOpenProject} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {renderScreen()}
    </div>
  );
}