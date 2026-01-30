
import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 'grade-form',
    title: 'Betygsblankett',
    description: 'Verktyg för att generera officiella blanketter för ändring eller rättelse av betyg. Optimerad för utskrift och PDF.',
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    ),
    link: '/grade-form',
    tags: ['PDF', 'Skola', 'Admin'],
    color: 'blue'
  },
  {
    id: 'placeholder-1',
    title: 'Analysverktyg',
    description: 'Visualisering av data och trender för skolresultat. Integrerat med Recharts och D3.',
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
      </svg>
    ),
    link: '/placeholder',
    tags: ['Data', 'Charts'],
    color: 'indigo'
  },
  {
    id: 'placeholder-2',
    title: 'Schema-generator',
    description: 'Skapa dynamiska scheman för kurser och seminarier med dra-och-släpp funktionalitet.',
    icon: (
      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    ),
    link: '/placeholder',
    tags: ['Kalender', 'Verktyg'],
    color: 'emerald'
  }
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
          Mina Projekt
        </h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          En samling av verktyg och applikationer utvecklade för att förenkla administrativa flöden och datahantering.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={project.link}
            className="group relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <div className="scale-[2.5] transform rotate-12">
                   {project.icon}
               </div>
            </div>
            
            <div className="mb-4 inline-flex items-center justify-center p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
              {project.icon}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider rounded">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
      
      {/* Visual background decor */}
      <div className="fixed bottom-0 right-0 -z-10 opacity-5">
          <svg width="400" height="400" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-blue-500" />
              <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-blue-500" />
          </svg>
      </div>
    </div>
  );
};

export default Dashboard;
