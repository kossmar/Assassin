import React, { useEffect, useState } from 'react'
import { GAME_STATUS, statusMessage } from '../constants'

export default function GameStatus({ status }) {

    useEffect(() => {
        // Select the appropriate game status message
        switch (status) {
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
    })

    const [statusMessage, setStatusMessage] = useState("Let's Party")

    return (
        <>
            <div className='pt-10 w-2/6 mx-auto text-center font-bold'>
                {statusMessage}
            </div>
        </>
    )
}