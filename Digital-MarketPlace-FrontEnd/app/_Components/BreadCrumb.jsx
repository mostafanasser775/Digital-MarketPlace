
import Link from 'next/link'
import React from 'react'

export default function BreadCrumb({ path }) {
    const pathArr = path.toString().split('/')

    return (
        <div>

            <nav className="w-full px-5 py-3 rounded-md bg-zinc-50 dark:bg-neutral-700">
                <ol className="flex list-reset">
                    <li>
                        <Link href="/" className="transition text-primary hover:text-primary-accent-300 focus:text-primary-accent-300 active:text-primary-accent-300 dark:text-primary-400">
                            Home</Link>
                    </li>
                    <li> <span className="mx-2 text-neutral-400">/</span> </li>
                
                    <li className="text-neutral-400">{pathArr[1]}</li>

                    <li><span className="mx-2 text-neutral-400">/</span></li>
                    <li className="text-neutral-400">{pathArr[2]}</li>
                </ol>
            </nav>








        </div>
    )
}
