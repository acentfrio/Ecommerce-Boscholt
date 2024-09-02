import { Card } from "@/components/integration/card/responsive";
import { Grid } from "@/components/integration/grid";
import { api, HydrateClient } from "@/trpc/server";

const Page = async () => {
  const products = await api.products.listProducts();

  return (
    <section>
      <Grid>
        {products.map(({ id, name, price }) => (
          <Card
            key={id}
            product={{
              id,
              name,
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
              price,
            }}
          />
        ))}
      </Grid>
    </section>
  );
};

export default Page;
