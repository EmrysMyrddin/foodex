import React from "react";
import { useQuery } from 'urql';
import { ingredient } from "../../data/ingredient";
import { useParams } from 'react-router'

export default function Ingredient(){
	const {id} = useParams()

    const [result] = useQuery({
        query: ingredient,
        variables: {id}
      });

      const { data, fetching, error } = result;

      if (fetching) return <p>Loading...</p>;
      if (error) return <p>Oh no... {error.message}</p>;
      
      console.log('data : ', data)

    return (
        <h1>
            {data.ingredient_by_pk.url_img ? <img src={data.ingredient_by_pk.url_img} alt={data.ingredient_by_pk.name}/> : <></>}
            {data.ingredient_by_pk.name}
        </h1>
    )
}