import { ROLE, GAME_STATUS, ASSASSIN_STATUS } from '../../../common/constants'

const { PURGATORY, DISPUTE } = ASSASSIN_STATUS

export function updateUserAndPopupState(gameResult, user, userState, popupState) {
//         setHasJoined(false)
//         setRoleSelection(ROLE.ASSASSIN)
//         setIsModerator(false)


    // Check if User is game creator
    const updatedUserState = { ...userState }
    const updatedPopupState = { ...popupState }

    updatedUserState.hasJoined = false
    updatedUserState.roleSelection = ROLE.ASSASSIN
    updatedUserState.isModerator = false
    
    if (gameResult.creator === user._id) {
        updatedUserState.isCreator = true
    }

    // Check if user has joined game
    for (let x = 0; x < gameResult.assassins.length; x++) {
        const assassin = gameResult.assassins[x]
        if (user._id === assassin.user) {
            updatedUserState.hasJoined = true
            updatedUserState.currentAssassin = assassin
            updatedUserState.status = assassin.status

            if (assassin.status === PURGATORY) updatedPopupState.didYouDie = true
            if (assassin.status === DISPUTE) updatedPopupState.dispute = true
            break
        }
    }

    // Anonymous function returns when a user's current placement in the game is determined, saving marginal computing time, I guess...
    (() => {

        // Check if User is in graveyard
        for (let x = 0; x < gameResult.graveyard.length; x++) {
            const deadGuy = gameResult.graveyard[x]
            if (user._id === deadGuy.user) {
                // setHasJoined(true)
                updatedUserState.hasJoined = true
                // setIsDead(true)
                updatedUserState.isDead = true
                return
            }
        }

        // Check if User has requested to join the game
        const assassinsRequestArr = gameResult.join_requests.assassins
        for (let x = 0; x < assassinsRequestArr.length; x++) {
            const request = assassinsRequestArr[x]
            if (user._id == request.user) {
                // setHasRequestedJoin(true)
                updatedUserState.hasRequestedJoin = true
                return
            }
        }
        const moderatorsRequestArr = gameResult.join_requests.moderators
        for (let x = 0; x < moderatorsRequestArr.length; x++) {
            const request = moderatorsRequestArr[x]
            if (user._id == request.user) {
                // setHasRequestedJoin(true)
                updatedUserState.hasRequestedJoin = true
                return
            }
        }

        // Check if user is moderator
        for (let x = 0; x < gameResult.moderators.length; x++) {
            const moderator = gameResult.moderators[x]
            if (user._id === moderator.user) {
                // setIsModerator(true)
                updatedUserState.isModerator = true
                // setRoleSelection(ROLE.MODERATOR)
                updatedUserState.roleSelection = ROLE.MODERATOR
                // setHasJoined(true)
                updatedUserState.hasJoined = true
                return
            }
        }

    })()

    //  Check for assassins and set relevant state

    // Set Target
    if (!userState.isModerator && gameResult.game_status === GAME_STATUS.ACTIVE.STATUS) {
        for (let a = 0; a < gameResult.assassins.length; a++) {

            // find the current user's assassin object
            const currentAssassin = gameResult.assassins[a]

            if (currentAssassin.user === user._id) {

                // setCurrentAssassin(currentAssassin)
                updatedUserState.currentAssassin = currentAssassin

                for (var t = 0; t <= gameResult.assassins.length; t++) {

                    // Find the current user's target object
                    const target = gameResult.assassins[t]
                    if (currentAssassin.target === target.user) {
                        // setTarget(target)
                        updatedUserState.target = target
                        break
                    }
                }

                switch (currentAssassin.status) {
                    // If current user is in PURGATORY, set killer
                    case PURGATORY:
                        for (var k = 0; k < gameResult.assassins.length; k++) {
                            const killer = gameResult.assassins[k]
                            if (killer.target === currentAssassin.user) {
                                // setKiller(killer)
                                updatedUserState.killer = killer
                                break
                            }
                        }
                        break

                    // If current user is in DISPUTE, only set killer if killer is also in dispute, otherwise you would be setting an assassin who hasn't struck yet.
                    case DISPUTE:
                        for (var k = 0; k < gameResult.assassins.length; k++) {
                            const killer = gameResult.assassins[k]
                            if (killer.target === currentAssassin.user && killer.status === DISPUTE) {
                                // setKiller(killer)
                                updatedUserState.killer = killer
                                break
                            }
                        }
                        break
                    default:
                        break
                }
                if (currentAssassin.status === PURGATORY || currentAssassin.status === DISPUTE) {
                    for (var k = 0; k < gameResult.assassins.length; k++) {
                        const killer = gameResult.assassins[k]

                        if (killer.target === currentAssassin.user) {
                            // setKiller(killer)
                            updatedUserState.killer = killer
                            break
                        }
                    }
                }

                break
            }


        }
    }

    return {
        updatedUserState: updatedUserState,
        updatedPopupState: updatedPopupState,
    }
}



// console.log('DONK!!!!!!!!!!')
//         console.log(gameContext.userState)
//         setHasJoined(false)
//         setRoleSelection(ROLE.ASSASSIN)
//         setIsModerator(false)

//         // Check if User is game creator
//         if (gameResult.creator === user._id) {
//             setIsCreator(true)
//         }

//         // Check if user has joined game
//         for (let x = 0; x < gameResult.assassins.length; x++) {
//             const assassin = gameResult.assassins[x]
//             if (user._id === assassin.user) {
//                 setHasJoined(true)
//                 setCurrentAssassin(assassin)
//                 setAssassinStatus(assassin.status)
//                 if (assassin.status === PURGATORY) setIsDidYouDiePopUpOpen(true)
//                 setIsDisputePopUpOpen(assassin.status === ASSASSIN_STATUS.DISPUTE)
//                 break
//             }
//         }

//         // Anonymous function returns when a user's current placement in the game is determined, saving marginal computing time, I guess...
//         (() => {

//             // Check if User is in graveyard
//             for (let x = 0; x < gameResult.graveyard.length; x++) {
//                 const deadGuy = gameResult.graveyard[x]
//                 if (user._id === deadGuy.user) {
//                     setHasJoined(true)
//                     setIsDead(true)
//                     return
//                 }
//             }

//             // Check if User has requested to join the game
//             const assassinsRequestArr = gameResult.join_requests.assassins
//             for (let x = 0; x < assassinsRequestArr.length; x++) {
//                 const request = assassinsRequestArr[x]
//                 if (user._id == request.user) {
//                     setHasRequestedJoin(true)
//                     return
//                 }
//             }
//             const moderatorsRequestArr = gameResult.join_requests.moderators
//             for (let x = 0; x < moderatorsRequestArr.length; x++) {
//                 const request = moderatorsRequestArr[x]
//                 if (user._id == request.user) {
//                     setHasRequestedJoin(true)
//                     return
//                 }
//             }

//             // Check if user is moderator
//             for (let x = 0; x < gameResult.moderators.length; x++) {
//                 const moderator = gameResult.moderators[x]
//                 if (user._id === moderator.user) {
//                     setIsModerator(true)
//                     setRoleSelection(ROLE.MODERATOR)
//                     setHasJoined(true)
//                     return
//                 }
//             }

//         })()

//         //  Check for assassins and set relevant state

//         // Set Target
//         if (!gameContext.userState.isModerator && gameResult.game_status === GAME_STATUS.ACTIVE.STATUS) {
//             for (let a = 0; a < gameResult.assassins.length; a++) {

//                 // find the current user's assassin object
//                 const currentAssassin = gameResult.assassins[a]

//                 if (currentAssassin.user === user._id) {

//                     setCurrentAssassin(currentAssassin)

//                     for (var t = 0; t <= gameResult.assassins.length; t++) {

//                         // Find the current user's target object
//                         const target = gameResult.assassins[t]
//                         if (currentAssassin.target === target.user) {
//                             setTarget(target)
//                             break
//                         }
//                     }

//                     switch (currentAssassin.status) {
//                         // If current user is in PURGATORY, set killer
//                         case PURGATORY:
//                             for (var k = 0; k < gameResult.assassins.length; k++) {
//                                 const killer = gameResult.assassins[k]
//                                 if (killer.target === currentAssassin.user) {
//                                     setKiller(killer)
//                                     break
//                                 }
//                             }
//                             break

//                         // If current user is in DISPUTE, only set killer if killer is also in dispute, otherwise you would be setting an assassin who hasn't struck yet.
//                         case DISPUTE:
//                             for (var k = 0; k < gameResult.assassins.length; k++) {
//                                 const killer = gameResult.assassins[k]
//                                 if (killer.target === currentAssassin.user && killer.status === DISPUTE) {
//                                     setKiller(killer)
//                                     break
//                                 }
//                             }
//                             break
//                         default:
//                             break
//                     }
//                     if (currentAssassin.status === PURGATORY || currentAssassin.status === DISPUTE) {
//                         for (var k = 0; k < gameResult.assassins.length; k++) {
//                             const killer = gameResult.assassins[k]

//                             if (killer.target === currentAssassin.user) {
//                                 setKiller(killer)
//                                 break
//                             }
//                         }
//                     }

//                     break
//                 }


//             }
//         }