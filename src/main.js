import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {
    faTwitter,
    faFacebook,
    faStackOverflow,
    faGithub,
    faFacebookF,
    faGoogle
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faBars,
    faTwitter,
    faFacebook,
    faStackOverflow,
    faGithub,
    faFacebookF,
    faGoogle
)

createApp(App)
    .use(store)
    .use(router)
    .use(bootstrap)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
