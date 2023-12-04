import axios from "axios"

const API = axios.create({
  baseURL: 'https://academic-repository-api.onrender.com/api'})
  // baseURL: 'http://localhost:8000/api'})

export default API