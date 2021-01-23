import React, { useEffect, useState } from 'react'

export default function EditCampaignDetails({ onChange, campaignName, weapons, safeZones, updateCampaignName, updateWeapons, updateSafeZones }) {

    function handleTextInput(event) {
        setGameDetails(prevValue => {
            const newValues = {
                ...prevValue,
                [event.target.name]: event.target.value
            }
            return newValues
        })
    }

    return (
        <div>
            <div>
                <div className="flex flex-col justify-center w-96 mx-auto py-16">
                    <div className='flex flex-col'>
                        <label className='text-left'>Campaign Name</label>
                        <input onChange={onChange} name='campaignName' className='border my-2 pl-2' type="text" placeholder='Blood pudd' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-left'>Weapons</label>
                        <textarea onChange={onChange} name='weapons' className='border my-2 pl-2' type="text" placeholder='Old sock, fragrant frog' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-left'>Safe Zones</label>
                        <textarea onChange={onChange} name='safeZones' className='border my-2 pl-2' type="text" placeholder='penis shelter' />
                    </div>
                </div>
            </div>
        </div>
    )
}