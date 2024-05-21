"use client";

import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel";
import Image from "next/image";
import Placeholder from "@/assets/images/placeholder.svg";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

type MainCarouselProps = {
  className?: string;
};

export function MainCarousel({ className }: MainCarouselProps) {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, stopOnHover: true, loop: true, waitForAction: true })
  );

  return (
    <section className={cn("", className)}>
      <Carousel
        className="w-full relative"
        plugins={[plugin.current]}
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.start}
        // plugins={[Autoplay({ delay: 2000, stopOnHover: true, loop: true, waitForAction: true })]}
      >
        <CarouselContent>
          <CarouselItem>
            <CarouselItem1 />
          </CarouselItem>
          <CarouselItem>
            <CarouselItem2 />
          </CarouselItem>
          <CarouselItem>
            <CarouselItem3 />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-[1rem]" />
        <CarouselNext className="right-[1rem]" />
      </Carousel>
    </section>
  );
}

function CarouselItem1() {
  return (
    <div className="relative">
      <Image
        alt="Carousel Item 3"
        className="aspect-video object-cover rounded-lg"
        height={600}
        src={Placeholder}
        width={1200}
      />
      <div className="absolute bottom-0 left-0">
        <div className="pl-8 pb-8">
          <span className="text-2xl font-semibold">기업 프로모션1</span>
        </div>
      </div>
    </div>
  );
}

function CarouselItem2() {
  return (
    <div className="relative">
      <Image
        alt="Carousel Item 3"
        className="aspect-video object-cover rounded-lg"
        height={600}
        src={Placeholder}
        width={1200}
      />
      <div className="absolute bottom-0 left-0">
        <div className="pl-8 pb-8">
          <span className="text-2xl font-semibold">기업 프로모션2</span>
        </div>
      </div>
    </div>
  );
}

function CarouselItem3() {
  return (
    <div className="relative">
      <Image
        alt="Carousel Item 3"
        className="aspect-video object-cover rounded-lg"
        height={600}
        src={Placeholder}
        width={1200}
      />
      <div className="absolute bottom-0 left-0">
        <div className="pl-8 pb-8">
          <span className="text-2xl font-semibold">기업 프로모션3</span>
        </div>
      </div>
    </div>
  );
}
