import React from 'react'

export default function EditGameDetails({ onChange, details }) {

    return (
        <div>
            <div>
                <div className="flex flex-col justify-center w-96 mx-auto py-16">
                    <div className='flex flex-col'>
                        <label
                            className='text-left'
                            for='game-name'
                        >
                            Game Name
                        </label>
                        <textarea
                            onChange={onChange}
                            name='game_name'
                            className='border my-2 pl-2'
                            type="text"
                            placeholder='Blood pudd'
                            value={details?.game_name ?? 'peen'}
                            id='game-name'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label
                            className='text-left'
                            for='weapons'
                        >
                            Weapons
                        </label>
                        <textarea
                            onChange={onChange}
                            name='weapons'
                            id='weapons'
                            className='border my-2 pl-2'
                            type="text"
                            placeholder='Old sock, fragrant frog'
                            value={details?.weapons ?? ''}

                        />
                    </div>
                    <div className='flex flex-col'>
                        <label
                            className='text-left'
                            for='safe-zones'
                        >
                            Safe Zones
                        </label>
                        <textarea
                            onChange={onChange}
                            name='safe_zones'
                            className='border my-2 pl-2'
                            type="text"
                            placeholder='penis shelter'
                            id='safe-zones'
                            value={details?.safe_zones ?? ''}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}