import React from "react";
import { useQuery } from 'urql';
import { ingredient } from "../../data/ingredient";
import { useParams } from 'react-router'
import './ingredient.css'
import capitalizeFirstLetter from "../../helper/helper";
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
        <div className="ingredient-container">
            {data.ingredient_by_pk.url_img ? <img src={data.ingredient_by_pk.url_img} alt={data.ingredient_by_pk.name}/> : <></>}
            <div className="ingredient-info">
                <div className="ingredient-title">
                    {data.ingredient_by_pk.isVegetable ? <icons.VeganIcon /> : data.ingredient_by_pk.isAnimalProduct ? <icons.VegetarianIcon /> : ''}
                    <h1>{capitalizeFirstLetter(data.ingredient_by_pk.name)}</h1>
                </div>
                <div>
                    
                    <div className="table">
                        <div className="table-header">
                            <p>{capitalizeFirstLetter(intl.formatMessage({ id: "Valeur pour 100 g"}))}</p>
                        </div>
                        {data.ingredient_by_pk.nutrition.map(({id, calorie, carb, fibre, lipid, protein, water}) => 
                            <div key={id}>
                                <div className="ligne">
                                    <p>{capitalizeFirstLetter(intl.formatMessage({ id: "carb"}))}</p>
                                    <p>{carb} g</p>
                                </div>
                                <div className="ligne">
                                    <p>{capitalizeFirstLetter(intl.formatMessage({ id: "calorie"}))}</p>
                                    <p>{calorie} kcal</p>
                                </div>
                                <div className="ligne">
                                    <p>{capitalizeFirstLetter(intl.formatMessage({ id: "fibre"}))}</p>
                                    <p>{fibre} g</p>
                                </div>
                                <div className="ligne">
                                    <p>{capitalizeFirstLetter(intl.formatMessage({ id: "lipid"}))}</p>
                                    <p>{lipid} g</p>
                                </div>
                                <div className="ligne">
                                    <p>{capitalizeFirstLetter(intl.formatMessage({ id: "protein"}))}</p>
                                    <p>{protein} g</p>
                                </div>
                                <div className="ligne">
                                    <p>{capitalizeFirstLetter(intl.formatMessage({ id: "water"}))}</p>
                                    <p>{water} g</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

