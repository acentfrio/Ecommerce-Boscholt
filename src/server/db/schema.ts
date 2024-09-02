import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
  pgEnum,
  numeric,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

export const createTable = pgTableCreator((name) => `${name}`);

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  orders: many(orders),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const unitOfMeasureEnum = pgEnum("unit_of_measure", ["l", "kg"]);

export const products = createTable(
  "product",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    unitOfMeasure: unitOfMeasureEnum("unit_of_measure").notNull(),
  },
  (product) => ({
    nameIdx: index("product_name_idx").on(product.name),
  }),
);

export const orders = createTable(
  "order",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    creationDate: timestamp("creation_date", {
      mode: "date",
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
    orderDate: timestamp("order_date", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (order) => ({
    orderDateIdx: index("order_order_date_idx").on(order.orderDate),
    userIdIdx: index("order_user_id_idx").on(order.userId),
  }),
);

export const ordersProducts = createTable(
  "order_product",
  {
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id),
    productId: varchar("product_id", { length: 255 })
      .notNull()
      .references(() => products.id),
    quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
  },
  (orderProduct) => ({
    compoundKey: primaryKey({
      columns: [orderProduct.orderId, orderProduct.productId],
    }),
  }),
);

export const productsRelations = relations(products, ({ many }) => ({
  orders: many(ordersProducts),
}));

export const ordersProductsRelations = relations(ordersProducts, ({ one }) => ({
  order: one(orders, {
    fields: [ordersProducts.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [ordersProducts.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  products: many(ordersProducts),
}));
