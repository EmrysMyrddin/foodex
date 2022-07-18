import React from "react";
import { useQuery } from 'urql';
import { useParams } from 'react-router'
import {capitalizeFirstLetter} from "../../helper/helper";
import { recipe } from "../../data/recipes";
import * as icons from '../icons'
import {Spin, Card} from 'antd'
import { Link } from 'react-router-dom'
import './recipe.css'
import { useState } from "react";
import { useEffect } from "react";
import { marked } from 'marked'

const { Meta } = Card;

export default function Recipe(){
	const {id} = useParams()

    const [content, setContent] = useState('# A écrire')
    const [editing, setEditing] = useState(false)

    const [result] = useQuery({
    query: recipe,
    variables: {id}
    });

    const { data, fetching, error } = result;

    function onBlur({ target }) {
        setContent(target.value)
    setEditing(false)
    }

    if (fetching) return <Spin />;
    if (error) return <p>Oh no... {error.message}</p>;

    return (
        <div className="container-details">
            <div className="recipe-right">
                {data.recipe_by_pk.img_url ? <img src={data.recipe_by_pk.img_url} alt={data.recipe_by_pk.name}/> : <></>}
                <div className="info">
                    {data.recipe_by_pk.ingredients.map(i => <Link key={i.ingredient.id} to={`/ingredients/${i.ingredient.id}`} >
                            <Card
                                hoverable
                                cover={
                                    <>
                                        <div className="label">
                                            {
                                                i.ingredient
                                                .category
                                                .diet_category
                                                ?.diet
                                                .name === 'vegan' ? 
                                                    <icons.VeganIcon /> : 
                                                    i.ingredient
                                                    .category
                                                    .diet_category
                                                    ?.diet.name === 'vegetarian' ? 
                                                        <icons.VegetarianIcon /> : 
                                                        ''
                                            }
                                            <p>{capitalizeFirstLetter(i.ingredient.name)}</p>
                                        </div>
                                        {i.ingredient?.url_img ? <img src={i.ingredient.url_img} alt={i.ingredient.name}/> : <></>}
                                    </>
                                }
                            >
                                <Meta title={`${i.ingredient.recipe_ingredients[0].qte} ${i.ingredient.recipe_ingredients[0].unit}`}/>
                            </Card>
                        </Link>)}
                </div>
            </div>
            <div className="info-details">
                <div className="title-details">
                    {
                        data.recipe_by_pk.ingredients.filter(i => i.ingredient.category.diet_category?.diet.name === 'carnivorous').length || 
                        data.recipe_by_pk.ingredients.filter(i => i.ingredient.category.diet_category?.diet === undefined).length > 0 ||
                        data.recipe_by_pk.ingredients.length < 1 ?
                            "" :
                        data.recipe_by_pk.ingredients.filter(i => i.ingredient.category.diet_category?.diet.name === 'vegetarian').length > 0 ? 
                            <icons.VegetarianIcon /> : 
                            <icons.VeganIcon />
                        }            
                    <h1>{capitalizeFirstLetter(data.recipe_by_pk.name)}</h1>
                </div>
                <div className="recipe">
                    <article onClick={(e) => {
                        e.stopPropagation()
                        setEditing(true)
                    }}>
                        {data.recipe_by_pk.description}
                    
                    </article>
                </div>
            </div>
        </div>
    )
}

