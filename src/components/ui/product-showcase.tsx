import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Loader2 } from "lucide-react";
import { api, type Product } from "@/lib/api";

// Category-specific images
import cbctSystem from "@/assets/products/cbct-system.jpg";
import dentalImplants from "@/assets/products/dental-implants.jpg";
import surgicalInstruments from "@/assets/products/surgical-instruments.jpg";
import regenerative from "@/assets/products/regenerative.jpg";
import intraoralScanner from "@/assets/products/intraoral-scanner.jpg";
import infectionControl from "@/assets/products/infection-control.jpg";
import dentalSupplies from "@/assets/dental-supplies.jpg";

// Map categories to their images
const categoryImages: Record<string, string> = {
  "Digital Imaging": cbctSystem,
  "Dental Implants": dentalImplants,
  "Surgical Instruments": surgicalInstruments,
  Regenerative: regenerative,
  "Digital Products": intraoralScanner,
  "Infection Control": infectionControl,
  Endodontics: dentalSupplies,
  "Patient Hygiene": dentalSupplies,
  "Small Equipment": dentalSupplies,
};

const getCategoryImage = (category: string, dbImage: string | null): string => {
  if (dbImage) return dbImage;
  return categoryImages[category] || dentalSupplies;
};

const getProductImage = (category: string | null, dbImage: string | null): string => {
  if (dbImage) return dbImage;
  if (category) return categoryImages[category] || dentalSupplies;
  return dentalSupplies;
};

interface CategoryData {
  category: string;
  count: number;
  image: string | null;
}

const ProductShowcase = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await api.getProducts();

        // Filter featured
        const featuredData = allProducts.filter(p => p.featured).slice(0, 6);

        // Group products by category
        const categoryMap = new Map<string, { count: number; image: string | null }>();
        allProducts.forEach((product) => {
          const cat = product.category || "Other";
          if (categoryMap.has(cat)) {
            categoryMap.get(cat)!.count++;
          } else {
            categoryMap.set(cat, { count: 1, image: product.image_url });
          }
        });

        const categoryData: CategoryData[] = Array.from(categoryMap.entries()).map(([category, data]) => ({
          category,
          count: data.count,
          image: data.image,
        }));

        setCategories(categoryData);
        setFeaturedProducts(featuredData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-24 bg-muted/30" id="products">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Product Categories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive dental solutions designed for modern practices and superior patient care
          </p>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="flex justify-center py-12 mb-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {categories.slice(0, 8).map((category, index) => (
              <Link key={index} to={`/products?category=${encodeURIComponent(category.category)}`}>
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-medium">
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                      <img
                        src={getCategoryImage(category.category, category.image)}
                        alt={category.category}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{category.category}</h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-medium text-sm">{category.count} Products</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground mb-20">No categories available</p>
        )}

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Featured Products</h3>
            <Link to="/products">
              <Button variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <Card className="group cursor-pointer transition-all duration-300 hover:shadow-medium h-full">
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="aspect-square overflow-hidden rounded-t-lg">
                          <img
                            src={getProductImage(product.category, product.image_url)}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        {product.badge && (
                          <Badge
                            className="absolute top-3 left-3"
                            variant={product.badge === "New" ? "default" : "secondary"}
                          >
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="p-6">
                        <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h4>
                        {product.description && (
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
                        )}
                        <div className="flex items-center justify-between">
                          {product.price > 0 ? (
                            <span className="text-2xl font-bold text-primary">${product.price}</span>
                          ) : (
                            <span className="text-sm text-muted-foreground">Contact for price</span>
                          )}
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No featured products available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
