
'use client'
import { useEffect, useState } from "react"
import Product_API from "../../_utils/Product_API"
import { useParams, usePathname } from 'next/navigation'
import BreadCrumb from "../../_Components/BreadCrumb"
import ProductBanner from "./ProductBanner"
import ProductInfo from "./ProductInfo"
import ProductList from "../../_Components/ProductList"

export default function ProductDetails() {
    const path=usePathname()
    const params = useParams()
    const [productDetails, setProductDetails] = useState({})
    const [productsList, setProductsList] = useState([])
    useEffect(() => {

        Product_API.getProductById(params?._id).then(res => {
            console.log('product item : ', res.data)
            setProductDetails(res.data.data)
            getProductsByCategory_(res.data.data)
        })

    }, [params._id])
    const getProductsByCategory_ = (product) => {
        Product_API.getProductsByCategory(product.category).then((res) => {
            console.log('products with the same category', res.data.data)
            setProductsList(res.data.data)
        })
    }

    return (
        <div className="px-10 py-8 md:px-28">
            <BreadCrumb path={path}/>
            <div className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2">
                <ProductBanner product={productDetails} />
                <ProductInfo product={productDetails} />

            </div>

            <div className="mt-10">
                <hr className="my-4" />

                <h2 className="mb-2 text-xl">Similar Products </h2>

                <ProductList productList={productsList} />

            </div>
        </div>
    )
}