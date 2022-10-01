CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."unit"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "name" text NOT NULL, "short" text, PRIMARY KEY ("id") );
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
CREATE TRIGGER "set_public_unit_updated_at"
BEFORE UPDATE ON "public"."unit"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_unit_updated_at" ON "public"."unit" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

INSERT INTO unit(name, short, created_at, updated_at, id) VALUES
    ('gramme', 'g', '2022-07-25T21:33:19.698161+00:00', '2022-07-25T21:33:19.698161+00:00', '38202e4c-3705-4ddb-9e83-0635a603eb1e'),
    ('piece', 'p', '2022-07-25T21:34:17.796318+00:00', '2022-07-25T21:34:17.796318+00:00', 'd99d34d7-f379-4671-988e-57c7ea0e761c'),
    ('kilogramme', 'kg', '2022-07-25T21:34:27.155852+00:00', '2022-07-25T21:34:27.155852+00:00', 'eb25a13b-911c-435d-bd73-9c3786614149'),
    ('liter', 'L', '2022-07-25T21:34:38.78744+00:00', '2022-07-25T21:34:38.78744+00:00', '47d39db6-3e2d-4c75-83aa-f52bab534918'),
    ('milliliter', 'mL', '2022-07-25T21:35:03.020806+00:00', '2022-07-25T21:35:03.020806+00:00', '4d35b167-b738-4c26-b187-49c93dc7166b'),
    ('centiliter', 'cl', '2022-07-25T21:35:30.06547+00:00', '2022-07-25T21:35:30.06547+00:00', 'e917ec7c-e524-4a30-ad77-8614d832ac51'),
    ('clove', null, '2022-07-25T21:42:54.813245+00:00', '2022-07-25T21:42:54.813245+00:00', '6dd9d0e9-005e-45fc-9715-9a84f8c28951'),
    ('pod', null, '2022-07-25T21:42:57.854456+00:00', '2022-07-25T21:42:57.854456+00:00', '0d45d3e0-cde0-4485-aaee-dfe65c0fbe35');
