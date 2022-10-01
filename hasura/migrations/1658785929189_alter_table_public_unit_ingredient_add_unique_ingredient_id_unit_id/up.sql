alter table "public"."unit_ingredient" add constraint "unit_ingredient_ingredient_id_unit_id_key" unique ("ingredient_id", "unit_id");
