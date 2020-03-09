CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."recipe_list_entry"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "recipe_id" uuid NOT NULL, "recipe_list_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON UPDATE cascade ON DELETE restrict, FOREIGN KEY ("recipe_list_id") REFERENCES "public"."recipe_list"("id") ON UPDATE cascade ON DELETE cascade);
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
CREATE TRIGGER "set_public_recipe_list_entry_updated_at"
BEFORE UPDATE ON "public"."recipe_list_entry"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_recipe_list_entry_updated_at" ON "public"."recipe_list_entry" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
