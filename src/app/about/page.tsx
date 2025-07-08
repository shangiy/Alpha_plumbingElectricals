
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Wrench, Home, Warehouse, Twitter, Facebook, User } from 'lucide-react';

// Custom TikTok Icon Component
const TiktokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.85-.38-6.95-1.91-1.86-1.33-3.1-3.36-3.46-5.73-.03-.25-.05-.5-.07-.76.01-1.33.02-2.65.04-3.98.08-1.52.63-3.09 1.75-4.17 1.12-1.09 2.7-1.6 4.24-1.77v4.03c-1.44.05-2.89.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01-2.92-.01-5.84.02-8.75.08-1.39.54-2.79 1.35-3.94 1.31-1.92 3.58-3.17 5.91-3.21z"></path>
    </svg>
);


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
      name: 'Richard Kinyungu',
      role: 'Sales Manager',
      bio: 'Richard leads our sales team, driving business growth and ensuring customer satisfaction with his extensive experience.',
      socials: [
        { name: 'Facebook', href: 'https://www.facebook.com/Alphaelectricalsandplumbing', icon: <Facebook className="h-5 w-5" /> },
        { name: 'WhatsApp', href: 'https://wa.me/254117484887', icon: <Image src="/whatsapp--v1.png" alt="WhatsApp" width={20} height={20} /> },
        { name: 'TikTok', href: 'https://www.tiktok.com/@AlphaElectricalsandplumb', icon: <TiktokIcon /> },
      ]
    },
    {
      name: 'Peter Karanja',
      role: 'Operations Head',
      bio: 'Peter oversees all operational aspects, ensuring efficiency and excellence in our service delivery from start to finish.',
      socials: [
        { name: 'Facebook', href: 'https://www.facebook.com/Alphaelectricalsandplumbing', icon: <Facebook className="h-5 w-5" /> },
        { name: 'WhatsApp', href: 'https://wa.me/254727751718', icon: <Image src="/whatsapp--v1.png" alt="WhatsApp" width={20} height={20} /> },
        { name: 'TikTok', href: 'https://www.tiktok.com/@AlphaElectricalsandplumb', icon: <TiktokIcon /> },
      ]
    },
    {
      name: 'Miriam Njeri',
      role: 'Customer Support +',
      bio: 'Miriam is the friendly voice of our company, dedicated to providing exceptional support and resolving customer inquiries.',
      socials: [
        { name: 'Facebook', href: 'https://www.facebook.com/Alphaelectricalsandplumbing', icon: <Facebook className="h-5 w-5" /> },
        { name: 'TikTok', href: 'https://www.tiktok.com/@AlphaElectricalsandplumb', icon: <TiktokIcon /> },
        { name: 'WhatsApp', href: 'https://wa.me/254117484887', icon: <Image src="/whatsapp--v1.png" alt="WhatsApp" width={20} height={20} /> },
      ]
    },
    {
      name: 'Val',
      role: 'Social Media Manager',
      bio: 'Val masterfully manages our online presence, engaging with our community across all social platforms.',
      socials: [
        { name: 'Facebook', href: 'https://www.facebook.com/Alphaelectricalsandplumbing', icon: <Facebook className="h-5 w-5" /> },
        { name: 'TikTok', href: 'https://www.tiktok.com/@AlphaElectricalsandplumb', icon: <TiktokIcon /> },
        { name: 'WhatsApp', href: 'https://wa.me/254713920922', icon: <Image src="/whatsapp--v1.png" alt="WhatsApp" width={20} height={20} /> },
      ]
    },
    {
      name: 'Shangi',
      role: 'Website Developer',
      bio: 'Shangi is the technical wizard behind our website, ensuring a smooth and seamless online experience for our customers.',
      socials: [
        { name: 'Twitter', href: 'https://www.x.com/@patrickshangst1', icon: <Twitter className="h-5 w-5" /> },
        { name: 'TikTok', href: 'https://www.tiktok.com/@AlphaElectricalsandplumb', icon: <TiktokIcon /> },
      ]
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
          <h2 className="text-3xl font-bold font-headline mb-12 text-[#2b235f]">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center bg-card hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-center">{feature.icon}</div>
                  <CardTitle className="text-[#2b235f]">{feature.title}</CardTitle>
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
            <h1 className="text-4xl font-bold font-headline text-[#2b235f]">Here Is Our Very Able Team</h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                Meet the dedicated individuals behind the thriving Alpha Electricals & Plumbing Ltd.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
                <Card key={member.name} className="text-center overflow-hidden hover:shadow-xl transition-shadow bg-card">
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <User className="h-24 w-24 text-muted-foreground" />
                  </div>
                  <CardHeader>
                      <CardTitle>{member.name}</CardTitle>
                      <p className="text-primary font-semibold">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                      <div className="flex justify-center items-center gap-4">
                      {member.socials.map((social) => (
                        <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                          {social.icon}
                        </a>
                      ))}
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
