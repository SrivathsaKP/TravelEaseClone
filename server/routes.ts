import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { setupAuth, isAuthenticated } from "./replitAuth";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.log('Missing STRIPE_SECRET_KEY environment variable. Stripe payment features will be disabled.');
}

// Initialize Stripe if the API key is available
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" })
  : null;

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Auth middleware first
  await setupAuth(app);

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

  app.get('/api/search/flights', async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        source: z.string().optional(),
        destination: z.string().optional(),
        date: z.string().optional()
      });
      
      let source = 'DEL';
      let destination = 'BOM';
      let date = new Date().toISOString().split('T')[0];
      
      try {
        const parsed = schema.parse(req.query);
        if (parsed.source) source = parsed.source;
        if (parsed.destination) destination = parsed.destination;
        if (parsed.date) date = parsed.date;
      } catch (e) {
        console.warn("Using default search parameters");
      }
      
      const flights = await storage.searchFlights(source, destination, date);
      
      res.status(200).json({ success: true, data: flights });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to search flights' 
      });
    }
  });
  
  // Duplicate endpoint to fix routing issues
  app.get('/api/flights/search', async (req: Request, res: Response) => {
    try {
      // Get all flights for any search parameters for development
      const flights = await storage.getFlights();
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

  app.get('/api/search/hotels', async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        city: z.string().optional(),
        checkIn: z.string().optional(),
        checkOut: z.string().optional()
      });
      
      let city = 'Mumbai';
      let checkIn = new Date().toISOString().split('T')[0];
      let checkOut = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      try {
        const parsed = schema.parse(req.query);
        if (parsed.city) city = parsed.city;
        if (parsed.checkIn) checkIn = parsed.checkIn;
        if (parsed.checkOut) checkOut = parsed.checkOut;
      } catch (e) {
        console.warn("Using default search parameters");
      }
      
      const hotels = await storage.searchHotels(city, checkIn, checkOut);
      
      res.status(200).json({ success: true, data: hotels });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to search hotels' 
      });
    }
  });
  
  // Duplicate endpoint to fix routing issues
  app.get('/api/hotels/search', async (req: Request, res: Response) => {
    try {
      // Get all hotels for any search parameters for development
      const hotels = await storage.getHotels();
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
      // Get all buses for any search parameters for development
      const buses = await storage.getBuses();
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
      // Get all trains for any search parameters for development
      const trains = await storage.getTrains();
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

  app.get('/api/users/:userId/bookings', isAuthenticated, async (req: Request, res: Response) => {
    try {
      // Get user ID from authenticated user
      const userId = (req.user as any).claims.sub;
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
      // Get all cabs for any search parameters for development
      const cabs = await storage.getCabs();
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
      // Get all homestays for any search parameters for development
      const homestays = await storage.getHomestays();
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
      // Get all insurance plans for any search parameters for development
      const plans = await storage.getInsurancePlans();
      res.status(200).json({ success: true, data: plans });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to search insurance plans' 
      });
    }
  });

  // Add authentication endpoint for Replit Auth
  app.get('/api/auth/user', isAuthenticated, async (req: any, res: Response) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Stripe payment routes
  if (stripe) {
    // One-time payment endpoint
    app.post("/api/create-payment-intent", isAuthenticated, async (req: Request, res: Response) => {
      try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // Convert to cents
          currency: "usd",
        });
        res.json({ clientSecret: paymentIntent.client_secret });
      } catch (error: any) {
        res
          .status(500)
          .json({ message: "Error creating payment intent: " + error.message });
      }
    });

    // Subscription endpoint
    app.post('/api/get-or-create-subscription', isAuthenticated, async (req: any, res: Response) => {
      if (!req.isAuthenticated()) {
        return res.sendStatus(401);
      }

      const userId = req.user.claims.sub;
      let user = await storage.getUser(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.stripeSubscriptionId) {
        try {
          const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);

          res.send({
            subscriptionId: subscription.id,
            clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
          });
          return;
        } catch (error) {
          // Subscription may have been deleted in Stripe
          console.log("Failed to retrieve subscription:", error);
          // Continue to create a new one
        }
      }
      
      if (!user.email) {
        return res.status(400).json({ message: 'No user email on file' });
      }

      try {
        // If we don't have a Stripe customer ID yet, create one
        if (!user.stripeCustomerId) {
          const customer = await stripe.customers.create({
            email: user.email,
            name: user.firstName || "TravelEase User",
          });

          user = await storage.updateStripeCustomerId(userId, customer.id);
        }

        // Make sure we have a price ID
        if (!process.env.STRIPE_PRICE_ID) {
          return res.status(400).json({ message: "Missing STRIPE_PRICE_ID environment variable" });
        }

        // Create the subscription
        const subscription = await stripe.subscriptions.create({
          customer: user.stripeCustomerId!,
          items: [{
            price: process.env.STRIPE_PRICE_ID,
          }],
          payment_behavior: 'default_incomplete',
          expand: ['latest_invoice.payment_intent'],
        });

        // Update user with subscription ID
        await storage.updateUserStripeInfo(userId, {
          customerId: user.stripeCustomerId!, 
          subscriptionId: subscription.id
        });
    
        res.send({
          subscriptionId: subscription.id,
          clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
        });
      } catch (error: any) {
        return res.status(400).send({ error: { message: error.message } });
      }
    });
  }

  const httpServer = createServer(app);
  return httpServer;
}
