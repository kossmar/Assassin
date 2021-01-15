import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'


export default function NavBar({ page }) {

    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
    const [menuDropdownOpen, setMenuDropdownOpen] = useState(false)


    const thing = useEffect(() => {
        console.log(profileDropdownOpen)
    }, [])

    function handleProfileClick() {
        (menuDropdownOpen && setMenuDropdownOpen(false))
        setProfileDropdownOpen(prevValue => {
            return (prevValue ? false : true)
        })
    }

    function handleMenuClick() {
        (profileDropdownOpen && setProfileDropdownOpen(false))
        setMenuDropdownOpen(prevValue => {
            return (prevValue ? false : true)
        })
    }

    return (
        <div>
            <Head>
                <title>Assassin</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <nav className="bg-white">
                <div className="mx-auto px-2">
                    <div className="relative flex items-center justify-between h-20">

                        {/* <!-- Mobile menu button--> */}
                        <div onClick={handleMenuClick} className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <div className={(menuDropdownOpen ? "transition transform -rotate-180" : "transition transform rotate-0")}>
                                <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
                                    <span className="sr-only">Open main menu</span>

                                    {/* Icon when menu is CLOSED. */}
                                    <svg className={"h-6 w-6 " + (menuDropdownOpen ? "hidden" : "block")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>

                                    {/* Icon when menu is OPEN. */}
                                    <svg className={"h-6 w-6 " + (menuDropdownOpen ? "block" : "hidden")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>

                                </button>
                            </div>
                        </div>

                        <div className="flex-1 flex pl-5 items-center justify-center sm:items-stretch sm:justify-start">

                            {/* LOGO */}
                            <Link href='/'>
                                <a>
                                    <div className="cursor-pointer flex-shrink-0 flex items-center pl-16 sm:p-0">
                                        <img className="block h-10 w-auto" src="/images/assassin-logo-image.png" alt="Workflow" />
                                        <img className="hidden lg:block h-10 w-auto ml-2" src="/images/assassin-logo-title.png" alt="Workflow" />
                                    </div>
                                </a>
                            </Link>

                            {/* NAV LINKS */}
                            <div className="hidden sm:block sm:m-auto pl-20 md:pl-44 lg:pl-14">
                                <div className="flex space-x-4">
                                    <Link href="/rules">
                                        <a className="text-gray-500 hover:bg-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                            Rules
                                        </a>
                                    </Link>
                                    <Link href="/">
                                        <a className="bg-black shadow-md hover:bg-red-600 hover:shadow-xl-red text-white px-3 py-2 rounded-md text-sm font-medium">
                                            New Campaign
                                        </a>
                                    </Link>
                                    <Link href="/about">
                                        <a className="text-gray-500 hover:bg-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                            About
                                        </a>
                                    </Link>
                                </div>
                            </div>

                        </div>

                        {/* PROFILE BUTTON */}
                        <div onClick={handleProfileClick} className={"p-1 rounded-full hover:bg-gray-400 hover:text-white " + (profileDropdownOpen ? "border-black outline-none" : "border-white hover:border-black")}>
                            <div className="flex items-center justify-center">

                                {/* Profile NAME */}
                                <div className="px-2 hidden md:block">
                                    <div className={"italic font-bold " + (profileDropdownOpen ? "transition transform rotate-3" : "transition transform rotate-0")}>MR. BIBBLZ</div>
                                </div>

                                {/* Profile IMAGE */}
                                <div className="px-2">
                                    <div className="bg-gray-800 flex text-sm rounded-full ring-2 ring-black" id="user-menu" aria-haspopup="true">
                                        <span className="sr-only">Open user menu</span>
                                        <img className={"h-8 w-8 rounded-full " + (profileDropdownOpen ? "transition transform -rotate-180" : "transition transform rotate-0")} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                {/* DROPDOWN MENUS */}
                <div className="flex justify-between mx-auto">

                    {/* PROFILE Menu */}
                    <div className={"sm:hidden " + (menuDropdownOpen ? "transition ease-in duration-100 transform opacity-100 scale-y-100 block" : "hidden transition ease-in duration-75 transform opacity-0 scale-y-0")}>
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a href="/" className="bg-gray-900 text-white hover:bg-red-600 hover:shadow-xl-red block px-3 py-2 rounded-md text-base font-medium">New Campaign</a>
                            <a href="/rules" className="text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Rules</a>
                            <a href="/about" className="text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</a>
                        </div>
                    </div>

                    {/* NAV Menu */}
                    <div className={"relative sm:absolute right-0 mr-0 ml-auto text-right " + (profileDropdownOpen ? "transition ease-in duration-100 transform opacity-100 scale-y-100 block" : "hidden transition ease-in duration-75 transform opacity-0 scale-y-0")}>
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a href="/" className="text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Profile</a>
                            <a href="/rules" className="text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Settings</a>
                            <a href="/about" className="text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Sign Out</a>
                        </div>
                    </div>

                </div>

            </nav>
        </div>
    )
}
