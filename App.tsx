import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import GradeChangeForm from './components/GradeChangeForm';
import SalaryBooking from './components/SalaryBooking';
import KoladaDashboard from './components/KoladaDashboard';
import { Layout } from './components/Layout';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/grade-form" element={<GradeChangeForm />} />
          <Route path="/booking" element={<SalaryBooking />} />
          <Route path="/analysis" element={<KoladaDashboard />} />
          {/* Placeholder for future projects */}
          <Route path="/placeholder" element={
            <div className="max-w-4xl mx-auto py-20 text-center">
              <h1 className="text-3xl font-bold text-gray-800">Kommande Projekt</h1>
              <p className="mt-4 text-gray-600">Detta projekt är under utveckling.</p>
              <Link to="/" className="mt-8 inline-block text-blue-600 hover:underline">Tillbaka till start</Link>
            </div>
          } />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;