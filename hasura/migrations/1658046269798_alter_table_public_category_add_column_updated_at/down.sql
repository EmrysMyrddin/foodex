DROP TRIGGER IF EXISTS "set_public_category_updated_at" ON "public"."category";
ALTER TABLE "public"."category" DROP COLUMN "updated_at";
