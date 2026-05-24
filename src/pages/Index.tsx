import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/ui/hero-section";
import ProductShowcase from "@/components/ui/product-showcase";
import BrandsSection from "@/components/ui/brands-section";
import AboutSection from "@/components/ui/about-section";
import Footer from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ProductShowcase />
        <BrandsSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
