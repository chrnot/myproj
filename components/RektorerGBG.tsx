import React from 'react';

const RektorerGBG: React.FC = () => {
  const days = [
    {
      date: 'Måndag 16 mars',
      theme: 'Resa & Ankomst',
      // Abstrakt bild av rörelse/strategi (Ledarskap i rörelse)
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
      events: [
        { time: '14:09', title: 'Tåg mot Göteborg', desc: 'Avgång från Stockholms Centralstation.', icon: '🚂' },
        { time: '17:42', title: 'Ankomst Göteborg', desc: 'Incheckning på Clarion Hotel Post (Drottningtorget 10).', icon: '🏨', link: 'https://www.google.com/maps/search/?api=1&query=Clarion+Hotel+Post+Göteborg' },
        { time: '19:30', title: 'Middag på Gurras', desc: 'Bokat av Petra. Postgatan 16. Moderna smaker i högt tempo.', icon: '🍽️', link: 'https://gurras.se/' }
      ]
    },
    {
      date: 'Tisdag 17 mars',
      theme: 'Studiebesök & Nätverkande',
      // Bild på professionellt samarbete/workshop
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
      events: [
        { time: '08:00', title: 'Frukost', desc: 'Frukostbuffé på hotellet.', icon: '☕' },
        { time: 'Förmiddag', title: 'Hvidfeldtska Gymnasiet', desc: 'Studiebesök. Kontakt: Helena Franke.', icon: '🏫', link: 'https://www.google.com/maps/search/?api=1&query=Hvidfeldtska+gymnasiet' },
        { time: 'Mellan', title: 'Fika: Da Matteo', desc: 'Diskussion och kaffe på Magasinsgatan 17A.', icon: '🥐', link: 'https://www.google.com/maps/search/?api=1&query=Da+Matteo+Magasinsgatan' },
        { time: 'Lunch', title: 'Sopplunch: Berzelii Choklad', desc: 'Magasinsgatan 12. Alternativ: Wijkanders vid NCM.', icon: '🥣', link: 'https://www.google.com/maps/search/?api=1&query=Berzelii+Choklad+Göteborg' },
        { time: 'Eftermiddag', title: 'Mathivation', desc: 'Västsvenska Handelskammaren, Parkgatan 49. Möte med Raja.', icon: '📐', link: 'https://www.google.com/maps/search/?api=1&query=Parkgatan+49+Göteborg' },
        { time: '19:15', title: 'Middag på Levantine', desc: 'Aschebergsgatan 22. Fransk New York Bistro.', icon: '🍷', link: 'https://www.google.com/maps/search/?api=1&query=Levantine+Göteborg' }
      ]
    },
    {
      date: 'Onsdag 18 mars',
      theme: 'Matematik & Kultur',
      // Matematik-fokus: Abstrakt bild med ekvationer/geometri
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200',
      events: [
        { time: '08:30-09:30', title: 'Eget arbete/Avstämning', desc: 'Uppföljning på hotellet.', icon: '📝' },
        { time: '10:00-12:00', title: 'NCM Matematikverkstad', desc: 'Cecilia Kilhamn tar emot oss. Vera Sandbergs Allé 5A.', icon: '🧮', link: 'https://ncm.gu.se/besok' },
        { time: 'Lunch', title: 'Lunch: Wijkanders', desc: 'Runt hörnet från NCM. Bra pris och kvalitet.', icon: '🥗', link: 'https://wijkanders.se/' },
        { time: '13:30-15:00', title: 'Kulturspaning', desc: 'Stadsmuseet, Konstmuseet eller Bröderi Borgskog.', icon: '🎨', link: 'https://www.google.com/maps/search/?api=1&query=Götaplatsen+Göteborg' },
        { time: '16:17', title: 'Tåg mot Stockholm', desc: 'Avgång Göteborg C. Middag köps med på tåget.', icon: '🚄' },
        { time: '19:44', title: 'Hemma', desc: 'Ankomst Stockholm Central.', icon: '🏠' }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 animate-fadeIn space-y-12">
      <header className="relative h-[32rem] rounded-[4rem] overflow-hidden shadow-2xl group border-4 border-white bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4000ms] ease-out opacity-80"
          alt="Visionärt ledarskap" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end p-12 text-white">
          <div className="flex items-center gap-3 mb-6">
             <span className="px-5 py-2 bg-blue-600 rounded-full text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl animate-pulse">Exklusiv Planering</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] mb-4">
            Rektorsgruppen <br/>
            <span className="text-blue-400">Göteborg 2026</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-6 mt-4">
            <p className="text-slate-200 font-bold uppercase tracking-[0.4em] text-[10px] border-l-2 border-blue-500 pl-4">
              Matematik, Pedagogik & Ledarskap
            </p>
            <div className="flex items-center gap-4 text-xs font-black text-blue-300 uppercase tracking-widest bg-white/5 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/10">
              <span>16 MAR — 18 MAR</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-12">
          {days.map((day, idx) => (
            <section key={idx} className="bg-white border border-slate-200 rounded-[3.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-1">
              <div className="relative h-56 overflow-hidden bg-slate-200">
                <img 
                  src={day.image} 
                  className="w-full h-full object-cover" 
                  alt={day.date}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 flex items-center px-12">
                  <div>
                    <h2 className="text-4xl font-black text-white tracking-tight drop-shadow-md">{day.date}</h2>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="h-1 w-8 bg-blue-500 rounded-full"></div>
                      <p className="text-blue-300 font-black uppercase tracking-[0.3em] text-[11px]">{day.theme}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-12 space-y-10">
                {day.events.map((event, eIdx) => (
                  <div key={eIdx} className="flex gap-10 group">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                        {event.icon}
                      </div>
                      {eIdx !== day.events.length - 1 && <div className="w-px flex-grow bg-slate-100 my-4"></div>}
                    </div>
                    <div className="flex-grow pb-10 border-b border-slate-50 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.25em] bg-blue-50 px-4 py-1.5 rounded-full">{event.time}</span>
                        {event.link && (
                          <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-[0.2em] flex items-center gap-2 group/link">
                            Visa Destination
                            <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </a>
                        )}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                      <p className="text-slate-500 text-lg leading-relaxed font-medium max-w-2xl">{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-950 rounded-[3.5rem] p-12 text-white shadow-2xl sticky top-28 border border-slate-800">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11 2v20c-5.07 0-9.22-3.9-9.95-8.91l-.05-.09h2.02c.7 3.91 4.09 6.91 8.13 7.09V11h8.79l.11-.05c-1.12-4.14-4.88-7.15-9.35-7.15V2z"></path>
              </svg>
            </div>
            
            <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-500 mb-12 text-center border-b border-white/5 pb-8">Reseinformation</h3>
            
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shadow-inner">🚂</div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Utresa — SJ 435</p>
                  <p className="text-xl font-black text-white">14:09 — 17:42</p>
                  <p className="text-xs text-blue-400 font-bold mt-1">Stockholm C → Gbg C</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shadow-inner">🏨</div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Huvudkvarter</p>
                  <p className="text-xl font-black text-white leading-tight">Clarion Hotel Post</p>
                  <p className="text-xs text-slate-400 mt-2 italic font-medium">Posthuset, Drottningtorget</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shadow-inner">🚄</div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Hemresa — SJ 444</p>
                  <p className="text-xl font-black text-white">16:17 — 19:44</p>
                  <p className="text-xs text-blue-400 font-bold mt-1">Gbg C → Stockholm C</p>
                </div>
              </div>

              <div className="pt-12 border-t border-white/5">
                <div className="bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-[2.5rem] p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em]">Agenda-fokus</p>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-4 leading-relaxed font-bold">
                    <li className="flex gap-3 items-start"><span className="text-blue-500">→</span> Strategisk matematikdidaktik</li>
                    <li className="flex gap-3 items-start"><span className="text-blue-500">→</span> Digital transformation i skolan</li>
                    <li className="flex gap-3 items-start"><span className="text-blue-500">→</span> Ledarskap genom inspiration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RektorerGBG;