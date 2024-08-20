import * as React from "react";
import { Card } from "@/components/integration/card/responsive";
import { ArrowRightIcon } from "lucide-react";
import {
  Carousel as CarouselPrimitive,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "@/navigation";
import { CardContent, Card as CardPrimitive } from "@/components/ui/card";

export const Carousel = () => {
  return (
    <section className="container">
      <div className="grid gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Our Dairy Selection
          </h2>
          <Link
            href="#"
            className="inline-flex items-center gap-2 font-medium"
            prefetch={false}
          >
            View All
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div>
          <CarouselPrimitive>
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <CardPrimitive>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-3xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </CardPrimitive>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </CarouselPrimitive>
        </div>
      </div>
    </section>
  );
};
