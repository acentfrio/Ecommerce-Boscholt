import * as React from "react";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu as NavigationMenuPrimitive,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import LocaleSwitcher from "./locale-switcher";
import { Circle, Milk, ShoppingBasket } from "lucide-react";
import { AuthenticationStatus } from "../authentication-status";

export function NavigationMenu() {
  return (
    <NavigationMenuPrimitive className="container flex h-14 max-w-screen-2xl items-center">
      <div
        className="justify-left flex flex-1 items-center space-x-2"
        data-testid="navigation-menu-left"
      >
        <Link href="/" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Milk />
          </NavigationMenuLink>
        </Link>
      </div>
      <div
        className="mr-4 hidden justify-center md:flex"
        data-testid="navigation-menu-center"
      >
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/products" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Products
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/cart" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                style={{ position: "relative" }}
              >
                Orders
                <Circle className="absolute -right-0 -top-0 h-2 w-2 rounded-full bg-red-600 text-xs text-red-600" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>

      <div
        className="flex flex-1 items-center justify-end space-x-2"
        data-testid="navigation-menu-right"
      >
        <Link href="/cart" legacyBehavior passHref>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            style={{ position: "relative" }}
          >
            <ShoppingBasket />
            <Circle className="absolute -right-0 -top-0 h-2 w-2 rounded-full bg-red-600 text-xs text-red-600" />
          </NavigationMenuLink>
        </Link>
        <ModeToggle />
        <LocaleSwitcher />
        <AuthenticationStatus />
      </div>
    </NavigationMenuPrimitive>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
