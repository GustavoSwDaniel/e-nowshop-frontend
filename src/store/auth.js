import axios from 'axios';
import Cookie from 'js-cookie';

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
  logout({ commit }) {
    Cookie.remove('token')
    Cookie.remove('refresh_token')
    Cookie.remove('expires_in')
    Cookie.remove('uuid')
    Cookie.remove('name')
    Cookie.remove('cartLen')
  },
  checkAuth({ dispatch }) {
    const currentTime = new Date().getTime() / 1000;
    const expirationTime = Cookie.get('expires_in')
    if (expirationTime && currentTime >= expirationTime - 60) { 
      return dispatch('refreshToken');
    } else {
      return Promise.resolve();
    }
  },
  async refreshToken({ state }) {
    let data = {
      'refresh_token': Cookie.get('refresh_token')
    }
    const response = await axios.post(`${process.env.VUE_APP_BASE_BACKEND_URL_USER}/user/refresh/auth`, data ,{ headers: { "Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${Cookie.get('token')}`} });
        Cookie.set('token', response.data.access_token)
        Cookie.set('expires_in', response.data.expires_in + (new Date().getDate() / 1000))
  }
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setExpirationTime(state, expirationTime) {
    state.expirationTime = expirationTime;
  }
};

export default {
  namespaced: true,
  actions,
  mutations
};