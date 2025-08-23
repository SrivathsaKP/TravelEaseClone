import { Train } from '../types';

// Train types
const trainTypes = [
  'Superfast Express', 'Express', 'Passenger', 'Rajdhani Express', 'Shatabdi Express',
  'Duronto Express', 'Garib Rath', 'Jan Shatabdi', 'Sampark Kranti', 'Intercity Express'
];

// Train classes
const trainClasses = [
  { code: '1A', name: 'First AC', baseFare: 2000 },
  { code: '2A', name: 'Second AC', baseFare: 1200 },
  { code: '3A', name: 'Third AC', baseFare: 800 },
  { code: 'SL', name: 'Sleeper', baseFare: 300 },
  { code: 'CC', name: 'Chair Car', baseFare: 400 },
  { code: 'EC', name: 'Executive Chair Car', baseFare: 1500 }
];

// Cities with railway stations
const cities = [
  { name: 'Delhi', stations: ['New Delhi', 'Old Delhi', 'Hazrat Nizamuddin', 'Anand Vihar'] },
  { name: 'Mumbai', stations: ['Mumbai Central', 'Bandra Terminus', 'Lokmanya Tilak', 'Chhatrapati Shivaji'] },
  { name: 'Bangalore', stations: ['Bangalore City', 'Yesvantpur', 'Krishnarajapuram', 'Whitefield'] },
  { name: 'Hyderabad', stations: ['Secunderabad', 'Hyderabad Deccan', 'Kacheguda', 'Lingampalli'] },
  { name: 'Chennai', stations: ['Chennai Central', 'Chennai Egmore', 'Tambaram', 'Chengalpattu'] },
  { name: 'Kolkata', stations: ['Howrah', 'Sealdah', 'Kolkata', 'Santragachi'] },
  { name: 'Pune', stations: ['Pune Junction', 'Pune Station', 'Shivajinagar', 'Hadapsar'] },
  { name: 'Ahmedabad', stations: ['Ahmedabad Junction', 'Kalupur', 'Sabarmati', 'Gandhinagar'] },
  { name: 'Jaipur', stations: ['Jaipur Junction', 'Gandhinagar Jaipur', 'Durgapura', 'Sanganer'] },
  { name: 'Goa', stations: ['Madgaon', 'Thivim', 'Karmali', 'Vasco da Gama'] }
];

// Days of week
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Generate random train number
const generateTrainNumber = (): string => {
  return Math.floor(Math.random() * 99999) + 10000;
};

// Generate random train name
const generateTrainName = (source: string, destination: string): string => {
  const type = trainTypes[Math.floor(Math.random() * trainTypes.length)];
  return `${source} ${destination} ${type}`;
};

// Generate random time
const generateRandomTime = (date: string, isDeparture: boolean = true): string => {
  const baseDate = new Date(date);
  const hour = isDeparture ? Math.floor(Math.random() * 12) + 6 : Math.floor(Math.random() * 12) + 12;
  const minute = Math.floor(Math.random() * 60);
  baseDate.setHours(hour, minute, 0, 0);
  return baseDate.toISOString();
};

// Generate random duration between 2-24 hours
const generateDuration = (): number => {
  return Math.floor(Math.random() * 1320) + 120; // 2-24 hours in minutes
};

// Generate random distance
const generateDistance = (): number => {
  return Math.floor(Math.random() * 2000) + 200; // 200-2200 km
};

// Generate train classes with availability
const generateTrainClasses = (distance: number): any[] => {
  const classes = [];
  const selectedClasses = [...trainClasses];
  
  // Randomly select 3-5 classes
  const count = Math.floor(Math.random() * 3) + 3;
  
  for (let i = 0; i < count && selectedClasses.length > 0; i++) {
    const classIndex = Math.floor(Math.random() * selectedClasses.length);
    const trainClass = selectedClasses.splice(classIndex, 1)[0];
    
    const baseFare = Math.floor(distance * (trainClass.baseFare / 1000) * (Math.random() * 0.3 + 0.85));
    const available = Math.floor(Math.random() * 50) + 5;
    const waitlist = Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 1 : 0;
    
    classes.push({
      code: trainClass.code,
      name: trainClass.name,
      fare: baseFare,
      availability: {
        available,
        waitlist,
        status: waitlist > 0 ? `WL${waitlist}` : 'Available'
      }
    });
  }
  
  return classes;
};

// Generate days of operation
const generateDaysOfOperation = (): string[] => {
  const days = [...daysOfWeek];
  const selectedDays = [];
  const count = Math.floor(Math.random() * 3) + 5; // 5-7 days
  
  for (let i = 0; i < count && days.length > 0; i++) {
    const index = Math.floor(Math.random() * days.length);
    selectedDays.push(days.splice(index, 1)[0]);
  }
  
  return selectedDays;
};

// Generate dynamic trains
export const generateTrains = (
  source: string = 'Delhi',
  destination: string = 'Mumbai',
  date: string = new Date().toISOString().split('T')[0],
  count: number = 10
): Train[] => {
  const trains: Train[] = [];
  
  for (let i = 0; i < count; i++) {
    const trainNumber = generateTrainNumber();
    const trainName = generateTrainName(source, destination);
    const trainType = trainTypes[Math.floor(Math.random() * trainTypes.length)];
    
    const departureTime = generateRandomTime(date, true);
    const duration = generateDuration();
    const arrivalTime = new Date(departureTime);
    arrivalTime.setMinutes(arrivalTime.getMinutes() + duration);
    
    const distance = generateDistance();
    const classes = generateTrainClasses(distance);
    const daysOfOperation = generateDaysOfOperation();
    
    const sourceCity = cities.find(c => c.name === source);
    const destCity = cities.find(c => c.name === destination);
    
    const train: Train = {
      id: `TR${String(i + 1).padStart(3, '0')}`,
      trainNumber: trainNumber.toString(),
      name: trainName,
      type: trainType,
      source: {
        stationCode: source.substring(0, 2).toUpperCase(),
        stationName: sourceCity?.stations[0] || `${source} Junction`,
        city: source,
        departureTime
      },
      destination: {
        stationCode: destination.substring(0, 2).toUpperCase(),
        stationName: destCity?.stations[0] || `${destination} Junction`,
        city: destination,
        arrivalTime: arrivalTime.toISOString()
      },
      duration,
      distance,
      daysOfWeek: daysOfOperation,
      classes
    };
    
    trains.push(train);
  }
  
  return trains.sort((a, b) => {
    const aMinFare = Math.min(...a.classes.map(c => c.fare));
    const bMinFare = Math.min(...b.classes.map(c => c.fare));
    return aMinFare - bMinFare;
  });
};

// Search trains with dynamic generation
export const searchTrains = async (
  source: string = 'Delhi',
  destination: string = 'Mumbai',
  date: string = new Date().toISOString().split('T')[0]
): Promise<Train[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  
  // Generate 10-15 trains for the search
  const count = Math.floor(Math.random() * 6) + 10;
  return generateTrains(source, destination, date, count);
};

// Get all trains (for development)
export const getAllTrains = async (): Promise<Train[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateTrains('Delhi', 'Mumbai', new Date().toISOString().split('T')[0], 15);
};

// Get train by ID
export const getTrainById = async (id: string): Promise<Train | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const trains = generateTrains('Delhi', 'Mumbai', new Date().toISOString().split('T')[0], 20);
  return trains.find(train => train.id === id);
};

