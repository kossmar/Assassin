import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useDetectOutsideClick } from '../lib/hooks/useDetectOutsideClick'



export default function NavBar({ page, user }) {

    const dropdownRef = useRef(null)
    const [profileDropdownOpen, setProfileDropdownOpen] = useDetectOutsideClick(dropdownRef, false)
    const [menuDropdownOpen, setMenuDropdownOpen] = useDetectOutsideClick(dropdownRef, false)

    const thing = useEffect(() => {

        let div = document.querySelector("#fixed");

        while (div.scrollHeight > div.clientHeight) {
            let style = window.getComputedStyle(div, null).getPropertyValue('font-size');
            let fontSize = parseFloat(style);

            if (fontSize <= 1) {
                break;
            }

            div.style.fontSize = "" + (fontSize - 1) + "px";
        }
    }, [])

    function handleProfileClick() {
        (menuDropdownOpen && setMenuDropdownOpen(false))
        setProfileDropdownOpen(!profileDropdownOpen)
    }

    function handleMenuClick() {
        (profileDropdownOpen && setProfileDropdownOpen(false))
        setMenuDropdownOpen(!menuDropdownOpen)
    }

    return (
        <div>
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
                                    <div className="cursor-pointer flex-shrink-0 flex items-center pl-44 sm:p-0">
                                        <img className="block h-10 w-auto" src="/images/assassin-logo-image.png" alt="Workflow" />
                                        <img className="hidden lg:block h-10 w-auto ml-2" src="/images/assassin-logo-title.png" alt="Workflow" />
                                    </div>
                                </a>
                            </Link>

                            {/* NAV LINKS */}
                            <div className="hidden sm:block sm:m-auto pl-36 lg:pl-4">
                                <div className="flex space-x-4">
                                    <Link href="/rules">
                                        <a className="text-gray-500 hover:bg-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                            Rules
                                        </a>
                                    </Link>
                                    <Link href="/games/new">
                                        <a className="bg-black shadow-md hover:bg-red-600 hover:shadow-xl-red text-white px-3 py-2 rounded-md text-sm font-medium">
                                            New Game
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

                        {/* PROFILE DROPDOWN */}
                        <div className="w-48 flex justify-end cursor-pointer">

                            {/* PROFILE BUTTON */}
                            <div onClick={handleProfileClick} className={(user ? "flex" : "hidden") + " p-1 rounded-full hover:text-white hover:bg-gray-400 " + (profileDropdownOpen ? "border-black outline-none " : "border-white hover:border-black")}>
                                <div className="flex items-center mr-0 ml-auto">

                                    {/* Profile NAME */}
                                    <div id="fixed" className="max-h-10 w-full px-2 justify-end md:flex">
                                        <div className={"h-auto self-center text-right italic font-bold mr-0 " + (profileDropdownOpen ? "transition transform rotate-3" : "transition transform rotate-0")}>
                                            {(user ? user.username : "no user")}
                                        </div>
                                    </div>

                                    {/* Profile IMAGE */}
                                    <div className="flex pl-2 self-center my-auto">
                                        <div className="max-h-9 w-9 bg-gray-800 flex text-sm rounded-full ring-2 ring-black" id="user-menu" aria-haspopup="true">
                                            <span className="sr-only">Open user menu</span>
                                            <img className={"h-9 rounded-full " + (profileDropdownOpen ? "transition transform -rotate-180" : "transition transform rotate-0")} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* LOG IN BUTTON */}
                            <div className={(user ? "hidden" : "flex") + " cursor-pointer place-self-center h-10 w-24 rounded-full hover:bg-gray-400 hover:text-white"}>
                                <Link href="/login">
                                    <a className="mx-auto place-self-center text-center font-bold ">
                                        LOG IN
                                    </a>
                                </Link>
                            </div>



                        </div>


                    </div>
                </div>

                {/* DROPDOWN MENUS */}
                <div className="overflow-auto">
                    <div className={"bunk flex justify-between mx-auto " + (menuDropdownOpen || profileDropdownOpen ? "open" : "close")}>

                        {/* NAV Menu */}
                        <div ref={dropdownRef} className={"sm:hidden " + (menuDropdownOpen ? "transform origin-top duration-200 opacity-100 scale-y-100" : "transform origin-top duration-200 opacity-0 scale-y-0")}>
                            <div className={"px-2 pt-2 pb-3 space-y-1 "}>
                                <Link href="/games/new">
                                    <a className="bg-gray-900 text-white hover:bg-red-600 hover:shadow-xl-red block px-3 py-2 rounded-md text-base font-medium">
                                        New Game
                                    </a>
                                </Link>
                                <Link href="/rules">
                                    <a className="text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                        Rules
                                    </a>
                                </Link>
                                <Link href="/about">
                                    <a className="text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                        About
                                    </a>
                                </Link>
                            </div>
                        </div>

                        {/* PROFILE Menu */}
                        <div ref={dropdownRef} className={"sm:absolute right-0 ml-auto text-right " + (profileDropdownOpen ? "transform origin-top duration-200 opacity-100 scale-y-100" : "transform origin-top duration-200 opacity-0 scale-y-0")}>
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                <Link href="/">
                                    <a className="text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                        Profile
                                    </a>
                                </Link>
                                <Link href="/">
                                    <a className="text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                        Settings
                                    </a>
                                </Link>
                                <Link href="/api/logout">
                                    <a className="text-red-400 hover:bg-red-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                        Sign Out
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            </nav>
        </div>
    )
}
