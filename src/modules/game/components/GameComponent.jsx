import React from 'react'
import Head from "next/head"
import Invite from "./Invite"
import GameStatus from './GameStatus'
import Target from './Target'
import DisputeList from './dispute/DisputeList'
import { useGameContext } from '../contexts/GameContext'
import PlayerStatus from './PlayerStatus'
import GameDetails from './GameDetails'
import Assassins from './Assassins'
import Graveyard from './Graveyard'
import Moderators from './Moderators'
import JoinRequestList from './JoinRequestList'
import ModeratorButtons from './ModeratorButtons'
import AssassinButtons from './AssassinButtons'


const GameComponent = () => {

    const [gameContext] = useGameContext()

    return (
        <div>
            <Head>
                <title>Assassin/Game/{gameContext.game._id}</title>
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

            <div className="py-8">
                <ModeratorButtons />
                <AssassinButtons />
            </div>
        </div>
    )
}

export default GameComponent