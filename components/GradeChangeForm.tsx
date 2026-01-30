
import React, { useState, useEffect } from 'react';

interface FormData {
  schoolName: string;
  studentName: string;
  studentClass: string;
  subject: string;
  originalDate: string;
  isCorrection: boolean;
  isChange: boolean;
  motivation: string;
  originalGrade: string;
  newGrade: string;
}

const initialData: FormData = {
  schoolName: '',
  studentName: '',
  studentClass: '',
  subject: '',
  originalDate: '',
  isCorrection: false,
  isChange: false,
  motivation: '',
  originalGrade: '',
  newGrade: '',
};

const GradeChangeForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData(initialData);
  };

  const handlePrint = () => {
    window.focus();
    setTimeout(() => {
        window.print();
    }, 150);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        handlePrint();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      <div className="no-print sticky top-16 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 flex justify-center gap-4 shadow-sm z-40">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-blue-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
          </svg>
          Skriv ut / Spara PDF
        </button>
        <button
          onClick={resetForm}
          className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-full font-semibold transition-all border border-gray-300 flex items-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          Rensa fält
        </button>
      </div>

      <div className="print-container paper max-w-[800px] mx-auto bg-white shadow-xl my-8 p-10 md:p-16 border border-gray-200 rounded-sm">
        <form onSubmit={(e) => e.preventDefault()}>
          <header className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Officiell Blankett</p>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Beslut om ändring/rättelse av satt betyg</h1>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <span className="font-semibold">Danderyds kommun –</span>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleInputChange}
                placeholder="[Skolans namn]"
                className="w-48 text-center border-b border-gray-300 focus:border-blue-500 outline-none transition-colors font-semibold"
              />
            </div>
          </header>

          <section className="mb-10">
            <div className="section-label border-b-2 border-gray-800 pb-1 mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">1. Elevuppgifter</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-400 uppercase">Elev</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="Namn eller Elev-ID"
                  className="w-full border-b border-gray-300 py-1 outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-400 uppercase">Klass</label>
                <input
                  type="text"
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={handleInputChange}
                  placeholder="Fyll i klass"
                  className="w-full border-b border-gray-300 py-1 outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-400 uppercase">Kurs / Ämne</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Fyll i ämne"
                  className="w-full border-b border-gray-300 py-1 outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-400 uppercase">Datum för ursprungligt betyg</label>
                <input
                  type="date"
                  name="originalDate"
                  value={formData.originalDate}
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-300 py-1 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          <section className="mb-10">
            <div className="section-label border-b-2 border-gray-800 pb-1 mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">2. Typ av ändring</div>
            <div className="space-y-4">
              <label className="flex items-start gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  name="isCorrection"
                  checked={formData.isCorrection}
                  onChange={handleInputChange}
                  className="w-5 h-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="text-sm">
                  <span className="font-bold text-gray-800">Rättelse av skrivfel</span>
                  <p className="text-gray-500 italic text-xs">(Skollagen 26 kap. 39 §)</p>
                </div>
              </label>
              <label className="flex items-start gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  name="isChange"
                  checked={formData.isChange}
                  onChange={handleInputChange}
                  className="w-5 h-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="text-sm">
                  <span className="font-bold text-gray-800">Ändring av betyg</span>
                  <p className="text-gray-500 italic text-xs">(Skollagen 26 kap. 40 §)</p>
                </div>
              </label>
            </div>
          </section>

          <section className="mb-10">
            <div className="section-label border-b-2 border-gray-800 pb-1 mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">3. Motivering</div>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              rows={6}
              placeholder="Beskriv omständigheterna och hänvisa till underlag..."
              className="w-full border-b border-gray-300 p-2 text-sm outline-none focus:border-blue-500 resize-none leading-relaxed bg-gray-50/50"
            />
          </section>

          <section className="mb-12">
            <div className="section-label border-b-2 border-gray-800 pb-1 mb-6 text-sm font-bold uppercase tracking-wider text-gray-900">4. Beslutsunderlag</div>
            <div className="flex gap-16">
              <div className="flex items-center gap-4">
                <span className="font-bold text-sm text-gray-700 uppercase tracking-tight">Ursprungligt:</span>
                <input
                  type="text"
                  name="originalGrade"
                  value={formData.originalGrade}
                  onChange={handleInputChange}
                  className="w-16 h-12 text-2xl text-center font-bold border-2 border-gray-200 focus:border-blue-500 rounded outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-sm text-blue-700 uppercase tracking-tight">Nytt betyg:</span>
                <input
                  type="text"
                  name="newGrade"
                  value={formData.newGrade}
                  onChange={handleInputChange}
                  className="w-16 h-12 text-2xl text-center font-bold border-2 border-blue-600 text-blue-700 focus:bg-blue-50 rounded outline-none transition-all shadow-sm"
                />
              </div>
            </div>
          </section>

          <section>
            <div className="section-label border-b-2 border-gray-800 pb-1 mb-8 text-sm font-bold uppercase tracking-wider text-gray-900">5. Underskrifter</div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-16 mt-8">
              <div className="relative">
                <div className="border-t border-gray-900 pt-1">
                   <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Undervisande lärare</p>
                </div>
              </div>
              <div className="relative">
                <div className="border-t border-gray-900 pt-1">
                   <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Datum</p>
                </div>
              </div>
              <div className="relative">
                <div className="border-t border-gray-900 pt-1">
                   <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Rektor (Kännedom)</p>
                </div>
              </div>
              <div className="relative">
                <div className="border-t border-gray-900 pt-1">
                   <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Datum</p>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>

      <style>{`
        @media print {
          body {
            background: white !important;
          }
          .paper {
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            width: 100% !important;
            max-width: none !important;
          }
          input, textarea {
            background-color: transparent !important;
            border-bottom: 1px solid #333 !important;
          }
          textarea {
            border: 1px solid #eee !important;
            border-bottom: 1px solid #333 !important;
            min-height: 150px;
          }
          input[type="date"]::-webkit-calendar-picker-indicator {
            display: none !important;
          }
          .section-label {
            border-bottom: 2px solid black !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GradeChangeForm;
