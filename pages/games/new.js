import React, { useEffect, useState } from 'react'
import Head from "next/head"
import Layout from "../../components/Layout"
import EditCampaignDetails from '../../components/EditCampaignDetails'
import { page } from "../../constants"
import Link from "next/link"
import AssassinIcon from '../../components/AssassinIcon'
import ChooseRole from '../../components/ChooseRole'

export default function NewCampaign() {
    const id = "test"

    const [selectedRole, setSelectedRole] = useState('')
    const [campaignDetails, setCampaignDetails] = useState({
        campaignName: null,
        weapons: null,
        safeZones: null
    })

    useEffect(() => {
        console.log("DEETS: " + JSON.stringify(campaignDetails))
        console.log("ROLE: " + selectedRole)
    })

    function handleRoleSelect(id) {
        const name = id
        setSelectedRole(name)
    }

    function updateDetails(e) {
        const target = e.target
        
        const value = target.value
        const name = target.name

        setCampaignDetails({
            ...campaignDetails,
            [name]: value
        })
    }

    function handleSave() {

    }


    return (
        <div>
            <Head>
                <title>Assassin/new</title>
            </Head>
            <Layout page={page.rules}>

                <div className='mt-10 w-2/6 mx-auto text-center font-bold'>
                    Murder and mayhem awaits...
                </div>

                {/* EDIT CAMPAIGN DETAILS */}
                <EditCampaignDetails onChange={updateDetails}/>

                {/* CHOOSE ROLE */}
                <ChooseRole onClick={handleRoleSelect} selectedRole={selectedRole}/>

                {/* BUTTONS */}
                <div className='w-2/5 mx-auto space-y-4 my-8'>
                    <div>
                        <Link href={`/games/${id}`}>
                            <button onClick={handleSave} className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-blue-200 hover:border-black text-white font-bold bg-blue-500'>
                                SAVE
                            </button>
                        </Link>
                    </div>
                </div>
            </Layout>
        </div>
    )
}