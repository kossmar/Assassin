import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { page } from "../constants"
import dbConnect from '../utils/dBConnect'
import mongoose from 'mongoose'

export default function Home({ props }) {

  useEffect(() => {

  }, [])

  return (
    <div>
      <Head>
        <title>Assassin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout page={page.home}>
        <div className="flex justify-center py-20">
          <img className="max-w-xs sm:max-w-sm lg:max-w-md" src="/images/the-assassin-game-logo.png" />
        </div>
        <div className="flex justify-center">
          <img className="max-w-xs sm:max-w-sm lg:max-w-md" src="/images/assassin-circle.png" />
        </div>
      </Layout>
    </div>
  )
}

// export async function getServerSideProps() {

//   await dbConnect()


// }

