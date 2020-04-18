CREATE VIEW shopping_list_ingredients AS
SELECT shopping_list_id, ingredient_id, SUM(qte)
FROM shopping_list_recipe_ingredients
GROUP BY shopping_list_id, ingredient_id;
