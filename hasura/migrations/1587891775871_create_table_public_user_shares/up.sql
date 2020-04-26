CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."user_shares"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "owner_id" uuid NOT NULL, "shared_to_user_id" uuid NOT NULL, "can_write" boolean NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("shared_to_user_id") REFERENCES "public"."user"("id") ON UPDATE cascade ON DELETE cascade);
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
CREATE TRIGGER "set_public_user_shares_updated_at"
BEFORE UPDATE ON "public"."user_shares"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_user_shares_updated_at" ON "public"."user_shares" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
