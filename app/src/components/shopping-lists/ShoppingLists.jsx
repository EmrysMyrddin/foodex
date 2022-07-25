import React from "react"
import { shoppingLists } from "../../data/shopping-lists";
import { useQuery } from "urql";
import { Spin, Card } from 'antd'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter } from "../../helper/helper";

export default function ShoppingLists(){
    const [result] = useQuery({
        query: shoppingLists
    });

    const { data, fetching, error } = result;

    if (fetching) return <Spin />;
    if (error) return <p>Oh no... {error.message}</p>;

    return <div>{data.shopping_list?.map(sl => (
        <div key={sl.id}>
            <Link to={`/shopping-lists/${sl.id}`} className="grid" >
                <Card
                    size="small"
                    hoverable
                    cover={
                        <>
                            <div className="label">     
                                <p>{capitalizeFirstLetter(sl.name)} ({sl.recipes.length} recettes)</p>
                            </div>
                            <img src={`https://lorempokemon.fakerapi.it/pokemon/500/958`} alt={sl.name}/>
                        </>
                    }
                />
            </Link>
        </div>
    ))}</div>
}