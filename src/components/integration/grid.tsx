import React from "react";

export const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-regular max-w-xl text-left text-3xl tracking-tighter md:text-5xl">
              Awesome Dairy Products
            </h2>
            <p className="max-w-xl text-left text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-lg">
              Explore our selection of high-quality, artisanal dairy products
              made with care and attention to detail.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {React.Children.map(children, (child, index) => (
            <div key={index} className="flex flex-col gap-2">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
