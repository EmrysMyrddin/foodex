import { Button, Checkbox, Select, Spin } from "antd"
import React, { useState } from "react"
import { useQuery } from "urql"
import { users, user_by_pk } from "../../data/user"
import "./account.css"

const { Option } = Select

export default function Account() {
  const [value, setValue] = useState()
  const [, setVariables] = useState()

  const [{ data: dataUsers, fetching: fetchingUsers, error: errorUsers }] = useQuery({
    query: users,
    variables: { where: { _not: { id: { _eq: localStorage.userId } } } },
  })

  const [result] = useQuery({
    query: user_by_pk,
    variables: { id: localStorage.userId },
  })

  const { data, fetching, error } = result

  if (fetching || fetchingUsers) return <Spin />
  if (error || errorUsers) return <p>Oh no... {error.message}</p>

  const handleSearch = (newValue) => {
    setVariables(newValue)
  }

  const handleChange = (newValue) => {
    setValue(dataUsers.user)
  }

  const options = dataUsers.user.map((d) => (
    <Option key={d.id}>
      <strong>{d.username.toUpperCase()}</strong>
      {`#${d.id.split("-")[0]}`}
    </Option>
  ))

  return (
    <div id="account">
      <h1>{`${data.user_by_pk.username.toUpperCase()}#${localStorage.userId.split("-")[0]}`}</h1>
      <div id="share">
        <Select
          showSearch
          value={value}
          placeholder="Je souhaite partager mes recettes avec"
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={handleSearch}
          onChange={handleChange}
          notFoundContent={null}
        >
          {options}
        </Select>
        <div>
          <Checkbox>Permettre les modifications</Checkbox>
          <Checkbox>Permettre de voir les listes de courses</Checkbox>
        </div>
        <Button type="primary" block>
          Rechercher
        </Button>
      </div>
      <div id="resume">
        <div>
          {data.user_by_pk.sharedBy.length > 0 && (
            <>
              <p>Ils ont partagé leurs recettes avec vous : </p>
              {data.user_by_pk.sharedBy.map((person) => (
                <p key={person.id}>{person.sharedBy.username.toUpperCase()}</p>
              ))}
            </>
          )}
        </div>
        <div>
          {data.user_by_pk.sharingWith.length > 0 && (
            <>
              <p>Vos recettes sont partagées avec : </p>
              {data.user_by_pk.sharingWith.map((person) => (
                <p key={person.id}>{person.sharedTo.username.toUpperCase()}</p>
              ))}
            </>
          )}
        </div>
      </div>
      <div id="logout-container">
        <Button type="primary" block id="logout">
          Déconnexion
        </Button>
      </div>
    </div>
  )
}
