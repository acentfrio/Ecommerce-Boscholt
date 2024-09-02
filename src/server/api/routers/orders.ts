import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { orders, products, ordersProducts } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export const ordersRouter = createTRPCRouter({
  // ... existing code ...

  createOrder: protectedProcedure
    .input(
      z.object({
        orderDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
          message: "Invalid date format",
        }),
        products: z.array(
          z.object({
            productId: z.string(),
            unitOfMeasure: z.enum(["l", "kg"]),
            quantity: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [order] = await db
        .insert(orders)
        .values({
          userId: ctx.session.user.id,
          orderDate: new Date(input.orderDate),
        })
        .returning();

      await db.insert(ordersProducts).values(
        input.products.map((product) => ({
          orderId: order!.id,
          productId: product.productId,
          quantity: product.quantity,
        })),
      );
    }),

  // getOrder: publicProcedure
  //   .input(z.object({ id: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     const order = await db.query.orders.findFirst({
  //       where: { id: input.id },
  //       include: {
  //         products: true,
  //       },
  //     });
  //     return order ?? null;
  //   }),

  // updateOrder: protectedProcedure
  //   .input(z.object({
  //     id: z.string(),
  //     orderDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
  //       message: "Invalid date format",
  //     }).optional(),
  //     products: z.array(z.object({
  //       productId: z.string(),
  //       unitOfMeasure: z.enum(["l", "kg"]),
  //       quantity: z.number().positive(),
  //     })).optional(),
  //   }))
  //   .mutation(async ({ ctx, input }) => {
  //     await db.update(orders).set({
  //       ...(input.orderDate && { orderDate: new Date(input.orderDate) }),
  //     }).where({ id: input.id });

  //     if (input.products) {
  //       await db.delete(ordersProducts).where({ orderId: input.id });
  //       await db.insert(ordersProducts).values(
  //         input.products.map(product => ({
  //           orderId: input.id,
  //           productId: product.productId,
  //           unitOfMeasure: product.unitOfMeasure,
  //           quantity: product.quantity,
  //         }))
  //       );
  //     }
  //   }),

  deleteOrder: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await db
        .delete(ordersProducts)
        .where(eq(ordersProducts.orderId, input.id));
      await db.delete(orders).where(eq(orders.id, input.id));
    }),

  listUserOrders: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userOrders = await db.query.orders.findMany({
        where: eq(orders.userId, ctx.session.user.id),
        with: { products: true },
      });

      return userOrders;
    }),
});
