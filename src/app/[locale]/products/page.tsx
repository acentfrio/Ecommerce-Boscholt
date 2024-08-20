import { Card } from "@/components/integration/card/responsive";
import { Grid } from "@/components/integration/grid";

const Page = () => {
  return (
    <section>
      <Grid>
        {Array.from({ length: 10 }).map((_, index) => (
          <Card
            key={index}
            product={{
              id: index,
              name: "Product 1",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
              price: 100,
            }}
          />
        ))}
      </Grid>
    </section>
  );
};

export default Page;
