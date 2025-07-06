import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Linkedin, Twitter, Mail } from 'lucide-react';

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

export default function TeamPage() {
  return (
    <div className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline text-primary">Meet Our Team</h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            The driving force behind our success. A group of passionate professionals dedicated to excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center overflow-hidden hover:shadow-xl transition-shadow">
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
    </div>
  );
}
