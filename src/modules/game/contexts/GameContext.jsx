import { createContext, useContext, useMemo, useState } from 'react'

const GameContext = createContext()

export function useGameContext() {
    const context = useContext(GameContext)

    if (!context) {
        throw new Error(
            'useGameContext must be used within a GameContextProvider'
        )
    }
}

export function GameContextProvider({ gameResult }) {

    const [game, setGame] = useState()

    // const [gameDetails, setGameDetails] = useState(gameResult.game_details)
    // const [isEditing, setIsEditing] = useState(false)
    // const [isModerator, setIsModerator] = useState(false)
    // const [hasJoined, setHasJoined] = useState(false)
    // const [hasRequestedJoin, setHasRequestedJoin] = useState(false)
    // const [isCreator, setIsCreator] = useState(false)
    // const [roleSelection, setRoleSelection] = useState(ROLE.ASSASSIN)
    // const [target, setTarget] = useState(null)
    // const [currentAssassin, setCurrentAssassin] = useState(null)
    // const [assassinStatus, setAssassinStatus] = useState(null)
    // const [killer, setKiller] = useState(null)
    // const [isDead, setIsDead] = useState(false)
    // const [currentDispute, setCurrentDispute] = useState(null)


    // Pop Up State

    // const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
    // const [isConfirmLeaveOpen, setIsConfirmLeaveOpen] = useState(false)
    // const [isJoinPopupOpen, setIsJoinPopupOpen] = useState(false)
    // const [isStartPopUpOpen, setIsStartPopUpOpen] = useState(false)
    // const [isAdjudicatePopUpOpen, setIsAdjudicatePopUpOpen] = useState(false)
    // const [isDisputePopUpOpen, setIsDisputePopUpOpen] = useState(false)
    // const [isDidYouDiePopUpOpen, setIsDidYouDiePopUpOpen] = useState(false)

    const value = useMemo(() => {

    })

    return <GameContext.Provider value={value} />
}