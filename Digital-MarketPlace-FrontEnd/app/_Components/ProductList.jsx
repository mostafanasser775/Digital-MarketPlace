import React from 'react'
import Image from 'next/image'
import { List ,DollarSign} from 'lucide-react'
import Link from 'next/link'
export default function ProductList({ productList }) {
    return (
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>{
            
            productList.map((item) =>
                <ProductItem product={item} key={item.id} />
            )
        }</div>
    )
}

export function ProductItem({ product }) {
    return (
        <Link href={`/product-details/${product.documentId}`} className='items-start p-2 bg-gray-100 rounded-lg cursor-pointer hover:shadow-md'>
            <div>
                <Image src={product?.banner?.url} width={400} height={320} alt='Banner' className='object-cover rounded-t-lg h-44' />
            </div>

            <div className='flex items-start justify-between pt-2'>
                <div>
                    <h2 className='text-[12px] font-medium line-clamp-1 '>{product?.title}</h2>

                    <div className='flex gap-1 text-[10px] font-medium text-gray-400 items-center'>
                        <List width={16} height={16} />
                        <h2 className='font-medium text-gray-400 line'>{product?.category}</h2>
                    </div>
                </div>
                <h2 className='font-medium text-[12px] text-slate-700 flex items-center'>
                <span>{product?.price} </span><DollarSign height={11} width={11} /></h2>
            </div>
        </Link>
    )
}