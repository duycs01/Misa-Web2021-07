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
     * Hàm bắt sự kiện tab kiểm tra tất cả input required
     * Create by: nvduy(20/7/2021)
     */
    checkInputRequiredBlur() {
        let me = this;
        var inputRequireds = document.querySelectorAll("input[required]");

        for (let i = 0; i < inputRequireds.length; i++) {
            let check = false;
            inputRequireds[i].addEventListener("blur", function () {
                me.alertInput(this, check);
            });
        }
    }

    /**
     * Hàm kiểm tra tất cả input required
     * Create by: nvduy(20/7/2021)
     */
    checkInputRequired() {
        let check = false;
        // tôi nghĩ là do cái này
        var inputRequireds = document.querySelectorAll("input[required]");
        for (let i = 0; i < inputRequireds.length; i++) {
            let inputRequired = inputRequireds[i];
            check = Common.alertInput(inputRequired, check);
        }
        return check;
    }

    /**
     * Hàm hiện thị thông báo input
     * Create by: nvduy(20/7/2021)
     */
    alertInput(input, check) {
        let label = document.querySelector(`label[for="${input.id}"]`);
        if (input.required && input.value == "" && !check) {
            label.setAttribute('data-content', 'Trường này không được để trống!')
            label.classList.add("tooltip-input-required");
            input.classList.add("border-red");
            input.focus();
            check = true;
        }
        else {
            label.classList.remove("tooltip-input-required");
            input.classList.remove("border-red");
            label.setAttribute('data-content', '')
        }

        return check;
    }

    alertInputEmail(input, check) {
        let label = document.querySelector(`label[for="${input.id}"]`);

        if (input.type == 'email' && !check) {
            label.setAttribute('data-content', 'Email không đúng định dạng!')
            label.classList.add("tooltip-input-required");
            input.classList.add("border-red");
            input.focus();
            check = true;
        }
        else {
            label.classList.remove("tooltip-input-required");
            input.classList.remove("border-red");
            label.setAttribute('data-content', '')
        }
    }
    alertInputPhone(input, check) {
        let label = document.querySelector(`label[for="${input.id}"]`);

        if (input.type == 'text' && !check) {
            label.setAttribute('data-content', 'Số điện thoại không đúng định dạng!')
            label.classList.add("tooltip-input-required");
            input.classList.add("border-red");
            input.focus();
            check = true;
        }
        else {
            label.classList.remove("tooltip-input-required");
            input.classList.remove("border-red");
            label.setAttribute('data-content', '')
        }
    }

    /**
     * Hàm kiểm tra định dạng email
     */
    validateEmail() {
        let testInput
        // chỗ này tôi lấy những thằng có type là email
        var inputEmail = document.querySelector("input[type=email]");
        inputEmail.addEventListener("blur", function () {
            let re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (inputEmail.value) {
                testInput = Common.alertInputEmail(inputEmail, re.test(String(inputEmail.value).toLowerCase()));
            }
        })
        return testInput
    }

    validatePhone() {
        let testInput = false
        var inputPhone = document.querySelector("input[type=phone]");
        inputPhone.addEventListener("blur", function () {
            var phoneno = /^\d{10}$/;
            if (!inputPhone.value.match(phoneno)) {
                return Common.alertInputPhone(inputPhone, testInput);
            }
        })
    }
}

export default new Common()