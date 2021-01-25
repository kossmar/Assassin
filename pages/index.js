import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { page } from "../constants"
import dbConnect from '../utils/dBConnect'
import Test from '../models/Test'
import mongoose from 'mongoose'

export default function Home({ tests }) {

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

export async function getServerSideProps() {

  await dbConnect()

  /* find all the data in our database */
  // Test.create({ name: "GINGLE" }, (error, test) => {
  //   console.log(JSON.stringify(test))
  //   // test.save()
  //   console.log(error)
  // });

  

  const result = await Test.find({})
  console.log(result)
  const tests = result.map((doc) => {
    const test = doc.toObject()
    test._id = test._id.toString()
    return test
  })
  tests.push("FUCK")

  return { props: { tests: tests } }
}

