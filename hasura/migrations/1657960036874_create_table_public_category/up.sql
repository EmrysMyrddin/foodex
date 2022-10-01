CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."category"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "category" text NOT NULL, "description" text, PRIMARY KEY ("id") );
