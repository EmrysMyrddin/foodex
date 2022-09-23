import React from "react"
import { Card } from "antd"
import { isMobile } from "react-device-detect"

const { Meta } = Card

export default function FoodexCard({ cover, img, description }) {
  return (
    <>
      <Card
        className="shadow-xl shadow-slate-200/25 border-0"
        hoverable
        cover={
          <>
            {cover}
            {!isMobile ? img : <></>}
          </>
        }
      >
        {description && <Meta className="" description={description} />}
      </Card>
    </>
  )
}
