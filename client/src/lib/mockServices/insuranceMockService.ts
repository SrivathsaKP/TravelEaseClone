import { InsurancePlan } from '../types';

// Insurance providers
const insuranceProviders = [
  'ICICI Lombard', 'Bajaj Allianz', 'HDFC ERGO', 'Reliance General', 'Tata AIG',
  'New India Assurance', 'Oriental Insurance', 'National Insurance', 'United India',
  'SBI General', 'Max Bupa', 'Cigna TTK', 'Star Health', 'Apollo Munich'
];

// Coverage types
const coverageTypes = [
  'Comprehensive Travel', 'Basic Travel', 'Medical Emergency', 'Trip Cancellation',
  'Baggage Loss', 'Flight Delay', 'Accident Coverage', 'Family Travel',
  'Business Travel', 'Student Travel', 'Senior Citizen', 'Adventure Sports'
];

// Benefits
const allBenefits = [
  'Medical Expenses Coverage', 'Emergency Medical Evacuation', 'Trip Cancellation',
  'Trip Interruption', 'Baggage Loss/Delay', 'Flight Delay', 'Accident Coverage',
  'Personal Liability', '24/7 Emergency Assistance', 'Pre-existing Conditions',
  'Adventure Sports Coverage', 'Family Coverage', 'Business Equipment',
  'Rental Car Coverage', 'Natural Disaster Coverage', 'Terrorism Coverage',
  'Political Evacuation', 'Pet Coverage', 'Sports Equipment', 'Electronics Coverage'
];

// Documents required
const documents = [
  'Passport Copy', 'Visa Copy', 'Travel Itinerary', 'Medical Certificate',
  'Bank Statement', 'Employment Letter', 'Student ID', 'Senior Citizen ID',
  'Business Registration', 'Travel History', 'Medical History', 'Emergency Contact'
];

// Generate random premium
const generatePremium = (coverageAmount: number, duration: number): number => {
  const baseRate = 0.02; // 2% base rate
  const durationMultiplier = duration / 30; // Monthly rate
  const coverageMultiplier = coverageAmount / 100000; // Per 1 lakh
  
  return Math.floor(baseRate * durationMultiplier * coverageMultiplier * (Math.random() * 0.5 + 0.75));
};

// Generate random coverage amount
const generateCoverageAmount = (): number => {
  const amounts = [50000, 100000, 200000, 500000, 1000000, 2000000, 5000000];
  return amounts[Math.floor(Math.random() * amounts.length)];
};

// Generate random duration
const generateDuration = (): number => {
  const durations = [7, 15, 30, 60, 90, 180, 365]; // days
  return durations[Math.floor(Math.random() * durations.length)];
};

// Generate eligible age range
const generateEligibleAge = (): { min: number; max: number } => {
  const ageRanges = [
    { min: 18, max: 65 },
    { min: 0, max: 70 },
    { min: 25, max: 60 },
    { min: 18, max: 75 },
    { min: 0, max: 80 },
    { min: 18, max: 85 }
  ];
  return ageRanges[Math.floor(Math.random() * ageRanges.length)];
};

// Generate insurance benefits
const generateBenefits = (coverageType: string): string[] => {
  const selectedBenefits = [];
  const availableBenefits = [...allBenefits];
  
  // Add coverage-specific benefits
  if (coverageType.includes('Medical')) {
    selectedBenefits.push('Medical Expenses Coverage', 'Emergency Medical Evacuation');
  }
  if (coverageType.includes('Trip')) {
    selectedBenefits.push('Trip Cancellation', 'Trip Interruption');
  }
  if (coverageType.includes('Baggage')) {
    selectedBenefits.push('Baggage Loss/Delay');
  }
  if (coverageType.includes('Flight')) {
    selectedBenefits.push('Flight Delay');
  }
  if (coverageType.includes('Family')) {
    selectedBenefits.push('Family Coverage');
  }
  if (coverageType.includes('Business')) {
    selectedBenefits.push('Business Equipment');
  }
  if (coverageType.includes('Adventure')) {
    selectedBenefits.push('Adventure Sports Coverage');
  }
  
  // Add 3-6 additional random benefits
  const count = Math.floor(Math.random() * 4) + 3;
  for (let i = 0; i < count && availableBenefits.length > 0; i++) {
    const index = Math.floor(Math.random() * availableBenefits.length);
    const benefit = availableBenefits.splice(index, 1)[0];
    if (!selectedBenefits.includes(benefit)) {
      selectedBenefits.push(benefit);
    }
  }
  
  return selectedBenefits;
};

// Generate required documents
const generateDocuments = (coverageType: string): string[] => {
  const selectedDocuments = [];
  const availableDocuments = [...documents];
  
  // Add coverage-specific documents
  if (coverageType.includes('Medical')) {
    selectedDocuments.push('Medical Certificate', 'Medical History');
  }
  if (coverageType.includes('Business')) {
    selectedDocuments.push('Business Registration', 'Employment Letter');
  }
  if (coverageType.includes('Student')) {
    selectedDocuments.push('Student ID');
  }
  if (coverageType.includes('Senior')) {
    selectedDocuments.push('Senior Citizen ID');
  }
  
  // Add common documents
  selectedDocuments.push('Passport Copy', 'Travel Itinerary', 'Emergency Contact');
  
  // Add 2-4 additional random documents
  const count = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < count && availableDocuments.length > 0; i++) {
    const index = Math.floor(Math.random() * availableDocuments.length);
    const document = availableDocuments.splice(index, 1)[0];
    if (!selectedDocuments.includes(document)) {
      selectedDocuments.push(document);
    }
  }
  
  return selectedDocuments;
};

// Generate insurance logo
const generateLogo = (provider: string): string => {
  return `${provider.toLowerCase().replace(/\s+/g, '-')}-logo.png`;
};

// Generate dynamic insurance plans
export const generateInsurancePlans = (
  coverageType: string = 'Comprehensive Travel',
  duration: number = 30,
  count: number = 10
): InsurancePlan[] => {
  const plans: InsurancePlan[] = [];
  
  for (let i = 0; i < count; i++) {
    const provider = insuranceProviders[Math.floor(Math.random() * insuranceProviders.length)];
    const planCoverageType = coverageType || coverageTypes[Math.floor(Math.random() * coverageTypes.length)];
    const planDuration = duration || generateDuration();
    const coverageAmount = generateCoverageAmount();
    const premium = generatePremium(coverageAmount, planDuration);
    const eligibleAge = generateEligibleAge();
    const benefits = generateBenefits(planCoverageType);
    const requiredDocuments = generateDocuments(planCoverageType);
    const rating = Math.floor(Math.random() * 2) + 3.5; // 3.5-5.0
    
    const plan: InsurancePlan = {
      id: `IN${String(i + 1).padStart(3, '0')}`,
      name: `${provider} ${planCoverageType} Insurance`,
      provider,
      logo: generateLogo(provider),
      coverageType: planCoverageType,
      description: `Comprehensive ${planCoverageType.toLowerCase()} insurance plan by ${provider} offering coverage up to ₹${(coverageAmount / 100000).toFixed(1)} lakhs for ${planDuration} days.`,
      benefits,
      premium,
      coverageAmount,
      duration: planDuration,
      eligibleAge,
      documents: requiredDocuments,
      rating
    };
    
    plans.push(plan);
  }
  
  return plans.sort((a, b) => a.premium - b.premium);
};

// Search insurance plans with dynamic generation
export const searchInsurancePlans = async (
  coverageType: string = 'Comprehensive Travel',
  duration: number = 30
): Promise<InsurancePlan[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  
  // Generate 10-15 insurance plans for the search
  const count = Math.floor(Math.random() * 6) + 10;
  return generateInsurancePlans(coverageType, duration, count);
};

// Get all insurance plans (for development)
export const getAllInsurancePlans = async (): Promise<InsurancePlan[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateInsurancePlans('Comprehensive Travel', 30, 15);
};

// Get insurance plan by ID
export const getInsurancePlanById = async (id: string): Promise<InsurancePlan | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const plans = generateInsurancePlans('Comprehensive Travel', 30, 20);
  return plans.find(plan => plan.id === id);
};

