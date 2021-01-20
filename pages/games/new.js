import Head from "next/head"
import Layout from "../../components/Layout"
import EditCampaignDetails from '../../components/EditCampaignDetails'
import { page } from "../../constants"
import Leaderboard from "../../components/Leaderboard"

export default function Rules() {
    return (
        <div>
            <Head>
                <title>Assassin/new</title>
            </Head>
            <Layout page={page.rules}>
                <div className='mt-10 w-2/6 mx-auto text-center font-bold'>
                    Murder and mayhem awaits...
                </div>
                <EditCampaignDetails />
                <div>
                    <div className='fmt-10 w-2/6 mx-auto text-center font-bold underline'>Assassins</div>
                    <Leaderboard />
                </div>
            </Layout>
        </div>
    )
}