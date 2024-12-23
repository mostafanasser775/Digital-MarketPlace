const { default: axiosClient } = require("./AxiosClient");

const addToCart = (payload) => axiosClient.post('/carts', payload)
const getUserCartItems = async (email) => await axiosClient.get(`/carts?populate[products][populate]=banner&filters[email][$eq]=${email}`)
export default {
    addToCart, getUserCartItems
}