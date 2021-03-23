import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from "next/head"
import Layout from "../../components/Layout"
import EditGameDetails from '../../components/EditGameDetails'
import { page } from "../../constants"
import ChooseRole from '../../components/ChooseRole'
import { GAME_STATUS } from '../../constants'
import { useUser } from '../../lib/hooks/useUser'

export default function NewGame() {

    const user = useUser({ redirectTo: '/login' })


    // var newGame

    const router = useRouter()
    const contentType = 'application/json'

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

    /* The POST method adds a new entry in the mongodb database. */
    const postNewGame = async (newGame) => {

        const body = { game: newGame, userId: user._id }

        try {
            const res = await fetch('/api/games/new', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(body),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            const data = await res.json()
            const id = data.data._id

            await addGameToCurrent(id)

            router.push(`/games/${id}`)

        } catch (error) {
            setMessage('Failed to add pet: \n' + errors)
            console.log('Failed to add game \n' + error)
        }
    }

    const addGameToCurrent = async (gameId) => {
        const modifiedUser = user
        modifiedUser.games.current.push(gameId)
        const body = JSON.stringify({ user: modifiedUser })

        try {
            const res = await fetch("/api/profile/save", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })

            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data } = await res.json()

            mutate(`/api/profile/user`)

        } catch (err) {
            console.log(err)
        }

        usersArr.forEach((user) => {
            const body = JSON.stringify({ userId: user, gameId: gameId })
            postNewGameToCurrent(body)
        })
    }

    const postNewGameToCurrent = async (body) => {
        try {
            const res = await fetch("/api/profile/add-new-game", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })

            if (!res.ok) {
                throw new Error(res.status)
            }

            // const { data } = await res.json()

            // mutate(`/api/profile/user`)

        } catch (err) {
            console.log(err)
        }
    }


    const handleSave = (e) => {
        e.preventDefault()

        const assassinsArr = createAssassins()
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
            ...gameDetails,
            creator: user._id,
            moderators: (selectedRole === 'moderator' ? [user._id] : []),
            assassins: assassinsArr,
            game_status: GAME_STATUS.CREATED.STATUS,
            creator_role: selectedRole
        }

        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            postNewGame(newGame)
        } else {
            setErrors({ errs })
            console.log(errs)
        }
    }

    /* Makes sure game info is filled for game name, allowed weapons, safe zones, and creator's role */
    const formValidate = () => {
        let err = {}
        if (!gameDetails.game_name) err.name = 'Game Name is required'
        if (!gameDetails.weapons) err.owner_name = 'Weapons are required'
        if (!gameDetails.safe_zones) err.species = 'Safe Zones are required'
        if (!selectedRole) err.image_url = 'You must select a role for yourself'
        return err
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

                    {/* EDIT GAME DETAILS */}
                    <EditGameDetails onChange={updateDetails} details={gameDetails} />

                    {/* CHOOSE ROLE */}
                    <ChooseRole onClick={handleRoleSelect} selectedRole={selectedRole} />

                    {/* BUTTONS */}
                    <div className='w-2/5 mx-auto space-y-4 my-8'>
                        <button onClick={handleSave} className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-blue-200 hover:border-black text-white font-bold bg-blue-500'>
                            SAVE
                    </button>
                    </div>

                    {/* MESSAGES */}
                    <p>{message}</p>
                    <div>
                        {Object.keys(errors).map((err, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </div>
                </div>

            </Layout>
        </>
    )
}

// TODO: Delete this biz at some point

const usersArr = [
    '602b00ec1d66220c2a813b8a',
    '602b010e1d66220c2a813b8b',
    '602b01361d66220c2a813b8c',
    '6025b3144fdfe637afe77bbe',
]

function createAssassins() {
    return usersArr.map(userId => {
        return {
            user: userId,
            target: '',
            is_waiting: false,
            kills: [],
            status: "ALIVE",
            dispute: '',
            rank_index: 0,
        }
    })
}