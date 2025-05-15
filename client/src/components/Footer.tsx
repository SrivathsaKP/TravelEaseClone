import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Send
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-lg font-bold mb-4 heading">TravelEase</h3>
            <p className="text-sm text-neutral-400 mb-4">Your one-stop solution for all travel needs. Book flights, hotels, trains, and buses at the best prices.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-base font-bold mb-4 heading">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about"><a className="text-neutral-400 hover:text-primary">About Us</a></Link></li>
              <li><Link href="/careers"><a className="text-neutral-400 hover:text-primary">Careers</a></Link></li>
              <li><Link href="/press"><a className="text-neutral-400 hover:text-primary">Press</a></Link></li>
              <li><Link href="/partners"><a className="text-neutral-400 hover:text-primary">Partner With Us</a></Link></li>
              <li><Link href="/contact"><a className="text-neutral-400 hover:text-primary">Contact Us</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-bold mb-4 heading">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/support"><a className="text-neutral-400 hover:text-primary">Customer Support</a></Link></li>
              <li><Link href="/faq"><a className="text-neutral-400 hover:text-primary">FAQs</a></Link></li>
              <li><Link href="/guide"><a className="text-neutral-400 hover:text-primary">Booking Guide</a></Link></li>
              <li><Link href="/cancellation"><a className="text-neutral-400 hover:text-primary">Cancellation Policy</a></Link></li>
              <li><Link href="/privacy"><a className="text-neutral-400 hover:text-primary">Privacy Policy</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-bold mb-4 heading">Newsletter</h4>
            <p className="text-sm text-neutral-400 mb-4">Subscribe to our newsletter for travel deals and offers.</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="w-full text-sm border border-neutral-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-r-none"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-l-none rounded-r-lg" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-200 pt-6">
          <p className="text-center text-xs text-neutral-400">© {new Date().getFullYear()} TravelEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
