import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from "next/head"
import Layout from "../../common/components/Layout"
import EditGameDetails from '../../modules/game/components/EditGameDetails'
import { page, GAME_STATUS } from '../../constants'
import ChooseRole from '../../modules/game/components/ChooseRole'
import { useUser } from '../../modules/auth/hooks/useUser'
import GameButton from '../../common/components/GameButton'
import { postNewGame, addNewGameToHardCodedAsassins, formValidate, createAssassins } from '../../modules/game/helpers/new-game-helper'

export default function NewGame() {

    const user = useUser({ redirectTo: '/login' })

    const router = useRouter()

    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')

    const [selectedRole, setSelectedRole] = useState('')
    const [gameDetails, setGameDetails] = useState({
        game_name: '',
        weapons: '',
        safe_zones: ''
    })

    function handleRoleSelect(id) {
        const name = id
        setSelectedRole(name)
    }

    function updateDetails(e) {
        const target = e.target

        const value = target.value
        const name = target.name

        setGameDetails({
            ...gameDetails,
            [name]: value
        })
    }

    async function handleSave(e) {
        e.preventDefault()

        const assassinsArr = createAssassins() // TODO: create empty array in production
        console.log(assassinsArr)

        if (selectedRole === 'assassin') assassinsArr.push({
            user: user._id,
            target: '',
            is_waiting: false,
            kills: [],
            is_alive: true,
            dispute: '',
            rank_index: 0
        })

        const newGame = {
            game_details: gameDetails,
            creator: user._id,
            moderators: (selectedRole === 'moderator' ? [user._id] : []),
            assassins: assassinsArr,
            game_status: GAME_STATUS.CREATED.STATUS,
            creator_role: selectedRole
        }

        const errs = formValidate(gameDetails, selectedRole)

        if (Object.keys(errs).length === 0) {

            postNewGame(newGame, user._id)
                .then((gameId) => addNewGameToHardCodedAsassins(gameId))   // TODO: delete in production
                .then((gameId) => router.push(`/games/${gameId}`))
                .catch((error) => console.log(error))

        } else {
            setErrors(errs)
            console.log(errs)
        }
    }

    return (
        <>
            <Head>
                <title>Assassin/new</title>
            </Head>
            <Layout page={page.rules}>
                <div className="py-10">
                    <div className='py-10 w-2/6 mx-auto text-center font-bold'>
                        Murder and mayhem awaits...
                    </div>

                    <EditGameDetails onChange={updateDetails} details={gameDetails} />

                    <ChooseRole onClick={handleRoleSelect} selectedRole={selectedRole} />

                    <GameButton
                        text='SAVE'
                        color='bg-blue-500'
                        borderColor='border-blue-200'
                        onClick={((e) => {
                            handleSave(e)
                        })}
                    />

                    {/* MESSAGES */}
                    <p>{message}</p>
                    <div>
                        {Object.values(errors).map((err, index) => (
                            <li
                                key={index}
                                className='text-red-700'
                            >
                                {err}
                            </li>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    )
}

