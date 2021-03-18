import React from 'react'
import { mutate } from 'swr'
import AssassinIcon from '../components/AssassinIcon'
import { DID_YOU_DIE } from '../constants'

export default function DidYouDiePopUp({ isOpen, killer, currentUser, gameId }) {

    console.log("killer")
    console.log(killer)

    // const [killer, setKiller] = useState()

    async function handleConfirmClick() {

        const body = JSON.stringify({
            gameId: gameId,
            killer: killer,
            target: currentUser
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

    async function handleDisputeClick() {

    }

    return (
        <>
            <div className={(isOpen ? 'fixed' : 'hidden') + ' bg-red-200 bg-opacity-70 w-full h-full'}>
                <div className="flex h-full w-full">
                    {(killer != null
                        ?
                        <div className="flex p-2 mx-auto place-self-center bg-white border-2 border-gray-400 rounded-lg">
                            <div className=" mx-auto place-self-center space-y-4">
                                <div className='text-2xl'>
                                    <div className="text-center font-bold">
                                        {DID_YOU_DIE.MESSAGE}
                                    </div>
                                    <AssassinIcon name={killer.display_name} image={killer.profile_image} />
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className='px-4'>
                                        <div onClick={handleConfirmClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-green-400 bg-green-400 hover:bg-green-300 hover:border-2 text-white"}>
                                            <div className="place-self-center">
                                                {DID_YOU_DIE.CONFIRM}
                                            </div>
                                        </div>
                                    </div>

                                    <div onClick={handleDisputeClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-red-400 bg-red-400 hover:bg-red-300 hover:border-2 text-white"}>
                                        <div className="place-self-center">
                                            {DID_YOU_DIE.DISPUTE}
                                        </div>
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
            </div>
        </>
    )
}