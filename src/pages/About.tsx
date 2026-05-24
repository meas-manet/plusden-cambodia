import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Target, Heart } from "lucide-react";
import { api, type HomeContent } from "@/lib/api";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import dentalTeam from "@/assets/dental-team.jpg";
import dentalLab from "@/assets/dental-lab.jpg";

const About = () => {
  const [aboutContent, setAboutContent] = useState<HomeContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await api.getHomeContent();
        const found = data.find(c => c.section === 'about');
        if (found) setAboutContent(found);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  const aboutTitle = aboutContent?.title || "About PLUSDEN Cambodia";
  const aboutSubtitle = aboutContent?.subtitle || "Leading Dental Supplier Since 2010";
  const aboutDescription = aboutContent?.description || "PLUSDEN Cambodia is your trusted partner in dental excellence. We specialize in providing premium dental supplies, equipment, and instruments that meet the highest international standards. Our mission is to support dental professionals with innovative solutions that enhance patient care and practice efficiency.";

  const stats = [
    { number: "10+", label: "Years Experience", description: "Serving dental professionals" },
    { number: "500+", label: "Products", description: "High-quality dental supplies" },
    { number: "200+", label: "Happy Clients", description: "Satisfied dental practices" },
    { number: "24/7", label: "Support", description: "Customer service available" }
  ];

  const values = [
    { 
      icon: Award, 
      title: "Quality Excellence", 
      description: "We source only the finest dental products from reputable manufacturers worldwide." 
    },
    { 
      icon: Target, 
      title: "Customer Focus", 
      description: "Your success is our priority. We provide personalized solutions for every practice." 
    },
    { 
      icon: Heart, 
      title: "Passion for Dentistry", 
      description: "We are dedicated to advancing dental care through innovation and expertise." 
    },
    { 
      icon: Users, 
      title: "Expert Team", 
      description: "Our knowledgeable staff provides exceptional service and technical support." 
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary/5 via-background to-primary/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {aboutTitle}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-6">
                {aboutSubtitle}
                <span className="text-primary block mt-2">Across Cambodia</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {aboutDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg font-medium mb-1">{stat.label}</div>
                  <div className="text-sm opacity-80">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2010, PLUSDEN Cambodia began with a simple mission: to provide Cambodian dental professionals with access to world-class dental supplies and equipment.
                  </p>
                  <p>
                    Over the years, we have grown from a small local supplier to one of the leading dental supply companies in Cambodia, serving hundreds of dental practices, clinics, and hospitals across the country.
                  </p>
                  <p>
                    Our commitment to quality, reliability, and customer service has earned us the trust of dental professionals throughout Cambodia. We continue to expand our product range and services to meet the evolving needs of modern dentistry.
                  </p>
                </div>
                <Button size="lg" className="mt-8">
                  View Our Products
                  <Award className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={aboutContent?.image_url || dentalTeam}
                    alt="PLUSDEN Cambodia team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core values guide everything we do and shape our commitment to the dental community.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Facility */}
        <section className="py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={dentalLab}
                    alt="PLUSDEN Cambodia facility"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold mb-6">Our Facility</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our modern warehouse and showroom in Phnom Penh houses an extensive inventory of dental supplies, equipment, and instruments from the world's leading manufacturers.
                  </p>
                  <p>
                    We maintain strict quality control standards to ensure that every product we deliver meets the highest specifications for safety and performance.
                  </p>
                  <p>
                    Visit our showroom to explore our product range, receive hands-on demonstrations, and consult with our expert team about your practice needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
