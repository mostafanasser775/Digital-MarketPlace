import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'
import ShoppingCartItem from './ShoppingCartItem'

export async function Header() {
    const user = await currentUser()
    return (
        <header className="bg-white shadow-md">
            <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <Link className="block text-teal-600" href="/">
                            <span className="sr-only">Home</span>
                            <Image src={'/logo.svg'} width={36} height={36} alt='logo' />
                        </Link>
                    </div>

                    <div className="md:flex md:items-center md:gap-12">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" href="/"> Home </Link>
                                </li>

                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Explore </a>
                                </li>

                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
                                </li>

                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About Us </a>
                                </li>

                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Contact Us </a>
                                </li>
                            </ul>
                        </nav>

                        <div className="flex items-center gap-4">
                            {(!user) ?
                                <div className="sm:flex sm:gap-4">
                                    <Link className="rounded-md  bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow" href="/sign-in">
                                        Login
                                    </Link>

                                    <div className="hidden sm:flex">
                                        <Link className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-500" href="/sign-up">Register</Link>
                                    </div>
                                </div> : <div className='flex items-center gap-4'>
                                    <ShoppingCartItem />
                                    <UserButton /></div>
                            }
                            <div className="block md:hidden">
                                <button className="p-2 text-gray-600 transition bg-gray-100 rounded hover:text-gray-600/75">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </header>)
}

