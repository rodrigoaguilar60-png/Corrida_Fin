
export interface InvestmentProject {
  id: string;
  name: string;
  tagline: string;
  deliveryTime: number; // months
  price: number;
  discount?: number;
  finalPrice: number;
  area: number; // m2
  pricePerM2: number;
  description: string;
  amenities: string[];
  paymentPlan: {
    downPayment: number;
    monthlyPayment: number;
    totalMonths: number;
    annualPayment?: number;
    notes: string;
  };
  rentalProjections: {
    type: 'Fixed' | 'Airbnb';
    monthlyIncome: number;
    netROI: number;
    dailyRate?: number;
    occupancyDays?: number;
    excessAfterCredit?: number;
  };
  plusvalia: number; // percentage
  resaleValue36m?: number;
}

export interface ComparisonMetrics {
  totalInvestment: number;
  roi: number;
  deliveryMonths: number;
  cashFlow: number;
}
