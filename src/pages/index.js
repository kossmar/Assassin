import Head from 'next/head'
import { useEffect } from 'react'
import Layout from '../common/components/Layout'
import { page } from "../constants"
import { useUser } from '../modules/auth/hooks/useUser'

export default function Home({ props }) {
  
  const user = useUser()

  useEffect(() => {

  }, [])

  return (
    <div>
      <Head>
        <title>Assassin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout page={page.home} user={user}>
        <div className="flex justify-center py-20 w-3/5 mx-auto">
          <img className="max-w-xs sm:max-w-sm lg:max-w-md" src="/images/the-assassin-game-logo.png" />
        </div>
        <div className="flex justify-center w-2/5 mx-auto pb-16">
          <img className="max-w-xs sm:max-w-sm lg:max-w-md" src="/images/assassin-circle.png" />
        </div>
      </Layout>
    </div>
  )
}


