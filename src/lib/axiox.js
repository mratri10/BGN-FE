import axios from 'axios'

const api = axios.create({
    baseURL: 'http://167.99.76.27:3000/api/',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api
