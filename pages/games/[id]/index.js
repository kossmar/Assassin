import React, { useState, useEffect } from 'react'
import Head from "next/head"
import Layout from "../../../components/Layout"
import EditGameDetails from '../../../components/EditGameDetails'
import { ASSASSIN_STATUS, GAME_STATUS, page } from "../../../constants"
import Leaderboard from "../../../components/Leaderboard"
import Invite from "../../../components/Invite"
import ChooseRole from '../../../components/ChooseRole'
import AssassinIcon from '../../../components/AssassinIcon'
import { useRouter } from 'next/router'
import { saveGame, getAssassinNamesAndImages, getModeratorNamesAndImages, getGraveyardNamesAndImages, deleteGame, sendJoinRequest, getRequestDisplayNames, leaveGame, startGame } from '../../../lib/game-worker'
import { useGame } from '../../../lib/hooks/useGame'
import { useUser } from '../../../lib/hooks/useUser'
import BinaryPopup from '../../../components/BinaryPopup'
import JoinRequest from '../../../components/JoinRequest'
import SinglePopup from '../../../components/SinglePopup'
import GameStatus from '../../../components/GameStatus'
import Target from '../../../components/Target'
import DidYouDiePopUp from '../../../components/DidYouDiePopUp'
import DisputePopUp from '../../../components/DisputePopUp'
import DisputeList from '../../../components/DisputeList'
import AdjudicatePopUp from '../../../components/AdjudicatePopUp'

const { DEAD, DISPUTE, PURGATORY, ALIVE } = ASSASSIN_STATUS
const { ACTIVE } = GAME_STATUS

const ThisGame = () => {

    const user = useUser({ redirectIfUnauthorized: '/login' })

    const router = useRouter()
    const { id } = router.query

    const { gameResult, error } = useGame(id)

    if (error) return <p>Failed to load</p>
    if (!gameResult || !user) return <p>Loading...</p>

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
        setRoleSelection('assassin')
        setIsModerator(false)

        // Check if User is game creator
        if (gameResult.creator === user._id) {
            setIsCreator(true)
        }

        // Check if user is waiting for approval to join
        gameResult.assassins.forEach((assassin) => {
            if (user._id === assassin.user) {
                setHasJoined(true)
                setCurrentAssassin(assassin)
                setAssassinStatus(assassin.status)
                setIsDisputePopUpOpen(assassin.status === ASSASSIN_STATUS.DISPUTE)
            }
        })
        gameResult.graveyard.forEach((deadGuy) => {
            if (user._id === deadGuy.user) {
                setHasJoined(true)
                setIsDead(true)
            }
        })

        // Check if User has requested to join the game
        gameResult.join_requests.assassins.forEach(request => {
            if (user._id === request.user) setHasRequestedJoin(true)
        })
        gameResult.join_requests.moderators.forEach(request => {
            if (user._id === request.user) setHasRequestedJoin(true)
        })


        // Check for moderators and retrieve display names
        if (gameResult.moderators.length > 0) {
            gameResult.moderators.forEach((moderatorId) => {

                if (user._id === moderatorId) {
                    setIsModerator(true)
                    setRoleSelection('moderator')
                    setHasJoined(true)
                }
            })

            getModeratorNamesAndImages(gameResult.moderators)
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

        //  Check for assassins and retrieve display names, then set target
        if (gameResult.assassins.length > 0) {
            getAssassinNamesAndImages([...gameResult.assassins])
                .then(assassinsWithNames => {
                    setGame(prevValue => {
                        return {
                            ...prevValue,
                            assassins: assassinsWithNames
                        }
                    })
                    // Set Target
                    if (!isModerator && game.game_status === GAME_STATUS.ACTIVE.STATUS) {
                        for (var a = 0; a < assassinsWithNames.length; a++) {

                            // find the current user's assassin object
                            const currentAssassin = assassinsWithNames[a]

                            if (currentAssassin.user === user._id) {

                                setCurrentAssassin(currentAssassin)

                                for (var t = 0; t <= assassinsWithNames.length; t++) {

                                    // Find the current user's target object
                                    const target = assassinsWithNames[t]
                                    if (currentAssassin.target === target.user) {
                                        setTarget(target)
                                        break
                                    }
                                }

                                switch (currentAssassin.status) {
                                    // If current user is in PURGATORY, set killer
                                    case PURGATORY:
                                        for (var k = 0; k < assassinsWithNames.length; k++) {
                                            const killer = assassinsWithNames[k]
                                            if (killer.target === currentAssassin.user) {
                                                setKiller(killer)
                                                break
                                            }
                                        }
                                        break

                                    // If current user is in DISPUTE, only set killer if killer is also in dispute, otherwise you would be setting an assassin who hasn't struck yet.
                                    case DISPUTE:
                                        for (var k = 0; k < assassinsWithNames.length; k++) {
                                            const killer = assassinsWithNames[k]
                                            if (killer.target === currentAssassin.user && killer.status === DISPUTE) {
                                                setKiller(killer)
                                                break
                                            }
                                        }
                                        break
                                    default:
                                        break
                                }
                                if (currentAssassin.status === PURGATORY || currentAssassin.status === DISPUTE) {
                                    for (var k = 0; k <= assassinsWithNames.length; k++) {
                                        const killer = assassinsWithNames[k]
                                        if (killer.target === currentAssassin.user) {
                                            setKiller(killer)
                                            break
                                        }
                                    }
                                }

                                break
                            }


                        }
                    }
                })
        }

        // Check for Graveyard and retrieve display names and images
        if (gameResult.graveyard.length > 0) {

            getGraveyardNamesAndImages(gameResult.graveyard)
                .then(graveyardWithNamesAndImages => {
                    setGame(prevValue => {
                        return {
                            ...prevValue,
                            graveyard: graveyardWithNamesAndImages
                        }
                    })

                })
        }

        // Check for join requests and retrieve display names
        if (gameResult.join_requests.assassins.length > 0 || gameResult.join_requests.moderators.length > 0) {
            getRequestDisplayNames(gameResult.join_requests)
                .then(requestsWithNames => {
                    setGame(prevValue => {
                        return {
                            ...prevValue,
                            join_requests: requestsWithNames
                        }
                    })
                })
        } else {
            setGame(gameResult)
        }

    }, [gameResult, user])

    const [game, setGame] = useState(gameResult)
    const [isEditing, setIsEditing] = useState(false)
    const [isModerator, setIsModerator] = useState(false)
    const [hasJoined, setHasJoined] = useState(false)
    const [hasRequestedJoin, setHasRequestedJoin] = useState(false)
    const [isCreator, setIsCreator] = useState(false)
    const [roleSelection, setRoleSelection] = useState('assassin')
    const [target, setTarget] = useState(null)
    const [currentAssassin, setCurrentAssassin] = useState(null)
    const [assassinStatus, setAssassinStatus] = useState(ALIVE)
    const [killer, setKiller] = useState(null)
    const [isDead, setIsDead] = useState(false)
    const [currentDispute, setCurrentDispute] = useState(null)


    // Pop Up State
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
    const [isConfirmLeaveOpen, setIsConfirmLeaveOpen] = useState(false)
    const [isJoinPopupOpen, setIsJoinPopupOpen] = useState(false)
    const [isStartPopUpOpen, setIsStartPopUpOpen] = useState(false)
    const [isAdjudicatePopUpOpen, setIsAdjudicatePopUpOpen] = useState(false)
    const [isDisputePopUpOpen, setIsDisputePopUpOpen] = useState(false)


    function handleRoleSelect(id) {
        const role = id
        setRoleSelection(role)
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

        console.log(gameResult)

        const updatedGame = {
            ...game,
        }

        const isUserSelectionModerator = (roleSelection === 'moderator' ? true : false)

        var isRoleUpdated = (isModerator === isUserSelectionModerator ? false : true)
        if (isRoleUpdated) {

            var updatedAssassinsArr
            var updatedModeratorsArr

            switch (isUserSelectionModerator) {
                case true:
                    updatedModeratorsArr = gameResult.moderators
                    updatedModeratorsArr.push(user._id)

                    updatedAssassinsArr = gameResult.assassins.filter((assassin) => {
                        return assassin.user != user._id
                    })


                    updatedGame.assassins = updatedAssassinsArr
                    updatedGame.moderators = updatedModeratorsArr

                    break

                case false:
                    updatedAssassinsArr = gameResult.assassins
                    updatedAssassinsArr.push({
                        user: gameResult.creator,
                        kills: [],
                        target: '',
                        isWaiting: false,
                        is_alive: true,
                        dispute: '',
                        rank_index: 0
                    })
                    updatedModeratorsArr = gameResult.moderators.filter((moderator) => {
                        return moderator != user._id
                    })

                    updatedGame.assassins = updatedAssassinsArr
                    updatedGame.moderators = updatedModeratorsArr
                    break

                default:
                    break
            }
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
        setIsJoinPopupOpen(true)
    }

    function handleLeaveClicked() {
        setIsConfirmLeaveOpen(true)
    }

    function handleStartClicked() {
        if (game.moderators.length < 1) {
            setIsStartPopUpOpen(true)
        } else {
            startGame(gameResult)
        }
    }

    function handleTargetCancelDispute() {
        setIsDisputePopUpOpen(false)
        setCurrentAssassin(null)
    }

    function handlePauseClicked() {
        // Restrict some things
    }

    function handleDisputeListCallback(dispute) {
        setCurrentDispute(dispute)
        setIsAdjudicatePopUpOpen(true)
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
                <title>Assassin/Game/{game._id}</title>
            </Head>

            {/* DID YOU DIE? */}

            <AdjudicatePopUp isOpen={isAdjudicatePopUpOpen} dispute={currentDispute} closeCallback={(() => setIsAdjudicatePopUpOpen(false))} />
            <DidYouDiePopUp isOpen={(assassinStatus === ASSASSIN_STATUS.PURGATORY)} killer={killer} currentAssassin={currentAssassin} gameId={gameResult._id} />
            <DisputePopUp isOpen={isDisputePopUpOpen} killer={killer} target={target} currentAssassin={currentAssassin} disputeId={(currentAssassin && currentAssassin.dispute)} targetCancelCallback={handleTargetCancelDispute} />
            <BinaryPopup
                isWarningStyle
                message={"Are you sure you want to delete this game?"}
                isOpen={isConfirmDeleteOpen}
                firstOptionTitle="YES"
                firstCallback={(() => {
                    deleteGame(game._id)
                })}
                secondOptionTitle="NO"
                secondCallback={(() => {
                    setIsConfirmDeleteOpen(false)
                })}
            />
            <BinaryPopup
                isWarningStyle
                message={"Are you sure you want to leave this game?"}
                isOpen={isConfirmLeaveOpen}
                firstOptionTitle="YES"
                firstCallback={(() => {
                    leaveGame(game._id, user._id, () => {
                        setIsConfirmLeaveOpen(false)
                    })
                })}
                secondOptionTitle="NO"
                secondCallback={(() => {
                    setIsConfirmLeaveOpen(false)
                })}
            />
            <BinaryPopup
                message={"What role would you like to join as?"}
                isOpen={isJoinPopupOpen}
                firstOptionTitle="ASSASSIN"
                firstCallback={(() => {
                    sendJoinRequest(game._id, user._id, 'assassin', () => {
                        setIsJoinPopupOpen(false)
                    })
                })}
                secondOptionTitle="MODERATOR"
                secondCallback={(() => {
                    sendJoinRequest(game._id, user._id, 'moderator', () => {
                        setIsJoinPopupOpen(false)
                    })
                })}
            />

            <SinglePopup
                message={"You must have at least one moderator before you can begin the game"}
                isOpen={isStartPopUpOpen}
                optionTitle={"OK"}
                callback={(() => {
                    setIsStartPopUpOpen(false)
                })}
            />

            <Layout page={page.rules}>
                <section id="top">

                </section>

                <GameStatus status={gameResult.game_status} />
                <div className={'text-center text-red-600 ' + (isDead ? 'block' : 'hidden')}>
                    OOPS... YOU'RE DEAD
                </div>

                {/* GAME DETAILS */}
                <div className={'w-96 mx-auto pt-16 space-y-10 text-center ' + (isEditing ? 'hidden' : 'block')}>
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
                </div>

                {/* TARGET */}
                {((currentAssassin != null && gameResult.game_status === ACTIVE.STATUS) &&
                    <Target target={target} gameId={gameResult._id} disabled={(assassinStatus === ASSASSIN_STATUS.PURGATORY)} />
                )}


                {/* EDIT GAME DETAILS */}
                <div className={(isEditing ? 'block' : 'hidden')}>

                    {/* Name, Weapons, Safe Zones */}
                    <EditGameDetails onChange={updateDetails} details={game} />

                    {/* CHOOSE ROLE */}
                    <ChooseRole onClick={handleRoleSelect} selectedRole={roleSelection} />

                </div>

                {/* DISPUTES */}
                <div className={(gameResult.status === ACTIVE ? 'block' : 'hidden')}>
                    <DisputeList disputesArr={gameResult.disputes} callback={handleDisputeListCallback} />
                </div>

                {/* ASSASSINS */}
                <div className='my-20'>
                    <div className='fmt-10 w-2/6 mx-auto text-center font-bold underline text-2xl'>
                        ASSASSINS:
                    </div>
                    <Leaderboard assassins={game.assassins} forModerator={isModerator} status={gameResult.game_status} />
                </div>

                {/* GRAVEYARD */}
                <div className={'my-20 ' + (gameResult.game_status === ACTIVE.STATUS ? 'block' : 'hidden')}>
                    <div className='fmt-10 w-2/6 mx-auto text-center font-bold underline text-2xl'>
                        GRAVEYARD:
                    </div>
                    <Leaderboard assassins={game.graveyard} forModerator={isModerator} status={gameResult.game_status} />
                </div>

                {/* MODERATOR */}
                <div className='my-10'>
                    <div className='mt-16= w-2/6 mx-auto text-center font-bold underline text-2xl'>
                        MODERATORS:
                    </div>
                    {game.moderators.map((moderator, index) => (
                        <AssassinIcon key={(moderator._id + index.toString())} name={moderator.display_name} image={(moderator.profile_image ? moderator.profile_image : '/images/moderator.png')} />
                    ))}
                </div>

                {/* REQUESTS */}
                <div className={"my-20 w-96 mx-auto py-16 space-y-10 text-center " + (isModerator ? 'block' : 'hidden')}>
                    <div className='w-2/6 mx-auto text-center font-bold underline text-2xl'>
                        Requests:
                    </div>
                    <div className='border-blue-100 border-2 bg-gray-100 rounded-xl p-4'>
                        <div>
                            <div className='w-2/6 mx-auto text-center font-bold'>
                                Assassins
                            </div>
                            <div className={'font-bold text-gray-400 ' + (game.join_requests.assassins.length === 0 ? '' : 'hidden')}>
                                NONE
                            </div>
                            {game.join_requests.assassins.map((request) => (
                                <JoinRequest key={request.user} role='assassin' name={request.display_name} gameId={game._id} userId={request.user} />
                            ))}
                        </div>
                        <div>
                            <div className='mt-4 w-2/6 mx-auto text-center font-bold'>
                                Moderators
                            </div>
                            <div className={'font-bold text-gray-400 ' + (game.join_requests.moderators.length === 0 ? '' : 'hidden')}>
                                NONE
                            </div>
                            {game.join_requests.moderators.map(request => (
                                (request.role === 'moderator' &&
                                    <JoinRequest key={request.user} role='moderator' name={request.display_name ? request.display_name : "loading"} gameId={game._id} userId={request.user} />
                                )
                            ))}
                        </div>
                    </div>
                </div>

                {/* INVITES */}
                <div className={(hasJoined ? 'block' : 'hidden')}>
                    <div>
                        <Invite gameId={game._id} />
                    </div>
                </div>


                {/* BUTTONS */}
                <div className="py-8">


                    {/* MODERATOR BUTTONS */}
                    <div className={'w-2/5 mx-auto space-y-4 ' + (isModerator || isCreator ? 'block' : 'hidden')}>

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
                        <div className={(gameResult.game_status === GAME_STATUS.CREATED.STATUS ? 'block' : 'hidden')}>
                            <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-green-200 hover:border-black text-white font-bold bg-green-500'
                                onClick={handleStartClicked}>
                                BEGIN
                            </button>
                        </div>

                        {/* PAUSE */}
                        <div className={(gameResult.game_status === GAME_STATUS.PAUSED.STATUS || gameResult.game_status === GAME_STATUS.CREATED.STATUS ? 'hidden' : 'block')}>
                            <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-yellow-200 hover:border-black text-white font-bold bg-yellow-500'
                                onClick={handlePauseClicked}>
                                PAUSE
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