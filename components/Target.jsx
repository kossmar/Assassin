import React, { useEffect, useState } from 'react'
import { mutate } from 'swr'
import AssassinIcon from '../components/AssassinIcon'
import { GAME_STATUS, ASSASSIN_ICON_USE, ASSASSIN_STATUS } from '../constants'


export default function Target({ target, gameId }) {

    const { ALIVE, CONFIRM, WAITING } = ASSASSIN_ICON_USE.TARGET
    const { ALIVE: TARGET_ALIVE, PURGATORY: TARGET_PURGATORY } = ASSASSIN_STATUS
    // console.log(ALIVE)

    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)

    const [state, setState] = useState(ALIVE)

    useEffect(() => {

        if (target) {
            setName(target.display_name)
            setImage((target.profile_image ? target.profile_image : '/images/assassin.png'))
            if (state != CONFIRM) {
                setState(() => {
                    switch (target.status) {
                        case TARGET_ALIVE:
                            return ALIVE
                        case TARGET_PURGATORY:
                            return WAITING
                    }
                })
            }
        }
    }, [target])

    function handleKillClick() {
        setState(CONFIRM)
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
            case CONFIRM:
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

    return (
        <>
            <div className='bg-red-500 rounded-2xl w-96 mx-auto py-10'>
                <div className='text-center font-bold text-2xl'>

                    {/* STATUS MESSAGE */}
                    {(state === ALIVE
                        ?
                        <div>KILL THIS PERSON</div>
                        :
                        <div>THIS PERSON LOOKS DEAD</div>
                    )}
                    <AssassinIcon name={name} image={image} isInteractive={false} state={state} clickCallback={handleKillClick} />
                </div>

                {/* 'CONFIRM' STATE BUTTONS */}
                <div className={(state === CONFIRM ? 'block' : 'hidden')}>
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
}