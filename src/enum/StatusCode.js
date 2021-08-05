class StatusCode {
    constructor() {
    }
    checkStatus(status) {
        switch (status) {
            case 200:
                return { mess: "OK", status: "success" };
            case 201:
                return { mess: "Created", status: "success" };
            case 204:
                return { mess: "No Content", status: "success" };
            case 400:
                return { mess: "Bad Request", status: "error" };
            case 404:
                return { mess: "Not Found", status: "error" };
            case 500:
                return { mess: "Internal Server Error", status: "error" };
            default:
                break;
        }
    }
}


export default new StatusCode