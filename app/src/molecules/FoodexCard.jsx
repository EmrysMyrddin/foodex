import React from "react"
import { Card } from "antd"
import { isMobile } from "react-device-detect"
import "./foodexCard.css"

const { Meta } = Card

export default function FoodexCard({ cover, img, description }) {
  return (
    <>
      <Card
        className="shadow-xl shadow-slate-200/25 border-0 foodex-card"
        hoverable
        cover={
          <>
            {cover}
            {!isMobile ? img : <></>}
          </>
        }
      >
        {description && <Meta description={description} />}
      </Card>
    </>
  )
}
