CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."tag_recipe"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "tag_id" uuid NOT NULL, "recipe_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON UPDATE cascade ON DELETE cascade);
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
CREATE TRIGGER "set_public_tag_recipe_updated_at"
BEFORE UPDATE ON "public"."tag_recipe"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_tag_recipe_updated_at" ON "public"."tag_recipe" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
