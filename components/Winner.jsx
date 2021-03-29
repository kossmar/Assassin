import React from 'react'
import AssassinIcon from './AssassinIcon'

export default function Winner({ assassin }) {

    return (
        <>
            <div className='mt-10 w-2/6 mx-auto text-center font-bold underline text-2xl'>
                WINNER:
            </div>
            <AssassinIcon name={assassin.display_name} image={assassin.profile_image} kills={assassin.kills.length} displayKills isWinning/>
        </>
    )
}