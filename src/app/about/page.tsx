import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Wrench, Home, Warehouse, Linkedin, Twitter, Mail } from 'lucide-react';

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

  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Founder & CEO',
      bio: 'With over 20 years of experience in the industry, Alex leads the company with a vision for innovation and customer satisfaction.',
      image: 'https://placehold.co/400x400',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:alex.chen@example.com',
      },
      dataAiHint: 'man portrait',
    },
    {
      name: 'Samantha Rodriguez',
      role: 'Head of Plumbing Solutions',
      bio: 'Samantha is a master plumber and engineer, ensuring all our plumbing products meet the highest standards of quality and reliability.',
      image: 'https://placehold.co/400x400',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:samantha.r@example.com',
      },
      dataAiHint: 'woman portrait',
    },
    {
      name: 'Ben Carter',
      role: 'Chief Lighting Designer',
      bio: 'Ben combines artistry with technical expertise to create lighting solutions that are both beautiful and energy-efficient.',
      image: 'https://placehold.co/400x400',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:ben.carter@example.com',
      },
      dataAiHint: 'man portrait professional',
    },
     {
      name: 'Priya Patel',
      role: 'Customer Relations Manager',
      bio: 'Priya is dedicated to providing exceptional service and support, ensuring every customer has a positive experience with us.',
      image: 'https://placehold.co/400x400',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:priya.patel@example.com',
      },
      dataAiHint: 'woman portrait professional',
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
                    data-ai-hint="team work"
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
                    data-ai-hint="delivery van"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline text-primary">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                The driving force behind our success. A group of passionate professionals dedicated to excellence.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
                <Card key={member.name} className="text-center overflow-hidden hover:shadow-xl transition-shadow bg-card">
                <div className="aspect-square">
                    <Image
                        src={member.image}
                        alt={`Photo of ${member.name}`}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        data-ai-hint={member.dataAiHint}
                    />
                </div>
                <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <p className="text-primary font-semibold">{member.role}</p>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                    <div className="flex justify-center gap-4">
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <Twitter className="h-5 w-5" />
                    </a>
                    <a href={member.social.email} className="text-muted-foreground hover:text-primary">
                        <Mail className="h-5 w-5" />
                    </a>
                    </div>
                </CardContent>
                </Card>
            ))}
            </div>
        </div>
        </section>
    </>
  );
}
