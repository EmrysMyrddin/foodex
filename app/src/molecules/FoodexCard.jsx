import React from "react";
import { Card } from 'antd';
import {isMobile} from 'react-device-detect';

const { Meta } = Card;

export default function FoodexCard({cover, img, description}){
    return (
        <>
            <Card
                hoverable
                cover={<>
                    {cover}
                    {!isMobile ? img : <></>}
                </>
                }
            >
                {description && <Meta 
                    description={description}
                />}
            </Card>
        </>
    )
}