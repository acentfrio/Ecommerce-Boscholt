import { LatestPost } from "@/app/_components/post";
import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { Carousel } from "@/components/integration/carousel";
import { Hero } from "@/components/integration/hero";
import { Hero1 } from "@/components/integration/hero1";
import { Link } from "@/navigation";
const Page = async () => {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex: 1 1 0%;">
        <div className="border-b">
          <div className="container grid gap-32 py-6">
            <Hero1 />
            <Hero />
            <Carousel />
            <div className="flex flex-col items-center gap-2">
              <p className="text-2xl text-white">
                {hello ? hello.greeting : "Loading tRPC query..."}
              </p>

              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-center text-2xl text-white">
                  {session && <span>Logged in as {session.user?.name}</span>}
                </p>
                <Link
                  href={session ? "/api/auth/signout" : "/api/auth/signin"}
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                >
                  {session ? "Sign out" : "Sign in"}
                </Link>
              </div>

              {session?.user && <LatestPost />}
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
};

export default Page;
