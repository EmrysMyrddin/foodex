CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."recipe_needed_recipe"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "needed_recipe_id" uuid NOT NULL, "qte" numeric NOT NULL, "recipe_id" uuid NOT NULL, "unit_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("needed_recipe_id") REFERENCES "public"."recipe"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("unit_id") REFERENCES "public"."unit"("id") ON UPDATE cascade ON DELETE cascade);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_recipe_needed_recipe_updated_at"
BEFORE UPDATE ON "public"."recipe_needed_recipe"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_recipe_needed_recipe_updated_at" ON "public"."recipe_needed_recipe" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
