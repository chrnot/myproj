import React, { useState, useEffect } from 'react';

// Här kan du manuellt skriva in initialerna i 'bookedBy' när du får ett mail
// för att låsa tiden för alla besökare permanent.
// Exempel: { id: 1, ..., bookedBy: 'JA' }
const initialSlots = [
  { id: 1, date: '5 feb', time: '10.30-10.55', location: 'Aludden mötesparken', bookedBy: null },
  { id: 2, date: '5 feb', time: '11.00-11.25', location: 'Aludden mötesparken', bookedBy: null },
  { id: 3, date: '5 feb', time: '11.30-11.55', location: 'Aludden mötesparken', bookedBy: null },
  { id: 4, date: '11 feb', time: '10.30-10.55', location: 'Edsviken mötesparken', bookedBy: 'TY' },
  { id: 5, date: '11 feb', time: '11.00-11.25', location: 'Edsviken mötesparken', bookedBy: null },
  { id: 6, date: '11 feb', time: '11.30-11.55', location: 'Edsviken mötesparken', bookedBy: null },
];

const employees = ['JA', 'HI', 'AK', 'UL', 'TY', 'NA'];

const SalaryBooking: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [localBookings, setLocalBookings] = useState<Record<number, string>>({});

  // Ladda lokala bokningar från webbläsarens minne vid start
  useEffect(() => {
    const saved = localStorage.getItem('salary_bookings_2026');
    if (saved) {
      setLocalBookings(JSON.parse(saved));
    }
  }, []);

  const handleBooking = () => {
    if (!selectedEmployee || selectedSlotId === null) return;
    
    const slot = initialSlots.find(s => s.id === selectedSlotId);
    if (!slot) return;

    // Spara bokningen lokalt i denna webbläsare
    const newBookings = { ...localBookings, [selectedSlotId]: selectedEmployee };
    setLocalBookings(newBookings);
    localStorage.setItem('salary_bookings_2026', JSON.stringify(newBookings));

    // Skapa mail
    const subject = encodeURIComponent(`Bokning Lönesamtal 2026 - ${selectedEmployee}`);
    const body = encodeURIComponent(
      `Hej Christopher,\n\nJag (${selectedEmployee}) vill boka följande tid för lönesamtal:\n\nInitialer: ${selectedEmployee}\nDatum: ${slot.date}\nTid: ${slot.time}\nPlats: ${slot.location}\n\nMed vänlig hälsning,\n${selectedEmployee}`
    );
    
    window.location.href = `mailto:christopher.nottberg@danderyd.se?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fadeIn px-4">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="bg-blue-600 p-8 text-white text-center">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Lönesamtal 2026</h1>
          <p className="opacity-90 font-medium text-sm md:text-base">Välj dina initialer och en ledig tid i schemat nedan.</p>
        </div>

        <div className="p-6 md:p-10 space-y-12">
          {/* Steg 1: Val av initialer */}
          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-100">1</span>
              Vem bokar?
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {employees.map(initials => {
                // Kolla om personen redan har bokat något (lokalt eller hårdkodat)
                const alreadyBooked = Object.values(localBookings).includes(initials) || initialSlots.some(s => s.bookedBy === initials);
                
                return (
                  <button
                    key={initials}
                    onClick={() => setSelectedEmployee(initials)}
                    className={`py-4 px-2 rounded-2xl border-2 transition-all text-base font-black flex flex-col items-center justify-center gap-1 ${
                      selectedEmployee === initials 
                      ? 'border-blue-600 bg-blue-600 text-white shadow-md ring-4 ring-blue-50' 
                      : 'border-slate-100 hover:border-slate-200 text-slate-600 bg-slate-50/50'
                    } ${alreadyBooked ? 'opacity-50 ring-0' : ''}`}
                  >
                    {initials}
                    {alreadyBooked && <span className={`text-[8px] uppercase tracking-tighter ${selectedEmployee === initials ? 'text-blue-100' : 'text-blue-500'}`}>Bokat</span>}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Steg 2: Tidval */}
          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-100">2</span>
              Välj tid & plats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {initialSlots.map((slot) => {
                const bookedByName = slot.bookedBy || localBookings[slot.id];
                const isBooked = !!bookedByName;
                const isSelected = selectedSlotId === slot.id;

                return (
                  <button
                    key={slot.id}
                    disabled={isBooked}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
                      isBooked 
                        ? 'border-slate-100 bg-slate-50 cursor-not-allowed opacity-60' 
                        : isSelected
                        ? 'border-blue-600 bg-blue-50 shadow-md ring-4 ring-blue-50'
                        : 'border-slate-100 hover:border-blue-200 hover:bg-white bg-slate-50/30'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className={`text-xs font-bold uppercase tracking-wider mb-1 block ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>
                          {slot.date}
                        </span>
                        <span className={`text-xl font-black ${isBooked ? 'text-slate-400' : 'text-slate-900'}`}>
                          {slot.time}
                        </span>
                      </div>
                      {isBooked ? (
                        <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-tight">
                          Uppbokad
                        </span>
                      ) : isSelected ? (
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                      ) : null}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <svg className={`w-4 h-4 ${isSelected ? 'text-blue-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span className={isBooked ? 'text-slate-400' : 'text-slate-600 font-medium'}>
                        {slot.location}
                      </span>
                    </div>

                    {isBooked && (
                      <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">Bokad av {bookedByName}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Info & Footer */}
          <div className="pt-8 space-y-6">
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-4">
              <div className="text-amber-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="text-sm">
                <h3 className="font-bold text-amber-900 mb-1 text-base">Annan tid eller plats?</h3>
                <p className="text-amber-800 leading-relaxed">
                  Önskar ni annan tid eller plats kontakta Christopher. Sista dag för samtal är <span className="font-bold underline">20 februari</span>.
                </p>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={!selectedEmployee || selectedSlotId === null}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${
                !selectedEmployee || selectedSlotId === null
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-[1.01] active:scale-[0.99] shadow-blue-200'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              SKICKA BOKNINGSMAIL
            </button>
            
            <p className="text-center text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">
              Initialerna används för att bekräfta din identitet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryBooking;