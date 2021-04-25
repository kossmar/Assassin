import { Children, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ROLE } from '../../../common/constants'
import { updateUserAndPopupState } from './gameContextHelper'


const GameContext = createContext()

export function useGameContext() {
    const context = useContext(GameContext)

    if (!context) {
        throw new Error(
            'useGameContext must be used within a GameContextProvider'
        )
    }

    return context
}

export function GameContextProvider({ children, gameResult, user }) {

    const [game, setGame] = useState(gameResult)
    const [gameDetails, setGameDetails] = useState(gameResult.game_details)
    const [userState, setUserState] = useState({
        isEditing: false,
        isModerator: false,
        hasJoined: false,
        hasRequestedJoin: false,
        isCreator: false,
        roleSelection: ROLE.ASSASSIN,
        target: null,
        currentAssassin: null,
        status: null,
        killer: null,
        isDead: false,
        dispute: null
    })

    // Pop Up State
    const [popupState, setPopupState] = useState({
        delete: false,
        leave: false,
        join: false,
        start: false,
        adjudicate: false,
        dispute: false,
        didYouDie: false
    })

    useEffect(() => {
        const {updatedUserState, updatedPopupState} = updateUserAndPopupState(gameResult, user, userState, popupState)
        setUserState(updatedUserState)
        setPopupState(updatedPopupState)

    }, [gameResult])

    const value = useMemo(() => {

        function handleRoleSelect(role) {
            setUserState(prevValue => {
                return {
                    ...prevValue,
                    roleSelection: role
                }
            })
        }

        function updateDetails(e) {
            const detailInput = e.target
            const detailContent = detailInput.value
            const detailName = detailInput.name

            setGameDetails((prevValues) => {
                return ({
                    ...prevValues,
                    [detailName]: detailContent,
                })
            })
        }

        function updateUserState(updatedStateObject) {
            setUserState((prevValue) => {
                return {
                    ...prevValue,
                    ...updatedStateObject,
                }
            })
        }

        function updatePopupState(updatedStateObject) {
            setPopupState((prevValue) => {
                return {
                    ...prevValue,
                    ...updatedStateObject
                }
            })
        }

        return [{ game, popupState, gameDetails, userState }, handleRoleSelect, updateDetails, updateUserState, updatePopupState]
    }, [gameDetails, userState, popupState])

    return <GameContext.Provider value={value} children={children} />
}