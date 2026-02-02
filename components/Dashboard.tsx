import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 'rektorer-gbg',
    title: 'Rektorer GBG',
    description: 'Komplett resplan och agenda för rektorsgruppens planeringsresa till Göteborg 16-18 mars 2026.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    ),
    link: '/rektorer-gbg',
    tags: ['Resa', 'Planering', 'GBG'],
    status: 'Planerad'
  },
  {
    id: 'salary-booking',
    title: 'Lönesamtal 2026',
    description: 'Bokningssystem för årets lönesamtal. Välj en tid som passar och bekräfta din plats i Aludden eller Edsviken.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    ),
    link: '/booking',
    tags: ['HR', 'Intern', 'Bokning'],
    status: 'Aktiv'
  },
  {
    id: 'kolada-analysis',
    title: 'Analys Dashboard',
    description: 'Datadriven kommunanalys kopplad till Kolada-databasen. Visualisera nyckeltal och generera AI-insikter för Danderyd.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
      </svg>
    ),
    link: '/analysis',
    tags: ['Data', 'Kolada', 'AI'],
    status: 'Aktiv'
  },
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
                project.status === 'Aktiv' ? 'bg-blue-50 text-blue-600' :
                project.status === 'Färdig' ? 'bg-green-50 text-green-600' : 
                project.status === 'Planerad' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
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
    </div>
  );
};

export default Dashboard;