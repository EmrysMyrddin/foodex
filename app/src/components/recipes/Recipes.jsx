import React from "react";
import { useQuery } from 'urql';
import { recipes } from "../../data/recipes";
import { Link } from 'react-router-dom'
import {Spin, Empty, Card} from "antd"
import { capitalizeFirstLetter } from "../../helper/helper";
import * as icons from '../icons'

export default function Recipes(){

    const [{ data: recipesData, fetching: recipesFetching, error: recipesError }] = useQuery({
        query: recipes,
    });

    if (recipesFetching) return <Spin />

    if (recipesError) return <p>{recipesError.message}</p>
    
    console.log(recipesData.recipe[3].ingredients.filter(i => i.ingredient.category.diet_category?.diet === undefined).length)
    
    return <div>
        {recipesData.recipe.length === 0 ? <Empty/> : 
            <div className="container">
            {recipesData.recipe.map(recipe => (
                <div hey={recipe.id}>
                    <Link to={`/recipes/${recipe.id}`} className="grid" >
                        <Card
                            hoverable
                            cover={
                                <>
                                    <div className="label">
                                        {
                                        recipe.ingredients.length < 1 ||
                                        recipe.ingredients.filter(i => i.ingredient.category.diet_category?.diet.name === 'carnivorous').length > 0 ||
                                        recipe.ingredients.filter(i => i.ingredient.category.diet_category?.diet === undefined).length > 0
                                         ?
                                            "" :
                                        recipe.ingredients.filter(i => i.ingredient.category.diet_category?.diet.name === 'vegetarian').length > 0 ? 
                                            <icons.VegetarianIcon /> : 
                                            <icons.VeganIcon />
                                        }            
                                        <p>{capitalizeFirstLetter(recipe.name)}</p>
                                    </div>
                                    {recipe?.img_url ? <img src={recipe.img_url} alt={recipe.name}/> : <></>}
                                </>
                            }
                        />
                    </Link>
                </div>
            ))}
        </div>}
    </div>
}