ALTER TABLE "public"."ingredient" ADD COLUMN "isAnimal" bool;
ALTER TABLE "public"."ingredient" ALTER COLUMN "isAnimal" DROP NOT NULL;
ALTER TABLE "public"."ingredient" ALTER COLUMN "isAnimal" SET DEFAULT false;
