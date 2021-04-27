import Head from 'next/head'
import Link from 'next/link'
import NavBar from '../components/NavBar'
import { useUser } from '../../modules/auth/hooks/useUser'

export default function Layout({ page, children }) {

    const user = useUser()

    return (
        <div>
            <NavBar page={page} user={user} />
            <div className="bg-gray-100">
                <div className="md:w-2/3 bg-gray-50 mx-auto rounded-b-2xl">
                    <main>{children}</main>
                </div>
            </div>
        </div>
    )
}