import React, { useState, useEffect } from 'react'
import Head from "next/head"
import Layout from "../../../common/components/Layout"
import EditGameDetails from './EditGameDetails'
import { ASSASSIN_STATUS, GAME_STATUS, ROLE, page, ASSASSIN_ICON_USE } from '../../../common/constants'
import Leaderboard from "../../game/components/Leaderboard"
import Invite from "./Invite"
import ChooseRole from './ChooseRole'
import UserIcon from '../../../common/components/UserIcon'
import { saveGameDetails, deleteGame, sendJoinRequest, leaveGame, startGame } from '../helpers/game-worker'
import BinaryPopup from '../../../common/components/BinaryPopup'
import JoinRequest from './JoinRequest'
import SinglePopup from '../../../common/components/SinglePopup'
import GameStatus from './GameStatus'
import Target from './Target'
import DidYouDiePopUp from './dispute/DidYouDiePopUp'
import DisputePopUp from './dispute/DisputePopUp'
import DisputeList from './dispute/DisputeList'
import AdjudicatePopUp from './dispute/AdjudicatePopUp'
import Winner from './Winner'

const { DISPUTE, PURGATORY } = ASSASSIN_STATUS
const { ACTIVE, COMPLETE } = GAME_STATUS

const GameComponent = ({ gameResult, user }) => {

    const [gameDetails, setGameDetails] = useState(gameResult.game_details)
    const [isEditing, setIsEditing] = useState(false)
    const [isModerator, setIsModerator] = useState(false)
    const [hasJoined, setHasJoined] = useState(false)
    const [hasRequestedJoin, setHasRequestedJoin] = useState(false)
    const [isCreator, setIsCreator] = useState(false)
    const [roleSelection, setRoleSelection] = useState(ROLE.ASSASSIN)
    const [target, setTarget] = useState(null)
    const [currentAssassin, setCurrentAssassin] = useState(null)
    const [assassinStatus, setAssassinStatus] = useState(null)
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
    const [isDidYouDiePopUpOpen, setIsDidYouDiePopUpOpen] = useState(false)


    useEffect(() => {
        setHasJoined(false)
        setRoleSelection(ROLE.ASSASSIN)
        setIsModerator(false)

        // Check if User is game creator
        if (gameResult.creator === user._id) {
            setIsCreator(true)
        }

        // Check if user has joined game
        for (let x = 0; x < gameResult.assassins.length; x++) {
            const assassin = gameResult.assassins[x]
            if (user._id === assassin.user) {
                setHasJoined(true)
                setCurrentAssassin(assassin)
                setAssassinStatus(assassin.status)
                if (assassin.status === PURGATORY) setIsDidYouDiePopUpOpen(true)
                setIsDisputePopUpOpen(assassin.status === ASSASSIN_STATUS.DISPUTE)
                break
            }
        }

        // Anonymous function returns when a user's current placement in the game is determined, saving marginal computing time, I guess...
        (() => {

            // Check if User is in graveyard
            for (let x = 0; x < gameResult.graveyard.length; x++) {
                const deadGuy = gameResult.graveyard[x]
                if (user._id === deadGuy.user) {
                    setHasJoined(true)
                    setIsDead(true)
                    return
                }
            }

            // Check if User has requested to join the game
            const assassinsRequestArr = gameResult.join_requests.assassins
            for (let x = 0; x < assassinsRequestArr.length; x++) {
                const request = assassinsRequestArr[x]
                if (user._id == request.user) {
                    setHasRequestedJoin(true)
                    return
                }
            }
            const moderatorsRequestArr = gameResult.join_requests.moderators
            for (let x = 0; x < moderatorsRequestArr.length; x++) {
                const request = moderatorsRequestArr[x]
                if (user._id == request.user) {
                    setHasRequestedJoin(true)
                    return
                }
            }

            // Check if user is moderator
            for (let x = 0; x < gameResult.moderators.length; x++) {
                const moderator = gameResult.moderators[x]
                if (user._id === moderator.user) {
                    setIsModerator(true)
                    setRoleSelection(ROLE.MODERATOR)
                    setHasJoined(true)
                    return
                }
            }

        })()

        //  Check for assassins and set relevant state

        // Set Target
        if (!isModerator && gameResult.game_status === GAME_STATUS.ACTIVE.STATUS) {
            for (let a = 0; a < gameResult.assassins.length; a++) {

                // find the current user's assassin object
                const currentAssassin = gameResult.assassins[a]

                if (currentAssassin.user === user._id) {

                    setCurrentAssassin(currentAssassin)

                    for (var t = 0; t <= gameResult.assassins.length; t++) {

                        // Find the current user's target object
                        const target = gameResult.assassins[t]
                        if (currentAssassin.target === target.user) {
                            setTarget(target)
                            break
                        }
                    }

                    switch (currentAssassin.status) {
                        // If current user is in PURGATORY, set killer
                        case PURGATORY:
                            for (var k = 0; k < gameResult.assassins.length; k++) {
                                const killer = gameResult.assassins[k]
                                if (killer.target === currentAssassin.user) {
                                    setKiller(killer)
                                    break
                                }
                            }
                            break

                        // If current user is in DISPUTE, only set killer if killer is also in dispute, otherwise you would be setting an assassin who hasn't struck yet.
                        case DISPUTE:
                            for (var k = 0; k < gameResult.assassins.length; k++) {
                                const killer = gameResult.assassins[k]
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
                        for (var k = 0; k < gameResult.assassins.length; k++) {
                            const killer = gameResult.assassins[k]

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


    }, [gameResult, user])

    function handleRoleSelect(id) {
        const role = id
        setRoleSelection(role)
    }

    function updateDetails(e) {
        const detailInput = e.target
        const detailContent = detailInput.value
        const detailName = detailInput.name

        setGameDetails((prevValues) => {
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

        const isUserSelectionModerator = (roleSelection === ROLE.MODERATOR ? true : false)

        const isRoleUpdated = (isModerator === isUserSelectionModerator ? false : true)

        const gameDetailsObj = {
            game_details: gameDetails,
            isRoleUpdated: isRoleUpdated,
            isRoleModerator: isUserSelectionModerator,
            user: user._id
        }

        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            saveGameDetails(gameDetailsObj, gameResult._id)
        } else {
            // setErrors({ errs })
            console.log(errs)
        }
        setIsEditing((prevValue) => {
            return (prevValue ? false : true)
        })
    }

    function handleStartClicked() {
        if (gameResult.moderators.length < 1) {
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
        // TODO: Restrict some things
    }

    function handleDisputeListCallback(dispute) {
        setCurrentDispute(dispute)
        setIsAdjudicatePopUpOpen(true)
    }

    const formValidate = () => {
        // TODO: change this so that details have their own state.
        let err = {}
        if (!gameDetails.game_name) err.name = 'Game Name is required'
        if (!gameDetails.weapons) err.owner_name = 'Weapons are required'
        if (!gameDetails.safe_zones) err.species = 'Safe Zones are required'
        return err
    }

    return (
        <div>
            <Head>
                <title>Assassin/Game/{gameResult._id}</title>
            </Head>

            {/* DID YOU DIE? */}

            <AdjudicatePopUp isOpen={isAdjudicatePopUpOpen} dispute={currentDispute} closeCallback={(() => setIsAdjudicatePopUpOpen(false))} />
            <DidYouDiePopUp isOpen={isDidYouDiePopUpOpen} killer={killer} currentAssassin={currentAssassin} gameId={gameResult._id} callback={(() => {
                setIsDidYouDiePopUpOpen(false)
                setCurrentAssassin(null)
            })} />
            <DisputePopUp isOpen={isDisputePopUpOpen} killer={killer} target={target} currentAssassin={currentAssassin} disputeId={(currentAssassin && currentAssassin.dispute)} targetCancelCallback={handleTargetCancelDispute} killerCancelCallback={(() => { setIsDisputePopUpOpen(false) })} />
            <BinaryPopup
                isWarningStyle
                message={"Are you sure you want to delete this game?"}
                isOpen={isConfirmDeleteOpen}
                firstOptionTitle="YES"
                firstCallback={(() => {
                    deleteGame(gameResult._id)
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
                    leaveGame(gameResult._id, user._id, () => {
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
                    sendJoinRequest(gameResult._id, user._id, ROLE.ASSASSIN, () => {
                        setIsJoinPopupOpen(false)
                    })
                })}
                secondOptionTitle="MODERATOR"
                secondCallback={(() => {
                    sendJoinRequest(gameResult._id, user._id, ROLE.MODERATOR, () => {
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
                <section id="top" />

                <GameStatus status={gameResult.game_status} />
                
                <div className={'text-center text-red-600 ' + (isDead ? 'block' : 'hidden')}>
                    OOPS... YOU'RE DEAD
                </div>

                {/* GAME DETAILS */}
                {/* TODO: turn into component */}
                {/* TODO: use Detail-specific state to load this */}
                <div className={'w-96 mx-auto pt-16 space-y-10 text-center ' + (isEditing ? 'hidden' : 'block')}>
                    <div className='border-yellow-200 border-2 bg-gray-100 space-y-10 py-10 rounded-xl'>
                        <div>
                            <div className='font-bold'>
                                NAME:
                            </div>
                            <div>
                                {gameDetails.game_name}
                            </div>
                        </div>

                        <div>
                            <div className='font-bold'>
                                WEAPONS:
                            </div>
                            <div>
                                {gameDetails.weapons}
                            </div>
                        </div>

                        <div>
                            <div className='font-bold'>
                                SAFE ZONES:
                            </div>
                            <div>
                                {gameDetails.safe_zones}
                            </div>
                        </div>
                    </div>
                </div>

                {/* EDIT GAME DETAILS */}
                {/* TODO: Turn into component */}
                <div className={(isEditing ? 'block' : 'hidden')}>

                    {/* Name, Weapons, Safe Zones */}
                    {/* // TODO: change to reflect changes for Detail-specific state creation */}
                    <EditGameDetails onChange={updateDetails} details={gameDetails} />

                    {/* CHOOSE ROLE */}
                    <ChooseRole onClick={handleRoleSelect} selectedRole={roleSelection} />

                </div>

                {/* TARGET */}
                {/* TODO: move render control to Target component after context creation */}
                {((currentAssassin != null && gameResult.game_status === ACTIVE.STATUS) &&
                    <Target target={target} gameId={gameResult._id} disabled={(assassinStatus === ASSASSIN_STATUS.PURGATORY || assassinStatus === ASSASSIN_STATUS.DISPUTE)} />
                )}


                {/* DISPUTES */}
                {/* TODO: move render control to Target component after context creation */}
                {((gameResult.game_status === ACTIVE.STATUS && gameResult.disputes.length > 0 && isModerator) &&
                    <DisputeList disputesArr={gameResult.disputes} callback={handleDisputeListCallback} />
                )}


                {/* Create component for assassins display */}
                {(gameResult.assassins.length > 1
                    ?
                    // ASSASSINS 
                    <div className='my-20'>
                        <div className='fmt-10 w-2/6 mx-auto text-center font-bold underline text-2xl'>
                            ASSASSINS:
                        </div>
                        <Leaderboard assassins={gameResult.assassins} forModerator={isModerator} status={gameResult.game_status} />
                    </div>
                    :
                    // WINNER
                    // TODO: move render decisions to Winner component after context creation
                    <Winner assassin={gameResult.assassins[0]} />
                )}




                {/* GRAVEYARD */}
                {/* TODO: create component and control rendering in the component after context creation */}
                <div className={'my-20 ' + (gameResult.game_status === ACTIVE.STATUS || gameResult.game_status === COMPLETE.STATUS ? 'block' : 'hidden')}>
                    <div className='fmt-10 w-2/6 mx-auto text-center font-bold underline text-2xl'>
                        GRAVEYARD:
                    </div>
                    <Leaderboard assassins={gameResult.graveyard} forModerator={isModerator} status={gameResult.game_status} graveyard={true} />
                </div>

                {/* MODERATOR */}
                {/* TODO: create component */}
                <div className='my-10'>
                    <div className='mt-16= w-2/6 mx-auto text-center font-bold underline text-2xl'>
                        MODERATORS:
                    </div>
                    {gameResult.moderators.map((moderator, index) => (
                        <UserIcon key={(moderator._id + index.toString())} name={moderator.display_name} state={ASSASSIN_ICON_USE.DISPLAY} image={(moderator.profile_image ? moderator.profile_image : '/images/moderator.png')} />
                    ))}
                </div>

                {/* REQUESTS */}
                {/* TODO: create component */}
                <div className={"my-20 w-96 mx-auto py-16 space-y-10 text-center " + (isModerator ? 'block' : 'hidden')}>
                    <div className='w-2/6 mx-auto text-center font-bold underline text-2xl'>
                        Requests:
                    </div>
                    <div className='border-blue-100 border-2 bg-gray-100 rounded-xl p-4'>
                        <div>
                            <div className='w-2/6 mx-auto text-center font-bold'>
                                Assassins
                            </div>
                            {/* // TODO: change game to gameResult after moving join request name retrieval to server-side */}
                            <div className={'font-bold text-gray-400 ' + (gameResult.join_requests.assassins.length === 0 ? '' : 'hidden')}>
                                NONE
                            </div>
                            {gameResult.join_requests.assassins.map((request) => (
                                <JoinRequest key={request.user} role={ROLE.ASSASSIN} name={request.display_name} gameId={gameResult._id} userId={request.user} />
                            ))}
                        </div>
                        <div>
                            <div className='mt-4 w-2/6 mx-auto text-center font-bold'>
                                Moderators
                            </div>
                            <div className={'font-bold text-gray-400 ' + (gameResult.join_requests.moderators.length === 0 ? '' : 'hidden')}>
                                NONE
                            </div>
                            {gameResult.join_requests.moderators.map(request => (
                                (request.role === ROLE.MODERATOR &&
                                    <JoinRequest key={request.user} role={ROLE.MODERATOR} name={request.display_name ? request.display_name : "loading"} gameId={gameResult._id} userId={request.user} />
                                )
                            ))}
                        </div>
                    </div>
                </div>

                {/* INVITES */}
                {/* TODO: control rendering inside component after context creation */}
                <div className={(hasJoined ? 'block' : 'hidden')}>
                    <div>
                        <Invite gameId={gameResult._id} />
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
                            <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-red-200 hover:border-black text-white font-bold bg-red-500'
                                onClick={(() => { setIsConfirmDeleteOpen(true) })} >
                                DELETE
                            </button>
                        </div>

                    </div>

                    {/* ASSASSIN BUTTONS */}
                    <div>
                        <div className={'my-4 ' + (hasJoined ? 'hidden' : 'block')}>
                            <button className={(hasRequestedJoin ? 'hidden' : 'block') + ' flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-green-200 hover:border-black text-white font-bold bg-green-500'}
                                onClick={(() => { setIsJoinPopupOpen(true) })}>
                                JOIN GAME
                            </button>
                            <div className={(hasRequestedJoin ? 'block' : 'hidden') + ' flex w-44 text-center justify-center mx-auto px-10 py-2 rounded-md border-2 border-gray-200 text-white font-bold bg-gray-500'}>
                                REQUEST PENDING...
                            </div>
                        </div>
                        <div className={'my-4 ' + ((!hasJoined || isCreator || isModerator) ? 'hidden' : 'block')}>
                            <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-red-200 hover:border-black text-white font-bold bg-red-500'
                                onClick={(() => { setIsConfirmLeaveOpen(true) })}>
                                LEAVE GAME
                            </button>
                        </div>
                    </div>

                </div>

            </Layout>
        </div>
    )
}

export default GameComponent