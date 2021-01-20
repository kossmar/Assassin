import React from 'react'

export default function AssassinIcon({ name, image, kills }) {
    return (
        <div>
            <div className='w-24 mx-auto text-center space-y-4'>
                <div>{kills}</div>
                <img src={image} className='rounded-full ring-4 ring-black' />
                <div className='font-bold italic'>{name}</div>
            </div>
        </div>

    )
}