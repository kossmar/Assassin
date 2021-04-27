import React from 'react'
import UserIcon from '../../../common/components/UserIcon'
import { ASSASSIN_ICON_USE } from '../../../common/constants'

const { ROLE } = ASSASSIN_ICON_USE
export default function ChooseRole({ selectedRole, onClick }) {

    function handleClick(id) {
        console.log(id)

        onClick(id)
    }

    return (
        <div className='mb-20'>
            <div className='fmt-10 w-2/6 mx-auto text-center font-bold underline'>
                CHOOSE YOUR ROLE
        </div>
            <div className='mt-8 grid grid-cols-2 w-5/6 md:w-4/6 mx-auto'>
                <UserIcon image='/images/assassin.png' id={'assassin'} name={'ASSASSIN'} state={ROLE} isInteractive={true} isSelected={(selectedRole === 'assassin')} clickCallback={handleClick} />
                <UserIcon image='/images/moderator.png' id={'moderator'} name={'MODERATOR'} state={ROLE} isInteractive={true} isSelected={(selectedRole === 'moderator')} clickCallback={handleClick} />
            </div>
        </div>
    )
}