import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Assassin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout page="home">
        <div className="flex justify-center py-20">
          <img className="max-w-xs sm:max-w-sm lg:max-w-md" src="/images/the-assassin-game-logo.png" />
        </div>
      </Layout>
    </div>
  )
}
