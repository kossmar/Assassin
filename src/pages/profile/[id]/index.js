import Layout from '../../../common/components/Layout'
import UserIcon from '../../../common/components/UserIcon'
import Button from '../../../common/components/Button'
import { useUser } from '../../../modules/auth/hooks/useUser'
import { useRef, useState, useEffect } from 'react'
import { imageToBase64URL, completeBase64ImageURL } from '../../../common/helpers/encoder'
import { mutate } from 'swr'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../common/models/User'
import Game from '../../../common/models/Game'
import { ASSASSIN_ICON_USE } from '../../../constants'

const Profile = ({ games }) => {

    const user = useUser({ redirectTo: '/login' })

    const inputRef = useRef()
    const canvasRef = useRef()
    const [profileImage, setProfileImage] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [localUser, setLocalUser] = useState(user)

    useEffect(() => {
        setLocalUser(user)
        if (user && !profileImage) {
            // convert Buffer to Image
            if (user.profile_image.data) {
                const imageURL = completeBase64ImageURL(user.profile_image.data)
                setProfileImage(imageURL)
            }
        }
    }, [user])

    async function handleSave() {

        postData()
        setIsEditing(false)
    }

    async function handleImageUploaded(event) {
        const imageFile = inputRef.current.files[0]
        const canvas = canvasRef.current
        const dataUrl = await imageToBase64URL(imageFile, canvas)
        setProfileImage(dataUrl)

        const splitURL = dataUrl.split(',')[1]
        const buffer = new Buffer.from(splitURL, 'base64')
        setLocalUser(prevValue => {
            return {
                ...prevValue,
                profile_image: {
                    data: buffer,
                    content_type: 'image/jpg'
                }
            }
        })
    }

    const postData = async () => {

        const body = JSON.stringify({ user: localUser })

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
    }

    const handleImageSelect = () => {
        inputRef.current.click()
    }

    return (
        <Layout>
            <form method="POST" enctype="multipart/form-data" className="py-10">

                <div className="grid grid-cols-1 sm:grid-cols-2">

                    {/* DETAILS */}
                    <div className="grid grid-cols-3 mx-auto mt-10 sm:float-left sm:grid-cols-1 sm:w-2/5">

                        {/* USER IMAGE */}
                        <div onClick={(isEditing ? handleImageSelect : null)} className="ml-10 sm:mx-auto justify-center">
                            <UserIcon isInteractive={(isEditing ? true : false)} state={ASSASSIN_ICON_USE.PROFILE} image={(profileImage && profileImage)} />
                            <div className="flex justify-center">
                                <input className="hidden" onChange={handleImageUploaded} ref={inputRef} type="file" id="file" name="file"></input>
                            </div>
                        </div>

                        {/* USER DETAILS */}
                        <div className="col-span-2 font-bold text-center place-self-center">
                            <div className={'text-2xl ' + (isEditing ? 'hidden' : 'block')}>
                                {(user ? user.display_name : "not logged in")}
                            </div>
                            <input className={'border my-2 pl-2 mx-auto text-center ' + (isEditing ? 'block' : 'hidden')} type="text" defaultValue={(user ? user.username : "not logged in")}></input>
                            <div className="w-64">
                                "I will eat your dad for a good show you son of a _INSERT_EXPLETIVE_"
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="my-16 col-span-3 sm:col-span-1">
                            <div onClick={() => { setIsEditing(true) }} className={(isEditing ? "hidden" : "block") + " cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-blue-400 bg-blue-400 hover:border-2 hover:bg-blue-300 text-white"}>
                                <button>
                                    Edit
                                </button>
                            </div>
                            <div className={"flex sm:w-3/5 mx-auto " + (isEditing ? "block" : "hidden")}>
                                <div onClick={handleSave} className="cursor-pointer flex place-content-center mr-4 w-36 h-10 rounded-md mx-auto border-blue-400 bg-blue-400 hover:border-2 hover:bg-blue-300 text-white">
                                    <div>
                                        Save
                                    </div>
                                </div>
                                <div onClick={() => { setIsEditing(false) }} className="cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-red-400 bg-red-400 hover:border-2 hover:bg-red-300 text-white">
                                    <button>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* GAMES */}
                    <div className='grid grid-cols-2 mx-auto my-16 text-center'>
                        {/* CURRENT */}
                        <div className="mx-6">
                            <div className='font-bold mb-4'> CURRENT </div>
                            {games.current.map((game) => (
                                <Button key={game._id} name={game.game_details.game_name} id={game._id} />
                            ))}
                        </div>

                        {/* PAST */}
                        <div className="mx-6">
                            <div className='font-bold mb-4'> PAST </div>
                            {games.previous.map((game) => (
                                <Button key={game._id} name={game.game_details.game_name} id={game._id} isComplete={true} />
                            ))}
                        </div>
                    </div>

                </div>

                <canvas ref={canvasRef} className='hidden'></canvas>
            </form>
        </Layout>
    )
}

export default Profile

export async function getServerSideProps({ query }) {

    await dbConnect()
    const id = query.id
    const user = await User.findOne({ _id: id })
    const games = user.games

    const currentResult = await Game.find({ _id: { $in: [...games.current] } })
    const currentGames = currentResult.map((doc) => {
        const game = doc.toObject()
        game._id = game._id.toString()
        return game
    })

    const previousResult = await Game.find({ _id: { $in: [...games.previous] } })
    const previousGames = previousResult.map((doc) => {
        const game = doc.toObject()
        game._id = game._id.toString()
        return game
    })

    return {
        props: {
            games: {
                current: currentGames,
                previous: previousGames
            }
        }
    }

}