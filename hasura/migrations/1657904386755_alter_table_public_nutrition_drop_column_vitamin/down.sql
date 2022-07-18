ALTER TABLE "public"."nutrition" ADD COLUMN "vitamin" text;
ALTER TABLE "public"."nutrition" ALTER COLUMN "vitamin" DROP NOT NULL;
