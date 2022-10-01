alter table "public"."shopping_list_ingredient_entry"
           add constraint "shopping_list_ingredient_entry_shoppingListId_fkey"
           foreign key ("shoppingListId")
           references "public"."shopping_list"
           ("id") on update cascade on delete cascade;
