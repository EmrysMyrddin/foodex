CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."saison_ingredient"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "saison_id" uuid NOT NULL, "ingredient_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredient"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("saison_id") REFERENCES "public"."saison"("id") ON UPDATE cascade ON DELETE cascade);