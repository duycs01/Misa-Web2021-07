<template>
  <div class="modal">
    <div class="modal-content">
      <BaseButton
        :id="`btn-close`"
        :iconRight="true"
        class="btn-close_custom"
        @click.native="popupWarning = true"
      >
        <img class="w-4 h-4" src="../../assets/icon/x.svg" alt="close" />
      </BaseButton>
      <form action="#" class="form">
        <div class="form-title">Thông tin nhân viên</div>
        <div class="form-content">
          <div class="avatar-employee">
            <div class="avatar" id="avatar">
              <img src="../../assets/img/default-avatar.jpg" alt="avatar" />
              <input type="file" hidden />
            </div>
            <div class="text">(Vui lòng chọn ảnh có định dạng .jpg. .jpeg. .png. .gif.)</div>
          </div>
          <div class="info-employee">
            <div class="form-info">
              <div class="infomation-title">
                <span class="text">A. Thông tin chung:</span>
              </div>
              <base-input
                ref="inputCode"
                :tabindex="`1`"
                :label="`Mã nhân viên`"
                :id="`txtEmployeeCode`"
                :value="formData.EmployeeCode"
                @input="formData.EmployeeCode=$event"
                required
                @blur="validateInput"
              ></base-input>
              <base-input
                ref="inputFullName"
                :tabindex="`2`"
                :label="`Họ và tên`"
                :id="`txtFullName`"
                :value="formData.FullName"
                @input="formData.FullName=$event"
                required
                @blur="validateInput"
                :placeholder="'Nguyễn Văn A'"
              ></base-input>
              <base-input
                :tabindex="`3`"
                :type="`date`"
                :label="`Ngày sinh`"
                :id="`txtDateOfBirth`"
                :value="$common.formatDateForm(formData.DateOfBirth)"
                @input="formData.DateOfBirth=$event"
              ></base-input>
              <div class="input">
                <div class="label">Giới tính</div>
                <base-dropdown
                  @selected="formData.Gender=$event"
                  v-if="genders.data.length"
                  :tabindex="'4'"
                  :select="genders.select"
                  :options="genders.data"
                  :optionDefault="formData"
                ></base-dropdown>
              </div>
              <base-input
                :type="`text`"
                ref="inputIdentityNumber"
                :tabindex="`5`"
                :label="`Số CMTND/ Căn cước`"
                :id="`txtIdentityNumber`"
                :value="formData.IdentityNumber"
                @input="formData.IdentityNumber=$event"
                required
                @blur="validateInput"
                :placeholder="'00223500551'"
              ></base-input>
              <base-input
                :tabindex="`6`"
                :type="`date`"
                :label="`Ngày cấp`"
                :id="`txtIdentityDate`"
                :value="$common.formatDateForm(formData.IdentityDate)"
                @input="formData.IdentityDate=$event"
              ></base-input>
              <base-input
                :tabindex="`7`"
                class="custom-input"
                :label="`Nơi cấp`"
                :id="`txtIdentityPlace`"
                :value="formData.IdentityPlace"
                @input="formData.IdentityPlace=$event"
                :placeholder="'Hà Nội..'"
              ></base-input>
              <base-input
                ref="inputEmail"
                :tabindex="`8`"
                :label="`Email`"
                :id="`txtEmail`"
                v-model="formData.Email"
                required
                @input="formData.Email=$event"
                @blur="validateInput"
                :placeholder="'Example@gmail.com'"
              ></base-input>
              <base-input
                ref="inputPhoneNumber"
                :tabindex="`9`"
                :label="`Số điện thoại`"
                :id="`txtPhoneNumber`"
                :value="formData.PhoneNumber"
                required
                @input="formData.PhoneNumber=$event"
                @blur="validateInput"
                :placeholder="'0123456789'"
              ></base-input>
              <div class="infomation-title">
                <span class="text">B. Thông tin công việc:</span>
              </div>
              <div class="input">
                <div class="label">Chọn vị trí</div>
                <BaseDropdown
                  @selected="formData.PositionId=$event"
                  v-if="positions.data.length"
                  :tabindex="`10`"
                  :select="positions.select"
                  :options="positions.data"
                  :optionDefault="formData"
                ></BaseDropdown>
              </div>
              <div class="input">
                <div class="label">Chọn phòng ban</div>
                <BaseDropdown
                  @selected="formData.DepartmentId=$event"
                  v-if="departments.data.length"
                  :tabindex="`11`"
                  :select="departments.select"
                  :options="departments.data"
                  :optionDefault="formData"
                ></BaseDropdown>
              </div>
              <base-input
                :tabindex="`12`"
                :label="`Mã số thuế cá nhân`"
                :id="`txtTaxCode`"
                :value="formData.PersonalTaxCode"
                @input="formData.PersonalTaxCode=$event"
                :placeholder="'0123456'"
              ></base-input>
              <base-input
                :tabindex="`13`"
                :label="`Mức lương cơ bản`"
                :id="`txtSalary`"
                :value="formatSalary"
                @input="formatMoney"
                @blur="validateInput"
                :classes="`text-right`"
                :iconRight="true"
                :placeholder="'100.000'"
              >
                <template v-slot:icon>
                  <span class="icon" style="font-size:11px">(VNĐ)</span>
                </template>
              </base-input>

              <base-input
                :tabindex="`14`"
                :type="`date`"
                :label="`Ngày gia nhập công ty`"
                :id="`txtJoinDate`"
                :value="$common.formatDateForm(formData.JoinDate)"
                @input="formData.JoinDate=$event"
              ></base-input>
              <div class="input">
                <div class="label">Tình trạng công việc</div>
                <BaseDropdown
                  class="h-0"
                  @selected="formData.WorkStatus=$event"
                  v-if="workStatus.data.length"
                  :tabindex="`15`"
                  :select="workStatus.select"
                  :options="workStatus.data"
                  :optionDefault="formData"
                  :classUp="'bottom-full'"
                ></BaseDropdown>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="modal-footer">
        <BaseButton
          tabindex="16"
          :id="`btn-cancel`"
          :text="'Hủy'"
          class="bg-gray-4 text-black"
          @click.native="popupWarning = true"
        ></BaseButton>
        <BaseButton
          tabindex="15"
          :id="`btn-save`"
          :text="'Lưu'"
          :iconLeft="true"
          @click.native="saveFormDetail"
        >
          <i class="far fa-save"></i>
        </BaseButton>
      </div>
    </div>
    <BasePopupWarning v-if="popupWarning" @closePopup="popupWarning=false" :warning="detailPopup">
      <template v-slot:buttonA>
        <base-button
          :id="`btn-cancelPopup`"
          :text="'Hủy'"
          class="bg-gray-4 text-black"
          @click.native="popupWarning=false"
        ></base-button>
      </template>
      <template v-slot:buttonB>
        <base-button
          :id="`btn-delete`"
          :text="'Đóng'"
          class="bg-red"
          @click.native="closeFromDetail"
        ></base-button>
      </template>
    </BasePopupWarning>
  </div>
</template>
<script>
import BaseInput from "../../components/base/BaseInput.vue";
import BasePopupWarning from "../../components/base/BasePopupWarning.vue";
import PositionsAPI from "../../apis/components/PositionsAPI";
import DepartmentsAPI from "../../apis/components/DepartmentsAPI";

export default {
  components: {
    BaseInput,
    BasePopupWarning
  },
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    /**
     * Gọi api lấy tất cả phòng ban
     */
    PositionsAPI.getAllData()
      .then(res => {
        this.positions.data = res.data;
      })
      .catch(err => {
        console.log(err);
      });

    /**
     * Gọi api lấy tất cả phòng ban
     */

    DepartmentsAPI.getAllData()
      .then(res => {
        this.departments.data = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    this.$refs.inputCode.focusMe();
  },
  data() {
    return {
      genders: {
        data: [
          {
            GenderName: "Nữ",
            Gender: "0"
          },
          {
            GenderName: "Nam",
            Gender: "1"
          },
          {
            GenderName: "Không xác định",
            Gender: "2"
          }
        ],
        select: {
          name: "GenderName",
          value: "Gender"
        }
      },
      workStatus: {
        data: [
          {
            WorkStatusName: "Đang làm việc",
            WorkStatus: "1"
          },
          {
            WorkStatusName: "Đã nghỉ việc",
            WorkStatus: "3"
          },
          {
            WorkStatusName: "Đang thử việc",
            WorkStatus: "2"
          }
        ],
        select: {
          name: "WorkStatusName",
          value: "WorkStatus"
        }
      },
      departments: {
        data: [],
        select: {
          name: "DepartmentName",
          value: "DepartmentId"
        }
      },
      positions: {
        data: [],
        select: {
          name: "PositionName",
          value: "PositionId"
        }
      },
      popupWarning: false,
      detailPopup: {
        title: "Cảnh báo đóng form",
        description: "Khi bạn đóng form dữ liệu nhập trong form sẽ bị xóa!"
      }
    };
  },
  methods: {
    /**
     * Format tiền từ text thành số
     * Created by duylv 06/08/2021
     */
    formatMoney(e) {
      if (e && !Number.isInteger(e)) {
        this.$set(this.formData, "Salary", +e.replaceAll(".", ""));
      }
    },
    /**
     * Kiểm tra input và hiện tooltip
     * Created by duylv 26/07/2021
     */
    validateInput(e) {
      if (e.value == "") {
        e.parentNode.setAttribute(
          "data-content",
          "Trường này không được để trống"
        );
        return this.$common.showHideTooltip(e, false);
      } else if (e.value && e.id == "txtEmail") {
        let testEmail = this.$common.validateEmail(e);
        e.parentNode.setAttribute("data-content", "Email không đúng định dạng");
        return this.$common.showHideTooltip(e, testEmail);
      } else if (e.value && e.id == "txtPhoneNumber") {
        let testPhoneNumber = this.$common.validateNumber(e);
        e.parentNode.setAttribute(
          "data-content",
          "Số điện thoại không đúng định dạng"
        );
        return this.$common.showHideTooltip(e, testPhoneNumber);
      } else if (e.value && e.id == "txtSalary") {
        let testNumber = false;
        let value = +e.value.replaceAll(".", "");
        if (value) {
          testNumber = Number.isInteger(value);
        }
        e.parentNode.setAttribute(
          "data-content",
          "Tiền lương không đúng định dạng"
        );
        return this.$common.showHideTooltip(e, testNumber);
      } else {
        return this.$common.showHideTooltip(e, true);
      }
    },

    /**
     * Focus vào input
     * Created by duylv 26/07/2021
     */
    focusInput(inputId) {
      switch (inputId) {
        case "txtEmployeeCode":
          return this.$refs.inputCode.focusMe();
        case "txtFullName":
          return this.$refs.inputFullName.focusMe();
        case "txtIdentityNumber":
          return this.$refs.inputIdentityNumber.focusMe();
        case "txtEmail":
          return this.$refs.inputEmail.focusMe();
        case "txtPhoneNumber":
          return this.$refs.inputPhoneNumber.focusMe();
        default:
          break;
      }
    },

    /**
     * Kiểm tra lại tất cả input required trước khi emit lên component
     * created: 28/7/2021
     */
    saveFormDetail() {
      let check = false;
      let checkInput = true;
      let inputError = [];
      let input = document.querySelectorAll("input[required='required']");
      input.forEach(e => {
        check = this.validateInput(e);
        if (!check) {
          inputError.push(e.id);
          checkInput = check;
        }
      });

      if (!checkInput && inputError.length > 0) {
        this.focusInput(inputError[0]);
      }

      if (checkInput) this.$emit("saveFormDetail", this.formData);
    },

    closeFromDetail() {
      this.$emit("closeDetail");
    }
  },
  computed: {
    /**
     * format tiền tệ
     * created: 28/7/2021
     */
    formatSalary() {
      return this.$common.formatMoney(this.formData.Salary);
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/base/FormDetail.css");
</style>