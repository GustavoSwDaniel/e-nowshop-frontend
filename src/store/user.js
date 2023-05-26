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
  async createRecoveryPasswordCode(_, data) {
    const response = await axios.post(`${process.env.VUE_APP_BASE_BACKEND_URL_USER}/user/recovery`, data)
    return response
  },
  async changePassword(_, data){
    let code = data.code
    let password = data.password
    const response = await axios.patch(`${process.env.VUE_APP_BASE_BACKEND_URL_USER}/user/recovery/password/${code}`, password)
    return response
  }
};

export default {
  namespaced: true,
  actions,
};