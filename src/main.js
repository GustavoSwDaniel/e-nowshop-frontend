import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import authStore from './store/auth.js'
import productsStore from './store/products'
import categoryStore from './store/category'
import employeesStore from './store/employees'
import checkoutStore from './store/checkout'
import PaymentStore from './store/payment'
import DahbordStore from './store/dashbord'
import OrderStore from './store/order'
import Users from './store/user'
import { createStore } from 'vuex'
import PubNub from 'pubnub';



import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faPeopleLine } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faUser as faUserSolid } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPix } from '@fortawesome/free-brands-svg-icons'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { faBarcode } from '@fortawesome/free-solid-svg-icons'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope as faEnvelopeSolid } from '@fortawesome/free-solid-svg-icons'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const store = createStore({
    modules: {
        'auth': authStore,
        'products': productsStore,
        'category': categoryStore,
        'employees': employeesStore,
        'checkout': checkoutStore,
        'payment': PaymentStore,
        'dashbord': DahbordStore,
        'user': Users,
        'orders': OrderStore
    }
})



require("./assets/main.scss")


library.add(faBars, faList, faPeopleLine, faRightFromBracket,
    faCirclePlus, faArrowsRotate, faUsers, faUser, faEnvelope, faLock, faHouse,
    faTruck, faPlus, faMinus, faPix, faCreditCard, faBarcode, faCopy, faChevronLeft, faChevronRight,
    faArrowRightLong, faCartShopping, faUserSolid, faCircleCheck, faEye, faCircle,
    faChevronDown, faLocationDot, faTrash, 
    faEnvelopeSolid, faBasketShopping, faGear, faMagnifyingGlass)

const pubnub = new PubNub({
    publishKey: 'pub-c-b572a862-efaa-4b28-9462-82d0cb72a57c',
    subscribeKey: 'sub-c-47cab205-d6cf-4e9f-91a7-bbb42cc8544c',
    uuid: 'test',
});

const app = createApp(App)
app.config.globalProperties.$pubnub = pubnub;
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)



app.mount('#app')