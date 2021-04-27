import React, { useEffect, useState } from 'react'
import { getCurrentDispute, submitDisputeResponse, killTarget, saveTarget } from '../../helpers/dispute-worker'

export default function DisputePopUp({ killer, target, currentAssassin, disputeId, isOpen = false, targetCancelCallback }) {

    const [isTarget, setIsTarget] = useState(true)
    const [opponent, setOpponent] = useState(null)
    const [response, setResponse] = useState('')
    const [dispute, setDispute] = useState(null)

    useEffect(() => {

        if (disputeId) {
            getCurrentDispute(disputeId)
                .then(foundDisputeArray => {
                    console.log('FOUND DISPUTE disputePopUp')
                    console.log(foundDisputeArray)
                    // TODO: make error catching here to ensure there is only 1 item in the array
                    if (foundDisputeArray.length === 1) {
                        const currentDispute = foundDisputeArray[0]
                        setDispute(currentDispute)
                        if (currentDispute.target.user === currentAssassin.user) {
                            setIsTarget(true)
                            console.log('KILLER disputePopUp.jsx')
                            console.log(killer)
                            setOpponent(killer)
                        } else {
                            setIsTarget(false)
                            setOpponent(target)
                        }
                    }

                })
        }
        // FIXME: running useEffect only when killer is updated. This seems incorrect but the call to the db to find the dispute only gets called once so ¯\_(ツ)_/¯

    }, [killer, isOpen])

    function handleTextAreaChange(e) {
        setResponse(e.target.value)
    }

    async function handleSubmitResponse() {
        submitDisputeResponse(response, disputeId)
            .then(success => {
                // TODO: if success is false, show an error message
                setDispute(prevValue => {
                    return {
                        ...prevValue,
                        killerHasResponded: true
                    }
                })
            })
    }

    function handleRevokeKill() {
        saveTarget(dispute)
            .then(success => {
                if (success === true) {
                    targetCancelCallback()
                } else {
                    console.log('Could not revoked kill - handleRevokeKill - DisputePopUp.jsx')
                }
            })
    }

    function handleTargetCancelDispute() {
        if (!dispute) {
            console.log('no dispute found')
            return
        }
        // TODO: add a confirmation thing
        killTarget(dispute)
            .then(() => {
                targetCancelCallback()
            })
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
                                <div>
                                    <div className='text-center'>
                                        <div className>
                                            YOU HAVE STARTED A DISPUTE WITH:
                                        </div>
                                        <div className='font-bold text-2xl'>
                                            {(opponent ? opponent.display_name : 'LOADING...')}
                                        </div>
                                    </div>
                                    <div className='place-content-center flex'>
                                        <button className='w-44 px-10 py-2 rounded-md border-2 border-red-200 hover:border-black text-white font-bold bg-red-500'
                                            onClick={handleTargetCancelDispute}>
                                            CANCEL
                                        </button>
                                    </div>
                                </div>

                                :

                                // FOR KILLER
                                <div>
                                    <div className='text-center'>
                                        <div>
                                            YOU ARE IN A DISPUTE WITH:
                                        </div>
                                        <div className='font-bold text-2xl'>
                                            {(opponent ? opponent.display_name : 'LOADING...')}
                                        </div>
                                    </div>

                                    {/* Killer HAS responded */}
                                    <div className={(dispute.killerHasResponded ? 'block' : 'hidden')}>
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
                                    <div className={(dispute.killerHasResponded ? 'hidden' : 'block')}>
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
