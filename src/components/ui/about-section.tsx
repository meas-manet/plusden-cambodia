import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, Phone, Mail } from "lucide-react";
import { api, type HomeContent } from "@/lib/api";
import dentalTeam from "@/assets/dental-team.jpg";

const AboutSection = () => {
  const [aboutContent, setAboutContent] = useState<HomeContent | null>(null);
  const [contactContent, setContactContent] = useState<HomeContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await api.getHomeContent();
        setAboutContent(data.find(c => c.section === 'about') || null);
        setContactContent(data.find(c => c.section === 'contact') || null);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  // Default values
  const aboutTitle = aboutContent?.title || "About PLUSDEN Cambodia";
  const aboutSubtitle = aboutContent?.subtitle || "Leading Dental Supplier Since 2010";
  const aboutDescription = aboutContent?.description || "PLUSDEN Cambodia is your trusted partner in dental excellence. We specialize in providing premium dental supplies, equipment, and instruments that meet the highest international standards. Our mission is to support dental professionals with innovative solutions that enhance patient care and practice efficiency.";

  const contactTitle = contactContent?.title || "Get in Touch";
  const contactDescription = contactContent?.description || "Ready to upgrade your dental practice? Contact our expert team today.";

  const stats = [
    { number: "10+", label: "Years Experience", description: "Serving dental professionals" },
    { number: "500+", label: "Products", description: "High-quality dental supplies" },
    { number: "200+", label: "Happy Clients", description: "Satisfied dental practices" },
    { number: "24/7", label: "Support", description: "Customer service available" }
  ];

  return (
    <section className="py-24" id="about">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {aboutTitle}
              </span>
            </div>

            <h2 className="text-4xl font-bold mb-6">
              {aboutSubtitle}
              <span className="text-primary block">Across Cambodia</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {aboutDescription}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">Comprehensive range of dental products from leading global manufacturers</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">Expert technical support and product training for dental teams</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">Fast and reliable delivery across all provinces in Cambodia</p>
              </div>
            </div>

            <Button size="lg" className="group">
              Learn More About Us
              <Users className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src={aboutContent?.image_url || dentalTeam}
                alt="Professional dental team at PLUSDEN Cambodia"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Stats Card */}
            <Card className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-primary">{stat.number}</div>
                      <div className="text-sm font-medium">{stat.label}</div>
                      <div className="text-xs text-muted-foreground">{stat.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-24" id="contact">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">{contactTitle}</h3>
            <p className="text-lg text-muted-foreground">
              {contactDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Visit Our Store</h4>
              <p className="text-muted-foreground text-sm">
                123 Dental Supply Street<br />
                Phnom Penh, Cambodia
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Call Us</h4>
              <p className="text-muted-foreground text-sm">
                +855 23 xxx xxx<br />
                +855 12 xxx xxx
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Email Us</h4>
              <p className="text-muted-foreground text-sm">
                info@plusden-cambodia.com<br />
                sales@plusden-cambodia.com
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Follow Us</h4>
              <p className="text-muted-foreground text-sm">
                Social Media<br />
                @PlusdenCambodia
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
