import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks/useUser'
import Layout from '../components/Layout'
import Form from '../components/form'

const Signup = () => {
  // useUser({ redirectTo: '/', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      display_name: e.currentTarget.displayName.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      profile_image: {
        data: null,
        content_type: null
      },
      games: {
        current: [],
        past: []
      }
    }

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`)
      return
    }

    try {

      console.log("FROM SIGNUP PAGE: " + JSON.stringify(body))
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        Router.push('/login')
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
        <div className="w-80 mx-auto p-4 border-gray-300 border rounded-sm">
          <Form isLogin={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
        </div>
      </div>
    </Layout>
  )
}

export default Signup
