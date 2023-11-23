import axios from "axios"

const API = axios.create({
  baseURL: 'https://academic-repository-api.onrender.com/api',
})

export default API