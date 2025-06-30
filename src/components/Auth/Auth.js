import axios from 'axios'

const authAxios = axios.create({
    baseURL: 'http://localhost:4000/api/'
})


export { authAxios }