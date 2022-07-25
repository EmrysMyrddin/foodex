ALTER TABLE "public"."ingredient" ADD COLUMN "diet_id" uuid;
ALTER TABLE "public"."ingredient" ALTER COLUMN "diet_id" DROP NOT NULL;
ALTER TABLE "public"."ingredient" ADD CONSTRAINT ingredient_diet_id_fkey FOREIGN KEY (diet_id) REFERENCES "public"."diet" (id) ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "public"."ingredient" ALTER COLUMN "diet_id" SET DEFAULT '7c7d0bef-edf0-4b2c-8218-62eb199755f6'::uuid;
