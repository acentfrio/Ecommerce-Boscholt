import { ArrowRightIcon } from "lucide-react";
import { Link } from "@/navigation";

export const Hero1 = () => (
  <section className="container">
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="font-regular max-w-lg text-left text-5xl tracking-tighter md:text-7xl">
            Boscholt Dairy
          </h1>
          <p className="max-w-md text-left text-xl leading-relaxed tracking-tight text-muted-foreground">
            Explore our curated selection of premium dairy products, crafted
            with care and attention to detail.
          </p>
        </div>
        <Link
          href="#"
          className="inline-flex items-center gap-2 font-medium"
          prefetch={false}
        >
          Shop Now
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="aspect-square overflow-hidden rounded-md bg-muted">
          <img
            className="h-full w-full object-cover"
            src="dairy-products-selection.png"
          ></img>
        </div>
        <div className="row-span-2 aspect-auto h-full w-full rounded-md bg-muted object-cover">
          <img
            className="h-full w-full object-cover"
            src="sheep-milk.png"
          ></img>
        </div>
        <div className="aspect-square overflow-hidden rounded-md bg-muted">
          <img
            className="h-full w-full object-cover"
            src="cheese-many.png"
          ></img>
        </div>
      </div>
    </div>
  </section>
);
