'use client'
import React, { useEffect } from 'react'
import { CartStore } from '../_zustand/CartStore'
import { Button } from '../../components/ui/button'
import { useUser } from '@clerk/clerk-react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Minus, Heart, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Cart() {
  const router = useRouter()

  const { cart, SetAllCarts, Total, deleteCart } = CartStore()
  const { user } = useUser()

  useEffect(() => {
    if (cart.length < 1) SetAllCarts(user?.primaryEmailAddress?.emailAddress)
  }, [])
  return (
    <section className="py-8 antialiased bg-gray-50 dark:bg-gray-900 md:py-16">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="flex-none w-full mx-auto lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">



              {cart.map((item) => (
                <div key={item.documentId} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <Link href={`/product-details/${item?.product?.documentId}`} className="shrink-0 md:order-1">
                      <Image src={item?.product?.banner?.url} width={80} height={80} alt='cart image' className='w-20 h-20' />
                    </Link>

                    <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        <Button variant={'outline'} className='p-2'>
                          <Minus width={16} height={16} className='font-bold' />
                        </Button>
                        <input type="text" id="counter-input-2" data-input-counter className="w-10 text-sm font-medium text-center text-gray-900 bg-transparent border-0 shrink-0 focus:outline-none focus:ring-0 dark:text-white" placeholder="" defaultValue="1" required />
                        <Button variant={'outline'} className='p-2'>
                          <Plus width={16} height={16} className='font-bold' />
                        </Button>
                      </div>
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">${item?.product?.price}</p>
                      </div>
                    </div>

                    <div className="flex-1 w-full min-w-0 space-y-4 md:order-2 md:max-w-md">
                      <a href="#" className="px-3 text-base font-medium text-gray-900 hover:underline dark:text-white">{item?.product?.title}</a>

                      <div className="flex items-center gap-4">
                        <Button variant="ghost"><Heart width={20} height={20} />Add to Favorites</Button>
                        <Button variant="ghost" className='text-red-600 hover:text-red-600' onClick={() => deleteCart(item?.documentId)}><X width={20} height={20} />Remove</Button>

                      </div>
                    </div>
                  </div>
                </div>

              ))}

              <h2 className='text-gray-500 text-[12px] text-center align-middle'><span className='text-red-500'>Note :</span> All Items will be sent Via Email</h2>



            </div>

          </div>

          <div className="flex-1 max-w-4xl mx-auto mt-6 space-y-6 lg:mt-0 lg:w-full">
            <div className="p-4 space-y-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  {/* <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">$7,592.00</dd>
                    </dl> */}

                  {/* <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                      <dd className="text-base font-medium text-green-600">-$299.00</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">$799</dd>
                    </dl> */}
                </div>

                <dl className="flex items-center justify-between gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">${Math.round(Total)}</dd>
                </dl>
              </div>
              <Button className='w-full py-5 mt-4' onClick={() => router.push(`/checkout?amount=${Math.round(Total)}`)} >
             Proceed to Checkout
              </Button>

              <div className="flex flex-col items-center justify-center gap-2">

                <span className="text-sm font-normal text-gray-500"> or </span>
                <Link href="/" className="text-sm font-medium underline text-primary-700 hover:no-underline">
                  Continue Shopping
                </Link>
              </div>
            </div>


            <div className="p-4 space-y-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <form className="space-y-4">
                <div>
                  <label htmlFor="voucher" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
                  <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                </div>
                <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}


