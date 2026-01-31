import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 'grade-form',
    title: 'Betygsblankett',
    description: 'Officiell blankett för ändring eller rättelse av betyg i Danderyds kommun. Optimerad för PDF-export och högkvalitativ utskrift.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    ),
    link: '/grade-form',
    tags: ['Admin', 'Skola', 'PDF'],
    status: 'Färdig'
  },
  {
    id: 'placeholder-1',
    title: 'Analys Dashboard',
    description: 'Ett kommande verktyg för att visualisera resultat och trender inom utbildningssektorn.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
      </svg>
    ),
    link: '/placeholder',
    tags: ['Data', 'Charts'],
    status: 'Planerad'
  },
  {
    id: 'external-demo',
    title: 'Extern Dokumentation',
    description: 'Länk till projektdokumentation eller externa resurser som används i arbetet.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
      </svg>
    ),
    link: '/placeholder',
    tags: ['Länk', 'Info'],
    status: 'Extern'
  }
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn py-12">
      <header className="text-center max-w-3xl mx-auto px-4">
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
          Portfolio & Hub
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Mina Projekt & Verktyg
        </h1>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
          En samling av specialiserade verktyg utvecklade för att effektivisera administrativa processer och digitalisera dokumenthantering.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={project.link}
            className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {project.icon}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                project.status === 'Färdig' ? 'bg-green-50 text-green-600' : 
                project.status === 'Extern' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
              }`}>
                {project.status}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {project.description}
            </p>

            <div className="mt-auto flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 pt-12 border-t border-slate-200 text-center">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Teknisk Stack</h2>
        <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
           <span className="font-bold text-lg">React 19</span>
           <span className="font-bold text-lg">Tailwind CSS</span>
           <span className="font-bold text-lg">TypeScript</span>
           <span className="font-bold text-lg">ESM Native</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;