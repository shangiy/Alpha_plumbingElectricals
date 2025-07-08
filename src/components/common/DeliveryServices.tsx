export default function DeliveryServices() {
  return (
    <section 
        className="relative mt-16 w-full overflow-hidden bg-cover bg-center bg-fixed py-20"
        style={{ backgroundImage: "url('/delivery teamVan.jpg')" }}
        data-ai-hint="delivery team work"
      >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 flex h-full items-center justify-start text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline md:text-4xl">
            We Also Offer Delivery Services
          </h2>
        </div>
      </div>
    </section>
  );
}
