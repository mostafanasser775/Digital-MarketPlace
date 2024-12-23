'use client'
import React, { useEffect } from 'react'
import { ShoppingCart } from 'lucide-react'
import { CartStore } from '../_zustand/CartStore'
import { useUser } from '@clerk/clerk-react'
import Cart_API from '../_utils/Cart_API'
import Image from 'next/image'
import { Button } from '../../components/ui/button'
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ShoppingCartItem() {
    const router = useRouter()
    const { cart, SetAllCarts, Total } = CartStore()
    const { user } = useUser()
    useEffect(() => {
        if (cart.length < 1)
            SetAllCarts(user?.primaryEmailAddress?.emailAddress)
    }, [user])
    return (
        <>
            <h2 className='flex items-center gap-1 cursor-pointer'>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline"><ShoppingCart />
                            <span>{cart.length < 1 ? (0) : cart.length}</span></Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80  max-h-[500px] miniSlideBar overflow-y-auto">
                        <h4 className="font-medium leading-none">Your Proudcts</h4>
                        <p className="text-sm text-muted-foreground">
                            Set the dimensions for the layer.
                        </p>

                        <hr className='my-3' />

                        {console.log('cart', cart)}
                        <div className='grid grid-cols-1 gap-4'>
                            {cart.map((item) =>
                            (

                                <div key={item.documentId}>
                                    <div className="flex items-center gap-4">
                                        <Image src={item?.product?.banner?.url} alt="product Banner" width={64} height={64} />

                                        <div>
                                            <h3 className="text-sm text-gray-900 line-clamp-1">{item?.product?.title}</h3>

                                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-500">
                                                <div>
                                                    <dt className="inline">CATEGORY : </dt>
                                                    <dd className="inline">{item?.product?.category}</dd>
                                                </div>

                                                <div>
                                                    <dt className="inline">PRICE : </dt>
                                                    <dd className="inline">{item?.product?.price}</dd>
                                                </div>
                                            </dl>
                                        </div>

                                        <div className="flex items-center justify-end flex-1 gap-2">

                                            <button className="text-gray-600 transition hover:text-red-600">
                                                <span className="sr-only">Remove item</span>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>


                        <div className="flex flex-col mt-4 space-y-4 text-center">
                            <Link href="/cart" className="block px-5 py-3 text-sm text-gray-600 transition border border-gray-600 rounded hover:ring-1 hover:ring-gray-400">
                                View my cart ({cart.length})
                            </Link>

                            <Button className='py-6' onClick={() => router.push(`/checkout?amount=${Math.round(Total)}`)}>Checkout</Button>


                            <a href="#" className="inline-block text-sm text-gray-500 underline transition underline-offset-4 hover:text-gray-600">
                                Continue shopping
                            </a>
                        </div>

                    </PopoverContent>
                </Popover>




            </h2>

        </>
    )
}
