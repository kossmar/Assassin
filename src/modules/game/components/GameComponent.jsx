import React, { useState, useEffect, useContext } from 'react'
import Head from "next/head"
import { ASSASSIN_STATUS, GAME_STATUS, ROLE, page, ASSASSIN_ICON_USE } from '../../../common/constants'
import Invite from "./Invite"
import UserIcon from '../../../common/components/UserIcon'
import { saveGameDetails, deleteGame, sendJoinRequest, leaveGame, startGame } from '../helpers/game-worker'
import JoinRequest from './JoinRequest'
import GameStatus from './GameStatus'
import Target from './Target'
import DisputeList from './dispute/DisputeList'
import { useGameContext } from '../contexts/GameContext'
import PlayerStatus from './PlayerStatus'
import GameDetails from './GameDetails'
import EditSaveButtons from './EditSaveButtons'
import Assassins from './Assassins'
import Graveyard from './Graveyard'
import Moderators from './Moderators'
import JoinRequestList from './JoinRequestList'

const { DISPUTE, PURGATORY } = ASSASSIN_STATUS
const { ACTIVE, COMPLETE } = GAME_STATUS

const GameComponent = ({ gameResult }) => {

    const [gameContext] = useGameContext()


    // Pop Up State
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
    const [isConfirmLeaveOpen, setIsConfirmLeaveOpen] = useState(false)
    const [isJoinPopupOpen, setIsJoinPopupOpen] = useState(false)
    const [isStartPopUpOpen, setIsStartPopUpOpen] = useState(false)

    function handleStartClicked() {
        if (gameResult.moderators.length < 1) {
            setIsStartPopUpOpen(true)
        } else {
            startGame(gameResult)
        }
    }

    function handlePauseClicked() {
        // TODO: Restrict some things
    }

    return (
        <div>
            <Head>
                <title>Assassin/Game/{gameResult._id}</title>
            </Head>

            <section id="top" />

            <GameStatus />
            <PlayerStatus />
            <GameDetails />
            <Target />
            <DisputeList />
            <Assassins />
            <Graveyard />
            <Moderators />
            <JoinRequestList />
            <Invite gameId={gameContext.game._id} />


            {/* BUTTONS */}
            <div className="py-8">


                {/* MODERATOR BUTTONS */}
                <div className={'w-2/5 mx-auto space-y-4 ' + (gameContext.userState.isModerator || gameContext.userState.isCreator ? 'block' : 'hidden')}>

                    <EditSaveButtons />

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
                    <div className={'my-4 ' + (gameContext.userState.hasJoined ? 'hidden' : 'block')}>
                        <button className={(gameContext.userState.hasRequestedJoin ? 'hidden' : 'block') + ' flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-green-200 hover:border-black text-white font-bold bg-green-500'}
                            onClick={(() => { setIsJoinPopupOpen(true) })}>
                            JOIN GAME
                            </button>
                        <div className={(gameContext.userState.hasRequestedJoin ? 'block' : 'hidden') + ' flex w-44 text-center justify-center mx-auto px-10 py-2 rounded-md border-2 border-gray-200 text-white font-bold bg-gray-500'}>
                            REQUEST PENDING...
                            </div>
                    </div>
                    <div className={'my-4 ' + ((!gameContext.userState.hasJoined || gameContext.userState.isCreator || gameContext.userState.isModerator) ? 'hidden' : 'block')}>
                        <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-red-200 hover:border-black text-white font-bold bg-red-500'
                            onClick={(() => { setIsConfirmLeaveOpen(true) })}>
                            LEAVE GAME
                            </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default GameComponent