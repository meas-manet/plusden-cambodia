import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground">PLUSDEN</h3>
              <p className="text-sm text-muted-foreground font-medium">CAMBODIA</p>
            </div>
            <p className="text-muted-foreground">
              Leading provider of premium dental supplies and equipment in Cambodia. 
              Committed to excellence in dental care solutions.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="font-semibold">Products</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Dental Instruments</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sterilization Equipment</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Dental Materials</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Orthodontic Supplies</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Digital Equipment</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Our Team</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">News</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold">Stay Updated</h4>
            <p className="text-muted-foreground text-sm">
              Subscribe to our newsletter for the latest dental supply news and offers.
            </p>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-background"
              />
              <Button className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
            <div>
              <p className="font-medium">Address</p>
              <p className="text-muted-foreground text-sm">123 Dental Supply Street, Phnom Penh, Cambodia</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-primary flex-shrink-0" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-muted-foreground text-sm">+855 23 xxx xxx</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-primary flex-shrink-0" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground text-sm">info@plusden-cambodia.com</p>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © {currentYear} PLUSDEN Cambodia. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;