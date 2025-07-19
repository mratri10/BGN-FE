import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.atrialfa.shop/api/',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api