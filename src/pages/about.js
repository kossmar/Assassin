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
                ABOUT
            </Layout>
        </div>
    )
}