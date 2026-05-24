import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, type Product } from '@/lib/api';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ArrowLeft, Package, Phone, Mail, ChevronRight } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const data = await api.getProduct(id);
        setProduct(data);

        // Fetch related products from same category
        if (data?.category) {
          const all = await api.getProducts();
          const related = all.filter(p => p.category === data.category && p.id !== id).slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 flex flex-col items-center justify-center py-20">
          <Package className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container py-3">
            <nav className="flex items-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
              {product.category && (
                <>
                  <ChevronRight className="h-4 w-4 mx-2" />
                  <span className="hover:text-foreground transition-colors">{product.category}</span>
                </>
              )}
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-12">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted sticky top-24">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-32 w-32 text-muted-foreground/30" />
                    </div>
                  )}
                  {product.badge && (
                    <Badge className="absolute top-4 left-4 text-sm">{product.badge}</Badge>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {product.category && (
                  <Link 
                    to={`/products?category=${encodeURIComponent(product.category)}`}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    {product.category}
                  </Link>
                )}

                <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

                {product.price > 0 && (
                  <div className="text-3xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </div>
                )}

                {product.description && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Description</h3>
                    <div 
                      className="prose prose-gray max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                )}

                {product.spec && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Specifications</h3>
                    <div 
                      className="prose prose-gray max-w-none text-muted-foreground [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:bg-muted"
                      dangerouslySetInnerHTML={{ __html: product.spec }}
                    />
                  </div>
                )}

                {product.notes && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Notes</h3>
                    <div 
                      className="prose prose-gray max-w-none text-muted-foreground bg-muted/50 rounded-lg p-4"
                      dangerouslySetInnerHTML={{ __html: product.notes }}
                    />
                  </div>
                )}

                {/* Contact for Quote */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Interested in this product?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Contact us for pricing details and availability.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Us
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Inquiry
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Features */}
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="font-semibold">Why Choose PLUSDEN?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Genuine products from authorized distributors
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Technical support and training available
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Competitive pricing for dental professionals
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Fast delivery across Cambodia
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Related Products</h2>
                <Link to="/products">
                  <Button variant="outline" size="sm">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                  <Link key={item.id} to={`/products/${item.id}`}>
                    <Card className="group h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="aspect-square relative overflow-hidden bg-muted">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-12 w-12 text-muted-foreground/50" />
                          </div>
                        )}
                        {item.badge && (
                          <Badge className="absolute top-3 left-3">{item.badge}</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        {item.price > 0 && (
                          <p className="text-lg font-bold text-primary mt-2">
                            ${item.price.toFixed(2)}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
