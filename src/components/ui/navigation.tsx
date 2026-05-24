import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import plusdenLogo from "@/assets/plusden-logo.jpg";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/products");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={plusdenLogo} alt="PLUSDEN Cambodia - Plus Dental Supply" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
            Products
          </Link>
          <Link to="/brands" className="text-sm font-medium hover:text-primary transition-colors">
            Brands
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden md:flex" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            <Link to="/" className="block text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="block text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/brands" className="block text-sm font-medium hover:text-primary transition-colors">
              Brands
            </Link>
            <Link to="/about" className="block text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="block text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <div className="pt-4 border-t">
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => { setIsMenuOpen(false); handleSearch(); }}>
                <Search className="h-4 w-4 mr-2" />
                Search Products
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;