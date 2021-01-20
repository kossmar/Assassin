import React, { useState } from 'react'

export default function EditCampaignDetails({ props }) {

    const [gameDetails, setGameDetails] = useState(
        {
            campaignName: String,
            weapons: String,
            safeZones: String
        }
    )

    function handleTextInput(event) {
        console.log(event.target.value)
        setGameDetails(prevValue => {
            return {
                ...prevValue,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <div>
            <div>
                <div className="flex flex-col justify-center w-96 mx-auto py-16">
                    <div className='flex flex-col'>
                        <label className='text-left'>Campaign Name</label>
                        <input onChange={handleTextInput} name='campaignName' className='border my-2 pl-2' type="text" placeholder='Blood pudd' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-left'>Weapons</label>
                        <textarea onChange={handleTextInput} name='weapons' className='border my-2 pl-2' type="text" placeholder='Old sock, fragrant frog' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-left'>Safe Zones</label>
                        <textarea onChange={handleTextInput} name='safeZones' className='border my-2 pl-2' type="text" placeholder='penis shelter' />
                    </div>
                </div>
            </div>
        </div>
    )
}