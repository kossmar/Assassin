import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from "next/head"
import Layout from "../../components/Layout"
import EditGameDetails from '../../components/EditGamesDetails'
import { page } from "../../constants"
import Link from "next/link"
import ChooseRole from '../../components/ChooseRole'
import { gameStatus } from '../../constants'

export default function NewGame() {
    const id = "test"
    const currentUser = "124567890"
    // var newGame

    const router = useRouter()
    const contentType = 'application/json'

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
    const postData = async (newGame) => {

        console.log("STRINGIFY @ postData: \n" + JSON.stringify(newGame))

        try {
            const res = await fetch('/api/games/new', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(newGame),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            router.push('/')
        } catch (error) {
            console.log('Failed to add game \n' + error)
        }
    }

    const handleSave = (e) => {
        e.preventDefault()

        const newGame = {
            ...gameDetails,
            creator: currentUser,
            moderator: (selectedRole === 'moderator' ? currentUser : ''),
            assassins: (selectedRole === 'assassin' ? [{ userId: currentUser }] : ''),
            game_status: gameStatus.CREATED
        }

        console.log("STRINGIFY at start of handleSave: \n" + JSON.stringify(newGame))

        // const errs = formValidate()
        // if (Object.keys(errs).length === 0) {
        postData(newGame)
        // } else {
        //     setErrors({ errs })
        // }
    }

    /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
    const formValidate = () => {
        let err = {}
        if (!form.name) err.name = 'Name is required'
        if (!form.owner_name) err.owner_name = 'Owner is required'
        if (!form.species) err.species = 'Species is required'
        if (!form.image_url) err.image_url = 'Image URL is required'
        return err
    }



    return (
        <div>
            <Head>
                <title>Assassin/new</title>
            </Head>
            <Layout page={page.rules}>

                <div className='mt-10 w-2/6 mx-auto text-center font-bold'>
                    Murder and mayhem awaits...
                </div>

                {/* EDIT GAME DETAILS */}
                <EditGameDetails onChange={updateDetails} details={gameDetails} />

                {/* CHOOSE ROLE */}
                <ChooseRole onClick={handleRoleSelect} selectedRole={selectedRole} />

                {/* BUTTONS */}
                <div className='w-2/5 mx-auto space-y-4 my-8'>
                    <div>
                        <Link href={`/games/${id}`}>
                            <button onClick={handleSave} className='flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 border-blue-200 hover:border-black text-white font-bold bg-blue-500'>
                                SAVE
                            </button>
                        </Link>
                    </div>
                </div>
            </Layout>
        </div>
    )
}