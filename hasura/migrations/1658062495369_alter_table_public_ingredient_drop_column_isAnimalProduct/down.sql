ALTER TABLE "public"."ingredient" ADD COLUMN "isAnimalProduct" bool;
ALTER TABLE "public"."ingredient" ALTER COLUMN "isAnimalProduct" DROP NOT NULL;
ALTER TABLE "public"."ingredient" ALTER COLUMN "isAnimalProduct" SET DEFAULT false;
