import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'


export default function NavBar({ page }) {

    const [dropdownOpen, setDropdownOpen] = useState(false)

    const thing = useEffect(() => {
        console.log(dropdownOpen)
    }, [])

    function handleClick() {
        console.log("clicked")
        setDropdownOpen(prevValue => {
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
                <div className="mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-20">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* <!-- Mobile menu button--> */}
                            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                {/* Icon when menu is closed. 
          
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
           */}
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                {/* <!-- Icon when menu is open. -->
          <!--
            Heroicon name: x

            Menu open: "block", Menu closed: "hidden"
          --> */}

                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <Link href='/'>
                                <a>
                                    <div className="cursor-pointer flex-shrink-0 flex items-center pl-16 sm:p-0">
                                        <img className="block h-10 w-auto" src="/images/assassin-logo-image.png" alt="Workflow" />
                                        <img className="hidden lg:block h-10 w-auto ml-2" src="/images/assassin-logo-title.png" alt="Workflow" />
                                    </div>
                                </a>

                            </Link>
                            <div className="hidden sm:block sm:m-auto pl-20 md:pl-44 lg:pl-14">
                                <div className="flex space-x-4">
                                    {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
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

                        {/* <!-- Profile dropdown --> */}
                        <div>
                            <div onClick={handleClick} className={"w-48 p-1 border-4 rounded " + (dropdownOpen ? "border-black outline-none rounded-b-none" : "border-white hover:border-black")}>
                                <div className="ml-3 flex items-center justify-center ">
                                    <div className="px-2 hidden md:block">
                                        <div className="italic font-bold">MR. BIBBLZ</div>
                                    </div>
                                    <div className="px-2">
                                        <div className="bg-gray-800 flex text-sm rounded-full ring-2 ring-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!--
            Profile dropdown panel, show/hide based on dropdown state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
                            <div className={"border-4 border-t-0 rounded-b-2xl border-black origin-top-right absolute right-0 w-48 shadow-lg bg-white ring-1 ring-black ring-opacity-5" + (dropdownOpen ? "transition ease-in duration-100 transform opacity-100 scale-y-100" : "transition ease-in duration-75 transform opacity-0 scale-y-0")} role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Settings</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 border-t-4 border-black hover:bg-gray-100" role="menuitem">Your Profile</a>
                                <a href="#" className="block rounded-b-2xl px-4 py-2 text-sm text-gray-700 border-t-4 border-black hover:bg-gray-100" role="menuitem">Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!--
    Mobile menu, toggle classNamees based on menu state.

    Menu open: "block", Menu closed: "hidden"
  --> */}
                <div className="hidden sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                        <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>
                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>
                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
                    </div>
                </div>
            </nav>
        </div>
    )
}