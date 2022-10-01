CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE "public"."recipe_ingredient" ADD COLUMN "unit_id" uuid NOT NULL DEFAULT '38202e4c-3705-4ddb-9e83-0635a603eb1e';
