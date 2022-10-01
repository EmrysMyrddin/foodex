ALTER TABLE "public"."recipe_ingredient" ADD COLUMN "unit" text;
ALTER TABLE "public"."recipe_ingredient" ALTER COLUMN "unit" DROP NOT NULL;
