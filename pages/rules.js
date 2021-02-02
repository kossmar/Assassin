import Head from "next/head"
import Layout from "../components/Layout"
import { page } from "../constants"
import { useUser } from "../lib/hooks/useUser"

export default function Rules() {

    return (
        <div>
            <Head>
                <title>Assassin/rules</title>
            </Head>
            <Layout page={page.rules}>
                DICKS
            </Layout>
        </div>
    )
}