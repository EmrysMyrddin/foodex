alter table "public"."recipe_ingredient"
           add constraint "recipe_ingredient_unit_id_fkey"
           foreign key ("unit_id")
           references "public"."unit"
           ("id") on update cascade on delete cascade;
