const { default: axiosClient } = require("./AxiosClient");

const createOrder=(data)=>axiosClient.post('/orders',data)

export default{
    createOrder
}