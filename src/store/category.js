import axios from "axios";

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
  async getAllCategory(){
    const response = await axios.get(`${process.env.VUE_APP_BASE_BACKEND_URL_PRODUCTS}/category`)
    return response
  },
};

export default {
  namespaced: true,
  actions,
};