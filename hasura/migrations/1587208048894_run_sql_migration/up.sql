CREATE OR REPLACE VIEW "public"."shopping_list_ingredients" AS 
 SELECT shopping_list_recipe_ingredients.shopping_list_id,
    shopping_list_recipe_ingredients.ingredient_id,
    sum(shopping_list_recipe_ingredients.qte) AS sum,
    unit
   FROM shopping_list_recipe_ingredients
  GROUP BY shopping_list_recipe_ingredients.shopping_list_id, shopping_list_recipe_ingredients.ingredient_id, unit;
