import baseAPIConfig from "./BaseAPIConfig"

export default class BaseAPI {
    constructor() {
        this.controller = null
    }

    /**
     * Hàm lấy tất cả dữ liệu
     */
    getAllData() {
        return baseAPIConfig.get(`${this.controller}`)
    }

    /**
    * Hàm sửa dữ liệu
    */
    insertDataById(id, body) {
        return baseAPIConfig.post(`${this.controller}/${id}`, body)
    }

    /**
     * Hàm sửa dữ liệu
     */
    updateDataById(id) {
        return baseAPIConfig.put(`${this.controller}/${id}`)
    }

    /**
     * Hàm xóa dữ liệu
     */
    deleteDataById(id) {
        return baseAPIConfig.delete(`${this.controller}/${id}`)
    }
}