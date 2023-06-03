import axios from "axios";
import Cookie from 'js-cookie';
import { toast } from 'bulma-toast'


let axiosOrders = axios.create({
headers: {"Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${Cookie.get('token')}`}
})

const actions = {
  async login(_, credentials) {
    console.log(credentials)
    const response = await axios.post(`${process.env.VUE_APP_BASE_BACKEND_URL_USER}/user/auth`, credentials);
    Cookie.set('token', response.data.access_token)
    Cookie.set('refresh_token', response.data.refresh_token)
    Cookie.set('expires_in', response.data.expires_in + (new Date().getDate() / 1000))
    Cookie.set('uuid', response.data.uuid)
    Cookie.set('name', response.data.name)
    return response
  },
  async getOrders(_, data) {
    let params = {
      "offset": data.offset,
      "limit": data.limit
    }
    const response = await axiosOrders.get(`${process.env.VUE_APP_BASE_BACKEND_URL_ORDER}/order/user`, { params: params })
    return response.data
  },
  async getProductsOrder(_, data){
    let productUuid = data.uuid
    const response = await axiosOrders.get(`${process.env.VUE_APP_BASE_BACKEND_URL_ORDER}/orders/${productUuid}/products`)
    return response.data
  }
};

export default {
  namespaced: true,
  actions,
};