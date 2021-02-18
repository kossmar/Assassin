import { useState } from 'react'
import Router from 'next/router'

import Layout from '../components/Layout'
import Form from '../components/form'

const Login = () => {

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    }


    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        // If Redirect Cookie, pull out path, delete cookie redirect to path specified else :
        Router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

  return (
    <Layout>
      <div className="pt-16">
        <div className="w-80 mx-auto p-4 border-gray-300 border rounded-lg">
          <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
        </div>
      </div>

    </Layout>
  )
}

export default Login
