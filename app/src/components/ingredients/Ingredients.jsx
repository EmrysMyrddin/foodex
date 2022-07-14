import React from "react";
import { useQuery } from 'urql';
import { ingredients } from "../../data/ingredient";
import {Link} from 'react-router-dom'
import './ingredients.css'

export default function Ingredients(){
    const [result] = useQuery({
        query: ingredients,
      });

      const { data, fetching, error } = result;

      if (fetching) return <p>Loading...</p>;
      if (error) return <p>Oh no... {error.message}</p>;

      console.log('data : ', data)

    return (
        <div className="ingredients-container">
            {data.ingredient.map(ingredient => (
                <div key={ingredient.id} className="ingredient">
                    <Link to={`/ingredients/${ingredient.id}`} >
                        {ingredient?.url_img ? <img src={ingredient.url_img} alt={ingredient.name}/> : <></>}
                        {ingredient.name}
                    </Link>
                </div>
            ))}
        </div>
    )
}