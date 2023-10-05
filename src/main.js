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
import { createI18n } from 'vue-i18n'

import enCA from './locales/en-Ca.json'
import frCA from './locales/fr-Ca.json'

const i18n = createI18n({
    legacy: false,
    locale: 'enCA',
    fallbackLocale: 'enCA',
    messages: { enCA, frCA }
})

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
    .use(i18n)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
