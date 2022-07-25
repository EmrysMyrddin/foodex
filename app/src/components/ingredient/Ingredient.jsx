import React from "react";
import { useQuery } from 'urql';
import { ingredient } from "../../data/ingredient";
import { useParams } from 'react-router'
import './ingredient.css'
import {capitalizeFirstLetter} from "../../helper/helper";
import * as icons from '../icons'
import { useIntl } from 'react-intl'


export default function Ingredient(){
    const intl = useIntl()
	const {id} = useParams()

    const [result] = useQuery({
        query: ingredient,
        variables: {id}
      });

      const { data, fetching, error } = result;

      if (fetching) return <p>Loading...</p>;
      if (error) return <p>Oh no... {error.message}</p>;

    return (
        <div className="container-details">
            {data.ingredient_by_pk.url_img ? <img src={data.ingredient_by_pk.url_img} alt={data.ingredient_by_pk.name}/> : <></>}
            <div className="info-details">
                <div className="title-details">
                    {data.ingredient_by_pk.category.diet_category.diet.name === 'vegan' ? <icons.VeganIcon /> : data.ingredient_by_pk.category.diet_category.diet.name === 'vegetarian' ? <icons.VegetarianIcon /> : ''}
                    <h1>{capitalizeFirstLetter(data.ingredient_by_pk.name)}</h1>
                </div>
                <div>
                    <div className="table">
                        <div className="table-header">
                            <p>{capitalizeFirstLetter(intl.formatMessage({ id: "Value per 100g"}))}</p>
                        </div>
                        <div className="ligne">
                            <p>{capitalizeFirstLetter(intl.formatMessage({ id: "carb"}))}</p>
                            <p>{data.ingredient_by_pk.nutrition?.carb || '-'} g</p>
                        </div>
                        <div className="ligne">
                            <p>{capitalizeFirstLetter(intl.formatMessage({ id: "calorie"}))}</p>
                            <p>{data.ingredient_by_pk.nutrition?.calorie || '-'} kcal</p>
                        </div>
                        <div className="ligne">
                            <p>{capitalizeFirstLetter(intl.formatMessage({ id: "fibre"}))}</p>
                            <p>{data.ingredient_by_pk.nutrition?.fibre || '-'} g</p>
                        </div>
                        <div className="ligne">
                            <p>{capitalizeFirstLetter(intl.formatMessage({ id: "lipid"}))}</p>
                            <p>{data.ingredient_by_pk.nutrition?.lipid || '-'} g</p>
                        </div>
                        <div className="ligne">
                            <p>{capitalizeFirstLetter(intl.formatMessage({ id: "protein"}))}</p>
                            <p>{data.ingredient_by_pk.nutrition?.protein || '-'} g</p>
                        </div>
                        <div className="ligne">
                            <p>{capitalizeFirstLetter(intl.formatMessage({ id: "water"}))}</p>
                            <p>{data.ingredient_by_pk.nutrition?.water || '-'} g</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

