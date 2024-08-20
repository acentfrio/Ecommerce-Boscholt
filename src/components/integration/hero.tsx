import { Link, usePathname } from "@/navigation";
import { ArrowRightIcon } from "lucide-react";
export const Hero = () => {
  return (
    <section className="container">
      <div>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="grid gap-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Discover Our Dairy Products
            </h1>
            <p className="text-muted-foreground">
              Explore our curated selection of premium dairy products, crafted
              with care and attention to detail.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 font-medium"
              prefetch={false}
            >
              Shop Now
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <img
            src="/cow.png"
            alt="Dairy Products"
            width={600}
            height={400}
            className="w-full rounded-lg object-cover"
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
};
