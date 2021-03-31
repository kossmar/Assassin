import React from 'react'
import { ASSASSIN_ICON_USE } from '../constants'

export default function AssassinIcon({ assassin, name, image = '/images/assassin.png', kills, isWinning, displayKills, isInteractive = false, clickCallback, isSelected = false, id, isProfile, state, disabled = false }) {
    console.log('STATE')
    console.log(state)
    const { ROLE, TARGET, DISPLAY, PROFILE } = ASSASSIN_ICON_USE

    function handleClick() {
        switch (state) {
            case ROLE:
                clickCallback(id)
                break
            case TARGET.ALIVE:
                clickCallback()
                break
            default:
                break
        }
    }

    switch (state) {
        case PROFILE:
            return (
                <>
                    <div className='w-32 mx-auto text-center space-y-4'>

                        {/* IMAGE CIRCLE*/}
                        <div className={'rounded-full border-8 border-transparent'}
                            onClick={(handleClick)}>

                            {/* HOVER 4 Image Select */}
                            <div className={(isInteractive ? "absolute cursor-pointer " : " hidden ") + " content-center w-28 h-28 rounded-full bg-transparent text-transparent hover:text-white hover:bg-gray-200 hover:bg-opacity-75 "}>
                                <div className="place-self-center mt-10">
                                    UPLOAD
                                </div>
                            </div>

                            {/* IMAGE */}
                            <div className='flex rounded-full border-4 border-black overflow-hidden h-28'>
                                <img src={image} className='object-cover place-self-center min-h-full min-w-full' />
                            </div>

                        </div>
                        <div className='font-bold italic'>{name}</div>

                    </div>
                </>
            )

        case DISPLAY:
            return (
                <>
                    <div className='w-32 mx-auto text-center space-y-4'>

                        {/* IMAGE CIRCLE*/}
                        <div className={'rounded-full border-8 border-transparent'}
                            onClick={(handleClick)}>


                            {/* IMAGE */}
                            <div className='flex rounded-full border-4 border-black overflow-hidden h-28'>
                                <img src={image} className='object-cover place-self-center min-h-full min-w-full' />
                            </div>

                        </div>
                        <div className='font-bold italic'>{name}</div>

                    </div>
                </>
            )

        default:
            return (
                <div>
                    <div className='w-32 mx-auto text-center space-y-4'>

                        {/* KILL COUNT*/}
                        <div className='mx-auto w-1/2'>
                            <div className={'h-12 items-center place-items-center place-content-center ' + (displayKills ? 'flex' : 'hidden')}>
                                <div className={'w-full z-50 font-bold ' + (isWinning && 'text-white')}>{kills}</div>
                                {(isWinning && <img className='h-10 w-full dingle' src="/images/star.png" />)}
                            </div>
                        </div>

                        {/* IMAGE CIRCLE*/}
                        <div className={'rounded-full border-8 ' + (isInteractive && state === PROFILE ? (isSelected ? 'border-red-600' : 'border-transparent hover:border-red-400') : 'border-transparent')}
                            onClick={(handleClick)}>

                            {/* TARGET.WAITING X */}
                            <div className={(state === TARGET.WAITING ? 'absolute' : 'hidden') + ' ml-6 mt-6'}>
                                <img src='/images/cross.png' />
                            </div>

                            {/* HOVER for Confirm Kill */}
                            <div className={(state === TARGET.ALIVE && !disabled ? 'absolute' : "hidden") + " cursor-pointer content-center w-28 h-28 rounded-full bg-transparent text-transparent hover:text-red-700 hover:bg-red-200 hover:bg-opacity-75"}>
                                <div className="place-self-center mt-10">
                                    KILL
                                </div>
                            </div>

                            {/* IMAGE */}
                            <div className='flex rounded-full border-4 border-black overflow-hidden h-28'>
                                <img src={image} className='object-cover place-self-center min-h-full min-w-full' />
                            </div>

                        </div>
                        <div className='font-bold italic'>{name}</div>


                    </div>
                </div>

            )
    }

}