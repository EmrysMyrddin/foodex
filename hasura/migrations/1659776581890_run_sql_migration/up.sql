CREATE OR REPLACE VIEW "public"."shopping_list_recipe_ingredients" AS 
 SELECT shopping_list_entry.shopping_list_id,
    recipe_ingredient.ingredient_id,
    (recipe_ingredient.qte * (shopping_list_entry.qte)::numeric) AS qte,
    unit_id
   FROM ((((shopping_list
     JOIN shopping_list_entry ON ((shopping_list_entry.shopping_list_id = shopping_list.id)))
     JOIN recipe ON ((recipe.id = shopping_list_entry.recipe_id)))
     JOIN recipe_ingredient ON ((recipe_ingredient.recipe_id = recipe.id)))
     JOIN ingredient ON ((ingredient.id = recipe_ingredient.ingredient_id)));
