import Head from 'next/head'
import Link from 'next/link'
import NavBar from '../components/NavBar'

export default function Layout({ page, children }) {
    return (
        <div>
            <NavBar page={page} />
            <main>{children}</main>
        </div>
    )
}