import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, type Brand, type Product } from '@/lib/api';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Package, ArrowRight } from 'lucide-react';

export default function Brands() {
  const [searchParams] = useSearchParams();
  const brandId = searchParams.get('brand');

  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const [brandsData, productsData] = await Promise.all([
          api.getBrands(),
          api.getProducts(),
        ]);

        const brandCounts: Record<string, number> = {};
        productsData.forEach(p => {
          if (p.brand_id) {
            brandCounts[p.brand_id] = (brandCounts[p.brand_id] || 0) + 1;
          }
        });

        const brandsWithCount = brandsData.map(brand => ({
          ...brand,
          product_count: brandCounts[brand.id] || 0
        }));

        setBrands(brandsWithCount);
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    if (brandId) {
      const fetchBrandProducts = async () => {
        setLoading(true);
        try {
          const [brandData, productsData] = await Promise.all([
            api.getBrand(brandId),
            api.getProducts(),
          ]);

          setSelectedBrand(brandData);
          setProducts(productsData.filter(p => p.brand_id === brandId));
        } catch (error) {
          console.error('Error fetching brand products:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchBrandProducts();
    } else {
      setSelectedBrand(null);
      setProducts([]);
    }
  }, [brandId]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container">
            {selectedBrand ? (
              <>
                <Link to="/brands" className="text-primary hover:underline mb-4 inline-block">
                  ← Back to All Brands
                </Link>
                <div className="flex items-center gap-6 mt-4">
                  {selectedBrand.image_url && (
                    <img
                      src={selectedBrand.image_url}
                      alt={selectedBrand.name}
                      className="w-24 h-24 object-contain bg-white rounded-lg p-2 shadow"
                    />
                  )}
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">{selectedBrand.name}</h1>
                    {selectedBrand.description && (
                      <p className="text-lg text-muted-foreground max-w-2xl">
                        {selectedBrand.description}
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Brands</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  We partner with world-leading dental equipment manufacturers to bring you the best quality products.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : selectedBrand ? (
              /* Products Grid for Selected Brand */
              products.length === 0 ? (
                <div className="text-center py-20">
                  <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No products found</h2>
                  <p className="text-muted-foreground">This brand doesn't have any products yet.</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-6">
                    Showing {products.length} product{products.length !== 1 ? 's' : ''}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <Link key={product.id} to={`/products/${product.id}`}>
                        <Card className="group h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
                          <div className="aspect-square relative overflow-hidden bg-muted">
                            {product.image_url ? (
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="h-16 w-16 text-muted-foreground/50" />
                              </div>
                            )}
                            {product.badge && (
                              <Badge className="absolute top-3 left-3">{product.badge}</Badge>
                            )}
                          </div>
                          <CardContent className="p-4">
                            {product.category && (
                              <p className="text-xs text-primary font-medium mb-1">{product.category}</p>
                            )}
                            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                            {product.description && (
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {product.description}
                              </p>
                            )}
                            {product.price > 0 && (
                              <p className="text-lg font-bold text-primary mt-3">
                                ${product.price.toFixed(2)}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </>
              )
            ) : (
              /* Brands Grid */
              brands.length === 0 ? (
                <div className="text-center py-20">
                  <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No brands found</h2>
                  <p className="text-muted-foreground">Check back soon for our brand partners.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {brands.map((brand) => (
                    <Link key={brand.id} to={`/brands?brand=${brand.id}`}>
                      <Card className="group h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <div className="aspect-video relative overflow-hidden bg-muted flex items-center justify-center p-6">
                          {brand.image_url ? (
                            <img
                              src={brand.image_url}
                              alt={brand.name}
                              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-3xl font-bold text-muted-foreground/30">
                                {brand.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold group-hover:text-primary transition-colors">
                                {brand.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {brand.product_count} product{brand.product_count !== 1 ? 's' : ''}
                              </p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                          {brand.description && (
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {brand.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}