import React, { useEffect, useState } from 'react'
import AssassinIcon from '../components/AssassinIcon'
import { GAME_STATUS } from '../constants'

export default function Target({ target }) {

    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        if (target) {
            setName(target.display_name)
            setImage((target.profile_image ? target.profile_image : '/images/assassin.png'))
        }
    }, [target])

    return (
        <>
            <div className='bg-red-500 rounded-2xl w-96 mx-auto py-10'>
                <div className='text-center font-bold text-2xl'>
                    KILL THIS PERSON
                <AssassinIcon name={name} image={image} isInteractive={false} />
                </div>
            </div>
        </>
    )
}