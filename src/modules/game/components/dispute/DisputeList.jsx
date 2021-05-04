import React, { useEffect, useState } from 'react'
import { useGameContext } from '../../contexts/GameContext'
import { getDisputes } from '../../helpers/dispute-worker'
import { GAME_STATUS } from '../../../../constants' 


const { ACTIVE } = GAME_STATUS

export default function DisputeList({ disputesArr }) {

    const [gameContext, , , updateUserState, updatePopupState] = useGameContext()

    const [disputes, setDisputes] = useState([])

    useEffect(() => {
        if (gameContext.game.disputes.length > 0) {
            getDisputes(gameContext.game.disputes)
            .then((foundDisputes) => {
                setDisputes(foundDisputes)
            })
        }
    }, [gameContext.game.disputes])

    async function handleAdjudicateClick(dispute) {
        updateUserState({ dispute: dispute })
        updatePopupState({ adjudicate: true })

    }

    if (gameContext.game.game_status === ACTIVE.STATUS && disputes.length > 0 && gameContext.userState.isModerator) {
        return (
            <>
                <div className={"my-20 w-96 mx-auto py-6 space-y-10 text-center bg-red-100 border-2 border-grwhitay-200 rounded-xl"}>
                    <div className='w-2/6 mx-auto text-center font-bold underline text-2xl'>
                        Disputes:
                    </div>

                    {disputes.map((dispute) => (
                        <div key={dispute._id} className="grid place-items-center grid-cols-2 m-2 bg-white bg-opacity-70 rounded-lg p-2">
                            <div className="mx-0">
                                <div className='uppercase'>
                                    {dispute.killer.display_name}
                                </div>
                                <div>
                                    {'vs'}
                                </div>
                                <div className='uppercase'>
                                    {dispute.target.display_name}
                                </div>
                            </div>
                            <div>
                                <button onClick={(() => handleAdjudicateClick(dispute))} className="rounded p-2 bg-green-300 hover:bg-green-400 border-2 border-transparent hover:text-white hover:border-black">
                                    ADJUDICATE
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    } else return null



}
