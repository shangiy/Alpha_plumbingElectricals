import { CircularProgress } from '@/components/ui/circular-progress';

export default function DeliveryServices() {
  return (
    <section className="relative mt-16 h-[60vh] w-full overflow-hidden rounded-lg">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://placehold.co/1200x600')" }}
        data-ai-hint="delivery team work"
      ></div>
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
          <div className="flex flex-col items-center justify-around gap-8 md:flex-row">
            <CircularProgress progress={7} label="Returned Goods" />
            <CircularProgress progress={90} label="Good User Experience" />
            <CircularProgress progress={98} label="Customer Satisfaction" />
          </div>
        </div>
      </div>
    </section>
  );
}
