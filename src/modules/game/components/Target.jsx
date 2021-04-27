import React, { useEffect, useState } from 'react'
import { mutate } from 'swr'
import UserIcon from '../../../common/components/UserIcon'
import { ASSASSIN_ICON_USE, ASSASSIN_STATUS, GAME_STATUS } from '../../../common/constants'
import { useGameContext } from '../contexts/GameContext'

const { ACTIVE } = GAME_STATUS


export default function Target() {

    const [gameContext] = useGameContext()

    const target = gameContext.userState.target
    const gameId = gameContext.game._id
    let disabled = false
    if (gameContext.userState.assassinStatus === ASSASSIN_STATUS.PURGATORY || gameContext.userState.assassinStatus === ASSASSIN_STATUS.DISPUTE) {
        disabled = true
    }


    const { ALIVE, CONFIRM, WAITING } = ASSASSIN_ICON_USE.TARGET
    // console.log(ALIVE)

    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)

    const [state, setState] = useState(ASSASSIN_ICON_USE.TARGET.ALIVE)

    useEffect(() => {

        if (target) {
            setName(target.display_name)
            setImage((target.profile_image ? target.profile_image : '/images/assassin.png'))
            if (state != ASSASSIN_ICON_USE.TARGET.CONFIRM) {
                setState(() => {
                    console.log(target.status)
                    switch (target.status) {
                        case ASSASSIN_STATUS.ALIVE:
                            console.log('DONK')
                            return ASSASSIN_ICON_USE.TARGET.ALIVE
                        case ASSASSIN_STATUS.PURGATORY:
                            console.log('PLONK')
                            return ASSASSIN_ICON_USE.TARGET.WAITING
                    }
                })
            }
        }
    }, [target])

    function handleKillClick() {
        setState(ASSASSIN_ICON_USE.TARGET.CONFIRM)
    }

    async function handleConfirmClick() {

        const body = JSON.stringify({
            gameId: gameId,
            target: target
        })

        try {
            const res = await fetch('/api/games/confirm-kill-assassin', {
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            })

            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data } = await res.json()
            mutate(`/api/games/${gameId}`, data, false)
            setState(WAITING)

        } catch (error) {
            console.log("Failed to confirm kill by assassin - client side: ")
        }
    }

    async function handleCancelClick() {
        switch (state) {
            case ASSASSIN_ICON_USE.TARGET.CONFIRM:
                setState(ALIVE)
                break
            case WAITING:

                // Show confirmation popup
                // Update Target in DB - set status: ALIVE
                // If dispute, resolve dispute in DB
                const body = JSON.stringify({
                    gameId: gameId,
                    target: target
                })

                try {
                    const res = await fetch('/api/games/cancel-kill', {
                        method: "PUT",
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: body
                    })

                    if (!res.ok) {
                        throw new Error(res.status)
                    }

                    const { data } = await res.json()
                    mutate(`/api/games/${gameId}`, data, false)

                } catch (error) {
                    console.log("Failed to confirm kill by assassin - client side: ")
                }
                break
            default:
                break
        }
    }

    if (gameContext.userState.currentAssassin != null && gameContext.game.game_status === ACTIVE.STATUS) {
        return (
            <>
                <div className='bg-red-500 rounded-2xl w-96 mx-auto py-10 my-20'>
                    <div className='text-center font-bold text-2xl'>

                        {/* STATUS MESSAGE */}
                        {(state === ALIVE
                            ?
                            <div>KILL THIS PERSON</div>
                            :
                            <div>THIS PERSON LOOKS DEAD</div>
                        )}
                        <UserIcon name={name} image={image} isInteractive={false} state={state} clickCallback={handleKillClick} disabled={disabled} />
                    </div>

                    {/* 'CONFIRM' STATE BUTTONS */}
                    <div className={(state === ASSASSIN_ICON_USE.TARGET.CONFIRM ? 'block' : 'hidden')}>
                        <div className="grid grid-cols-2 mt-8">
                            <div onClick={handleConfirmClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-green-400 bg-green-400 hover:bg-green-300 hover:border-2 text-white"}>
                                <div className="place-self-center">
                                    CONFIRM
                                </div>
                            </div>
                            <div onClick={handleCancelClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-red-400 bg-red-400 hover:bg-red-300 hover:border-2 text-white"}>
                                <div className="place-self-center">
                                    CANCEL
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 'WAITING' STATE BUTTONS */}
                    <div className={'mt-5 ' + (state === WAITING ? 'block' : 'hidden')}>
                        <div className='text-center text-red-300'>
                            Waiting for confirmation ...
                        </div>
                        <div onClick={handleCancelClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-red-400 bg-red-400 hover:bg-red-300 hover:border-2 text-white"}>
                            <div className="place-self-center">
                                CANCEL
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else return null

}