class StatusCode {
    constructor() {
    }
    checkStatus(res) {
        switch (res.status) {
            case 200:
                return { mess: "Thành công", status: "success" };
            case 201:
                return { mess: "Tạo mới thành công", status: "success" };
            case 204:
                return { mess: "Không có dữ liệu", status: "success" };
            case 400:
                return { mess: res.Messager, status: "error" };
            case 404:
                return { mess: "Không tìm thấy máy chủ", status: "error" };
            case 500:
                return { mess: "Sảy ra lỗi từ máy chủ", status: "error" };
            default:
                break;
        }
    }
}


export default new StatusCode