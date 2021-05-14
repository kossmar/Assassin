import React from 'react'
import BinaryPopup from '../../../common/components/BinaryPopup'
import SinglePopup from '../../../common/components/SinglePopup'
import { ROLE } from '../../../constants'
import { useGameContext } from '../contexts/GameContext'
import { deleteGame, leaveGame, sendJoinRequest } from '../helpers/game-worker'
import AdjudicatePopUp from './dispute/AdjudicatePopUp'
import DidYouDiePopUp from './dispute/DidYouDiePopUp'
import DisputePopUp from './dispute/DisputePopUp'

export default function GamePopupManager({ user, children }) {

    const [gameContext, handleRoleSelect, updateDetails, updateUserState, updatePopupState] = useGameContext()
    const { game, userState, popupState } = gameContext

    // TODO: Conditionally render instead of using 'hidden'

    return (
        <main>
            <AdjudicatePopUp
                isOpen={popupState.adjudicate}
                dispute={userState.dispute}
                closeCallback={(() => {
                    console.log('closeCallback called in game popup manager')
                    updatePopupState({ adjudicate: false }) // why not working?
                    updateUserState({ dispute: null})
                    // TODO: should probably clear userState dispute
                })} />

            <DidYouDiePopUp
                isOpen={popupState.didYouDie}
                killer={userState.killer}
                currentAssassin={userState.currentAssassin}
                gameId={game._id}
                confirmCallback={(() => {
                    updatePopupState({ didYouDie: false })
                    updateUserState({ currentAssassin: null })
                })} />

            <DisputePopUp
                isOpen={popupState.dispute}
                killer={userState.killer}
                target={userState.target}
                currentAssassin={userState.currentAssassin}
                disputeId={(userState.currentAssassin && userState.currentAssassin.dispute)}
                targetCancelCallback={(() => {
                    updatePopupState({ dispute: false })
                    updateUserState({ currentAssassin: null })
                })}
                killerCancelCallback={(() => {
                    updatePopupState({ dispute: false })
                })} />

            <BinaryPopup
                isWarningStyle
                message={"Are you sure you want to delete this game?"}
                isOpen={popupState.delete}
                firstOptionTitle="YES"
                firstCallback={(() => {
                    deleteGame(game._id)
                })}
                secondOptionTitle="NO"
                secondCallback={(() => {
                    updatePopupState({ delete: false })
                })}
            />

            <BinaryPopup
                isWarningStyle
                message={"Are you sure you want to leave this game?"}
                isOpen={popupState.leave}
                firstOptionTitle="YES"
                firstCallback={(() => {
                    leaveGame(game._id, user._id, () => {
                        updatePopupState({ leave: false })
                    })
                })}
                secondOptionTitle="NO"
                secondCallback={(() => {
                    updatePopupState({ leave: false })
                })}
            />

            <BinaryPopup
                message={"What role would you like to join as?"}
                isOpen={popupState.join}
                firstOptionTitle="ASSASSIN"
                firstCallback={(() => {
                    sendJoinRequest(game._id, user._id, ROLE.ASSASSIN, () => {
                        updatePopupState({ join: false })
                    })
                })}
                secondOptionTitle="MODERATOR"
                secondCallback={(() => {
                    sendJoinRequest(game._id, user._id, ROLE.MODERATOR, () => {
                        updatePopupState({ join: false })
                    })
                })}
            />

            <SinglePopup
                message={"You must have at least one moderator before you can begin the game"}
                isOpen={popupState.start}
                optionTitle={"OK"}
                callback={(() => {
                    updatePopupState({ start: false })
                })}
            />

            {children}

        </main>
    )
}


{/* <AdjudicatePopUp isOpen={isAdjudicatePopUpOpen} dispute={gameContext.userState.currentDispute} closeCallback={(() => setIsAdjudicatePopUpOpen(false))} />
<DidYouDiePopUp isOpen={isDidYouDiePopUpOpen} killer={gameContext.userState.killer} currentAssassin={gameContext.userState.currentAssassin} gameId={gameResult._id} callback={(() => {
    setIsDidYouDiePopUpOpen(false)
    setCurrentAssassin(null)
})} />
<DisputePopUp isOpen={isDisputePopUpOpen} killer={gameContext.userState.killer} target={gameContext.userState.target} currentAssassin={gameContext.userState.currentAssassin} disputeId={(gameContext.userState.currentAssassin && gameContext.userState.currentAssassin.dispute)} targetCancelCallback={handleTargetCancelDispute} killerCancelCallback={(() => { setIsDisputePopUpOpen(false) })} />

<BinaryPopup
    isWarningStyle
    message={"Are you sure you want to delete this game?"}
    isOpen={isConfirmDeleteOpen}
    firstOptionTitle="YES"
    firstCallback={(() => {
        deleteGame(gameResult._id)
    })}
    secondOptionTitle="NO"
    secondCallback={(() => {
        setIsConfirmDeleteOpen(false)
    })}
/>

<BinaryPopup
    isWarningStyle
    message={"Are you sure you want to leave this game?"}
    isOpen={isConfirmLeaveOpen}
    firstOptionTitle="YES"
    firstCallback={(() => {
        leaveGame(gameResult._id, user._id, () => {
            setIsConfirmLeaveOpen(false)
        })
    })}
    secondOptionTitle="NO"
    secondCallback={(() => {
        setIsConfirmLeaveOpen(false)
    })}
/>

<BinaryPopup
    message={"What role would you like to join as?"}
    isOpen={isJoinPopupOpen}
    firstOptionTitle="ASSASSIN"
    firstCallback={(() => {
        sendJoinRequest(gameResult._id, user._id, ROLE.ASSASSIN, () => {
            setIsJoinPopupOpen(false)
        })
    })}
    secondOptionTitle="MODERATOR"
    secondCallback={(() => {
        sendJoinRequest(gameResult._id, user._id, ROLE.MODERATOR, () => {
            setIsJoinPopupOpen(false)
        })
    })}
/>


- - - - - - 


<SinglePopup
    message={"You must have at least one moderator before you can begin the game"}
    isOpen={isStartPopUpOpen}
    optionTitle={"OK"}
    callback={(() => {
        setIsStartPopUpOpen(false)
    })}
/> */}