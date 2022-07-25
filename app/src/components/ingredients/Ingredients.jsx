import React, { useState } from "react";
import { useQuery, useMutation } from 'urql';
import { ingredients, insert_one_ingredient } from "../../data/ingredient";
import {Link} from 'react-router-dom'
import './ingredients.css'
import * as icons from '../icons'
import {useIntl} from 'react-intl'
import { Input, Button, Card, Modal, Select } from 'antd';
import {capitalizeFirstLetter, toIcon} from "../../helper/helper";
import { categories } from "../../data/category";
import { saison } from "../icons/saison";
import { diets } from "../../data/diet";
import { saisons } from "../../data/saison";
import {PlusOutlined} from '@ant-design/icons'

const { Meta } = Card;

const { Option } = Select;

export default function Ingredients(){
    const intl = useIntl()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalAddVisible, setIsModalAddVisible] = useState(false);
    const [addIngredientCategory, setAddIngredientCategory] = useState()
    const [addIngredientName, setAddIngredientName] = useState()
    const [addIngredientUrl, setAddIngredientUrl] = useState()
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

    const showModalAdd = () => {
      setIsModalAddVisible(true);
    };

    const [resultAdd, insertIngredient] = useMutation(insert_one_ingredient)
    
    const handleOkAdd = async () => {
        await insertIngredient({category_id: addIngredientCategory, name: addIngredientName, url_img: addIngredientUrl})
        setIsModalAddVisible(false);
    };
  
    const handleCancelAdd = () => {
      setIsModalAddVisible(false);
    };

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

    const handleChangeCategory = (value: string[]) => {
        const {_or, ...allVariables} = variables || {}
        const other = _or && _or.filter(o => o !== {})
        if (value.length !== 0) {
            allVariables._or = value.map(v =>({
                category: {id: {_eq: v}}
            }))
         }
        other && other.filter(o => o !== {}).map(o => allVariables?._or?.push(o))
        setVariables(allVariables)
    };

    const handleChangeSaison = (value: string[]) => {
        const {_or, ...allVariables} = variables || {}
        const other = _or && _or.filter(o => o !== {})
        if (value.length !== 0) {
            allVariables._or = value.map(v =>({
                _or: [
                    {saison_ingredients: {saison_id: {_eq: v}}},
                    {saison_ingredients: {saison_id: {_eq: saisonsData.saison.filter(dat => dat.name === "all-year")[0].id}}}
                ]
            }))
         }
        other && other.filter(o => o !== {}).map(o => allVariables?._or?.push(o))
        setVariables(allVariables)
    };

    const onSubmit = (e) => {
        e.preventDefault()
        const {name, ...allVariables} = variables 
        if (e.target.text.value) allVariables.name = {_ilike: e.target.text.value}
        setVariables(allVariables)
    }

    const [{ data: categoriesData, fetching: categoriesFetching, error: categoriesError }] = useQuery({
        query: categories,
    });

    const [{ data: saisonsData, fetching: saisonsFetching, error: saisonsError }] = useQuery({
        query: saisons,
    });

    const [{ data, fetching, error }] = useQuery({
        query: ingredients,
        variables: variables ? {where: variables} : undefined,
      });

      const [{ data: dietData, fetching: dietFetching, error: dietError }] = useQuery({
          query: diets,
        });

    const form = <div className="form-container">
        <div className="filter-search">
            <form onSubmit={onSubmit}>
                <Input placeholder="Rechercher un ingredient" name='text'/>
                <Button type="primary" htmlType="submit">Rechercher</Button>
            </form>
            <icons.FilterIcon onClick={showModal}/>
            <Modal title="Filtre pour les ingredients" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
                    <Select
                        loading={categoriesFetching}
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Catégorie alimentaire"
                        onChange={handleChangeCategory}
                        >
                            {categoriesData?.category?.map(cat => <Option key={cat.id}>{capitalizeFirstLetter(intl.formatMessage({id: cat.name}))}</Option>)}
                    </Select>
                    <Select
                        loading={saisonsFetching}
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Saisonalité alimentaire"
                        onChange={handleChangeSaison}
                        >
                            {saisonsData?.saison?.map(sai => <Option key={sai.id}>{capitalizeFirstLetter(intl.formatMessage({id: sai.name}))}</Option>)}
                        </Select>
                </div>
            </Modal>
        </div>
    </div>

    if (fetching && categoriesFetching && saisonsFetching) return <>
        {form}
        <div className="ingredients-container">
            <p>Loading...</p>
        </div>
    </>;
    if (error || categoriesError || dietError || saisonsError) return <p>Oh no... {error.message || categoriesError.message || dietError.message || saisonsError.message}</p>;

    const addIngredient = 
    <Modal title="Ajouter un ingredient" visible={isModalAddVisible} onOk={handleOkAdd} onCancel={handleCancelAdd}>
            <Input placeholder="Nom de l'ingredient" onChange={e => setAddIngredientName(e.target.value)}/>
            <Input placeholder="Image de l'ingredient" onChange={e => setAddIngredientUrl(e.target.value)}/>
            <Select
                loading={categoriesFetching}
                allowClear
                style={{ width: '100%' }}
                placeholder="Catégorie alimentaire"
                onChange={setAddIngredientCategory}
                >
                    {categoriesData?.category?.map(cat => <Option key={cat.id}>{capitalizeFirstLetter(intl.formatMessage({id: cat.name}))}</Option>)}
            </Select>
            <Select
                loading={saisonsFetching}
                allowClear
                style={{ width: '100%' }}
                placeholder="Saisonalité alimentaire"
                onChange={handleChangeSaison}
                >
                    {saisonsData?.saison?.map(sai => <Option key={sai.id}>{capitalizeFirstLetter(intl.formatMessage({id: sai.name}))}</Option>)}
            </Select>
    </Modal>

    return (
        <>
            {form}
            {addIngredient}
            <div className="container">
                {data?.ingredient.map(ingredient => (
                    <div key={ingredient.id} className="grid">
                        <Link to={`/ingredients/${ingredient.id}`} >
                            <Card
                                hoverable
                                cover={
                                    <>
                                        <div className="label">
                                            {ingredient.category.diet_category.diet.name === 'vegan' ? <icons.VeganIcon /> : ingredient.category.diet_category.diet.name === 'vegetarian' ? <icons.VegetarianIcon /> : ''}
                                            <p>{capitalizeFirstLetter(ingredient.name)}</p>
                                        </div>
                                        {ingredient?.url_img ? <img src={ingredient.url_img} alt={ingredient.name}/> : <></>}
                                    </>
                                }
                            >
                                <Meta 
                                    description={
                                        <div className="icons">
                                            {toIcon(ingredient.category?.name)} 
                                            {saison(
                                                ingredient?.saison_ingredients?.map(s => s.saison.name).includes('spring') ||
                                                ingredient?.saison_ingredients?.map(s => s.saison.name).includes('all-year'), 
                                                ingredient?.saison_ingredients?.map(s => s.saison.name).includes('summer') ||
                                                ingredient?.saison_ingredients?.map(s => s.saison.name).includes('all-year'), 
                                                ingredient?.saison_ingredients?.map(s => s.saison.name).includes('fall') ||
                                                ingredient?.saison_ingredients?.map(s => s.saison.name).includes('all-year'), 
                                                ingredient?.saison_ingredients?.map(s => s.saison.name).includes('winter') ||
                                                ingredient?.saison_ingredients?.map(s => s.saison.name).includes('all-year')
                                            )}
                                        </div>
                                    }
                                />
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="add"><Button  onClick={showModalAdd} type="primary" size="large" shape="circle" icon={<PlusOutlined />} /></div>
        </>
    )
}