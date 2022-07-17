import React, { useState } from "react";
import { useQuery } from 'urql';
import { ingredients } from "../../data/ingredient";
import {Link} from 'react-router-dom'
import './ingredients.css'
import * as icons from '../icons'
import {useIntl} from 'react-intl'
import { Input, Button, Card, Modal, Select } from 'antd';
import {capitalizeFirstLetter, toIcon} from "../../helper/helper";
import { categories } from "../../data/category";
import { saison } from "../icons/saison";

const { Meta } = Card;

const { Option } = Select;

export default function Ingredients(){
    const intl = useIntl()
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
    };

    const [searchText, setSearchText] = useState()

    const [{ data: categoriesData, fetching: categoriesFetching, error: categoriesError }] = useQuery({
        query: categories,
    });

    const [{ data, fetching, error }] = useQuery({
        query: ingredients,
        variables: searchText,
      });

    const form = <div className="form-container">
        <div className="filter-search">
            <form onSubmit={e => {
                e.preventDefault()
                setSearchText(e.target.text.value ? {searchText: e.target.text.value} : {})
            }}>
                <Input placeholder="Rechercher un ingredient" name='text'/>
                <Button type="primary" htmlType="submit">Rechercher</Button>
            </form>
            <icons.FilterIcon onClick={showModal}/>
            <Modal title="Filtre pour les ingredients" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Régime alimentaire"
                        onChange={handleChange}
                        >
                            <Option key='vegan'>{capitalizeFirstLetter(intl.formatMessage({id: "vegan"}))}</Option>
                            <Option key='vegetarian'>{capitalizeFirstLetter(intl.formatMessage({id: "vegetarian"}))}</Option>
                    </Select>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Catégorie alimentaire"
                        onChange={handleChange}
                        >
                            {categoriesData?.category?.map(cat => <Option key={cat.id}>{capitalizeFirstLetter(intl.formatMessage({id: cat.name}))}</Option>)}
                    </Select>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Saisonalité alimentaire"
                        onChange={handleChange}
                        >
                            <Option key='spring'>{capitalizeFirstLetter(intl.formatMessage({id: "spring"}))}</Option>
                            <Option key='summer'>{capitalizeFirstLetter(intl.formatMessage({id: "summer"}))}</Option>
                            <Option key='fall'>{capitalizeFirstLetter(intl.formatMessage({id: "fall"}))}</Option>
                            <Option key='winter'>{capitalizeFirstLetter(intl.formatMessage({id: "winter"}))}</Option>
                    </Select>
                </div>
            </Modal>
        </div>
    </div>

    if (fetching && categoriesFetching) return <>
        {form}
        <div className="ingredients-container">
            <p>Loading...</p>
        </div>
    </>;
    if (error || categoriesError) return <p>Oh no... {error.message || categoriesError.message}</p>;

    return (
        <>
            {form}
            <div className="ingredients-container">
                {data?.ingredient.map(ingredient => (
                    <div key={ingredient.id} className="ingredient">
                        <Link to={`/ingredients/${ingredient.id}`} >
                            <Card
                                hoverable
                                cover={
                                    <>
                                        <div className="label">
                                            {ingredient.diet.name === 'vegetable' ? <icons.VeganIcon /> : ingredient.diet.name === 'animal product' ? <icons.VegetarianIcon /> : ''}
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
        </>
    )
}