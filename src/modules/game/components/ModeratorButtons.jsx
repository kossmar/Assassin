import React from 'react'
import { useGameContext } from '../contexts/GameContext'
import { startGame } from '../helpers/game-worker'
import EditSaveButtons from './EditSaveButtons'
import { GAME_STATUS } from '../../../constants'
import GameButton from '../../../common/components/GameButton'

export default function ModeratorButtons() {

    const [gameContext, handleRoleSelect, updateDetails, updateUserState, updatePopupState] = useGameContext()

    const { game, userState } = gameContext

    function handleStartClicked() {
        if (game.moderators.length < 1) {
            updatePopupState({ start: true })
        } else {
            console.log('START CLICKED')
            startGame(game)
        }
    }

    function handlePauseClicked() {
        // TODO: Restrict some things
    }

    if (userState.isModerator || userState.isCreator) {
        return (
            <>
                {/* MODERATOR BUTTONS */}
                <div className='w-2/5 mx-auto space-y-4'>

                    <EditSaveButtons />

                    <GameButton
                        text='BEGIN'
                        color='bg-green-500'
                        borderColor='border-green-200'
                        disabled={!(game.game_status === GAME_STATUS.CREATED.STATUS)}
                        onClick={handleStartClicked}
                    />

                    <GameButton
                        text='PAUSE'
                        color='bg-yellow-500'
                        borderColor='border-yellow-200'
                        disabled={(game.game_status != GAME_STATUS.COMPLETE)}
                        onClick={(() => { handlePauseClicked })}
                    />

                    <GameButton
                        text='DELETE'
                        color='bg-red-500'
                        borderColor='border-red-200'
                        onClick={(() => {
                            updatePopupState({ delete: true })
                        })}
                    />

                </div>
            </>
        )
    } else return null
}
