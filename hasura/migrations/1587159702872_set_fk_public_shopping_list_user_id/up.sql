alter table "public"."shopping_list"
           add constraint "shopping_list_user_id_fkey"
           foreign key ("user_id")
           references "public"."user"
           ("id") on update cascade on delete cascade;
