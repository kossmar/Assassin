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
import { saveGame, getAssassinNames, getModeratorNames, deleteGame, sendJoinRequest, getRequestUserNames, leaveGame } from '../../../lib/game-worker'
import { useGame } from '../../../lib/hooks/useGame'
import { useUser } from '../../../lib/hooks/useUser'
import ConfirmationPopup from '../../../components/ConfirmationPopup'
import JoinRequest from '../../../components/JoinRequest'



const ThisGame = () => {

    const user = useUser({ redirectIfUnauthorized: '/login' })

    const router = useRouter()
    const { id } = router.query

    const { gameResult, error } = useGame(id)

    if (error) return <p>Failed to load</p>
    if (!gameResult || !user) return <p>Loading...</p>

    console.log("Game returned from useGame on game page")
    console.log(gameResult)
    return (
        <div>
            <GameComponent key={gameResult._id} gameResult={gameResult} user={user} />
        </div>
    )
}

export default ThisGame
const GameComponent = ({ gameResult, user }) => {

    useEffect(() => {
        setHasJoined(false)

        if (gameResult.creator === user._id) {
            setIsCreator(true)
        }

        gameResult.assassins.forEach((assassin) => {
            if (user._id === assassin.user) setHasJoined(true)
        })

        gameResult.join_requests.forEach(userId => {

            if (user._id === userId) setHasRequestedJoin(true)
        })

        if (gameResult.moderators.length > 0) {
            gameResult.moderators.forEach((moderatorId) => {

                if (user._id === moderatorId) {
                    setIsModerator(true)
                    setHasJoined(true)
                }
            })

            getModeratorNames(gameResult.moderators)
                .then(modifiedModerators => {
                    setGame(prevValue => {
                        return {
                            ...prevValue,
                            moderators: modifiedModerators
                        }
                    })
                })
        } else {
            setGame(gameResult)
        }

        if (gameResult.assassins.length > 0) {

            getAssassinNames(gameResult.assassins)
                .then(assassinsWithNames => {
                    setGame(prevValue => {
                        return {
                            ...prevValue,
                            assassins: assassinsWithNames
                        }
                    })
                })
        }

        if (gameResult.join_requests.length > 0) {
            getRequestUserNames(gameResult.join_requests)
                .then(usersWithNames => {
                    setGame(prevValue => {
                        return {
                            ...prevValue,
                            join_requests: usersWithNames
                        }
                    })
                })
        } else {
            setGame(gameResult)
        }

    }, [gameResult, user])

    const [game, setGame] = useState(gameResult)
    const [isEditing, setIsEditing] = useState(false)
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
    const [isModerator, setIsModerator] = useState(false)
    const [hasJoined, setHasJoined] = useState(false)
    const [hasRequestedJoin, setHasRequestedJoin] = useState(false)
    const [isCreator, setIsCreator] = useState(false)


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

        //TODO: This won't work with multiple moderators!
        //Probably just change game.creator to user._id

        if (game.creator_role === 'moderator') {
            const updatedModeratorsArr = game.moderators
            updatedModeratorsArr.push(game.creator)

            const updatedAssassinsArr = game.assassins.filter((assassin) => {
                return assassin.user != game.creator
            })


            updatedGame.assassins = updatedAssassinsArr
            updatedGame.moderators = game.creator

        } else {
            const updatedAssassinsArr = game.assassins
            updatedAssassinsArr.push({
                user: game.creator,
                kills: []
            })
            const updatedModeratorsArr = game.moderators.filter((moderator) => {
                return moderator != game.creator
            })

            updatedGame.assassins = updatedAssassinsArr
            updatedGame.moderators = updatedModeratorsArr
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

    function handleDeleteClick() {
        setIsConfirmDeleteOpen(true)
    }

    function handleJoinGameClicked() {
        sendJoinRequest(game._id, user._id)
    }

    function handleLeaveClicked() {
        leaveGame(game._id, user._id)
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
                <title>Assassin/Game/[id]</title>
            </Head>

            <ConfirmationPopup
                message={"Are you sure you want to delete this game?"}
                isOpen={isConfirmDeleteOpen}
                cancelCallback={(() => {
                    setIsConfirmDeleteOpen(false)
                })}
                confirmCallback={(() => {
                    deleteGame(game._id)
                })}
            />

            <Layout page={page.rules}>
                <section id="top">

                </section>
                <div className='pt-10 w-2/6 mx-auto text-center font-bold'>
                    Murder and mayhem awaits...
                </div>


                {/* GAME DETAILS */}
                <div className={'w-96 mx-auto py-16 space-y-10 text-center ' + (isEditing ? 'hidden' : 'block')}>
                    <div className='border-yellow-200 border-2 bg-gray-100 space-y-10 py-10 rounded-xl'>
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

                    {/* REQUESTS */}
                    <div className={"my-20 " + (isModerator ? 'block' : 'hidden')}>
                        <div className='mt-16 w-2/6 mx-auto text-center font-bold underline'>
                            Requests:
                        </div>
                        {game.join_requests.map((user) => (
                            <JoinRequest key={user._id} name={user.display_name} gameId={game._id} userId={user._id} />
                        ))}
                        <JoinRequest name="Glippyz" />

                    </div>

                    {/* MODERATOR */}
                    <div className='mt-16'>
                        <div className='mt-16 w-2/6 mx-auto text-center font-bold underline'>
                            Moderators:
                        </div>
                        {game.moderators.map((moderator) => {
                            return <AssassinIcon name={moderator.display_name} image={(moderator.profile_image ? moderator.profile_image : '/images/moderator.png')} />
                        })}
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
                        Assassins:
                    </div>
                    <Leaderboard assassins={game.assassins} />
                </div>

                {/* INVITES */}
                <div className={(hasJoined ? 'block' : 'hidden')}>
                    <div>
                        <Invite gameId={game._id} />
                    </div>
                    <div className={(isModerator ? 'block' : 'hidden')}>
                        <Invite isForAssassins={false} />
                    </div>
                </div>


                {/* BUTTONS */}
                <div className="py-8">


                    {/* MODERATOR BUTTONS */}
                    <div className={'w-2/5 mx-auto space-y-4 ' + (isModerator ? 'block' : 'hidden')}>

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
                            <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-green-200 hover:border-black text-white font-bold bg-green-500'>
                                BEGIN
                            </button>
                        </div>

                        {/* DELETE */}
                        <div>
                            <button onClick={handleDeleteClick} className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-red-200 hover:border-black text-white font-bold bg-red-500'>
                                DELETE
                            </button>
                        </div>

                    </div>

                    {/* ASSASSIN BUTTONS */}
                    <div>
                        <div className={'my-4 ' + (hasJoined ? 'hidden' : 'block')}>
                            <button className={(hasRequestedJoin ? 'hidden' : 'block') + ' flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-green-200 hover:border-black text-white font-bold bg-green-500'}
                                onClick={handleJoinGameClicked}>
                                JOIN GAME
                            </button>
                            <div className={(hasRequestedJoin ? 'block' : 'hidden') + ' flex w-44 text-center justify-center mx-auto px-10 py-2 rounded-md border-2 border-gray-200 text-white font-bold bg-gray-500'}>
                                REQUEST PENDING...
                            </div>
                        </div>
                        <div className={'my-4 ' + ((!hasJoined || isCreator || isModerator) ? 'hidden' : 'block')}>
                            <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-red-200 hover:border-black text-white font-bold bg-red-500'
                                onClick={handleLeaveClicked}>
                                LEAVE GAME
                            </button>
                        </div>
                    </div>

                </div>

            </Layout>
        </div>
    )
}