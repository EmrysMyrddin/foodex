alter table "public"."diet_category" add foreign key ("id") references "public"."category"("id") on update cascade on delete cascade;
