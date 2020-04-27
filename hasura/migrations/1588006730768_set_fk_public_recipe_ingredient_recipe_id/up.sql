alter table "public"."recipe_ingredient" drop constraint "recipe_ingredient_recipe_id_fkey",
             add constraint "recipe_ingredient_recipe_id_fkey"
             foreign key ("recipe_id")
             references "public"."recipe"
             ("id") on update cascade on delete cascade;
