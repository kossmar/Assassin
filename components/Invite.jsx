import React from 'react'

export default function Invite({ isForAssassins=true, inviteLink="https://assassingame.com/game/invite/aSdfkj" }) {
    return (
        <div>
            <div>
                <div className="flex flex-col justify-center w-96 mx-auto py-16">
                    <div className='flex flex-col'>
                        {(isForAssassins ? <label className='text-left'>Invite Assassins</label> : <label className='text-left'>Invite Moderator</label>)}
                        <input onChange name='campaignName' className='border my-2 pl-2' type="text" placeholder='e-mail' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-left'>Invite Link</label>
                        <div onChange name='weapons' className='border rounded my-2 pl-2 py-2'>
                            {inviteLink}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}