import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";

export const productsRouter = createTRPCRouter({
  // ... existing code ...

  listProducts: publicProcedure
    .query(async () => {
      const products = await db.query.products.findMany();
      return products;
    }),

});
