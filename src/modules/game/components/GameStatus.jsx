import React, { useEffect, useState } from 'react'
import { GAME_STATUS } from '../../../common/constants'
import { useGameContext } from '../contexts/GameContext'

export default function GameStatus() {

    const [gameContext] = useGameContext()

    useEffect(() => {
        // Select the appropriate game status message
        switch (gameContext.game.game_status) {
            case GAME_STATUS.ACTIVE.STATUS:
                setStatusMessage(GAME_STATUS.ACTIVE.MESSAGE)
                break
            case GAME_STATUS.COMPLETE.STATUS:
                setStatusMessage(GAME_STATUS.COMPLETE.MESSAGE)
                break
            case GAME_STATUS.CREATED.STATUS:
                setStatusMessage(GAME_STATUS.CREATED.MESSAGE)
                break
            case GAME_STATUS.PAUSED.STATUS:
                setStatusMessage(GAME_STATUS.PAUSED.MESSAGE)
                break
        }
    }, [gameContext.game])

    const [statusMessage, setStatusMessage] = useState("Let's Party")

    return (
        <>
            <div className='pt-10 w-2/6 mx-auto text-center font-bold text-2xl'>
                {statusMessage}
            </div>
        </>
    )
}