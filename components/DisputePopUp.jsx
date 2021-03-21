import { get } from 'mongoose'
import React, { useEffect, useState } from 'react'
import { getCurrentDispute } from '../lib/game-worker'

export default function DisputePopUp({ killer, target, currentAssassin, gameId, disputeId, isOpen = false }) {

    useEffect(() => {
        console.log(killer)
        console.log(currentAssassin)

        if (disputeId) {
            getCurrentDispute(disputeId)
                .then(foundDispute => {
                    console.log('FOUND DISPUTE')
                    console.log(foundDispute)
                    if (foundDispute.target === currentAssassin.user) {
                        setIsTarget(true)
                        setOpponent(killer)
                    } else {
                        setIsTarget(false)
                        setOpponent(target)
                    }
                })
        }
        
    })

    const [dispute, setDispute] = useState(null)
    const [isTarget, setIsTarget] = useState(true)
    const [opponent, setOpponent] = useState(null)

    return (
        <>
            <div className={(isOpen ? 'fixed' : 'hidden') + ' bg-red-200 bg-opacity-70 w-full h-full'}>
                <div className="w-1/3 mx-auto">

                    <div className="p-2 mt-24 bg-white border-2 border-gray-400 rounded-lg">
                        <div className='mx-auto'>
                            <div className='text-center'>
                                <div>
                                    YOU ARE INVOLVED IN A DISPUTE WITH:
                                </div>
                                <div>
                                    {(opponent ? opponent.display_name : 'LOADING...')}
                                    {/* {killer.display_name} */}
                                </div>
                            </div>
                            <div className='place-content-center flex'>
                                <button className='w-44 px-10 py-2 rounded-md border-2 border-red-200 hover:border-black text-white font-bold bg-red-500'
                                    onClick>
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
