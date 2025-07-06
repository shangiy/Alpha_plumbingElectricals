import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Wrench, Home, Warehouse } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: <Lightbulb className="h-10 w-10 text-primary mb-4" />,
      title: 'Smart Lighting',
      description: 'We offer modern LED and artistic lighting that enhances beauty and cuts energy costs.',
    },
    {
      icon: <Wrench className="h-10 w-10 text-primary mb-4" />,
      title: 'Reliable Plumbing',
      description: 'From PPR to HDPE systems, our plumbing solutions are engineered for durability and performance.',
    },
    {
      icon: <Home className="h-10 w-10 text-primary mb-4" />,
      title: 'Home & Décor',
      description: 'Decorate your space with premium, modern designs tailored to your lifestyle.',
    },
    {
      icon: <Warehouse className="h-10 w-10 text-primary mb-4" />,
      title: 'Bulk Supplies',
      description: 'We cater to homeowners, builders, and institutions with wholesale packages and fast delivery.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative h-[50vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/elegant_background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
          <div className="container px-4">
            <h1 className="text-4xl font-bold font-headline md:text-6xl">Innovating Everyday Living</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl">
              Welcome to Alpha Electricals & Plumbing Ltd — where technology meets functionality to power your home and office's needs with excellence.
            </p>
          </div>
        </div>
      </section>
      
      {/* Main About Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <Image
                    src="/team.jpg"
                    alt="Alpha Team Working"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold font-headline text-primary">About Alpha Electricals & Plumbing Ltd</h2>
              <p className="text-muted-foreground">
                Founded with a vision to revolutionize home utility services, Alpha Electricals & Plumbing Ltd combines innovation with practical solutions in the fields of lighting, plumbing, décor, and construction essentials. Our commitment to quality and sustainability drives everything we do — from sourcing top-tier products to offering expert consultation and support.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-headline mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center bg-card hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-center">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Vision Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="space-y-6 md:order-last">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold font-headline text-primary">Our Mission</h2>
                <p className="text-muted-foreground">
                  To empower households and industries through reliable, innovative, and affordable electrical, plumbing, and décor solutions that improve daily life.
                </p>
              </div>
               <div className="space-y-2">
                <h2 className="text-3xl font-bold font-headline text-primary">Our Vision</h2>
                <p className="text-muted-foreground">
                  To be East Africa’s most trusted partner in smart home infrastructure and construction support.
                </p>
              </div>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg md:order-first">
                 <Image
                    src="/delivery teamVan.jpg"
                    alt="Delivery Van"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
