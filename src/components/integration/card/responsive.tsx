"use client";

import { Button } from "@/components/ui/button";
import { useState } from 'react';
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
  Card as CardPrimitive,
} from "@/components/ui/card";
import Image from "next/image";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
export type Product = {
  id: string;
  name: string;
  price: number;
  unitOfMeasure: "l" | "kg";
  description?: string;
};

const toggleSchema = {
  "l": [
    { value: "0.25", label: "0.25L" },
    { value: "0.5", label: "0.5L" },
    { value: "1", label: "1L" },
    { value: "2", label: "2L" },
    { value: "5", label: "5L" },
  ],
  "kg": [
    { value: "0.1", label: "100g" },
    { value: "0.25", label: "250g" },
    { value: "0.5", label: "500g" },
    { value: "1", label: "1kg" },
  ],
}
export const Card = ({
  product,
  key,
}: {
  product: Product;
  className?: string;
  key?: string;
}) => {

  const [amount, setAmount] = useState('1');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };
  
  console.log(product)
  return (
    <CardPrimitive key={key} className="flex flex-col">
      <CardContent className="relative flex aspect-square w-full items-center justify-center rounded-md">
        <Image
          src="/cow.png"
          alt="Product Image"
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
        
      </CardContent>
      <div className="flex flex-col p-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <CardDescription className="mt-2 text-sm">
          {product.description}
        </CardDescription>
        <div className="mt-2 text-sm font-semibold">
          Price: ${product.price}
        </div>
        <CardFooter className="mt-4 flex flex-col gap-2">
          <div className="flex items-center justify-between w-full">
          <ToggleGroup type="single" variant="outline" >
          {
          
          toggleSchema[product.unitOfMeasure].map((item) => (
            <ToggleGroupItem key={item.value} value={item.value} className="w-1/5">
              {item.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
            
          </div>
          <Button variant="outline" size="sm" className="w-full">
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </CardPrimitive>
  );
};
// export const Card = ({
//   product,
//   key,
// }: {
//   product: Product;
//   className?: string;
//   key?: number;
// }) => {
//   return (
//     <CardPrimitive key={key} className="">
//       <CardContent className="relative flex aspect-square w-full items-center justify-center rounded-md">
//         {/* <Image src="/cow.png" alt="alt" fill className="rounded-md" /> */}
//       </CardContent>
//       <CardDescription  className="w-full p-2">
//         {product.description}
//       </CardDescription>

//       {/* <CardFooter className="flex w-full justify-between p-2">
//         <div className="flex items-center gap-2">
//           <Button size="sm" variant="outline">
//             -
//           </Button>
//           <span>1</span>
//           <Button size="sm" variant="outline">
//             +
//           </Button>
//         </div>
//         <Button variant="outline" size="sm">
//           Add to Cart
//         </Button>
//       </CardFooter> */}
//     </CardPrimitive>
//   );
// };
