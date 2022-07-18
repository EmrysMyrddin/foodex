CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."diet_category"("created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "diet_id" uuid NOT NULL, "category_id" uuid NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") , FOREIGN KEY ("id") REFERENCES "public"."category"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("category_id") REFERENCES "public"."diet"("id") ON UPDATE cascade ON DELETE cascade);
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
CREATE TRIGGER "set_public_diet_category_updated_at"
BEFORE UPDATE ON "public"."diet_category"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_diet_category_updated_at" ON "public"."diet_category" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
