import React from 'react'
import GameButton from '../../../common/components/GameButton'
import { useGameContext } from '../contexts/GameContext'

export default function AssassinButtons() {

    const [gameContext, , , , updatePopupState] = useGameContext()

    return (
        <div>
            <JoinButton
                hasJoined={gameContext.userState.hasJoined}
                hasRequestedJoin={gameContext.userState.hasRequestedJoin}
                onClick={(() => {
                    updatePopupState({ join: true })
                })}
            />

            <GameButton
                text='LEAVE GAME'
                color='bg-red-500'
                borderColor='border-red-200'
                disabled={(gameContext.userState.hasJoined === false || gameContext.userState.isCreator === true || gameContext.userState.isModerator === true)}
                onClick={(() => {
                    updatePopupState({ leave: true })
                })}
            />
        </div>
    )
}

function JoinButton({ onClick, hasJoined, hasRequestedJoin }) {


    if (!hasJoined) {
        if (!hasRequestedJoin) {
            return (
                <GameButton
                    text='JOIN GAME'
                    color='bg-green-500'
                    borderColor='border-green-200'
                    onClick={(() => { onClick })}
                />
            )
        } else {
            return (
                <>
                    <div className={'flex w-44 text-center justify-center mx-auto px-10 py-2 rounded-md border-2 border-gray-200 text-white font-bold bg-gray-500'}>
                        REQUEST PENDING...
                    </div>
                </>
            )

        }
    } else return null
}