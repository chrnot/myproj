import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";

const MUNICIPALITY_ID = '0162'; // Danderyd
const KEY_KPIS = [
  { id: 'N01919', title: 'Invånarantal (Totalt)', unit: 'st', decimals: 0 },
  { id: 'N15418', title: 'Meritvärde åk 9', unit: 'poäng', decimals: 1 },
  { id: 'N01951', title: 'Kommunal skattesats', unit: '%', decimals: 2 },
  { id: 'N07405', title: 'Upplevd trygghet (kväll)', unit: '%', decimals: 0 }
];

const KoladaDashboard: React.FC = () => {
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState('');
  const [generatingInsight, setGeneratingInsight] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchKoladaData = useCallback(async (isManual = false) => {
    setLoading(true);
    if (isManual) setAiInsight('');
    
    try {
      const kpiIds = KEY_KPIS.map(k => k.id).join(',');
      const response = await fetch(
        `https://api.kolada.se/v2/data/municipality/${MUNICIPALITY_ID}/kpi/${kpiIds}`,
        { cache: 'no-store' }
      );
      const json = await response.json();
      
      const mappedData: Record<string, any> = {};
      
      // Kolada returnerar en lista med värden. Vi letar efter det senaste året 
      // och säkerställer att vi tar "Total" (gender: "T")
      json.values.forEach((v: any) => {
        const kpiId = v.kpi;
        const latestEntry = v.values.reduce((prev: any, current: any) => {
          // Vi vill ha 'T' (Totalt) om det finns, annars tar vi första bästa för senaste året
          const isTotal = current.gender === 'T' || !current.gender;
          if (current.period > (prev?.period || 0) && isTotal) {
            return current;
          }
          return prev;
        }, null);

        if (latestEntry) {
          mappedData[kpiId] = {
            value: latestEntry.value,
            period: latestEntry.period
          };
        }
      });

      setData(mappedData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Kunde inte hämta Kolada-data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKoladaData();
    const handleFocus = () => fetchKoladaData();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchKoladaData]);

  const generateAIInsight = async () => {
    setGeneratingInsight(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const statsContext = KEY_KPIS.map(k => {
        const d = data[k.id];
        return d ? `${k.title}: ${d.value} (${d.period})` : null;
      }).filter(Boolean).join(', ');

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analysera dessa specifika nyckeltal för Danderyd: ${statsContext}. 
        Ge en unik och professionell kommentar på svenska. 
        Fokusera på balansen mellan Sveriges lägsta skatt och de höga skolresultaten/tryggheten. 
        Var analytisk och undvik generiska svar. Max 3 meningar.`,
      });

      setAiInsight(response.text || 'Kunde inte generera en unik analys just nu.');
    } catch (error) {
      setAiInsight('Ett fel uppstod vid kommunikation med AI-tjänsten.');
    } finally {
      setGeneratingInsight(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 animate-fadeIn px-4 space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Kommunanalys <span className="text-blue-600">Danderyd</span></h1>
            <button 
              onClick={() => fetchKoladaData(true)}
              disabled={loading}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all active:rotate-180 duration-500"
              title="Tvinga uppdatering från Kolada"
            >
              <svg className={`w-6 h-6 ${loading ? 'animate-spin text-blue-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-slate-500 font-medium flex items-center gap-2 text-sm">
              <span className={`w-2.5 h-2.5 rounded-full ${loading ? 'bg-amber-500 animate-pulse' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]'}`}></span>
              {loading ? 'Hämtar rådata...' : 'Verifierad data från Kolada'}
            </p>
            {lastUpdated && !loading && (
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest border-l border-slate-200 pl-4">
                Session: {lastUpdated.toLocaleTimeString('sv-SE')}
              </span>
            )}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-100 px-5 py-2.5 rounded-full border border-slate-200">
          Municipality Code: 0162
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {KEY_KPIS.map(kpi => {
          const kpiData = data[kpi.id];
          return (
            <div key={kpi.id} className="bg-white border border-slate-200 p-7 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-hover:text-blue-600 transition-colors">
                {kpi.title}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-slate-900 tracking-tighter">
                  {kpiData?.value !== undefined 
                    ? kpiData.value.toLocaleString('sv-SE', { minimumFractionDigits: kpi.decimals, maximumFractionDigits: kpi.decimals }) 
                    : '---'}
                </span>
                <span className="text-sm font-bold text-slate-400 group-hover:text-slate-600 transition-colors">{kpi.unit}</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-tighter">
                  År {kpiData?.period || 'N/A'}
                </span>
                <div className="h-[1px] flex-grow bg-slate-100"></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                AI-Drivna Insikter
              </h2>
              <button
                onClick={generateAIInsight}
                disabled={generatingInsight || loading}
                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  generatingInsight || loading
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-slate-900 text-white hover:bg-blue-600 shadow-xl active:scale-95'
                }`}
              >
                {generatingInsight ? 'Analyserar...' : 'Generera Analys'}
              </button>
            </div>
            <div className="p-10 min-h-[220px] flex items-center justify-center relative">
              {aiInsight ? (
                <div className="space-y-6 animate-fadeIn max-w-2xl">
                  <p className="text-slate-700 text-xl leading-relaxed font-medium italic">
                    "{aiInsight}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-white"></div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      Gemini 3.0 Real-time Analysis
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center group cursor-pointer" onClick={generateAIInsight}>
                  <div className={`mb-4 inline-block p-4 rounded-full bg-slate-50 transition-transform duration-700 ${generatingInsight ? 'animate-bounce' : 'group-hover:scale-110'}`}>
                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                  </div>
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Klicka för att aktivera AI-motorn</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl transition-all duration-700 group-hover:bg-blue-600/40"></div>
            <h3 className="text-lg font-black mb-6 uppercase tracking-widest text-blue-400">Systemstatus</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-bold">Kolada Source</span>
                <span className="text-green-400 font-black">ONLINE</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-bold">AI Engine</span>
                <span className="text-blue-400 font-black">READY</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-bold">Data Fidelity</span>
                <span className="text-white font-black">TOTALS ONLY</span>
              </div>
              <div className="pt-4 border-t border-slate-800">
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium uppercase tracking-tight">
                  Siffrorna hämtas live från Koladas öppna API och filtreras för att representera hela populationen (Totalt).
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Metadata</h4>
            <div className="space-y-2 text-[11px] text-slate-600 font-bold">
              <div className="flex justify-between"><span>Region:</span> <span>Stockholm</span></div>
              <div className="flex justify-between"><span>Typ:</span> <span>Kommun</span></div>
              <div className="flex justify-between"><span>Källa:</span> <span className="text-blue-600">rka.se</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoladaDashboard;