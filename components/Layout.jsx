import Head from 'next/head'
import Link from 'next/link'
import NavBar from '../components/NavBar'
import { useUser } from '../lib/hooks/useUser'

export default function Layout({ page, children }) {

    const user = useUser()

    return (
        <div className="h-screen">
            <NavBar page={page} user={user} />
            <div className="bg-gray-100 h-full">
                <div className="md:w-2/3 bg-gray-50 mx-auto h-full">
                    <main>{children}</main>
                </div>
            </div>
        </div>
    )
}