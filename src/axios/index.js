import axios from 'axios'

export default axios.create({
    baseURL: `${process.env.VUE_APP_IDENTITY_SERVER_API_BASE_URL}/v1/`,
    withCredentials: true,
    headers: { 'X-CSRF': '1' }
})
