CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."diet"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text, PRIMARY KEY ("id") );
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
CREATE TRIGGER "set_public_diet_updated_at"
BEFORE UPDATE ON "public"."diet"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_diet_updated_at" ON "public"."diet" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

INSERT INTO diet(id, name, created_at, updated_at) VALUES
    ('117410d4-5946-4ef8-826a-dbf13b5d2d8d', 'vegan', '2022-07-17T12:43:45.377114+00:00', '2022-07-17T14:01:21.31616+00:00'),
    ('8b36ae7d-74f4-42b6-bd36-397ed9930f6b', 'vegetarian', '2022-07-17T12:43:53.550341+00:00', '2022-07-17T14:03:08.522193+00:00'),
    ('7c7d0bef-edf0-4b2c-8218-62eb199755f6', 'carnivorous', '2022-07-17T12:44:12.388452+00:00','2022-07-17T14:03:28.634959+00:00');
