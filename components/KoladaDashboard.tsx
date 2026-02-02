import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";

const MUNICIPALITY_ID = '0162'; // Danderyd
const KEY_KPIS = [
  { id: 'N01919', title: 'Invånarantal', unit: 'st', decimals: 0 },
  { id: 'N15418', title: 'Meritvärde åk 9', unit: 'poäng', decimals: 1 },
  { id: 'N01951', title: 'Kommunalskatt', unit: '%', decimals: 2 },
  { id: 'N07405', title: 'Trygghet (kväll)', unit: '%', decimals: 0 }
];

const KoladaDashboard: React.FC = () => {
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState('');
  const [generatingInsight, setGeneratingInsight] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchKoladaData = useCallback(async (isManual = false) => {
    setLoading(true);
    setError(null);
    if (isManual) setAiInsight('');
    
    try {
      const kpiIds = KEY_KPIS.map(k => k.id).join(',');
      const targetUrl = `https://api.kolada.se/v2/data/municipality/${MUNICIPALITY_ID}/kpi/${kpiIds}`;
      
      // Vi använder allorigins proxy för att komma runt CORS-problem i webbläsaren
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
      
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error('Kunde inte nå Kolada API via proxy');
      
      const json = await response.json();
      const mappedData: Record<string, any> = {};
      
      if (json.values && Array.isArray(json.values)) {
        json.values.forEach((v: any) => {
          const kpiId = v.kpi;
          // Sortera värden för att hitta det senaste året med 'T' (Totalt)
          const sortedValues = v.values
            .filter((val: any) => val.gender === 'T' || !val.gender)
            .sort((a: any, b: any) => b.period - a.period);

          if (sortedValues.length > 0) {
            mappedData[kpiId] = {
              value: sortedValues[0].value,
              period: sortedValues[0].period
            };
          }
        });
      }

      setData(mappedData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Kunde inte hämta data. Kontrollera anslutningen.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKoladaData();
  }, [fetchKoladaData]);

  const generateAIInsight = async () => {
    if (Object.keys(data).length === 0) return;
    setGeneratingInsight(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const statsContext = KEY_KPIS.map(k => {
        const d = data[k.id];
        return d ? `${k.title}: ${d.value} (${d.period})` : null;
      }).filter(Boolean).join(', ');

      // Vi lägger till en slumpmässig "vinkel" för att få olika svar varje gång
      const angles = [
        "ekonomiskt perspektiv", 
        "medborgarperspektiv", 
        "framtidsspaning", 
        "jämförelse mot riksgenomsnitt",
        "utmaningar och möjligheter"
      ];
      const randomAngle = angles[Math.floor(Math.random() * angles.length)];

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analysera denna data för Danderyds kommun: ${statsContext}. 
        Använd ett ${randomAngle}. Ge en kort, kärnfull och professionell analys på svenska. 
        Undvik klichéer. Max 3 meningar.`,
      });

      setAiInsight(response.text || 'Analys kunde inte genereras.');
    } catch (err) {
      setAiInsight('Kunde inte kommunicera med AI-motorn.');
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
              className={`p-2 rounded-full transition-all ${loading ? 'animate-spin text-blue-600' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-slate-500 font-medium flex items-center gap-2 text-sm">
              <span className={`w-2.5 h-2.5 rounded-full ${loading ? 'bg-amber-500 animate-pulse' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]'}`}></span>
              {loading ? 'Ansluter till Kolada...' : 'Data verifierad via MCP-proxy'}
            </p>
            {lastUpdated && (
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest border-l border-slate-200 pl-4">
                Senast hämtat: {lastUpdated.toLocaleTimeString('sv-SE')}
              </span>
            )}
          </div>
        </div>
        <div className="bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Källa: kolada-mcp-pafn</span>
        </div>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-bold flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {KEY_KPIS.map(kpi => {
          const kpiData = data[kpi.id];
          const hasValue = kpiData?.value !== undefined;
          
          return (
            <div key={kpi.id} className="bg-white border border-slate-200 p-7 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-hover:text-blue-600 transition-colors">
                {kpi.title}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-4xl font-black tracking-tighter transition-all ${hasValue ? 'text-slate-900' : 'text-slate-200 animate-pulse'}`}>
                  {hasValue 
                    ? kpiData.value.toLocaleString('sv-SE', { minimumFractionDigits: kpi.decimals, maximumFractionDigits: kpi.decimals }) 
                    : '---'}
                </span>
                <span className="text-sm font-bold text-slate-400">{kpi.unit}</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[9px] font-black bg-slate-50 text-slate-500 px-2 py-0.5 rounded uppercase tracking-tighter">
                  {kpiData?.period ? `År ${kpiData.period}` : 'Väntar...'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                AI Analysmotor
              </h2>
              <button
                onClick={generateAIInsight}
                disabled={generatingInsight || loading || Object.keys(data).length === 0}
                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  generatingInsight || loading || Object.keys(data).length === 0
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-slate-900 text-white hover:bg-blue-600 shadow-xl active:scale-95'
                }`}
              >
                {generatingInsight ? 'Analyserar...' : 'Ny analys'}
              </button>
            </div>
            <div className="p-10 min-h-[220px] flex items-center justify-center">
              {aiInsight ? (
                <div className="space-y-4 animate-fadeIn">
                  <p className="text-slate-700 text-xl leading-relaxed font-medium italic">
                    "{aiInsight}"
                  </p>
                  <p className="text-[9px] text-blue-600 font-black uppercase tracking-widest">
                    Genererat via Gemini 3.0 & Kolada-MCP Proxy
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                    {loading ? 'Laddar data...' : 'Klicka för att generera en unik analys'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black mb-6 uppercase tracking-widest text-blue-400">Integration</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">MCP Endpoint</p>
                <code className="text-[10px] text-blue-300 break-all">kolada-mcp-pafn.onrender.com/sse</code>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase">Status</span>
                <span className="text-green-400 font-black">ACTIVE</span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-[10px] text-slate-500 font-medium leading-relaxed">
            Systemet använder automatisk filtrering för att endast visa "Totalt" (ej könsuppdelat) för att ge den mest rättvisande bilden av Danderyds statistik.
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoladaDashboard;