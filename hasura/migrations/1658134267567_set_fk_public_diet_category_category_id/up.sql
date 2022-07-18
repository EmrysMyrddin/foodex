alter table "public"."diet_category"
           add constraint "diet_category_category_id_fkey"
           foreign key ("category_id")
           references "public"."category"
           ("id") on update cascade on delete cascade;
