class Common {
    constructor() { }

    /**
     * Hàm định dạng tiền tệ
     * Create by: nvduy(20/7/2021)
     */
    formatMoney(num) {
        if (num) {
            return num.toLocaleString("de-DE");
        }
    }

    /**
     * Hàm sử lí định dạng ngày tháng
     * Create by: nvduy(20/7/2021)
     */
    formatDate(dateTime) {
        if (dateTime !== null) {
            var dateString = "";
            var newDate = new Date(dateTime);
            var date = newDate.getDay();
            var month = newDate.getMonth() + 1;
            var year = newDate.getFullYear();
            if (date < 10) {
                date = "0" + date;
            }
            if (month < 10) {
                month = "0" + month;
            }
            dateString = `${date}/${month}/${year}`;
            return dateString;
        }
    }

    /**
     * Hàm sử lí định dạng ngày tháng
     * Create by: nvduy(20/7/2021)
     */
    formatDateForm(dateTime) {
        if (dateTime !== null) {
            var dateString = "";
            var newDate = new Date(dateTime);
            var date = newDate.getDay();
            var month = newDate.getMonth() + 1;
            var year = newDate.getFullYear();
            if (date < 10) {
                date = "0" + date;
            }
            if (month < 10) {
                month = "0" + month;
            }
            dateString = `${year}-${date}-${month}`;
            return dateString;
        }
    }
    /**
     * Hàm sử lí trạng thái làm việc
     * Create by: nvduy(20/7/2021)
     */
    formatWorkStatusToName(status) {
        if (status)
            switch (status) {
                case 1:
                    return "Đang làm việc";
                case 2:
                    return "Đang thử việc";
                default:
                    return "Đã nghỉ việc";
            }
    }

    /**
     * Hàm sử lí giới tính
     * Create by: nvduy(20/7/2021)
     */
    formatGenderToName(gender) {
        switch (gender) {
            case 0:
                return "Nữ";
            case 1:
                return "Nam";

            default:
                return "Chưa xác định";
        }
    }


    /**
     * Kiểm tra input và hiện tooltip
     */
    validateInput(e) {
        if (e.value == "") {
            e.parentNode.setAttribute(
                "data-content",
                "Trường này không được để trống"
            );
            Common.showHideTooltip(e, false)
            return false
        }
        else if (e.id == "txtEmail") {
            let testEmail = Common.validateEmail(e);
            e.parentNode.setAttribute(
                "data-content",
                "Email không đúng định dạng"
            );
            return Common.showHideTooltip(e, testEmail)
        }
        else if (e.id == "txtPhoneNumber") {
            let testPhoneNumber = Common.validatePhone(e);
            e.parentNode.setAttribute(
                "data-content",
                "Số điện thoại không đúng định dạng"
            );
            return Common.showHideTooltip(e, testPhoneNumber)
        }
        else {
            return Common.showHideTooltip(e, true)
        }

    }

    /**
     * Hàm ẩn hiện tooltip
     */
    static showHideTooltip(input, check) {
        if (!check) {
            input.classList.add("border-corlor-red");
            input.parentNode.classList.add("tooltip");
            return false;
        } else {
            input.classList.remove("tooltip");
            input.parentNode.classList.remove("border-corlor-red");
            return true;
        }

    }

    /**
     * Hàm kiểm tra định dạng email
     */
    static validateEmail(inputEmail) {
        let re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (inputEmail.value) return re.test(String(inputEmail.value).toLowerCase());
    }
    /**
     * Hàm kiểm tra định dạng PhoneNumber
    */
    static validatePhone(inputPhone) {
        let phoneno = /^\d{10}$/;
        if (inputPhone.value) return inputPhone.value.match(phoneno)
    }
}

export default new Common()