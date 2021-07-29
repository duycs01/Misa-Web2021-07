import APIConfig from '../config/APIConfig'
import axios from 'axios'
/**
 * config mặc định cho axios
 */
let baseAPIConfig = axios.create({
    baseURL: APIConfig,
    headers: { 'Content-type': 'application/json' }
})
console.log('alo', process.env.BASE_URL);
export default baseAPIConfig