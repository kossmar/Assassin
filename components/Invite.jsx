import React from 'react'

export default function Invite({ isForAssassins = true, inviteLink = "https://assassingame.com/game/invite/aSdfkafagggsj" }) {
    return (
        <div>
            <div>
                <div className="flex flex-col justify-center w-96 mx-auto py-6">

                    <div className='flex flex-col'>
                        {(isForAssassins ? <label className='text-left'>Invite Assassins</label> : <label className='text-left'>Invite Moderator</label>)}

                        <div className="flex">
                            <input name='inviteEmails' className='border my-2 pl-2 w-5/6' type="text" placeholder='e-mail' />

                            <div className='flex m-auto w-1/6'>
                                <button className='w-10 h-10 mx-auto rounded-lg border-2 border-transparent hover:bg-gray-200 focus:outline-none focus:border-blue-100'>
                                    <svg className='w-6 mx-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </button>
                            </div>

                        </div>

                    </div>

                    <div className='flex flex-col'>
                        <label className='text-left'>Invite Link</label>

                        <div className='flex'>
                            <div className='overflow-scroll border rounded my-2 pl-2 py-2 w-5/6'>
                                {inviteLink}
                            </div>

                            <div className='flex m-auto w-1/6'>
                                <button className='w-10 h-10 mx-auto rounded-lg border-2 border-transparent hover:bg-gray-200 focus:outline-none focus:border-blue-100'>
                                    <svg className='w-6 mx-auto' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                </button>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}