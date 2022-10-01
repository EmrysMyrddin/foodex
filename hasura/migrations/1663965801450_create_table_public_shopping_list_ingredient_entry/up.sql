CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."shopping_list_ingredient_entry"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "qte" integer NOT NULL, "unitId" uuid NOT NULL, "ingredientId" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("ingredientId") REFERENCES "public"."ingredient"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("unitId") REFERENCES "public"."unit"("id") ON UPDATE cascade ON DELETE cascade);
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
CREATE TRIGGER "set_public_shopping_list_ingredient_entry_updated_at"
BEFORE UPDATE ON "public"."shopping_list_ingredient_entry"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_shopping_list_ingredient_entry_updated_at" ON "public"."shopping_list_ingredient_entry" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
