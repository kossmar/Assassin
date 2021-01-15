import Head from "next/head"
import Layout from "../components/Layout"
import { thing } from "../constants"

export default function Rules() {
    return (
        <div>
            <Head>
                <title>Assassin/rules</title>
            </Head>
            <Layout page={thing.rules}>
                DICKS
            </Layout>
        </div>
    )
}