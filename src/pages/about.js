import Head from "next/head"
import Layout from "../common/components/Layout"
import { page } from '../constants'

export default function Rules() {

    return (
        <div>
            <Head>
                <title>Assassin/rules</title>
            </Head>
            <Layout page={page.about}>
                <div className='py-10 px-5'>
                    <p className='text-center text-gray-600'>
                        I played this game in highschool and it was pretty fun. I also needed a premise for a react project to prove that I'm not wildly incompetent.
                    </p>
                </div>
            </Layout>
        </div>
    )
}