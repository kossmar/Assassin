import React from 'react'
import UserIcon from '../../../common/components/UserIcon'

export default function Winner({ assassin }) {

    return (
        <>
            <div className='mt-10 w-2/6 mx-auto text-center font-bold underline text-2xl'>
                WINNER:
            </div>
            <UserIcon name={assassin.display_name} image={assassin.profile_image} kills={assassin.kills.length} displayKills isWinning/>
        </>
    )
}