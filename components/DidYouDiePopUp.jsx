import React, { useState } from 'react'
import { mutate } from 'swr'
import AssassinIcon from '../components/AssassinIcon'
import { DID_YOU_DIE } from '../constants'

export default function DidYouDiePopUp({ isOpen, killer, currentAssassin, gameId, callback }) {


    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const [comment, setComment] = useState('')

    async function handleConfirmClick() {

        const body = JSON.stringify({
            gameId: gameId,
            killer: killer,
            target: currentAssassin
        })

        try {
            const res = await fetch('/api/games/confirm-kill-target', {
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
            console.log("Could not confirm kill (target) - client side: " + error)
        }

    }

    function handleDisputeClick() {
        setIsCommentOpen(true)
    }

    async function handleSubmitDisputeClick() {

        const body = JSON.stringify({
            gameId: gameId,
            killerId: killer.user,
            targetId: currentAssassin.user,
            comment: comment,
        })

        try {
            const res = await fetch('/api/games/dispute-kill', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            })

            if (!res.ok) {
                throw new Error(res.status)
                // TODO: Add error message
            }

            const { data } = await res.json()
            mutate(`/api/games/${gameId}`, data, false)


        } catch (error) {
            console.log("Could not confirm kill (target) - client side: " + error)
        }
    }

    function handleCancelDisputeClick() {
        setIsCommentOpen(false)
    }

    function handleTextAreaChange(e) {
        setComment(e.target.value)
    }

    return (
        <>
            <div className={(isOpen ? 'fixed' : 'hidden') + ' bg-red-200 bg-opacity-70 w-full h-full'}>
                <div className="flex w-full">

                    {/* Show the Killer */}
                    <div className={'mx-auto ' + (isCommentOpen ? 'hidden' : 'flex')}>
                        {/* If Killer is Null, show LOADING, otherwise, show 'DID YOU DIE' dialogue */}
                        {(killer != null
                            ?
                            <div className="flex p-2 mx-auto mt-24 bg-white border-2 border-gray-400 rounded-lg">
                                <div className=" mx-auto space-y-4">

                                    {/* TITLE  / ASSASSIN ICON */}
                                    <div className='text-2xl'>
                                        <div className="text-center font-bold">
                                            {DID_YOU_DIE.MESSAGE}
                                        </div>
                                        <AssassinIcon name={killer.display_name} image={killer.profile_image} />
                                    </div>

                                    {/* BUTTONS */}
                                    <div className="grid grid-cols-2">

                                        {/* CONFIRM */}
                                        <div className='px-4'>
                                            <div onClick={handleConfirmClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-green-400 bg-green-400 hover:bg-green-300 hover:border-2 text-white"}>
                                                <button className="place-self-center">
                                                    {DID_YOU_DIE.CONFIRM}
                                                </button>
                                            </div>
                                        </div>

                                        {/* DISPUTE */}
                                        <div onClick={handleDisputeClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-red-400 bg-red-400 hover:bg-red-300 hover:border-2 text-white"}>
                                            <button className="place-self-center">
                                                {DID_YOU_DIE.DISPUTE}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            :
                            <div className='text-center mx-auto place-self-center text-white font-bold text-3xl bg-red-700 bg-opacity-50 p-10 rounded-lg'>
                                LOADING...
                            </div>
                        )}
                    </div>

                    {/* If Disputing, show UI for entering an explanation */}
                    <div className={'mx-auto mt-24 max-h-full ' + (isCommentOpen ? 'block' : 'hidden')}>
                        <div className='p-2 space-y-4 bg-white border-2 border-gray-400 rounded-lg'>
                            <div className='text-center'>
                                <label>
                                    STATE YER CASE
                                </label>
                            </div>
                            <div>
                                <textarea onChange={handleTextAreaChange} className='border my-2 pl-2 w-full' name='weapons' type="text" placeholder='I was robbed!' cols='50' rows='5' value={comment} />
                            </div>

                            <div className="grid grid-cols-2">
                                {/* SUBMIT */}
                                <div className='px-4'>
                                    <div onClick={handleSubmitDisputeClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-green-400 bg-green-400 hover:bg-green-300 hover:border-2 text-white"}>
                                        <button className="place-self-center">
                                            SUBMIT
                                </button>
                                    </div>
                                </div>

                                {/* CANCEL */}
                                <div onClick={handleCancelDisputeClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-red-400 bg-red-400 hover:bg-red-300 hover:border-2 text-white"}>
                                    <button className="place-self-center">
                                        CANCEL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}