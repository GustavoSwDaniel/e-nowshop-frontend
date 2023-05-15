import axios from "axios";
import Cookie from 'js-cookie';
import { toast } from 'bulma-toast'


let axiosEmployees = axios.create({
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
  async createEmployee(_, register_data) {
    await axiosEmployees.post(`${process.env.VUE_APP_BASE_BACKEND_URL_ADM}/manager/employees`, register_data).catch((error) => {
      toast({
        message: "Error in create employee",
        type: 'is-danger',
        position: 'bottom-left',
        duration: 3000,
      })
      return Promise.reject(error.data)
    })
    return true
  },
  async getEmployees() {
    let response = await axiosEmployees.get(`${process.env.VUE_APP_BASE_BACKEND_URL_ADM}/manager/employees?order_by=created_at`, { headers: { "Access-Control-Allow-Origin": "*", }})
    .catch((error) => {
      toast({
        message: "Error in create employee",
        type: 'is-danger',
        position: 'bottom-left',
        duration: 3000,
      })
      return Promise.reject(error.data)
    })
    return response.data
  },
  async deleteEmployee(_, product_uuid){
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${Cookie.get('token')}`
      }
    };
    const response = await axios.put(`${process.env.VUE_APP_BASE_BACKEND_URL_ADM}/manager/employees`, register_data, {}, options);
    return response;
  }
};

export default {
  namespaced: true,
  actions,
};