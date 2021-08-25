
/**
 * config url api
 */
var APIConfig = {
    production: 'http://cukcuk.manhnv.net/',
    development: 'https://localhost:44343/api/'
}
console.log(process.env.NODE_ENV);
export default APIConfig[process.env.NODE_ENV]
