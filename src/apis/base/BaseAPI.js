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
       * Hàm lấy chi tiết dữ liệu theo id
       */
    getDataById(id) {
        return baseAPIConfig.get(`${this.controller}/${id}`)
    }

    /**
    * Hàm sửa dữ liệu
    */
    insertData(body) {
        return baseAPIConfig.post(`${this.controller}`, body)
    }

    /**
     * Hàm sửa dữ liệu
     */
    updateDataById(id, body) {
        return baseAPIConfig.put(`${this.controller}/${id}`, body)
    }

    /**
     * Hàm xóa dữ liệu
     */
    deleteDataById(id) {
        return baseAPIConfig.delete(`${this.controller}/${id}`)
    }

    /**
    * Hàm xóa danh sách dữ liệu
    */
    deleteListId(body) {
        return baseAPIConfig.post(`${this.controller}/deleteList`, body)
    }
}