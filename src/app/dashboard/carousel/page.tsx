'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function Page() {


  const images = [
    {id: 1, url: "https://images.unsplash.com/photo-1745175129773-ad9f779c978b?q=80&w=2322&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {id: 2, url: "https://images.unsplash.com/photo-1743856842862-0e215d2a6ff2?q=80&w=2207&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {id: 3, url: "https://images.unsplash.com/photo-1744125235979-4286ddb612b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {id: 4, url: "https://images.unsplash.com/photo-1744044041394-acefd590a9e9?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {id: 5, url: "https://images.unsplash.com/photo-1745185948516-cfbdd0ae4400?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  ];

  return (
    <div className="flex flex-col items-center">
      <Carousel
        className="w-full max-w-xs"
        //dentro de las opciones
        // dragFree permite especificar el comportamiento de tipo drag
        // loop, para cuando estemos en el último item, se regrese al 1
        opts={{
          dragFree: true,
          loop: true,
        }}

        // uso de la prop definida por nosotros
        autoplay={3000}
      >
        <CarouselContent>
          {images.map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <img src={_.url} alt="" className="rounded-2xl" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>

      <hr />
    </div>
  );
}
