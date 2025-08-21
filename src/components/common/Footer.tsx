import Link from 'next/link';
import Image from 'next/image';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/Alphaelectricalsandplumbing' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@AlphaElectricalsandplumb' },
    { name: 'Instagram', href: '#' },
    { name: 'LinkedIn', href: '#' },
  ];

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Team', href: '/team' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Shipping & Returns', href: '/returns' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Cookie Policy', href: '/cookie-policy' },
      ],
    },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo Alpha.png" alt="Alpha Electricals & Plumbing Ltd Logo" width={72} height={72} />
              <span className="text-xl font-bold font-headline text-primary">Alpha Electricals & Plumbing Ltd</span>
            </Link>
            <p className="text-sm text-muted-foreground">Your partner for electrical and plumbing supplies.</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-[#8a0b0d]">
                  {social.name}
                </Link>
              ))}
            </div>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold font-headline mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-[#8a0b0d]">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-semibold font-headline mb-4">Subscribe to our newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">Get the latest deals and product updates.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Alpha Electricals & Plumbing Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
