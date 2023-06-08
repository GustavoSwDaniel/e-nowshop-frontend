import axios from "axios";
import Cookie from 'js-cookie';
import { toast } from 'bulma-toast'


let axiosCheckout = axios.create({
  headers: { "Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${Cookie.get('token')}` }
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

  async calcFrete(_, data) {
    console.log(data.productData)
    let response = await axiosCheckout.post(`${process.env.VUE_APP_BASE_BACKEND_URL_ORDER}/calc/frete/${data.address_id}`, data.productData)
    .catch((error) => {
        toast({
          message: "Error in calc frete",
          type: 'is-danger',
          position: 'bottom-left',
          duration: 3000,
        })
        return Promise.reject(error.data)
      })
    return response.data
  },
  async getCart(_, data){
    let params = {
      type_send: data.type_send
    }
    let response = await axiosCheckout.get(`${process.env.VUE_APP_BASE_BACKEND_URL_ORDER}/car`, {params: params, headers: { "Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${Cookie.get('token')}` }})
    .catch((error) => {
        toast({
          message: "Error in get card",
          type: 'is-danger',
          position: 'bottom-left',
          duration: 3000,
        })
        return Promise.reject(error.data)
      })
    console.log('carrinho')
    console.log(response.data)
    return response.data
  },
  async getCartWithoutParams(_){
    let response = await axiosCheckout.get(`${process.env.VUE_APP_BASE_BACKEND_URL_ORDER}/car`, {headers: { "Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${Cookie.get('token')}` }})
    .catch((error) => {
        toast({
          message: "Error in get card",
          type: 'is-danger',
          position: 'bottom-left',
          duration: 3000,
        })
        return Promise.reject(error.data)
      })
    console.log('carrinho')
    console.log(response.data)
    return response.data
  },
  async addCart(_, data){
    let item = {
      product_uuid: data.uuid
    }
    console.log(data)
    let response = await axiosCheckout.put(`${process.env.VUE_APP_BASE_BACKEND_URL_ORDER}/car`, item, {headers: {"Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${Cookie.get('token')}` }})
    .catch((error) => {
        toast({
          message: "Error in add item in cart",
          type: 'is-danger',
          position: 'bottom-left',
          duration: 3000,
        })
        return Promise.reject(error.data)
      })
    return response.data
  },
  async getLenCart(_, data){
    let response = await axios.get(`${process.env.VUE_APP_BASE_BACKEND_URL_ORDER}/car/lenght`, {headers: { "Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${Cookie.get('token')}`}})
    .catch((error) => {
        return Promise.reject(error.data)
      })
      return response.data.lenght
    },
  async removeItem(_, data){
    let response = await axios.delete(`${process.env.VUE_APP_BASE_BACKEND_URL_ORDER}/car/item/${data.uuid}`, {headers: { "Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${Cookie.get('token')}`}})
    .catch((error) => {
      return Promise.reject(error.data)
    })
    return response
  },
  async updateQuantity(_, data){
    console.log(data)
    let payload ={
      quantity: data.quantity
    }
    let response = await axiosCheckout.put(`${process.env.VUE_APP_BASE_BACKEND_URL_ORDER}/car/${data.uuid}/item/${data.product_uuid}`, payload, {headers: {"Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${Cookie.get('token')}` }})
    .catch((error) => {
        toast({
          message: "Error in add item in cart",
          type: 'is-danger',
          position: 'bottom-left',
          duration: 3000,
        })
        return Promise.reject(error.data)
      })
    return response.data
  },
};

export default {
  namespaced: true,
  actions,
};