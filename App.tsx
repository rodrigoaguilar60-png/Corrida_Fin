
import React, { useState } from 'react';
import { PROJECTS } from './constants';
import { InvestmentProject } from './types';
import ProjectCard from './components/ProjectCard';
import FinancialSummary from './components/FinancialSummary';
import { 
  Building2, 
  Download, 
  Share2, 
  TrendingUp, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  CreditCard,
  Home
} from 'lucide-react';

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(PROJECTS[0].id);
  const [strategy, setStrategy] = useState<'single' | 'dual'>(selectedId === 'independencia-loft' ? 'dual' : 'single');

  const selectedProject = PROJECTS.find(p => p.id === selectedId)!;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (id === 'independencia-loft') setStrategy('dual');
    else setStrategy('single');
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(val);

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Printing initiated...');
    // Use a small delay to ensure UI state is stable before printing
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#fbfcfd] flex flex-col">
      {/* HEADER PROFESIONAL - NO PRINT */}
      <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-50 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-2.5 rounded-xl text-white">
            <Building2 size={24} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Real Estate Analytics</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Chihuahua Capital • 2025</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95 touch-manipulation"
          >
            <Download size={18} /> Exportar Reporte (PDF)
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
        {/* PRESENTACIÓN AL CLIENTE */}
        <section className="mb-12">
          <div className="flex items-center gap-2 text-blue-600 mb-2 font-bold text-sm uppercase tracking-wider">
            <Target size={16} />
            <span>Análisis Comparativo de Inversión</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Propuesta Estratégica <br/>Inmobiliaria
          </h2>
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-16 -mt-16"></div>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl relative z-10">
              Estimado cliente, presentamos este análisis detallado de tres verticales de inversión en Chihuahua. Cada opción ha sido seleccionada por su balance entre plusvalía, flujo de caja y accesibilidad financiera. 
            </p>
            <div className="mt-6 flex flex-wrap gap-8 text-sm">
              <div className="flex flex-col">
                <span className="text-slate-400 font-bold uppercase text-[10px] mb-1">Ubicación</span>
                <span className="text-slate-800 font-bold">Chihuahua, Chih.</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 font-bold uppercase text-[10px] mb-1">Horizonte de Análisis</span>
                <span className="text-slate-800 font-bold">5 Años (60 Meses)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 font-bold uppercase text-[10px] mb-1">Estrategias</span>
                <span className="text-slate-800 font-bold">Renta Fija / Airbnb / Reventa</span>
              </div>
            </div>
          </div>
        </section>

        {/* SELECTOR DE PROYECTOS - NO PRINT */}
        <section className="no-print mb-12">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            Selecciona una opción para profundizar:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                isSelected={selectedId === project.id}
                onSelect={() => handleSelect(project.id)}
              />
            ))}
          </div>
        </section>

        {/* DETALLE DEL REPORTE */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 w-full">
               <FinancialSummary 
                 project={selectedProject} 
                 isDualInvestment={strategy === 'dual'} 
               />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print-break-inside-avoid">
            {/* PLAN FINANCIERO */}
            <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <CreditCard size={20} />
                </div>
                <h4 className="font-extrabold text-slate-900">Estructura Financiera</h4>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-sm">Valor Total</span>
                  <span className="font-bold text-slate-900">
                    {formatCurrency(strategy === 'dual' ? selectedProject.finalPrice * 2 : selectedProject.finalPrice)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-sm">Enganche Inicial</span>
                  <span className="font-bold text-blue-600">
                    {formatCurrency(strategy === 'dual' ? selectedProject.paymentPlan.downPayment * 2 : selectedProject.paymentPlan.downPayment)}
                  </span>
                </div>
                {/* Completed the payment plan details */}
                {selectedProject.paymentPlan.monthlyPayment > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-500 text-sm">Mensualidad</span>
                    <span className="font-bold text-slate-900">
                      {formatCurrency(strategy === 'dual' ? selectedProject.paymentPlan.monthlyPayment * 2 : selectedProject.paymentPlan.monthlyPayment)}
                    </span>
                  </div>
                )}
                {selectedProject.paymentPlan.totalMonths > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-500 text-sm">Plazo</span>
                    <span className="font-bold text-slate-900">{selectedProject.paymentPlan.totalMonths} Meses</span>
                  </div>
                )}
                <div className="mt-6 p-4 bg-slate-50 rounded-2xl">
                  <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                    <Info size={14} className="inline mr-1 mb-1 text-slate-400" />
                    {selectedProject.paymentPlan.notes}
                  </p>
                </div>
              </div>
            </div>

            {/* ESTRATEGIA DE RENTABILIDAD */}
            <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <TrendingUp size={20} />
                </div>
                <h4 className="font-extrabold text-slate-900">Proyección de Rentas</h4>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-sm">Tipo de Renta</span>
                  <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase rounded-full">
                    {selectedProject.rentalProjections.type}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-sm">Ingreso Mensual</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(strategy === 'dual' ? selectedProject.rentalProjections.monthlyIncome * 2 : selectedProject.rentalProjections.monthlyIncome)}
                  </span>
                </div>
                {selectedProject.rentalProjections.excessAfterCredit && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-500 text-sm">Excedente Libre</span>
                    <span className="font-bold text-blue-600">
                      {formatCurrency(strategy === 'dual' ? selectedProject.rentalProjections.excessAfterCredit * 2 : selectedProject.rentalProjections.excessAfterCredit)}
                    </span>
                  </div>
                )}
                <div className="mt-6">
                   <div className="flex items-center gap-2 mb-2">
                     <CheckCircle2 size={16} className="text-green-500" />
                     <span className="text-sm font-bold text-slate-700">Puntos Clave</span>
                   </div>
                   <ul className="space-y-2">
                     {selectedProject.amenities.map((amenity, idx) => (
                       <li key={idx} className="text-xs text-slate-500 flex items-start gap-2">
                         <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0"></span>
                         {amenity}
                       </li>
                     ))}
                   </ul>
                </div>
              </div>
            </div>

            {/* PLUSVALÍA Y RESUMEN */}
            <div className="lg:col-span-1 bg-slate-900 text-white rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/10 text-white rounded-lg">
                  <Home size={20} />
                </div>
                <h4 className="font-extrabold">Visión Patrimonial</h4>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase mb-2 tracking-wider">Crecimiento Anual</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black">{selectedProject.plusvalia}%</span>
                    <span className="text-green-400 text-xs font-bold flex items-center gap-1">
                      <TrendingUp size={12} /> Compuesto
                    </span>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/10">
                  <p className="text-slate-400 text-xs font-bold uppercase mb-3 tracking-wider">Recomendación Estratégica</p>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {selectedId === 'torre-zahara' 
                      ? 'Ideal para consolidación patrimonial a largo plazo. Las amenidades premium garantizan una demanda sostenida en Airbnb.'
                      : selectedId === 'independencia-loft'
                        ? 'La estrategia de dos unidades maximiza el flujo de caja inmediato, permitiendo que la inversión se pague sola.'
                        : 'Seguridad absoluta con entrega inmediata. Ideal para inversionistas que buscan flujo de efectivo sin riesgos de construcción.'}
                  </p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl mt-4">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Monto de Inversión Sugerido</p>
                  <p className="text-xl font-black text-white">
                    {formatCurrency(strategy === 'dual' ? selectedProject.finalPrice * 2 : selectedProject.finalPrice)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER - NO PRINT */}
      <footer className="no-print bg-slate-50 border-t border-slate-200 py-12 px-8 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50 grayscale">
            <div className="bg-slate-900 p-2 rounded-lg text-white">
              <Building2 size={20} />
            </div>
            <span className="font-bold text-slate-900">Real Estate Analytics</span>
          </div>
          <p className="text-slate-400 text-xs text-center max-w-md">
            Este documento es un análisis informativo basado en proyecciones actuales. Los rendimientos reales pueden variar según condiciones de mercado y gestión operativa.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
