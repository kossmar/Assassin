import React from 'react'
import { killTarget, saveTarget } from '../../helpers/dispute-worker'

export default function AdjudicatePopUp({ isOpen, dispute, closeCallback }) {

    async function handleDecideSave() {
        saveTarget(dispute)
            .then(success => {
                switch (success) {
                    case true:
                        closeCallback()
                        break
                    case false:
                        // TODO: insert some error message here
                        console.log('could not successfully adjudicate dispute (save)')
                    default:
                        break
                }
            })
    }

    async function handleDecideKill() {
        killTarget(dispute)
            .then(success => {
                switch (success) {
                    case true:
                        // TODO: insert some success thing here
                        console.log('successfully killed target in adjudication')
                        closeCallback()
                        break
                    case false:
                        // TODO: insert some error message here
                        console.log('could not successfully adjudicate dispute (save)')
                        break
                    default:
                        break
                }
            })
    }

    function handleCancel() {
        closeCallback()
    }

    if (dispute) {
        return (
            <>
                <div className={(isOpen ? 'fixed' : 'hidden') + ' bg-blue-200 bg-opacity-70 w-full h-full'}>
                    <div className="w-5/6 sm:w-2/3 md:w-1/2 mx-auto">
                        <div className="p-2 mt-24 bg-white border-2 border-gray-400 rounded-lg">

                            <div className='grid grid-cols-2'>
                                <div className='m-2'>
                                    <div className='font-bold'>
                                        KILLER:
                                            </div>
                                    <div>
                                        {dispute.killer.display_name}
                                    </div>
                                    <textarea className='border w-full mt-4' value={dispute.killer.comment} rows={4} disabled={true} />
                                </div>
                                <div className='m-2'>
                                    <div className='font-bold'>
                                        TARGET:
                                            </div>
                                    <div>
                                        {dispute.target.display_name}
                                    </div>
                                    <textarea className='border w-full mt-4' value={dispute.target.comment} rows={4} disabled={true} />
                                </div>
                            </div>

                            {/* DECISION BUTTONS */}
                            <div className='grid grid-cols-2'>

                                <div className='place-content-center flex'>
                                    <button className='w-44 px-10 py-2 rounded-md border-2 bg-red-500 border-red-200 hover:border-black text-white font-bold'
                                        onClick={handleDecideKill}>
                                        KILL
                                            </button>
                                </div>

                                <div className='place-content-center flex'>
                                    <button className='w-44 px-10 py-2 rounded-md border-2 border-green-200 hover:border-black text-white font-bold bg-green-500'
                                        onClick={handleDecideSave}>
                                        SAVE
                                            </button>
                                </div>

                            </div>

                            <div className='place-content-center flex'>
                                <button className='w-36 px-10 mt-10 py-2 rounded-md border-2 border-green-200 hover:border-black text-white font-bold bg-blue-500'
                                    onClick={handleCancel}>
                                    CANCEL
                                        </button>
                            </div>


                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className={(isOpen ? 'fixed' : 'hidden') + ' bg-blue-200 bg-opacity-70 w-full h-full'}>
                    <div className="w-5/6 sm:w-2/3 md:w-1/2 mx-auto">
                        <div className="p-2 mt-24 bg-white border-2 border-gray-400 rounded-lg">

                            <div>
                                LOADING...
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }

}