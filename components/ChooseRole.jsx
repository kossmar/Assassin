import React from 'react'
import AssassinIcon from './AssassinIcon'

export default function ChooseRole({ selectedRole, onClick }) {

    function handleClick(id) {
        onClick(id)
    }

    return (
        <div className='mb-20'>
            <div className='fmt-10 w-2/6 mx-auto text-center font-bold underline'>
                CHOOSE YOUR ROLE
        </div>
            <div className='mt-8 grid grid-cols-2 w-2/6 mx-auto'>
                <AssassinIcon image='/images/assassin.png' id={'assassin'} name={'ASSASSIN'} isInteractive={true} isSelected={(selectedRole === 'assassin')} clickCallback={handleClick} />
                <AssassinIcon image='/images/moderator.png' id={'moderator'} name={'MODERATOR'} isInteractive={true} isSelected={(selectedRole === 'moderator')} clickCallback={handleClick} />
            </div>
        </div>
    )
}