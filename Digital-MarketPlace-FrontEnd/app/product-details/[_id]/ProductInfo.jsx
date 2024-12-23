'use client'
import React from 'react'
import { BadgeCheck, ShoppingCart } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { redirect } from 'next/navigation'
import Cart_API from '../../_utils/Cart_API'
import { CartStore } from '../../_zustand/CartStore'
export default function ProductInfo({ product }) {
    const cartState = CartStore();
    const { user } = useUser()
    function hadleCartClick() {
        if (!user) {
            redirect('/sign-in')
        }
        else {
            const data = {
                data: {
                    username: user.fullName,
                    email: user.primaryEmailAddress.emailAddress,
                    products: [product?.documentId]
                }
            }
            Cart_API.addToCart(data).then((res) => {
                console.log(res.data.data)
                cartState.SetToCart(res?.data?.data?.documentId, product)

            }).catch(error => {
                console.log('error', error)
            })
        }
    }
    return (
        <>{product.id ?
            <div>
                <h2 className='text-[20px]'>{product?.title}</h2>
                <h2 className='text-[15px] text-gray-400'>{product?.category}</h2>
                {Boolean(product) &&
                    <h2 className='text-[15px] text-gray-900 mt-5'>{
                        product.description?.map((desc) =>
                            desc.children?.map((child) => child.text || "").join("") || "")
                            .join("\n") || "No description available."}
                    </h2>}

                <div className='flex items-center gap-2 mt-2'>
                    <div>
                        {product.instantDelivery &&
                            <BadgeCheck width={16} height={16} className='text-green-500' />
                        }
                    </div>
                    <h2 className='text-[11px] text-gray-500 mt-[2px]'>Eligible for Instant Delivery</h2>
                </div>
                <h2 className='text-[32px] text-blue-600 mt-1'>$ {product.price}</h2>
                <button className='flex gap-2 p-2 text-white bg-blue-600 rounded-lg' onClick={hadleCartClick}><ShoppingCart width={24} height={24} />Add To Cart</button>
            </div>
            :
            <SkeletonProductInfo />
        }
        </>
    )
}


export function SkeletonProductInfo() {
    return (<div className='flex flex-col gap-5'>
        <div className='h-[20px] w-[400px] bg-slate-200 animate-pulse' />
        <div className='h-[15px] w-[70px] bg-slate-200 animate-pulse' />
        {/*description*/}
        <div className='h-[15px] w-[400px] bg-slate-200 animate-pulse' />
        <div className='h-[15px] w-[400px] bg-slate-200 animate-pulse' />
        <div className='h-[15px] w-[300px] bg-slate-200 animate-pulse' />


        <div className='h-[11px] w-[200px] bg-slate-200 animate-pulse' />
        <div className='h-[32px] w-[90px] bg-slate-200 animate-pulse mt-1' />
        <div className='h-[40px] w-[120px] bg-slate-200 animate-pulse' />

    </div>)
}