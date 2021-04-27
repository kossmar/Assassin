import React from 'react'
import { useGameContext } from '../contexts/GameContext'
import { startGame } from '../helpers/game-worker'
import EditSaveButtons from './EditSaveButtons'
import { GAME_STATUS } from '../../../common/constants'
import GameButton from '../../../common/components/GameButton'

export default function ModeratorButtons() {

    const [gameContext, handleRoleSelect, updateDetails, updateUserState, updatePopupState] = useGameContext()

    const { game, userState } = gameContext

    function handleStartClicked() {
        if (game.moderators.length < 1) {
            updatePopupState({ start: true })
        } else {
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
                        disabled={(game.game_status === GAME_STATUS.CREATED.STATUS)}
                        onClick={(() => { handleStartClicked })}
                    />

                    <GameButton
                        text='PAUSE'
                        color='bg-yellow-500'
                        borderColor='border-yellow-200'
                        disabled={!(game.game_status === GAME_STATUS.PAUSED.STATUS || game.game_status === GAME_STATUS.CREATED.STATUS)}
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

        //       {/* MODERATOR BUTTONS */}
        //       <div className={'w-2/5 mx-auto space-y-4 ' + (gameContext.userState.isModerator || gameContext.userState.isCreator ? 'block' : 'hidden')}>

        //       <EditSaveButtons />

        //       {/* BEGIN */}
        //       <div className={(gameResult.game_status === GAME_STATUS.CREATED.STATUS ? 'block' : 'hidden')}>
        //           <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-green-200 hover:border-black text-white font-bold bg-green-500'
        //               onClick={handleStartClicked}>
        //               BEGIN
        //           </button>
        //       </div>

        //       {/* PAUSE */}
        //       <div className={(gameResult.game_status === GAME_STATUS.PAUSED.STATUS || gameResult.game_status === GAME_STATUS.CREATED.STATUS ? 'hidden' : 'block')}>
        //           <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-yellow-200 hover:border-black text-white font-bold bg-yellow-500'
        //               onClick={handlePauseClicked}>
        //               PAUSE
        //           </button>
        //       </div>

        //       {/* DELETE */}
        //       <div>
        //           <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-red-200 hover:border-black text-white font-bold bg-red-500'
        //               onClick={(() => { setIsConfirmDeleteOpen(true) })} >
        //               DELETE
        //           </button>
        //       </div>

        //   </div>