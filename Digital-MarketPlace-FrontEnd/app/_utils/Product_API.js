const { default: axiosClient } = require("./AxiosClient");

const getLatestProducts = () => axiosClient.get('/products?populate=*')
const getProductById = (id) => axiosClient.get(`/products/${id}?populate=*`)
const getProductsByCategory = (category) => axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`)

// eslint-disable-next-line import/no-anonymous-default-export
export default { getLatestProducts, getProductById,getProductsByCategory }