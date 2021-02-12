import Layout from '../../components/Layout'
import AssassinIcon from '../../components/AssassinIcon'
import GameButton from '../../components/GameButton'
import { useUser } from '../../lib/hooks/useUser'
import { useRef, useState, useEffect } from 'react'
import { imageToBase64URL, completeBase64ImageURL } from '../../lib/encoder'
import { mutate } from 'swr'
import dbConnect from '../../utils/dbConnect'

const Profile = () => {

    const user = useUser({ redirectTo: '/login' })

    const inputRef = useRef()
    const canvasRef = useRef()
    const [base64Image, setbase64Image] = useState(null)
    const [profileImage, setProfileImage] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {

        if (user) {
            // convert Buffer to Image
            if (user.profile_image.data) {
                const imageURL = completeBase64ImageURL(user.profile_image.data)
                setProfileImage(imageURL)
            }
        }


    })

    async function handleSave() {

        postData()
        setIsEditing(false)
    }

    function handleEdit() {

    }

    async function handleImageUploaded(event) {
        const imageFile = event.target.files[0]
        const canvas = canvasRef.current
        const dataUrl = await imageToBase64URL(imageFile, canvas)
        setProfileImage(dataUrl)

        const splitURL = dataUrl.split(',')[1]
        setbase64Image(splitURL)
    }

    const postData = async () => {

        const body = JSON.stringify({ image: base64Image, id: user._id })

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

            mutate(`/api/user`)

        } catch (err) {
            console.log(err)
        }
    }

    const handleImageSelect = () => {
        inputRef.current.click()
    }

    return (
        <Layout>
            <form method="POST" enctype="multipart/form-data">
                <div className='grid grid-cols-1 sm:grid-cols-2'>

                    {/* DETAILS */}
                    <div className="grid grid-cols-3 mx-auto mt-10 sm:float-left sm:grid-cols-1 sm:w-2/5">

                        {/* USER IMAGE */}
                        <div onClick={(isEditing ? handleImageSelect : null)} className="ml-10 sm:mx-auto justify-center">
                            <AssassinIcon isInteractive={(isEditing ? true : false)} isProfile={true} image={(profileImage && profileImage)} />
                            <div className="flex justify-center">
                                <input className="hidden" onChange={handleImageUploaded} ref={inputRef} type="file" id="file" name="file"></input>
                            </div>
                        </div>

                        {/* USER DETAILS */}
                        <div className="col-span-2 font-bold text-center place-self-center">
                            <div className={'text-2xl ' + (isEditing ? 'hidden' : 'block')}>
                                {(user ? user.username : "not logged in")}
                            </div>
                            <input className={'border my-2 pl-2 mx-auto text-center ' + (isEditing ? 'block' : 'hidden')} type="text" defaultValue={(user ? user.username : "not logged in")}></input>
                            <div className="w-64">
                                "I will eat your dad for a good show you son of a bitch"
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
                                    <button>
                                        Save
                                    </button>
                                </div>
                                <div onClick={() => { setIsEditing(false) }} className="cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-red-400 bg-red-400 hover:border-2 hover:bg-red-300 text-white">
                                    <button className="">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* GAMES */}
                    <div className='grid grid-cols-2 w-4/5 mx-auto my-16 text-center'>
                        <div>
                            <div className='font-bold mb-4'> CURRENT </div>
                            <GameButton name={"BABY'S BUTT"} gameId={'6011e8d0d9ae4e35531d5616'} />
                            {/* {user.games.current.map((game) => {
                                <GameButton name={game}/>
                            })} */}
                        </div>

                        <div>
                            <div className='font-bold mb-4'> PAST </div>
                        </div>
                    </div>

                </div>





                <canvas ref={canvasRef} className='hidden'></canvas>
            </form>
        </Layout>
    )
}

export default Profile

export async function getServerSideProps() {

    await dbConnect()
    const user = await fetch('http://localhost:3000/api/user')
        .then((r) => r.json())
        .then((data) => {
            return { user: data?.user || null }
        })
    console.log(JSON.stringify(user))

    return {props: {thing: "dicks"}}

}