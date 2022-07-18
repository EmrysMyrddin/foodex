alter table "public"."ingredient"
           add constraint "ingredient_nutrition_id_fkey"
           foreign key ("nutrition_id")
           references "public"."nutrition"
           ("id") on update cascade on delete cascade;
