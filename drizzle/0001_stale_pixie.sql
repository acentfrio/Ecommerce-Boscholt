ALTER TABLE "product" ADD COLUMN "unit_of_measure" "unit_of_measure" NOT NULL;--> statement-breakpoint
ALTER TABLE "order_product" DROP COLUMN IF EXISTS "unit_of_measure";