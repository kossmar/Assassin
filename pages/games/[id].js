import React, { useState, useEffect } from 'react'
import Head from "next/head"
import Layout from "../../components/Layout"
import EditGameDetails from '../../components/EditGameDetails'
import { page } from "../../constants"
import Leaderboard from "../../components/Leaderboard"
import Invite from "../../components/Invite"
import Link from "next/link"
import ChooseRole from '../../components/ChooseRole'


export default function Game() {
    const id = "test"

    const [selectedRole, setSelectedRole] = useState('')
    const [gameDetails, setGameDetails] = useState({
        gameName: '',
        weapons: '',
        safeZones: ''
    })

    useEffect(() => {
        console.log("DEETS: " + JSON.stringify(gameDetails))
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

        setGameDetails({
            ...gameDetails,
            [name]: value
        })
    }

    function handleSave() {
        console.log("SAVE")
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

                {/* EDIT GAME DETAILS */}
                <EditGameDetails onChange={updateDetails} details={gameDetails} />

                {/* CHOOSE ROLE */}
                <ChooseRole onClick={handleRoleSelect} selectedRole={selectedRole} />

                {/* ASSASSINS */}
                <div>
                    <div className='fmt-10 w-2/6 mx-auto text-center font-bold underline'>
                        Assassins
                    </div>
                    <Leaderboard />
                </div>

                {/* INVITES */}
                <div>
                    <div>
                        <Invite />
                    </div>
                    <div>
                        <Invite isForAssassins={false} />
                    </div>
                </div>


                {/* BUTTONS */}
                <div className='w-2/5 mx-auto space-y-4 my-8'>
                    <div>
                        <Link href={`/games/[${id}]`}>
                            <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-blue-200 hover:border-black text-white font-bold bg-blue-500'>
                                SAVE
                            </button>
                        </Link>
                    </div>
                    <div>
                        <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-green-200 hover:border-black text-white font-bold bg-green-500'>BEGIN</button>
                    </div>
                    <div>
                        <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-red-200 hover:border-black text-white font-bold bg-red-500'>DELETE</button>
                    </div>
                </div>
            </Layout>
        </div>
    )
}