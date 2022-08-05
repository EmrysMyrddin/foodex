import React, { useState } from "react";
import { useQuery } from 'urql';
import { recipes } from "../../data/recipes";
import { useIntl } from 'react-intl'
import { Spin, Empty } from "antd"
import { capitalizeFirstLetter } from "../../helper/helper";
import { diets } from "../../data/diet";
import FoodexGrid from "../../organisms/FoodexGrid";
import RecipesItem from "../../molecules/Item/RecipesItem";
import FoodexSearchFilter from "../../organisms/FoodexSearchFilter";
import RecipesModal from "../../molecules/Modal/RecipesModal";

export default function Recipes(){
    const intl = useIntl()
    const [variables, setVariables] = useState()

    const onSubmit = (value) => {
        const {name, ...allVariables} = variables || {}
        if (value) allVariables.name = {_ilike: value}
        setVariables(allVariables)
    }

    const [{ data: recipesData, fetching: recipesFetching, error: recipesError }] = useQuery({
        query: recipes,
        variables: variables ? {where: variables} : undefined,
    });

    const form = <FoodexSearchFilter
        onSearch={onSubmit} 
        placeholder='Rechercher une recette' 
        button='Rechercher'
        Modal={RecipesModal}
        setVariables={setVariables}
        variables={variables}
    />

    if (recipesFetching) return <>
        {form}
        <div className="ingredients-container">
            <Spin/>
        </div>
    </>

    if (recipesError) return <p>{recipesError.message}</p>
    
    return <div>
        {form}
        {recipesData.recipe.length === 0 ? <Empty/> : 
            <FoodexGrid
                list={recipesData.recipe}
                link='/recipes/'
                Item={RecipesItem}
            />
        }
    </div>
}