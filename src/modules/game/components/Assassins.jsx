import React from 'react'
import { useGameContext } from '../contexts/GameContext'
import Leaderboard from './Leaderboard'
import Winner from './Winner'

export default function Assassins() {

    const [gameContext] = useGameContext()
    const { game, userState } = gameContext
    console.log('ASSASSINS game:')
    console.log(game)
    if (game.assassins.length > 1) {
        return (
            <div className='my-20'>
                <div className='fmt-10 w-2/6 mx-auto text-center font-bold underline text-2xl'>
                    ASSASSINS:
                </div>
                <Leaderboard assassins={game.assassins} forModerator={userState.isModerator} status={game.game_status} />
            </div>
        )
    } else {
        return (
            <Winner assassin={game.assassins[0]} />
        )
    }
}