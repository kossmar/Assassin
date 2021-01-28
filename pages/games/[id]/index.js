import React, { useState, useEffect } from 'react'
import Head from "next/head"
import Layout from "../../../components/Layout"
import EditGameDetails from '../../../components/EditGameDetails'
import { page } from "../../../constants"
import Leaderboard from "../../../components/Leaderboard"
import Invite from "../../../components/Invite"
import ChooseRole from '../../../components/ChooseRole'
import AssassinIcon from '../../../components/AssassinIcon'
import { useRouter } from 'next/router'
import useSWR, { mutate, trigger } from 'swr'

const fetcher = (url) =>
    fetch(url)
        .then((res) => res.json())
        .then((json) => json.data)

const ThisGame = () => {

    const router = useRouter()
    const { id } = router.query


    const { data: game, error } = useSWR(id ? `/api/games/6011e8d0d9ae4e35531d5616` : null, fetcher)


    if (error) return <p>Failed to load</p>
    if (!game) return <p>Loading...</p>

    console.log("GAME RENDER: " + JSON.stringify(game))

    return (
        <div>
            <FuckShit gameShit={game} />
        </div>
    )
}

export default ThisGame

// export async function getServerSideProps({ params }) {
//     await dbConnect()

//     const gameData = await Game.findById(params.id)

//     const game = JSON.parse(JSON.stringify(gameData))

//     return { props: { game } }
// }

const FuckShit = ({ gameShit }) => {

    const contentType = 'application/json'

    useEffect(() => {
        setGame(gameShit)
    }, [gameShit])

    const [game, setGame] = useState(gameShit)
    const [isEditing, setIsEditing] = useState(false)


    function handleRoleSelect(id) {
        const name = id
        console.log(name)

        setGame((prevValues) => {
            return({
                ...prevValues,
                creator_role: name
            })
        })
    }

    function updateDetails(e) {
        const target = e.target

        const value = target.value
        const name = target.name

        setGame((prevValues) => {
            return ({
                ...prevValues,
                [name]: value
            })
        })
    }

    function handleEditClick() {
        setIsEditing((prevValue) => {
            return (prevValue ? false : true)
        })
    }


    function handleSaveClick(e) {
        e.preventDefault()


        const updatedGame = {
            ...game,
        }

        if (game.creator_role === 'moderator') {
            updatedGame.moderator = game.creator

            const newAssassins = game.assassins.filter((assassin) => {
                console.log("FILTER assassin.user: " + assassin.user)
                console.log("FILTER game.creator: " + game.creator)

                return assassin.user != game.creator
            })
            updatedGame.assassins = newAssassins

        } else {
            updatedGame.moderator = ''
            updatedGame.assassins = [{ user: game.creator, kills: [] }]
        }

        console.log("STRINGIFY at start of handleSave: \n" + JSON.stringify(updatedGame))

        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            putData(updatedGame)
        } else {
            // setErrors({ errs })
            console.log(errs)
        }
        setIsEditing((prevValue) => {
            return (prevValue ? false : true)
        })
    }

    const formValidate = () => {
        let err = {}
        if (!game.game_name) err.name = 'Game Name is required'
        if (!game.weapons) err.owner_name = 'Weapons are required'
        if (!game.safe_zones) err.species = 'Safe Zones are required'
        return err
    }

    const putData = async (updatedGame) => {

        try {
            const res = await fetch(`/api/games/${game._id}`, {
                method: 'PUT',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(updatedGame),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data } = await res.json()
            mutate(`/api/games/6011e8d0d9ae4e35531d5616`, data, false)


        } catch (error) {
            console.log(error + "    failed to update game")
            // setMessage('Failed to update game')
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
                    <div className='bg-gray-100 space-y-10 py-10 rounded-xl'>
                        <div>
                            <div className='font-bold'>
                                NAME:
                        </div>
                            <div>
                                {game.game_name}
                            </div>
                        </div>

                        <div>
                            <div className='font-bold'>
                                WEAPONS:
                        </div>
                            <div>
                                {game.weapons}
                            </div>
                        </div>

                        <div>
                            <div className='font-bold'>
                                SAFE ZONES:
                        </div>
                            <div>
                                {game.safe_zones}
                            </div>
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
                    <EditGameDetails onChange={updateDetails} details={game} />

                    {/* CHOOSE ROLE */}
                    <ChooseRole onClick={handleRoleSelect} selectedRole={game.creator_role} />

                </div>

                {/* ASSASSINS */}
                <div className='my-10'>
                    <div className='fmt-10 w-2/6 mx-auto text-center font-bold underline'>
                        Assassins
                    </div>
                    <Leaderboard assassins={game.assassins} />
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