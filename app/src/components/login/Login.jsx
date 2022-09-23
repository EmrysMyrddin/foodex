import React, { useState } from "react"
import { login } from "../../data/users"
import { client } from "../../data/client"
import { useNavigate } from "react-router-dom"
import { Button, Input, Form } from "antd"

export default function Login() {
  const navigate = useNavigate()

  const [u, setU] = useState()
  async function handleLogin(event) {
    const { data, error } = await client
      .query(login, {
        password: event.password,
        username: event.username,
      })
      .toPromise()

    setU(error)

    localStorage.token = data.login.token
    localStorage.userId = data.login.userId
    if (localStorage.token) navigate("/ingredients", { replace: true })
  }

  return (
    <div className="md:mt-10 mt-20 h-screen w-screen flex justify-center items-start m-0">
      <div className="p-4 rounded-lg bg-slate-200/25 shadow-xl shadow-slate-200/50">
        <h1 className="text-3xl font-semibold	flex justify-center">Connexion</h1>
        <Form
          className="flex flex-col gap-3 m-0 p-0 md:w-96 w-60"
          onFinish={(e) => {
            handleLogin(e)
          }}
        >
          <Form.Item
            className="m-0"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          {/* <Input name="username" /> */}
          {/* <Input type="password" name="password" className="m-0" /> */}
          <a className="" href="./#">
            Mot de passe oublié
          </a>
          <Form.Item>
            <Button
              block
              htmlType="submit"
              className="bg-blue-600/50 hover:bg-slate-100/25 p-1 text-white hover:text-blue-600 hover:border-blue-600"
            >
              Se connecter
            </Button>
          </Form.Item>
          {u?.message}
        </Form>
      </div>
    </div>
  )
}
