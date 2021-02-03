import Layout from '../../components/Layout'
import AssassinIcon from '../../components/AssassinIcon'
import { useUser } from '../../lib/hooks/useUser'

const Profile = () => {

    const user = useUser({ redirectTo: '/login' })

    return (
        <Layout>
            <div className="grid grid-cols-3 mx-auto">
                <div className="mx-10">
                    <AssassinIcon isProfile={true}/>
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
        </Layout>
    )
}

export default Profile