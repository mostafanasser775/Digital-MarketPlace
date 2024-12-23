const { default: axios } = require("axios")

const API_KEY=process.env.NEXT_PUBLIC_REST_API_KEY
const API_URL='http://localhost:1337/api'

const axiosClient=axios.create({
    baseURL:API_URL,headers:{
        Authorization:`Bearer ${API_KEY}`
    }
})
export default axiosClient