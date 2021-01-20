import React from 'react'

export default function AssassinIcon({ name, image, kills, isWinning, displayKills}) {
    return (
        <div>
            <div className='w-24 mx-auto text-center space-y-4'>
                <div className='mx-auto w-1/2'>
                    <div className={'h-12 items-center place-items-center place-content-center ' + (displayKills ? 'flex' : 'hidden')}>
                        <div className={'w-full z-50 font-bold ' + (isWinning && 'text-white')}>{kills}</div>
                        {(isWinning && <img className='h-10 w-full dingle' src="/images/star.png" />)}
                    </div>
                </div>

                <img src={image} className='rounded-full ring-4 ring-black' />
                <div className='font-bold italic'>{name}</div>
            </div>
        </div>

    )
}