import axios from 'axios';
import Cookie from 'js-cookie';
import { toast } from 'bulma-toast'


let axiosPayment = axios.create({
    headers: {"Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${Cookie.get('token')}`}
})

const state = {
  qrCode: null,
  copyPaste: null
}

const actions = {
  async createOrder({ commit }, data){
    const response = await axios.post(`${process.env.VUE_APP_BASE_BACKEND_URL_ORDER}/orders`, data, {headers: { "Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${Cookie.get('token')}` }})
    .catch((error) => {
        toast({
          message: "Error in create employee",
          type: 'is-danger',
          position: 'bottom-left',
          duration: 3000,
        })
        return Promise.reject(error.data)
      })
      commit('setQrCodePaymentData', response.data)
      return response.data
  }
}

const mutations = {
  setQrCodePaymentData(state, paymentData){
    console.log('mudations')
    state.qrCode = paymentData.payment_info.qrcode
    state.copyPaste = paymentData.payment_info.qrcode_text
  },
}

const getters = {
  getQrCodePayment(state){
    return state.qrCode
  },
  getCopyPastPayment(state){
    return state.copyPaste
  }
}

export default {
    state,
    namespaced: true,
    actions,
    mutations,
    getters
  };