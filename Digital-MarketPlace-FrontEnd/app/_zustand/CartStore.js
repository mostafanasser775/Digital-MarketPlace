import { create } from 'zustand'
import Cart_API from '../_utils/Cart_API'
import axiosClient from '../_utils/AxiosClient';

export const CartStore = create((set, get) => ({
    cart: [],
    Total: 0,
    SetToCart: (documentId, product) => {
        set((state) => (
            { cart: [...state.cart, { documentId: documentId, product: product }] }

        ))
        get().GetTotalPrice();

    },

    SetAllCarts: async (email) => {
        email &&
            Cart_API.getUserCartItems(email).then((res) => {
                var carts = []
                res?.data?.data?.forEach(item => {
                    carts.push({ documentId: item?.documentId, product: item?.products[0] })
                })
                set(() => ({ cart: carts }))
                get().GetTotalPrice();
            })
    },
    GetTotalPrice: () => {
        var totalprice = 0
        get().cart.forEach((item) => {
            totalprice += item?.product?.price
        })
        set(() => ({ Total: totalprice }))

    },
    deleteCart: async (documentId) => {
        axiosClient.delete(`/carts/${documentId}`).then((res) => {
            console.log(res.status === 204)
            if (res.status === 204) {

                set((state) => (
                    { cart: state.cart.filter((item) => item.documentId !== documentId) }
                ))
                get().GetTotalPrice();

            }
        })
    },
    cleanCart: async () => {
        get().cart.forEach((item) => {
            get().deleteCart(item.documentId)
        })
    }


}))
