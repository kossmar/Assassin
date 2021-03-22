import React, { useEffect, useState } from 'react'
import { getCurrentDispute, submitDisputeResponse } from '../lib/dispute-worker'

export default function DisputePopUp({ killer, target, currentAssassin, disputeId, isOpen = false }) {

    const [isTarget, setIsTarget] = useState(true)
    const [opponent, setOpponent] = useState(null)
    const [response, setResponse] = useState('')
    const [killerHasResponded, setKillerHasResponded] = useState(false)

    useEffect(() => {

        if (disputeId) {
            getCurrentDispute(disputeId)
                .then(foundDispute => {
                    console.log(foundDispute.killerHasResponded)
                    setKillerHasResponded(foundDispute.killerHasResponded)
                    if (foundDispute.target.user === currentAssassin.user) {
                        setIsTarget(true)
                        setOpponent(killer)
                    } else {
                        setIsTarget(false)
                        setOpponent(target)
                    }
                })
        }
        // FIXME: running useEffect only when killer is updated. This seems incorrect but the call to the db to find the dispute only gets called once so ¯\_(ツ)_/¯

    }, [killer])

    function handleTextAreaChange(e) {
        setResponse(e.target.value)
        console.log(response)
    }

    async function handleSubmitResponse() {
        submitDisputeResponse(response, disputeId)
            .then(success => {
                // TODO: if success is false, show an error message
                setKillerHasResponded(true)
            })
    }

    function handleRevokeKill() {

    }

    return (
        <>
            <div className={(isOpen ? 'fixed' : 'hidden') + ' bg-red-200 bg-opacity-70 w-full h-full'}>
                <div className="w-5/6 sm:w-2/3 md:w-1/2 mx-auto">

                    <div className="p-2 mt-24 bg-white border-2 border-gray-400 rounded-lg">


                        {(opponent
                            // if opponent hasn't been set, show loading screen, otherwise show popup contents
                            ?

                            (isTarget
                                // if TARGET, show option to cancel dispute. If KILLER, display textarea for response to dispute
                                ?

                                // FOR TARGET 
                                <div className=''>
                                    <div className='text-center'>
                                        <div>
                                            YOU HAVE STARTED A DISPUTE WITH:
                                        </div>
                                        <div className='font-bold'>
                                            {(opponent ? opponent.display_name : 'LOADING...')}
                                        </div>
                                    </div>
                                    <div className='place-content-center flex'>
                                        <button className='w-44 px-10 py-2 rounded-md border-2 border-red-200 hover:border-black text-white font-bold bg-red-500'
                                        >
                                            CANCEL
                                        </button>
                                    </div>
                                </div>

                                :

                                // FOR KILLER
                                <div className=''>
                                    <div className='text-center'>
                                        <div>
                                            YOU ARE IN A DISPUTE WITH:
                                        </div>
                                        <div className='font-bold'>
                                            {(opponent ? opponent.display_name : 'LOADING...')}
                                        </div>
                                    </div>

                                    {/* Killer HAS responded */}
                                    <div className={(killerHasResponded ? 'block' : 'hidden')}>
                                        <div className='text-center text-blue-700'>
                                            your response has been submitted
                                        </div>
                                        <div className='place-content-center flex'>
                                            <button className='w-44 px-10 py-2 rounded-md border-2 border-red-200 hover:border-black text-white font-bold bg-red-500'
                                                onClick={handleRevokeKill}>
                                                REVOKE KILL
                                            </button>
                                        </div>
                                    </div>

                                    {/* Killer has NOT responded */}
                                    <div className={(killerHasResponded ? 'hidden' : 'block')}>
                                        <div>
                                            <div className='text-center'>
                                                State yer' case!
                                            </div>
                                            <textarea onChange={handleTextAreaChange} className='border my-2 pl-2 w-full' name='weapons' type="text" placeholder='I was robbed!' cols='50' rows='5' value={response} />
                                        </div>
                                        <div className='place-content-center flex'>
                                            <button className='w-44 px-10 py-2 rounded-md border-2 border-green-200 hover:border-black text-white font-bold bg-green-500'
                                                onClick={handleSubmitResponse}>
                                                SUBMIT
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            )

                            :

                            // LOADING
                            <div className='text-center text-red-600 font-bold'>
                                LOADING...
                            </div>)}

                    </div>


                </div>
            </div>
        </>
    )
}
