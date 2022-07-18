CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."nutrition"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "ingredient_id" uuid NOT NULL, "water" integer, "protein" integer, "lipid" integer, "carb" integer, "fibre" integer, "calorie" integer, "vitamin" text, PRIMARY KEY ("id") , FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredient"("id") ON UPDATE restrict ON DELETE restrict);
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
CREATE TRIGGER "set_public_nutrition_updated_at"
BEFORE UPDATE ON "public"."nutrition"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_nutrition_updated_at" ON "public"."nutrition" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
