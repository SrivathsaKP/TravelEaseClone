// Export all mock services
export * from './flightMockService';
export * from './hotelMockService';
export * from './busMockService';
export * from './trainMockService';
export * from './cabMockService';
export * from './homestayMockService';
export * from './insuranceMockService';

// Main mock service class for easy access
export class MockService {
  // Flight services
  static searchFlights = async (source: string = 'DEL', destination: string = 'BOM', date: string = new Date().toISOString().split('T')[0]) => {
    const { searchFlights } = await import('./flightMockService');
    return searchFlights(source, destination, date);
  };

  static getAllFlights = async () => {
    const { getAllFlights } = await import('./flightMockService');
    return getAllFlights();
  };

  static getFlightById = async (id: string) => {
    const { getFlightById } = await import('./flightMockService');
    return getFlightById(id);
  };

  // Hotel services
  static searchHotels = async (city: string = 'Mumbai', checkIn: string = new Date().toISOString().split('T')[0], checkOut: string = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]) => {
    const { searchHotels } = await import('./hotelMockService');
    return searchHotels(city, checkIn, checkOut);
  };

  static getAllHotels = async () => {
    const { getAllHotels } = await import('./hotelMockService');
    return getAllHotels();
  };

  static getHotelById = async (id: string) => {
    const { getHotelById } = await import('./hotelMockService');
    return getHotelById(id);
  };

  // Bus services
  static searchBuses = async (source: string = 'Delhi', destination: string = 'Mumbai', date: string = new Date().toISOString().split('T')[0]) => {
    const { searchBuses } = await import('./busMockService');
    return searchBuses(source, destination, date);
  };

  static getAllBuses = async () => {
    const { getAllBuses } = await import('./busMockService');
    return getAllBuses();
  };

  static getBusById = async (id: string) => {
    const { getBusById } = await import('./busMockService');
    return getBusById(id);
  };

  // Train services
  static searchTrains = async (source: string = 'Delhi', destination: string = 'Mumbai', date: string = new Date().toISOString().split('T')[0]) => {
    const { searchTrains } = await import('./trainMockService');
    return searchTrains(source, destination, date);
  };

  static getAllTrains = async () => {
    const { getAllTrains } = await import('./trainMockService');
    return getAllTrains();
  };

  static getTrainById = async (id: string) => {
    const { getTrainById } = await import('./trainMockService');
    return getTrainById(id);
  };

  // Cab services
  static searchCabs = async (city: string = 'Mumbai', pickupDate: string = new Date().toISOString().split('T')[0], vehicleType?: string) => {
    const { searchCabs } = await import('./cabMockService');
    return searchCabs(city, pickupDate, vehicleType);
  };

  static getAllCabs = async () => {
    const { getAllCabs } = await import('./cabMockService');
    return getAllCabs();
  };

  static getCabById = async (id: string) => {
    const { getCabById } = await import('./cabMockService');
    return getCabById(id);
  };

  // Homestay services
  static searchHomestays = async (location: string = 'Mumbai', checkIn: string = new Date().toISOString().split('T')[0], checkOut: string = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], guests?: number) => {
    const { searchHomestays } = await import('./homestayMockService');
    return searchHomestays(location, checkIn, checkOut, guests);
  };

  static getAllHomestays = async () => {
    const { getAllHomestays } = await import('./homestayMockService');
    return getAllHomestays();
  };

  static getHomestayById = async (id: string) => {
    const { getHomestayById } = await import('./homestayMockService');
    return getHomestayById(id);
  };

  // Insurance services
  static searchInsurancePlans = async (coverageType: string = 'Comprehensive Travel', duration: number = 30) => {
    const { searchInsurancePlans } = await import('./insuranceMockService');
    return searchInsurancePlans(coverageType, duration);
  };

  static getAllInsurancePlans = async () => {
    const { getAllInsurancePlans } = await import('./insuranceMockService');
    return getAllInsurancePlans();
  };

  static getInsurancePlanById = async (id: string) => {
    const { getInsurancePlanById } = await import('./insuranceMockService');
    return getInsurancePlanById(id);
  };
}

