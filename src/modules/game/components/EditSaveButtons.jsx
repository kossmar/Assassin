import React from 'react'
import { useGameContext } from "../contexts/GameContext"
import { GAME_STATUS, ROLE } from '../../../constants'
import { saveGameDetails } from '../helpers/game-worker'
import { useUser } from '../../auth/hooks/useUser'


export default function EditSaveButtons() {

    const user = useUser()

    const [gameContext, handleRoleSelect, updateDetails, updateUserState] = useGameContext()
    // TODO: add onClick back to button

    function handleSaveClick(e) {

        e.preventDefault()

        const isUserSelectionModerator = (gameContext.userState.roleSelection === ROLE.MODERATOR ? true : false)

        const isRoleUpdated = (gameContext.userState.isModerator === isUserSelectionModerator ? false : true)

        const gameDetailsObj = {
            game_details: gameContext.gameDetails,
            isRoleUpdated: isRoleUpdated,
            isRoleModerator: isUserSelectionModerator,
            user: user._id
        }

        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            saveGameDetails(gameDetailsObj, gameContext.game._id)
        } else {
            // setErrors({ errs })
            console.log(errs)
        }
        updateUserState({ isEditing: false })
    }

    const formValidate = () => {
        // TODO: change this so that details have their own state.
        let err = {}
        if (!gameContext.gameDetails.game_name) err.name = 'Game Name is required'
        if (!gameContext.gameDetails.weapons) err.owner_name = 'Weapons are required'
        if (!gameContext.gameDetails.safe_zones) err.species = 'Safe Zones are required'
        return err
    }

    if (gameContext.game.game_status !== GAME_STATUS.COMPLETE.STATUS) {
        if (gameContext.userState.isEditing) {
            return (
                <>
                    {/* SAVE */}
                    <a href='#top'>
                        <button
                            className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-blue-200 hover:border-black text-white font-bold bg-blue-500'
                            onClick={handleSaveClick}
                        >
                            SAVE
                        </button>
                    </a>
                </>
            )
        } else {
            return (
                <>
                    {/* EDIT  */}
                    <a href='#top'>
                        <button onClick={() => updateUserState({ isEditing: true })} className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-blue-200 hover:border-black text-white font-bold bg-blue-500'>
                            EDIT
                        </button>
                    </a>
                </>
            )
        }
    } else {
        return null
    }

}