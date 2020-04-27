alter table "public"."recipe_ingredient" drop constraint "recipe_ingredient_ingredient_id_fkey",
          add constraint "recipe_ingredient_ingredient_id_fkey"
          foreign key ("ingredient_id")
          references "public"."ingredient"
          ("id")
          on update restrict
          on delete restrict;
