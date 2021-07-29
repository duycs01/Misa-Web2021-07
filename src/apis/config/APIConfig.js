
/**
 * config url api
 */
var APIConfig = {
    development: 'http://cukcuk.manhnv.net/',
    production: 'http://localhost:8080/'
}
export default APIConfig[process.env.NODE_ENV]