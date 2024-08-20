import { getServerAuthSession } from "@/server/auth";
import { LogIn, LogOut } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export const AuthenticationStatus = async () => {
  const session = await getServerAuthSession();
  const href = session ? "/api/auth/signout" : "/api/auth/signin";
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            className={buttonVariants({ variant: "outline", size: "icon" })}
          >
            {session ? (
              <LogOut className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <LogIn className="h-[1.2rem] w-[1.2rem]" />
            )}
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{session ? "LogOut" : "LogIn"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
