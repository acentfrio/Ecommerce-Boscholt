import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
  Card as CardPrimitive,
} from "@/components/ui/card";
import Image from "next/image";

import { cn } from "@/lib/utils";
type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
};
const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

export const Card = ({
  product,
  key,
}: {
  product: Product;
  className?: string;
  key?: string;
}) => {
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
        <CardFooter className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              -
            </Button>
            <span>1</span>
            <Button size="sm" variant="outline">
              +
            </Button>
          </div>
          <Button variant="outline" size="sm">
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
