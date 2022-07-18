alter table "public"."diet_category" drop constraint "diet_category_category_id_fkey",
             add constraint "diet_category_diet_id_fkey"
             foreign key ("diet_id")
             references "public"."diet"
             ("id") on update cascade on delete cascade;
