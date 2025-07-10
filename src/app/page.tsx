
'use client';

import DeliveryServices from '@/components/common/DeliveryServices';
import HomepageAbout from '@/components/common/HomepageAbout';
import Hero from '@/components/common/Hero';
import CategoryCarousel from '@/components/common/CategoryCarousel';
import ConnectWithUs from '@/components/common/ConnectWithUs';
import ImpactSection from '@/components/common/ImpactSection';
import FeaturedProducts from '@/components/products/FeaturedProducts';

export default function Home() {
  return (
    <div>
      <Hero />
      <CategoryCarousel />
      <FeaturedProducts />
      <DeliveryServices />
      <ConnectWithUs />
      <HomepageAbout />
      <ImpactSection />
    </div>
  );
}
