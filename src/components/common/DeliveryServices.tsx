import { CircularProgress } from '@/components/ui/circular-progress';

export default function DeliveryServices() {
  return (
    <section 
        className="relative mt-16 w-full overflow-hidden bg-cover bg-center bg-fixed py-20"
        style={{ backgroundImage: "url('/delivery teamVan.jpg')" }}
        data-ai-hint="delivery team work"
      >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 flex h-full items-center justify-center text-white">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-headline md:text-4xl">
              We Also Offer Delivery Services
            </h2>
            <p className="text-base md:text-lg">
              We offer fast and reliable delivery services for all our products across the
              region. We have free delivery for orders above Ksh 5,000 within Eldoret and its
              environs. Whether you're ordering electrical fittings, plumbing supplies, lighting
              solutions, or home décor items, Alpha Electricals & Plumbing Ltd ensures your
              purchases are delivered safely and on time. Our goal is to make your shopping
              experience convenient and hassle-free.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-8 md:flex-row md:items-center md:justify-center">
             <div className="md:-mt-20 md:translate-x-8">
                <CircularProgress progress={90} size={150} strokeWidth={10} label="Good User Experience" />
            </div>
            <div className="z-10">
                <CircularProgress progress={98} size={200} strokeWidth={12} label="Customer Satisfaction" />
            </div>
            <div className="md:mt-24 md:-translate-x-12">
                <CircularProgress progress={7} size={120} strokeWidth={8} label="Returned Goods" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
