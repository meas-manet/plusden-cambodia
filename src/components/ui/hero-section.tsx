import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { api, type HeroSlide } from "@/lib/api";
import heroImage from "@/assets/hero-dental.jpg";
import dentalOffice from "@/assets/dental-office.jpg";
import dentalLab from "@/assets/dental-lab.jpg";
import dentalInstruments from "@/assets/dental-instruments.jpg";

// Fallback images for slides without custom images
const fallbackImages = [heroImage, dentalOffice, dentalLab, dentalInstruments];

const HeroSection = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await api.getHeroSlides();
        setSlides(data.filter(s => s.is_active));
      } catch (error) {
        console.error("Error fetching hero slides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlideIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Get current slide data
  const currentSlide = slides[currentSlideIndex];
  const title = currentSlide?.title || "Premium Dental Supplies";
  const subtitle = currentSlide?.subtitle || "Your Trusted Partner in Dental Excellence";
  const description =
    currentSlide?.description ||
    "PLUSDEN Cambodia provides premium dental equipment, supplies, and instruments to elevate your practice with cutting-edge technology and reliable quality.";
  const buttonText = currentSlide?.button_text || "Explore Products";
  const buttonLink = currentSlide?.button_link || "#products";

  // Get background image (use uploaded or fallback)
  const getSlideImage = (slide: HeroSlide | undefined, index: number) => {
    if (slide?.image_url) return slide.image_url;
    return fallbackImages[index % fallbackImages.length];
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-r from-background to-muted/30">
      {/* Background Images Carousel */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlideIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
          >
            <img src={getSlideImage(slide, index)} alt={slide.title} className="w-full h-full object-cover" />
          </div>
        ))}
        {/* Fallback for no slides */}
        {slides.length === 0 && (
          <div className="absolute inset-0">
            <img src={heroImage} alt="Dental supplies" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />

        {/* Carousel Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlideIndex ? "bg-primary scale-125 w-8" : "bg-foreground/30 hover:bg-foreground/50"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl">
          {/* Main Content */}
          <div className="space-y-6 mb-12 animate-fade-in" key={currentSlideIndex}>
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">{subtitle}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              {/* Professional */}
              <span className="block text-primary">{title}</span>
              {/* <span className="block text-muted-foreground text-3xl md:text-4xl font-normal mt-2">
                for Modern Practices
              </span> */}
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">{description}</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="group" asChild>
                <a href={buttonLink}>
                  {buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              {/* <Button variant="outline" size="lg">
                Contact Sales
              </Button> */}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Quality Assured</h3>
                <p className="text-sm text-muted-foreground">International standards</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Trusted Brand</h3>
                <p className="text-sm text-muted-foreground">10+ years experience</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">Nationwide shipping</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
