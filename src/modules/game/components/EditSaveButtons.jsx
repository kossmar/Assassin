import React from 'react'
import { useGameContext } from "../contexts/GameContext"


export default function EditSaveButtons() {

    const [gameContext, handleRoleSelect, updateDetails, updateUserState] = useGameContext()

    if (gameContext.userState.isEditing) {
        return (
            <>
                {/* SAVE */}
                <a href='#top'>
                    <button className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-blue-200 hover:border-black text-white font-bold bg-blue-500'>
                        {/* <button onClick={handleSaveClick} className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-blue-200 hover:border-black text-white font-bold bg-blue-500'> */}
                        SAVE
                    </button>
                </a>
            </>
        )
    } else {
        return (
            <>
                {/* EDIT  */}
                <a href='#top'>
                    <button onClick={() => updateUserState('isEditing', true)} className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-blue-200 hover:border-black text-white font-bold bg-blue-500'>
                        EDIT
                    </button>
                </a>
            </>
        )
    } 
}