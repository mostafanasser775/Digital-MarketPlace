import React from 'react'
import Image from 'next/image'
export default function ProductBanner({ product }) {
    return (
        <div>
            {product?.banner?.url ?
                <Image src={product?.banner?.url} width={400} height={400}
                    alt='product banner' className='relative rounded-lg' />
                :
                <div className='w-[400px] h-[255px] bg-slate-200 rounded-lg animate-pulse'></div>

            }

        </div>
    )
}

