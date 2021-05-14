import React from 'react'
import { useGameContext } from '../contexts/GameContext'
import { ASSASSIN_ICON_USE } from '../../../constants'
import UserIcon from '../../../common/components/UserIcon'

export default function Moderators() {

    const [gameContext] = useGameContext()

    if (gameContext.game.moderators.length > 0) {
        return (
            <div className='my-10'>
                <div className='mt-16= w-2/6 mx-auto text-center font-bold underline text-2xl'>
                    MODERATORS:
                </div>
                {gameContext.game.moderators.map((moderator, index) => (
                    <UserIcon key={(moderator._id + index.toString())} name={moderator.display_name} state={ASSASSIN_ICON_USE.DISPLAY} image={(moderator.profile_image ? moderator.profile_image : '/images/moderator.png')} />
                ))}
            </div>
        )
    } else {
        return (
            <div className='my-10'>
                <div className='mt-16= w-2/6 mx-auto text-center font-bold text-2xl text-red-700'>
                    Then Game Cannot Begin Until A Moderator Joins:
                </div>
            </div>
        )
    }
}