import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "nl", "ru"] as const;
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
