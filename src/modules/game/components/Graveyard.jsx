import React from 'react'
import { useGameContext } from '../contexts/GameContext'
import Leaderboard from './Leaderboard'
import { GAME_STATUS } from '../../../constants'

const { ACTIVE, COMPLETE } = GAME_STATUS


export default function Graveyard() {
    const [gameContext] = useGameContext()
    const { game, userState } = gameContext

    if (game.graveyard.length > 0) {
        return (
            <>
                <div className={'my-20 ' + (game.game_status === ACTIVE.STATUS || game.game_status === COMPLETE.STATUS ? 'block' : 'hidden')}>
                    <div className='fmt-10 w-2/6 mx-auto text-center font-bold underline text-2xl'>
                        GRAVEYARD:
                    </div>
                    <Leaderboard assassins={game.graveyard} forModerator={userState.isModerator} status={game.game_status} graveyard={true} />
                </div>
            </>
        )
    } else return null

}