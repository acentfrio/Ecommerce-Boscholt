import { LatestPost } from "@/app/_components/post";
import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { Carousel } from "@/components/integration/carousel";
import { Hero } from "@/components/integration/hero";
import { Hero1 } from "@/components/integration/hero1";
import { Link } from "@/navigation";
const Page = async () => {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main className="flex: 1 1 0%;">
        <div className="border-b">
          <div className="container grid gap-32 py-6">
            <Hero1 />
            <Hero />
            {/* <Carousel /> */}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
};

export default Page;
