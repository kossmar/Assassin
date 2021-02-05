import React, { useEffect, useState } from 'react'

export default function AssassinIcon({ name, image = '/images/assassin.png', kills, isWinning, displayKills, interactive = false, clickCallback, isSelected = false, id, isProfile }) {

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
                <div onClick={(isProfile ? null : handleClick)} className={'rounded-full border-8 ' + (interactive ? (isSelected ? 'border-red-600' : 'border-transparent hover:border-red-400') : 'border-transparent')}>
                    <div className={(isProfile ? "absolute cursor-pointer" : "hidden") + " content-center w-28 h-28 rounded-full bg-transparent text-transparent hover:text-white hover:bg-gray-200 hover:bg-opacity-75 "}>
                        <div className="place-self-center mt-10">
                            upload
                        </div>
                    </div>
                    <img src={image} className={'rounded-full border-4 border-black'} />
                </div>
                <div className='font-bold italic'>{name}</div>
            </div>
        </div>

    )
}