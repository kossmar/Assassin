import React from 'react'

export default function EditGameDetails({ onChange, details}) {

    return (
        <div>
            <div>
                <div className="flex flex-col justify-center w-96 mx-auto py-16">
                    <div className='flex flex-col'>
                        <label className='text-left'>Game Name</label>
                        <input onChange={onChange} name='game_name' className='border my-2 pl-2' type="text" placeholder='Blood pudd' value={details.game_name} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-left'>Weapons</label>
                        <textarea onChange={onChange} name='weapons' className='border my-2 pl-2' type="text" placeholder='Old sock, fragrant frog' value={details.weapons}/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-left'>Safe Zones</label>
                        <textarea onChange={onChange} name='safe_zones' className='border my-2 pl-2' type="text" placeholder='penis shelter' value={details.safe_zones}/>
                    </div>
                </div>
            </div>
        </div>
    )
}