import Head from "next/head"
import Layout from "../common/components/Layout"
import { page } from '../common/constants'

export default function Rules() {

    return (
        <div>
            <Head>
                <title>Assassin/rules</title>
            </Head>
            <Layout page={page.rules}>
                RULES
            </Layout>
        </div>
    )
}