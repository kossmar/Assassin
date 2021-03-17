import React from 'react'

export default function DidYouDiePopUp({ isOpen }) {


    return (
        <>
            <div className={(isOpen ? 'fixed' : 'hidden') + ' bg-gray-200 bg-opacity-70 w-full h-full'}>

            </div>
        </>
    )
}