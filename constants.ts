
import { InvestmentProject } from './types';

export const PROJECTS: InvestmentProject[] = [
  {
    id: 'london-cantera',
    name: 'London Cantera',
    tagline: 'Entrega Inmediata - Zona Premium',
    deliveryTime: 0,
    price: 3400000,
    discount: 350000,
    finalPrice: 3050000,
    area: 66.72,
    pricePerM2: 45713,
    description: 'Desarrollo de 28 departamentos exclusivos. Unidad de 1 recámara, 1.5 baños, totalmente equipado.',
    amenities: ['Equipamiento Total', 'Zona de Alta Plusvalía', 'Seguridad 24/7'],
    paymentPlan: {
      downPayment: 3050000,
      monthlyPayment: 0,
      totalMonths: 0,
      notes: 'De contado o cualquier tipo de crédito bancario.'
    },
    rentalProjections: {
      type: 'Fixed',
      monthlyIncome: 15000,
      netROI: 5.9
    },
    plusvalia: 20
  },
  {
    id: 'torre-zahara',
    name: 'Torre Zahara',
    tagline: 'Lujo Vertical y Amenidades Premium',
    deliveryTime: 42,
    price: 4650426,
    finalPrice: 4650426,
    area: 78.29,
    pricePerM2: 59400,
    description: 'Edificio de 35 niveles con más de 20 amenidades. Proyecto en preventa con plan de financiamiento flexible.',
    amenities: ['Alberca', 'Jacuzzi', 'Gym', 'Cancha de Pádel', 'Business Center', '15+ amenidades'],
    paymentPlan: {
      downPayment: 465042,
      monthlyPayment: 49826,
      totalMonths: 84,
      notes: '84 meses sin intereses. Al mes 42 se han pagado $2,577,733 incluyendo enganche.'
    },
    rentalProjections: {
      type: 'Airbnb',
      dailyRate: 2000,
      occupancyDays: 22,
      monthlyIncome: 44000, // (2000 * 22) before expenses
      netROI: 8.5
    },
    plusvalia: 15, // estimated
    resaleValue36m: 5600000
  },
  {
    id: 'independencia-loft',
    name: 'Independencia Loft',
    tagline: 'Alta Rentabilidad - Centro Histórico',
    deliveryTime: 12,
    price: 1818890,
    finalPrice: 1818890,
    area: 45,
    pricePerM2: 40419,
    description: 'El precio por m2 más competitivo de la zona. Ideal para inversionistas de rentas cortas.',
    amenities: ['Rooftop de 950m2', '15+ Amenidades', 'Cercanía al Centro Histórico'],
    paymentPlan: {
      downPayment: 145000,
      monthlyPayment: 31788,
      totalMonths: 19,
      annualPayment: 70000,
      notes: 'Saldo restante con crédito Infonavit/Bancario. Se paga solo con la renta.'
    },
    rentalProjections: {
      type: 'Airbnb',
      dailyRate: 1500,
      occupancyDays: 22,
      monthlyIncome: 33000,
      excessAfterCredit: 10000,
      netROI: 12.5 // Estimated based on cash excess
    },
    plusvalia: 18
  }
];
