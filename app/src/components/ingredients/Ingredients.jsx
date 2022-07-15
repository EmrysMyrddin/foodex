import React, { useState } from "react";
import { useQuery } from 'urql';
import { ingredients } from "../../data/ingredient";
import {Link} from 'react-router-dom'
import './ingredients.css'
import * as icons from '../icons'
import { Input, Button, Card } from 'antd';
import capitalizeFirstLetter from "../../helper/helper";

const { Meta } = Card;

export default function Ingredients(){
    const [searchText, setSearchText] = useState()
    const [result] = useQuery({
        query: ingredients,
        variables: searchText,
      });

    const form = <div className="form-container">
                    <form onSubmit={e => {
                        e.preventDefault()
                        setSearchText(e.target.text.value ? {searchText: e.target.text.value} : {})
                    }}>
                        <Input placeholder="Rechercher un ingredient" name='text'/>
                        <Button type="primary" htmlType="submit">Rechercher</Button>
                    </form>
                </div>

    const { data, fetching, error } = result;

    if (fetching) return <>
        {form}
        <div className="ingredients-container">
            <p>Loading...</p>
        </div>
    </>;
    if (error) return <p>Oh no... {error.message}</p>;

    return (
        <>
            {form}
            <div className="ingredients-container">
                {data.ingredient.map(ingredient => (
                    <div key={ingredient.id} className="ingredient">
                        <Link to={`/ingredients/${ingredient.id}`} >
                            <Card
                                hoverable
                                cover={
                                    <>
                                        <div className="label">
                                            {ingredient.isVegetable ? <icons.VeganIcon /> : ingredient.isAnimalProduct ? <icons.VegetarianIcon /> : ''}
                                            <p>{capitalizeFirstLetter(ingredient.name)}</p>
                                        </div>
                                        {ingredient?.url_img ? <img src={ingredient.url_img} alt={ingredient.name}/> : <></>}
                                    </>
                                }
                            >
                                <Meta title={ingredient.nutrition[0]?.calorie ? `${ingredient.nutrition[0]?.calorie} kcal` : ''} />
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}