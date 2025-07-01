import axios from 'axios'

export const Authaxios = axios.create({
    baseURL:'http://localhost:4000/api'
})