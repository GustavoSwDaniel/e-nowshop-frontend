import axios from 'axios';
import Cookie from 'js-cookie'
import router from '../../router/index'


const axiosClient = axios.create();

axiosClient.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 401 || error.response.status === 403) {
    router.push({ name: 'switch-login' })
  }
});

axiosClient.interceptors.request.use(config => {
  const token = Cookie.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default axiosClient;