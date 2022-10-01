ALTER TABLE "public"."nutrition" ADD COLUMN "ingredient_id" uuid;
ALTER TABLE "public"."nutrition" ALTER COLUMN "ingredient_id" DROP NOT NULL;
ALTER TABLE "public"."nutrition" ADD CONSTRAINT nutrition_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES "public"."ingredient" (id) ON DELETE restrict ON UPDATE restrict;
