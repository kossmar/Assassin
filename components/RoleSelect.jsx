import React, { useState } from 'react'
import AssassinIcon from "./AssassinIcon"

export default function RoleSelect({ props }) {

    const [ selectedRole, setSelectedRole ] = useState({
        assassin: false,
        moderator: false
    })

    function handleClick(name) {
        console.log(name)
        setSelectedRole(() => {
            switch (name) {
                case "assassin":
                    return {
                        assassin: true,
                        moderator: false
                    }
                    case "moderator": 
                    return {
                        assassin: false,
                        moderator: true
                    }
            }
        })
    }

    return (
        <div className='mb-20'>
            <div className='fmt-10 w-2/6 mx-auto text-center font-bold underline'>
                CHOOSE YOUR ROLE
        </div>
            <div className='mt-8 grid grid-cols-2 w-2/6 mx-auto'>
                <AssassinIcon image='/images/assassin.png' id={'assassin'} name={'ASSASSIN'} interactive={true} isSelected={selectedRole.assassin} clickCallback={handleClick}/>
                <AssassinIcon image='/images/moderator.png' id={'moderator'} name={'MODERATOR'} interactive={true} isSelected={selectedRole.moderator} clickCallback={handleClick}/>
            </div>
        </div>
    )
}