import React, { useEffect, useState } from 'react'

export default function AssassinIcon({ name, image, kills, isWinning, displayKills, interactive = false, clickCallback, isSelected, id}) {
    
    function handleClick() {
        clickCallback(id)
    }
 

    return (
        <div>
            <div className='w-32 mx-auto text-center space-y-4'>
                <div className='mx-auto w-1/2'>
                    <div className={'h-12 items-center place-items-center place-content-center ' + (displayKills ? 'flex' : 'hidden')}>
                        <div className={'w-full z-50 font-bold ' + (isWinning && 'text-white')}>{kills}</div>
                        {(isWinning && <img className='h-10 w-full dingle' src="/images/star.png" />)}
                    </div>
                </div>
                <div onClick={handleClick} className={'rounded-full border-8 ' + (interactive ? (isSelected ? 'border-red-600' : 'border-transparent hover:border-red-400') : 'border-transparent')}>
                    <img src={image} className={'rounded-full border-4 border-black'} />
                </div>
                <div className='font-bold italic'>{name}</div>
            </div>
        </div>

    )
}