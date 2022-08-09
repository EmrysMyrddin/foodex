import React from "react"
import { Button, Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { isMobile } from "react-device-detect"

export default function FoodexSearch({ onSearch, placeholder, button }) {
  const onSubmit = (e) => {
    e.preventDefault()
    onSearch(e.target.text.value)
  }

  return (
    <form onSubmit={onSubmit}>
      <Input placeholder={placeholder} name="text" />
      {!isMobile ? (
        <Button type="primary" htmlType="submit">
          {button}
        </Button>
      ) : (
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}></Button>
      )}
    </form>
  )
}
