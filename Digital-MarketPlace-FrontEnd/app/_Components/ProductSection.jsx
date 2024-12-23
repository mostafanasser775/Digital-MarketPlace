'use client'
import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import Product_API from '../_utils/Product_API'

export default function ProductSection() {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getLatestProducts_()
  }, [])
  const getLatestProducts_ = () => {

    Product_API.getLatestProducts().then((res) => {
      console.log(res.data.data)
      setProductList(res.data.data)
    })
  }

  return (
    <div className='px-10 my-4 md:px-20'>
        <h2 className='mb-2 text-xl'>Our Latest Products</h2>
      <ProductList productList={productList}/>
    </div>
  )
}

