import React, { useEffect, useState } from 'react'
import { getDisputes } from '../lib/dispute-worker'

export default function DisputeList({ disputesArr }) {

    const [disputes, setDisputes] = useState(['a'])

    useEffect(() => {
        getDisputes(disputesArr)
            .then((foundDisputes) => {
                console.log('FOUND DISPUTES')
                console.log(foundDisputes)
                setDisputes(foundDisputes)
            })
    }, disputesArr, disputes)

    async function handleModerateClick() {

    }

    return (
        <>
            <div className={"my-20 w-96 mx-auto py-6 space-y-10 text-center bg-red-100 border-2 border-grwhitay-200 rounded-xl"}>
                <div className='w-2/6 mx-auto text-center font-bold underline text-2xl'>
                    Disputes:
                </div>

                {disputes.map(dispute => (
                    <div className="grid place-items-center grid-cols-2 m-2 bg-white bg-opacity-70 rounded-lg p-2">
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
                            <button onClick={handleModerateClick} className="rounded p-2 bg-green-300 hover:bg-green-400 border-2 border-transparent hover:text-white hover:border-black">
                                ADJUDICATE
                            </button>
                        </div>
                    </div>
                ))}



            </div>
        </>
    )

}
