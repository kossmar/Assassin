import React from 'react'
import { useGameContext } from '../contexts/GameContext'

export default function PlayerStatus() {

    const [gameContext] = useGameContext()

    if (gameContext.game.isDead) {
        return (
            <>
                <div className={'text-center text-red-600'}>
                    OOPS... YOU'RE DEAD
                </div>
            </>
        )
    } else {
        return null
    }

}