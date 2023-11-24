import axios from "axios"

const API = axios.create({
  baseURL: 'https://dhvsu-archives.site/api'})

export default API