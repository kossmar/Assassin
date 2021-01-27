import React, { useState, useEffect } from 'react'
import Head from "next/head"
import Layout from "../../components/Layout"
import EditGameDetails from '../../components/EditGameDetails'
import { page } from "../../constants"
import Leaderboard from "../../components/Leaderboard"
import Invite from "../../components/Invite"
import ChooseRole from '../../components/ChooseRole'
import dbConnect from '../../utils/dBConnect'
import Game from '../../models/Game'
import AssassinIcon from '../../components/AssassinIcon'
import useSWR from 'swr'
import {useRouter} from 'next/router'


const fetcher = (url) =>
fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

export default function ThisGame({ game }) {
    // const router = useRouter()
    // const { id } = router.query
    // console.log(id)
    // const { data: game2, error } = useSWR(id ? `/api/games/${id}` : null, fetcher)
    // console.log(game2)
    // console.log("ERROR: " + error)

    // if (error) return <p>Failed to load</p>
    // if (!game2) return <p>Loading...</p>

    const [selectedRole, setSelectedRole] = useState(!game.moderator ? 'assassin' : 'moderator')
    const [gameDetails, setGameDetails] = useState({
        game_name: game.game_name,
        weapons: game.game_name,
        safe_zones: game.safe_zones
    })
    const [isEditing, setIsEditing] = useState(false)

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

    function handleEditClick() {
        setIsEditing((prevValue) => {
            return (prevValue ? false : true)
        })
    }

    function handleSaveClick() {
        setIsEditing((prevValue) => {
            return (prevValue ? false : true)
        })
    }

    const putData = async (form) => {
        const { id } = router.query

        try {
            const res = await fetch(`/api/pets/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data } = await res.json()

            mutate(`/api/pets/${id}`, data, false) // Update the local data without a revalidation
            router.push('/')
        } catch (error) {
            setMessage('Failed to update pet')
        }
    }

    return (
        <div>
            <Head>
                <title>Assassin/new</title>
            </Head>
            <Layout page={page.rules}>
                <section id="top">

                </section>
                <div className='mt-10 w-2/6 mx-auto text-center font-bold'>
                    Murder and mayhem awaits...
                </div>


                {/* GAME DETAILS */}
                <div className={'w-96 mx-auto py-16 space-y-10 text-center ' + (isEditing ? 'hidden' : 'block')}>
                    <div>
                        <div>
                            NAME:
                        </div>
                        <div>
                            {gameDetails.game_name}
                        </div>
                    </div>

                    <div>
                        <div>
                            WEAPONS:
                        </div>
                        <div className='text-center'>
                            {gameDetails.weapons}
                        </div>
                    </div>

                    <div>
                        <div>
                            SAFE ZONES:
                        </div>
                        <div className='text-center'>
                            {gameDetails.safe_zones}
                        </div>
                    </div>

                    {/* MODERATOR */}
                    <div className='my-10'>
                        <div className='fmt-10 w-2/6 mx-auto text-center font-bold underline'>
                            Moderator
                    </div>
                        <AssassinIcon name={game.moderator ? game.moderator : 'NO MODERATOR'} image='/images/moderator.png' />
                    </div>

                </div>


                {/* EDIT GAME DETAILS */}
                <div className={(isEditing ? 'block' : 'hidden')}>

                    {/* Name, Weapons, Safe Zones */}
                    <EditGameDetails onChange={updateDetails} details={gameDetails} />

                    {/* CHOOSE ROLE */}
                    <ChooseRole onClick={handleRoleSelect} selectedRole={selectedRole} />

                </div>

                {/* ASSASSINS */}
                <div className='my-10'>
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

                    {/* EDIT  */}
                    <div className={(isEditing ? 'hidden' : 'block')}>
                        <a href='#top'>
                            <button onClick={handleEditClick} className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-blue-200 hover:border-black text-white font-bold bg-blue-500'>
                                EDIT
                            </button>
                        </a>
                    </div>

                    {/* SAVE */}
                    <div className={(isEditing ? 'block' : 'hidden')}>
                        <a href='#top'>
                            <button onClick={handleSaveClick} className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-blue-200 hover:border-black text-white font-bold bg-blue-500'>
                                SAVE
                            </button>
                        </a>
                    </div>

                    {/* BEGIN */}
                    <div>
                        <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-green-200 hover:border-black text-white font-bold bg-green-500'>BEGIN</button>
                    </div>

                    {/* DELETE */}
                    <div>
                        <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-red-200 hover:border-black text-white font-bold bg-red-500'>DELETE</button>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    await dbConnect()

    const gameData = await Game.findById(params.id)

    const game = JSON.parse(JSON.stringify(gameData))

    return { props: { game } }
}