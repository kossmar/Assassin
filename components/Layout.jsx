import Head from 'next/head'
import Link from 'next/link'
import NavBar from '../components/NavBar'
import { useUser } from '../lib/hooks/useUser'

export default function Layout({ page, children }) {

    const user = useUser()

    return (
        <div>
            <NavBar page={page} user={user}/>
            <main>{children}</main>
        </div>
    )
}