import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, type Product, type Brand } from '@/lib/api';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Filter, Package, Tag } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialBrand = searchParams.get('brand') || 'all';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, brandsData] = await Promise.all([
          api.getProducts(),
          api.getBrands(),
        ]);

        setProducts(productsData);
        setFilteredProducts(productsData);
        setBrands(brandsData);

        // Extract unique categories
        const uniqueCategories = [...new Set(productsData.map(p => p.category).filter(Boolean))] as string[];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by brand
    if (selectedBrand !== 'all') {
      result = result.filter(p => p.brand_id === selectedBrand);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(query) || 
             p.description?.toLowerCase().includes(query) ||
             p.category?.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, selectedBrand, searchQuery, products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params);
  };

  const handleBrandChange = (brandId: string) => {
    setSelectedBrand(brandId);
    const params = new URLSearchParams(searchParams);
    if (brandId === 'all') {
      params.delete('brand');
    } else {
      params.set('brand', brandId);
    }
    setSearchParams(params);
  };

  const selectedBrandName = brands.find(b => b.id === selectedBrand)?.name;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover our comprehensive range of premium dental equipment and supplies from world-leading manufacturers.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b bg-card sticky top-16 z-40">
          <div className="container py-4">
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Brand Filter */}
                {brands.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <Button
                      variant={selectedBrand === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleBrandChange('all')}
                    >
                      All Brands
                    </Button>
                    {brands.map((brand) => (
                      <Button
                        key={brand.id}
                        variant={selectedBrand === brand.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleBrandChange(brand.id)}
                      >
                        {brand.name}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange('all')}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No products found</h2>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                  {selectedBrandName && ` from ${selectedBrandName}`}
                  {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
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
                              {product.description.replace(/<[^>]*>/g, '')}
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
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
