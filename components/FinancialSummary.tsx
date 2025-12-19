
import React from 'react';
import { InvestmentProject } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface FinancialSummaryProps {
  project: InvestmentProject;
  isDualInvestment?: boolean;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ project, isDualInvestment = false }) => {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(val);

  // Moved multiplier here so it is accessible in the JSX below
  const multiplier = isDualInvestment ? 2 : 1;

  const getProjections = () => {
    const months = 60;
    const data = [];
    let cumulativeInvestment = 0;
    let cumulativeIncome = 0;

    for (let m = 0; m <= months; m += 6) {
      if (m === 0) {
        cumulativeInvestment = (project.paymentPlan.downPayment || 0) * multiplier;
      } else if (m <= project.paymentPlan.totalMonths) {
        cumulativeInvestment += (project.paymentPlan.monthlyPayment * 6) * multiplier;
        if (project.paymentPlan.annualPayment && m % 12 === 0) {
          cumulativeInvestment += project.paymentPlan.annualPayment * multiplier;
        }
      }

      if (m > project.deliveryTime) {
        const monthsOfRent = m - project.deliveryTime;
        if (project.rentalProjections.excessAfterCredit) {
           cumulativeIncome = (project.rentalProjections.excessAfterCredit * monthsOfRent) * multiplier;
        } else {
           const monthlyNet = (project.rentalProjections.netROI / 100 * project.finalPrice) / 12;
           cumulativeIncome = monthlyNet * monthsOfRent * multiplier;
        }
      }

      data.push({
        name: m === 0 ? 'Hoy' : `Mes ${m}`,
        Inversión: Math.round(cumulativeInvestment),
        Plusvalía: Math.round(project.finalPrice * multiplier * (1 + (project.plusvalia / 100) * (m / 12))),
        Utilidad: Math.round(cumulativeIncome)
      });
    }
    return data;
  };

  const data = getProjections();

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Análisis Proyectado</h2>
          <p className="text-slate-500 text-sm font-medium">Crecimiento patrimonial estimado a 5 años</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Rendimiento Neta</span>
            <span className="text-3xl font-black text-green-600">{project.rentalProjections.netROI}%</span>
          </div>
        </div>
      </div>

      <div className="h-[400px] w-full mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b', fontWeight: 600}} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fontSize: 11, fill: '#64748b', fontWeight: 600}}
              tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`}
            />
            <Tooltip 
              cursor={{fill: '#f8fafc'}}
              formatter={(val: number) => formatCurrency(val)}
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
            />
            <Legend verticalAlign="top" align="right" height={40} iconType="circle" />
            <Bar dataKey="Inversión" stackId="a" fill="#cbd5e1" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Plusvalía" stackId="a" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Utilidad" fill="#10b981" radius={[6, 6, 6, 6]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl">
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Costo m²</p>
          <p className="text-lg font-black text-slate-800">{formatCurrency(project.pricePerM2)}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl">
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Sup. Privativa</p>
          <p className="text-lg font-black text-slate-800">{project.area} m²</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl">
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Ingreso Anual</p>
          <p className="text-lg font-black text-slate-800">
            {formatCurrency(multiplier * project.rentalProjections.monthlyIncome * 12)}
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded-2xl">
          <p className="text-[10px] text-blue-500 font-bold uppercase mb-1">Plusvalía Anual</p>
          <p className="text-lg font-black text-blue-700">{project.plusvalia}%</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
