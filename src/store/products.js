import axios from "axios";
import Cookie from 'js-cookie';
import { toast } from 'bulma-toast'


let axiosProducts = axios.create({
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
  async getProductsByPromotions() {
    const response = await axios.get(`${process.env.VUE_APP_BASE_BACKEND_URL_PRODUCTS}/products/promotions/034f76ab-2236-4e83-a9f2-22f72c4d41f6`)
    return response
  },
  async getNewProducts(_, data) {
    let params = {
      "order_by": data.filter,
      "order": data.order,
      "limit": data.limit
    }
    const response = await axios.get(`${process.env.VUE_APP_BASE_BACKEND_URL_PRODUCTS}/products`, { params: params })
    .catch((error) => {
      toast({
        message: "Error in get products",
        type: 'is-danger',
        position: 'bottom-left',
        duration: 3000,
      })
      return Promise.reject(error.data)
    })
    return response
  },
  async getProductsByName(_, data) {
    let params = {
      "name": data.name,
      "limit": data.limit
    }
    const response = await axios.get(`${process.env.VUE_APP_BASE_BACKEND_URL_PRODUCTS}/products`, { params: params })
    .catch((error) => {
      toast({
        message: "Error in get products",
        type: 'is-danger',
        position: 'bottom-left',
        duration: 3000,
      })
      return Promise.reject(error.data)
    })
    return response
  },
  async getProductsByUuid(_, product_uuid) {
    const response = await axios.get(`${process.env.VUE_APP_BASE_BACKEND_URL_PRODUCTS}/products/${product_uuid}`)
    return response
  },
  async createProduct(_, product_data) {
    const response = await axios.post(`${process.env.VUE_APP_BASE_BACKEND_URL_PRODUCTS}/products`, product_data, { headers: { "Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${Cookie.get('token')}`}})
    return response
  },

  async deleteProduct(_, product_uuid){
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${Cookie.get('token')}`
      }
    };
    const response = await axios.put(`${process.env.VUE_APP_BASE_BACKEND_URL_PRODUCTS}/products/${product_uuid}/deactivate`, {}, options);
    return response;
  },

  async updateProduct(_, product_data){
    const response = await axiosProducts.patch(`${process.env.VUE_APP_BASE_BACKEND_URL_PRODUCTS}/products/${product_data.uuid}`, product_data.productData)
    return response;
  }
};

export default {
  namespaced: true,
  actions,
};