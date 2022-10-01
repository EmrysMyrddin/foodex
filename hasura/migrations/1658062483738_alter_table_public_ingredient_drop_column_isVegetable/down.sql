ALTER TABLE "public"."ingredient" ADD COLUMN "isVegetable" bool;
ALTER TABLE "public"."ingredient" ALTER COLUMN "isVegetable" DROP NOT NULL;
ALTER TABLE "public"."ingredient" ALTER COLUMN "isVegetable" SET DEFAULT true;
