import BaseAPI from '../base/BaseAPI'

class Employees extends BaseAPI {
    constructor() {
        super()
        this.controller = 'v1/employees'
    }
}
export default new Employees()