import React, { useEffect, useState } from 'react'
import AssassinIcon from '../components/AssassinIcon'
import { GAME_STATUS, ASSASSIN_ICON_USE } from '../constants'


export default function Target({ target }) {

    const { ALIVE, CONFIRM, WAITING } = ASSASSIN_ICON_USE.TARGET
    // console.log(ALIVE)

    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)

    const [state, setState] = useState(ALIVE)

    useEffect(() => {
        if (target) {
            setName(target.display_name)
            setImage((target.profile_image ? target.profile_image : '/images/assassin.png'))
        }
    })

    function handleKillClick() {
        console.log("WIENER")
        setState(CONFIRM)
    }

    function handleConfirmClick() {
        console.log('confirm')
    }

    function handleCancelClick() {
        setState(ALIVE)
    }

    return (
        <>
            <div className='bg-red-500 rounded-2xl w-96 mx-auto py-10'>
                <div className='text-center font-bold text-2xl'>
                    KILL THIS PERSON
                <AssassinIcon name={name} image={image} isInteractive={false} state={state} clickCallback={handleKillClick} />
                </div>
                <div className={(state === CONFIRM ? 'block' : 'hidden')}>
                    <div className="grid grid-cols-2 mt-8">
                        <div onClick={handleConfirmClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-green-400 bg-green-400 hover:bg-green-300 hover:border-2 text-white"}>
                            <div className="place-self-center">
                                CONFIRM
                            </div>
                        </div>
                        <div onClick={handleCancelClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-red-400 bg-red-400 hover:bg-red-300 hover:border-2 text-white"}>
                            <div className="place-self-center">
                                CANCEL
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}