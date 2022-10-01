ALTER TABLE "public"."recipe" ADD COLUMN "needed_recipe_id" uuid;
ALTER TABLE "public"."recipe" ALTER COLUMN "needed_recipe_id" DROP NOT NULL;
ALTER TABLE "public"."recipe" ADD CONSTRAINT recipe_needed_recipe_id_fkey FOREIGN KEY (needed_recipe_id) REFERENCES "public"."recipe" (id) ON DELETE cascade ON UPDATE cascade;
