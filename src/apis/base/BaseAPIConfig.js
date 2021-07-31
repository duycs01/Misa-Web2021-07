import APIConfig from '../config/APIConfig'
import axios from 'axios'
/**
 * config mặc định cho axios
 */
let baseAPIConfig = axios.create({
    baseURL: APIConfig,
    headers: { 'Content-type': 'application/json' }
})
export default baseAPIConfig