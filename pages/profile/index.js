import Layout from '../../components/Layout'
import AssassinIcon from '../../components/AssassinIcon'
import { useUser } from '../../lib/hooks/useUser'
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { imageToBase64URL, completeBase64ImageURL } from '../../lib/encoder'
import useSWR, { mutate } from 'swr'

const Profile = () => {

    const user = useUser({ redirectTo: '/login' })

    const inputRef = useRef()
    const canvasRef = useRef()
    // const [file, setFile] = useState(null)
    const [base64Image, setbase64Image] = useState(null)
    const [profileImage, setProfileImage] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {

        if (user) {
            // convert Buffer to Image
            if (user.hasOwnProperty('profile_image')) {
                const imageURL = completeBase64ImageURL(user.profile_image.data)
                setProfileImage(imageURL)
            }
        }
    }, [user])

    async function handleSave() {
        postData()
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


        const body = JSON.stringify({ user: user, image: base64Image })


        try {

            const res = await fetch("/api/profile/save", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })

            console.log(user)

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
                <div className="grid grid-cols-3 md:grid-cols-1 mx-auto">

                    {/* USER IMAGE */}
                    <div onClick={(isEditing ? handleImageSelect : null)} className="mx-auto justify-center">
                        <AssassinIcon isInteractive={(isEditing ? true : false)} isProfile={true} image={(profileImage && profileImage)} />
                        <div className="flex justify-center">
                            <input className="hidden" onChange={handleImageUploaded} ref={inputRef} type="file" id="file" name="file" required></input>
                        </div>
                    </div>

                    {/* USER DETAILS */}
                    <div className="col-span-2 font-bold text-center place-self-center">
                        <div className={'text-2xl ' + (isEditing ? 'hidden' : 'block')}>
                            {(user ? user.username : "not logged in")}
                        </div>
                        <input className={'border my-2 pl-2 mx-auto text-center ' + (isEditing ? 'block' : 'hidden')} type="text" value={(user ? user.username : "not logged in")}></input>
                        <div>
                            "I will eat your dad for a good show you son of a bitch"
                        </div>
                    </div>

                </div>

                <div className="my-16">
                    <div onClick={() => { setIsEditing(true) }} className={(isEditing ? "hidden" : "block") + " cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-blue-400 bg-blue-400 hover:border-2 hover:bg-blue-300 text-white"}>
                        <button>
                            Edit
                        </button>
                    </div>
                    <div className={"flex w-2/5 mx-auto " + (isEditing ? "block" : "hidden")}>
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



                <canvas ref={canvasRef} className='hidden'></canvas>
            </form>
        </Layout>
    )
}

export default Profile