import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // All API routes should be prefixed with /api
  const apiRouter = app.route('/api');

  // User routes
  app.post('/api/users/register', async (req: Request, res: Response) => {
    try {
      const user = await storage.createUser(req.body);
      res.status(201).json({ 
        success: true, 
        data: { ...user, password: undefined } 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to create user' 
      });
    }
  });

  app.post('/api/users/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid credentials' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        data: { ...user, password: undefined } 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to login' 
      });
    }
  });

  // Flight routes
  app.get('/api/flights', async (_req: Request, res: Response) => {
    try {
      const flights = await storage.getFlights();
      res.status(200).json({ success: true, data: flights });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get flights' 
      });
    }
  });

  app.get('/api/flights/:id', async (req: Request, res: Response) => {
    try {
      const flight = await storage.getFlightById(req.params.id);
      
      if (!flight) {
        return res.status(404).json({ 
          success: false, 
          message: 'Flight not found' 
        });
      }
      
      res.status(200).json({ success: true, data: flight });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get flight' 
      });
    }
  });

  app.get('/api/flights/search', async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        source: z.string(),
        destination: z.string(),
        date: z.string()
      });
      
      const { source, destination, date } = schema.parse(req.query);
      const flights = await storage.searchFlights(source, destination, date);
      
      res.status(200).json({ success: true, data: flights });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to search flights' 
      });
    }
  });

  // Hotel routes
  app.get('/api/hotels', async (_req: Request, res: Response) => {
    try {
      const hotels = await storage.getHotels();
      res.status(200).json({ success: true, data: hotels });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get hotels' 
      });
    }
  });

  app.get('/api/hotels/:id', async (req: Request, res: Response) => {
    try {
      const hotel = await storage.getHotelById(req.params.id);
      
      if (!hotel) {
        return res.status(404).json({ 
          success: false, 
          message: 'Hotel not found' 
        });
      }
      
      res.status(200).json({ success: true, data: hotel });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get hotel' 
      });
    }
  });

  app.get('/api/hotels/search', async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        city: z.string(),
        checkIn: z.string(),
        checkOut: z.string()
      });
      
      const { city, checkIn, checkOut } = schema.parse(req.query);
      const hotels = await storage.searchHotels(city, checkIn, checkOut);
      
      res.status(200).json({ success: true, data: hotels });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to search hotels' 
      });
    }
  });

  // Bus routes
  app.get('/api/buses', async (_req: Request, res: Response) => {
    try {
      const buses = await storage.getBuses();
      res.status(200).json({ success: true, data: buses });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get buses' 
      });
    }
  });

  app.get('/api/buses/:id', async (req: Request, res: Response) => {
    try {
      const bus = await storage.getBusById(req.params.id);
      
      if (!bus) {
        return res.status(404).json({ 
          success: false, 
          message: 'Bus not found' 
        });
      }
      
      res.status(200).json({ success: true, data: bus });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get bus' 
      });
    }
  });

  app.get('/api/buses/search', async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        source: z.string(),
        destination: z.string(),
        date: z.string()
      });
      
      const { source, destination, date } = schema.parse(req.query);
      const buses = await storage.searchBuses(source, destination, date);
      
      res.status(200).json({ success: true, data: buses });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to search buses' 
      });
    }
  });

  // Train routes
  app.get('/api/trains', async (_req: Request, res: Response) => {
    try {
      const trains = await storage.getTrains();
      res.status(200).json({ success: true, data: trains });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get trains' 
      });
    }
  });

  app.get('/api/trains/:id', async (req: Request, res: Response) => {
    try {
      const train = await storage.getTrainById(req.params.id);
      
      if (!train) {
        return res.status(404).json({ 
          success: false, 
          message: 'Train not found' 
        });
      }
      
      res.status(200).json({ success: true, data: train });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get train' 
      });
    }
  });

  app.get('/api/trains/search', async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        source: z.string(),
        destination: z.string(),
        date: z.string()
      });
      
      const { source, destination, date } = schema.parse(req.query);
      const trains = await storage.searchTrains(source, destination, date);
      
      res.status(200).json({ success: true, data: trains });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to search trains' 
      });
    }
  });

  // Booking routes
  app.post('/api/bookings', async (req: Request, res: Response) => {
    try {
      const booking = await storage.createBooking(req.body);
      res.status(201).json({ success: true, data: booking });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to create booking' 
      });
    }
  });

  app.get('/api/bookings/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const booking = await storage.getBookingById(id);
      
      if (!booking) {
        return res.status(404).json({ 
          success: false, 
          message: 'Booking not found' 
        });
      }
      
      res.status(200).json({ success: true, data: booking });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get booking' 
      });
    }
  });

  app.get('/api/users/:userId/bookings', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const bookings = await storage.getBookingsByUserId(userId);
      
      res.status(200).json({ success: true, data: bookings });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get user bookings' 
      });
    }
  });

  // Cab routes
  app.get('/api/cabs', async (_req: Request, res: Response) => {
    try {
      const cabs = await storage.getCabs();
      res.status(200).json({ success: true, data: cabs });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get cabs' 
      });
    }
  });

  app.get('/api/cabs/:id', async (req: Request, res: Response) => {
    try {
      const cab = await storage.getCabById(req.params.id);
      
      if (!cab) {
        return res.status(404).json({ 
          success: false, 
          message: 'Cab not found' 
        });
      }
      
      res.status(200).json({ success: true, data: cab });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get cab' 
      });
    }
  });

  app.get('/api/cabs/search', async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        city: z.string(),
        date: z.string().optional(),
        vehicleType: z.string().optional()
      });
      
      const { city, date, vehicleType } = schema.parse(req.query);
      const cabs = await storage.searchCabs(city, date || new Date().toISOString(), vehicleType);
      
      res.status(200).json({ success: true, data: cabs });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to search cabs' 
      });
    }
  });

  // Homestay routes
  app.get('/api/homestays', async (_req: Request, res: Response) => {
    try {
      const homestays = await storage.getHomestays();
      res.status(200).json({ success: true, data: homestays });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get homestays' 
      });
    }
  });

  app.get('/api/homestays/:id', async (req: Request, res: Response) => {
    try {
      const homestay = await storage.getHomestayById(req.params.id);
      
      if (!homestay) {
        return res.status(404).json({ 
          success: false, 
          message: 'Homestay not found' 
        });
      }
      
      res.status(200).json({ success: true, data: homestay });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get homestay' 
      });
    }
  });

  app.get('/api/homestays/search', async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        location: z.string(),
        checkIn: z.string(),
        checkOut: z.string(),
        guests: z.string().optional().transform(val => val ? parseInt(val) : undefined)
      });
      
      const { location, checkIn, checkOut, guests } = schema.parse(req.query);
      const homestays = await storage.searchHomestays(location, checkIn, checkOut, guests);
      
      res.status(200).json({ success: true, data: homestays });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to search homestays' 
      });
    }
  });

  // Insurance routes
  app.get('/api/insurance-plans', async (_req: Request, res: Response) => {
    try {
      const plans = await storage.getInsurancePlans();
      res.status(200).json({ success: true, data: plans });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get insurance plans' 
      });
    }
  });

  app.get('/api/insurance-plans/:id', async (req: Request, res: Response) => {
    try {
      const plan = await storage.getInsurancePlanById(req.params.id);
      
      if (!plan) {
        return res.status(404).json({ 
          success: false, 
          message: 'Insurance plan not found' 
        });
      }
      
      res.status(200).json({ success: true, data: plan });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to get insurance plan' 
      });
    }
  });

  app.get('/api/insurance-plans/search', async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        coverageType: z.string(),
        duration: z.string().transform(val => parseInt(val))
      });
      
      const { coverageType, duration } = schema.parse(req.query);
      const plans = await storage.searchInsurancePlans(coverageType, duration);
      
      res.status(200).json({ success: true, data: plans });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to search insurance plans' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
