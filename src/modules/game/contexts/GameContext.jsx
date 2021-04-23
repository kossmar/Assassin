import { Children, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ROLE } from '../../../common/constants'

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

export function GameContextProvider({ children, gameResult }) {

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
        // Check if User is game creator
        const updatedUserState = { ...userState }

        // if (gameResult.creator === user._id) {
        //     setIsCreator(true)
        // }

        // // Check if user has joined game
        // for (let x = 0; x < gameResult.assassins.length; x++) {
        //     const assassin = gameResult.assassins[x]
        //     if (user._id === assassin.user) {
        //         setHasJoined(true)
        //         setCurrentAssassin(assassin)
        //         setAssassinStatus(assassin.status)
        //         if (assassin.status === PURGATORY) setIsDidYouDiePopUpOpen(true)
        //         setIsDisputePopUpOpen(assassin.status === ASSASSIN_STATUS.DISPUTE)
        //         break
        //     }
        // }

        // // Anonymous function returns when a user's current placement in the game is determined, saving marginal computing time, I guess...
        // (() => {

        //     // Check if User is in graveyard
        //     for (let x = 0; x < gameResult.graveyard.length; x++) {
        //         const deadGuy = gameResult.graveyard[x]
        //         if (user._id === deadGuy.user) {
        //             setHasJoined(true)
        //             setIsDead(true)
        //             return
        //         }
        //     }

        //     // Check if User has requested to join the game
        //     const assassinsRequestArr = gameResult.join_requests.assassins
        //     for (let x = 0; x < assassinsRequestArr.length; x++) {
        //         const request = assassinsRequestArr[x]
        //         if (user._id == request.user) {
        //             setHasRequestedJoin(true)
        //             return
        //         }
        //     }
        //     const moderatorsRequestArr = gameResult.join_requests.moderators
        //     for (let x = 0; x < moderatorsRequestArr.length; x++) {
        //         const request = moderatorsRequestArr[x]
        //         if (user._id == request.user) {
        //             setHasRequestedJoin(true)
        //             return
        //         }
        //     }

        //     // Check if user is moderator
        //     for (let x = 0; x < gameResult.moderators.length; x++) {
        //         const moderator = gameResult.moderators[x]
        //         if (user._id === moderator.user) {
        //             setIsModerator(true)
        //             setRoleSelection(ROLE.MODERATOR)
        //             setHasJoined(true)
        //             return
        //         }
        //     }

        // })()

        // //  Check for assassins and set relevant state

        // // Set Target
        // if (!isModerator && gameResult.game_status === GAME_STATUS.ACTIVE.STATUS) {
        //     for (let a = 0; a < gameResult.assassins.length; a++) {

        //         // find the current user's assassin object
        //         const currentAssassin = gameResult.assassins[a]

        //         if (currentAssassin.user === user._id) {

        //             setCurrentAssassin(currentAssassin)

        //             for (var t = 0; t <= gameResult.assassins.length; t++) {

        //                 // Find the current user's target object
        //                 const target = gameResult.assassins[t]
        //                 if (currentAssassin.target === target.user) {
        //                     setTarget(target)
        //                     break
        //                 }
        //             }

        //             switch (currentAssassin.status) {
        //                 // If current user is in PURGATORY, set killer
        //                 case PURGATORY:
        //                     for (var k = 0; k < gameResult.assassins.length; k++) {
        //                         const killer = gameResult.assassins[k]
        //                         if (killer.target === currentAssassin.user) {
        //                             setKiller(killer)
        //                             break
        //                         }
        //                     }
        //                     break

        //                 // If current user is in DISPUTE, only set killer if killer is also in dispute, otherwise you would be setting an assassin who hasn't struck yet.
        //                 case DISPUTE:
        //                     for (var k = 0; k < gameResult.assassins.length; k++) {
        //                         const killer = gameResult.assassins[k]
        //                         if (killer.target === currentAssassin.user && killer.status === DISPUTE) {
        //                             setKiller(killer)
        //                             break
        //                         }
        //                     }
        //                     break
        //                 default:
        //                     break
        //             }
        //             if (currentAssassin.status === PURGATORY || currentAssassin.status === DISPUTE) {
        //                 for (var k = 0; k < gameResult.assassins.length; k++) {
        //                     const killer = gameResult.assassins[k]

        //                     if (killer.target === currentAssassin.user) {
        //                         setKiller(killer)
        //                         break
        //                     }
        //                 }
        //             }

        //             break
        //         }


        //     }
        // }
    })

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

        function updateUserState(stateName, newValue) {
            setUserState((prevValue) => {
                return {
                    ...prevValue,
                    [stateName]: newValue,
                }
            })
        }

        return [{ game, popupState, gameDetails, userState }, handleRoleSelect, updateDetails, updateUserState]
    }, [gameDetails, userState, popupState])

    return <GameContext.Provider value={value} children={children} />
}