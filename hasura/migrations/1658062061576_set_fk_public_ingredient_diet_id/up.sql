alter table "public"."ingredient"
           add constraint "ingredient_diet_id_fkey"
           foreign key ("diet_id")
           references "public"."diet"
           ("id") on update cascade on delete cascade;
