
import React from 'react';
import { InvestmentProject } from '../types';
import { Calendar, MapPin, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';

interface ProjectCardProps {
  project: InvestmentProject;
  isSelected: boolean;
  onSelect: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isSelected, onSelect }) => {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

  return (
    <div 
      onClick={onSelect}
      className={`relative cursor-pointer transition-all duration-300 rounded-2xl border-2 p-6 overflow-hidden ${
        isSelected ? 'border-blue-600 bg-blue-50/30 shadow-lg' : 'border-slate-200 bg-white hover:border-blue-300 shadow-sm'
      }`}
    >
      {isSelected && (
        <div className="absolute top-0 right-0 p-2 bg-blue-600 text-white rounded-bl-xl">
          <CheckCircle size={18} />
        </div>
      )}
      
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{project.name}</h3>
          <p className="text-sm text-blue-600 font-medium">{project.tagline}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-sm">{project.deliveryTime === 0 ? 'Entrega Inmediata' : `${project.deliveryTime} Meses`}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <DollarSign size={16} className="text-slate-400" />
            <span className="text-sm font-semibold">{formatCurrency(project.finalPrice)}</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500">
            <span>ROI Estimado</span>
            <span className="font-bold text-green-600">{project.rentalProjections.netROI}%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full">
            <div 
              className="bg-green-500 h-1.5 rounded-full" 
              style={{ width: `${Math.min(project.rentalProjections.netROI * 5, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500 mb-2 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1">
            {project.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-slate-100 text-[10px] rounded text-slate-600 font-medium">
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
