import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, type Brand } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight } from 'lucide-react';

const BrandsSection = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await api.getBrands();
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (brands.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partner Brands</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We proudly partner with world-leading dental equipment manufacturers to bring you the highest quality products.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {brands.map((brand) => (
            <Link 
              key={brand.id} 
              to={`/products?brand=${brand.id}`}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-4 flex flex-col items-center justify-center min-h-[140px]">
                  {brand.image_url ? (
                    <img
                      src={brand.image_url}
                      alt={brand.name}
                      className="max-w-full max-h-16 object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-muted-foreground/50 group-hover:text-primary transition-colors">
                      {brand.name.charAt(0)}
                    </span>
                  )}
                  <p className="mt-3 text-sm font-medium text-center group-hover:text-primary transition-colors">
                    {brand.name}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/brands">
            <Button variant="outline" size="lg" className="group">
              View All Brands
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;