import BaseAPI from '../base/BaseAPI'

class Departments extends BaseAPI {
    constructor() {
        super()
        this.controller = 'v1/Departments'
    }
}
export default new Departments()