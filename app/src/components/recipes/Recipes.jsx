import React, { useState } from "react";
import { useQuery } from 'urql';
import { recipes } from "../../data/recipes";
import { Link } from 'react-router-dom'
import {useIntl} from 'react-intl'
import {Spin, Empty, Card, Tag, Select, Input, Button, Modal} from "antd"
import { capitalizeFirstLetter } from "../../helper/helper";
import * as icons from '../icons'
import { diets } from "../../data/diet";

const { Option } = Select;

export default function Recipes(){
    const intl = useIntl()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [variables, setVariables] = useState()

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const onSubmit = (e) => {
        e.preventDefault()
        const {name, ...allVariables} = variables 
        if (e.target.text.value) allVariables.name = {_ilike: e.target.text.value}
        setVariables(allVariables)
    }

    const handleChangeDiet = (value: string[]) => {
        const {_or, ...allVariables} = variables || {}
        const other = _or && _or.filter(o => o !== {})
        if (value.length !== 0) {
            allVariables._or = value.map(v =>({
                diet: {id: {_eq: v}}
            }))
        }
        other && other.filter(o => o !== {}).map(o => allVariables?._or?.push(o))
        setVariables(allVariables)
    };
    const [{ data: dietData, fetching: dietFetching, error: dietError }] = useQuery({
        query: diets,
      });


    const [{ data: recipesData, fetching: recipesFetching, error: recipesError }] = useQuery({
        query: recipes,
    });

    const form = <div className="form-container">
        <div className="filter-search">
            <form onSubmit={onSubmit}>
                <Input placeholder="Rechercher un recettes" name='text'/>
                <Button type="primary" htmlType="submit">Rechercher</Button>
            </form>
            <icons.FilterIcon onClick={showModal}/>
            <Modal title="Filtre pour les recettes" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <Select
                        loading={dietFetching}
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Régime alimentaire"
                        onChange={handleChangeDiet}
                        >
                            {dietData?.diet?.map(d => <Option key={d.id} >{capitalizeFirstLetter(intl.formatMessage({id: d.name}))}</Option>)}
                    </Select>
                </div>
            </Modal>
        </div>
    </div>

    if (recipesFetching) return <Spin />

    if (recipesError) return <p>{recipesError.message}</p>
    
    return <div>
        {form}
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
                        >
                            {recipe.tag_recipes.length > 0 && <div>
                                {recipe.tag_recipes.map(tag => <Tag color="magenta">{tag.tag.name}</Tag>)}
                            </div>}
                        </Card>
                    </Link>
                </div>
            ))}
        </div>}
    </div>
}