import Layout from '../../components/Layout'
import AssassinIcon from '../../components/AssassinIcon'
import { useUser } from '../../lib/hooks/useUser'
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { imageToBase64URL, completeBase64ImageURL } from '../../lib/encoder'
import useSWR, { mutate } from 'swr'

const Profile = () => {


    const fetcher = (url) =>
        fetch(url)
            .then((r) => r.json())
            .then((data) => {
                return { user: data?.user || null }
            })
    // const user = useUser()
    // const { data, error } = useSWR('/api/user', fetcher)
    // const user = data?.user
    const user = useUser({ redirectTo: '/login' })


    const inputRef = useRef()
    const canvasRef = useRef()
    // const [file, setFile] = useState(null)
    const [base64Image, setbase64Image] = useState(null)
    const [profileImage, setProfileImage] = useState(null)

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

    async function handleImageUploaded(event) {
        const imageFile = event.target.files[0]
        const canvas = canvasRef.current
        const dataUrl = await imageToBase64URL(imageFile, canvas)
        setbase64Image(dataUrl)
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
            console.log("RETURNED DATA: " + JSON.stringify(data))

            mutate(`/api/user`)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Layout>
            <form method="POST" enctype="multipart/form-data">
                <div className="grid grid-cols-3 mx-auto">
                    <div className="mx-10">
                        <AssassinIcon isProfile={true} image={(profileImage && profileImage)} />

                        <input onChange={handleImageUploaded} ref={inputRef} type="file" id="file" name="file" required></input>


                    </div>
                    <div className="col-span-2 font-bold text-center place-self-center">
                        <div className="text-2xl">
                            {(user ? user.username : "not logged in")}
                        </div>
                        <div>
                            "I will eat your dad for a good show you son of a bitch"
                        </div>
                    </div>
                </div>
                <div onClick={handleSave} className="cursor-pointer my-16 flex place-content-center w-36 h-10 rounded-md mx-auto border-blue-400 bg-blue-400 hover:border-2 hover:bg-blue-300 text-white">
                    <button>
                        Save
                    </button>
                </div>
                <canvas ref={canvasRef} className="bg-black"></canvas>
            </form>
        </Layout>
    )
}

export default Profile