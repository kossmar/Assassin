import React, { useState } from 'react'

export default function DisputeComment({ cancelCallback, submitCallback }) {

    const [comment, setComment] = useState('')

    return (
        <>
            <div className={'mx-auto mt-24 max-h-full ' + (isCommentOpen ? 'block' : 'hidden')}>
                <div className='p-2 space-y-4 bg-white border-2 border-gray-400 rounded-lg'>
                    <div className='text-center'>
                        <label>
                            STATE YER CASE
                        </label>
                    </div>
                    <div>
                        <textarea onChange={(e => { setComment(e.target.value) })} className='border my-2 pl-2 w-full' name='weapons' type="text" placeholder='I was robbed!' cols='50' rows='5' value={comment} />
                    </div>

                    <div className="grid grid-cols-2">
                        {/* CONFIRM */}
                        <div className='px-4'>
                            <div onClick={handleSubmitDisputeClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-green-400 bg-green-400 hover:bg-green-300 hover:border-2 text-white"}>
                                <button className="place-self-center">
                                    SUBMIT
                                </button>
                            </div>
                        </div>

                        {/* DISPUTE */}
                        <div onClick={handleCancelDisputeClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-red-400 bg-red-400 hover:bg-red-300 hover:border-2 text-white"}>
                            <button className="place-self-center">
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}