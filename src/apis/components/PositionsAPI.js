import BaseAPI from '../base/BaseAPI'

class Positions extends BaseAPI {
    constructor() {
        super()
        this.controller = 'v1/positions'
    }
}
export default new Positions()