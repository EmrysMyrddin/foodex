alter table "public"."ingredient"
           add constraint "ingredient_category_id_fkey"
           foreign key ("category_id")
           references "public"."category"
           ("id") on update cascade on delete cascade;
