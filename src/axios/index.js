import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.auth.domivice.dev:5001/v1/',
    withCredentials: true,
    headers: { 'X-CSRF': '1' }
})
