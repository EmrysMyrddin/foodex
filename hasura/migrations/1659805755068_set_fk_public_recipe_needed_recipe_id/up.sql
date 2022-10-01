alter table "public"."recipe"
           add constraint "recipe_needed_recipe_id_fkey"
           foreign key ("needed_recipe_id")
           references "public"."recipe"
           ("id") on update cascade on delete cascade;
