import React, { useState, useEffect } from 'react'
import Head from "next/head"
import Layout from "../../../components/Layout"
import EditGameDetails from '../../../components/EditGameDetails'
import { gameStatus, page } from "../../../constants"
import Leaderboard from "../../../components/Leaderboard"
import Invite from "../../../components/Invite"
import ChooseRole from '../../../components/ChooseRole'
import AssassinIcon from '../../../components/AssassinIcon'
import { useRouter } from 'next/router'
import { saveGame, useGetGame } from '../../../lib/requestHelper'
import { useUser } from '../../../lib/hooks/useUser'
import dbConnect from '../../../utils/dbConnect'
import Game from '../../../models/Game'
import User from '../../../models/User'

const ThisGame = ({ gameDetails }) => {

    const user = useUser({ redirectIfUnauthorized: '/login', redirectWithCookie: '/login' })

    const router = useRouter()
    const { id } = router.query

    const { game, error } = useGetGame(id)

    if (error) return <p>Failed to load</p>
    if (!game) return <p>Loading...</p>

    return (
        <div>
            {/* change it */}
            <GameComponent gameShit={game} gameDetails={gameDetails} />
        </div>
    )
}

export default ThisGame

const GameComponent = ({ gameShit, gameDetails }) => {

    useEffect(() => {
        setGame(gameShit)
    }, [gameShit])

    const [game, setGame] = useState(gameShit)
    const [isEditing, setIsEditing] = useState(false)


    function handleRoleSelect(id) {
        const role = id

        setGame((prevValues) => {
            return ({
                ...prevValues,
                creator_role: role
            })
        })
    }

    function updateDetails(e) {
        const detailInput = e.target

        const detailContent = detailInput.value
        const detailName = detailInput.name

        setGame((prevValues) => {
            return ({
                ...prevValues,
                [detailName]: detailContent
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

            const updatedAssassinsArr = game.assassins.filter((assassin) => {
                return assassin.user != game.creator
            })

            updatedGame.assassins = updatedAssassinsArr
            updatedGame.moderator = game.creator

        } else {
            const updatedAssassinsArr = game.assassins.push({
                user: game.creator,
                kills: []
            })
            updatedGame.assassins = [{ user: game.creator, kills: [] }]
            updatedGame.moderator = ''
        }

        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            saveGame(updatedGame)
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
                        <AssassinIcon name={game.moderator ? gameDetails.moderator.display_name : 'NO MODERATOR'} image='/images/moderator.png' />
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
                    <Leaderboard assassins={gameDetails.assassins} />
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

export async function getServerSideProps({ query }) {

    const gameId = query.id

    await dbConnect()

    const result = await Game.findOne({ _id: gameId })
    const game = result.toObject()
    game._id = game._id.toString()



    if (game.moderator) {
        const moderator = await User.findOne({ _id: game.moderator })

        game.moderator = {
            _id: game.moderator,
            display_name: moderator.display_name
        }

        console.log(game)
    }

    // async function getDisplayNames() {
    //     const assassinsWithName = game.assassins.map(async (a) => {
    //         const foundUser = await User.find({ _id: a._id })
    //         return {
    //             ...a,
    //             display_name: foundUser
    //         }
    //     })

    //     return assassinsWithName
    // }

    // const assassinsWithDisplayName = await getDisplayNames()
    // console.log(assassinsWithDisplayName)


    const assassinIds = game.assassins.map(a => {
        return a.user
    })

    const usersResult = await User.find({ _id: [...assassinIds] })
    console.log("USERS found: " + usersResult)


    const assassinsWithNames = game.assassins.map(a => {
        var assassin
        usersResult.forEach(user => { 
            if (user._id == a.user) {

                assassin = {
                    ...a,
                    display_name: user.display_name
                }
            }
        })
        return assassin
    })

    game.assassins = assassinsWithNames
    console.log("MUNGLE: " + JSON.stringify(game.assassins))

    return {
        props: {
            gameDetails: game
        }
    }

}