import BaseAPI from '../base/BaseAPI'

class Departments extends BaseAPI {
    constructor() {
        super()
        this.controller = 'api/Department'
    }
}
export default new Departments()