<template>
  <div class="modal">
    <div class="modal-content">
      <BaseButton
        :id="`btn-close`"
        :iconRight="true"
        class="text-black bg-gray-4 ml-auto"
        @click.native="$emit('closeDetail')"
      >
        <i class="fas fa-times"></i>
      </BaseButton>
      <form action="#" class="form">
        <div class="form-title">Thông tin nhân viên</div>
        <div class="form-content">
          <div class="avatar-employee">
            <div class="avatar" id="avatar">
              <img src="/content/img/default-avatar.jpg" alt="avatar" />
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
                :tabindex="`1`"
                :label="`Mã nhân viên`"
                :id="`txtEmployeeCode`"
                :value="formData.EmployeeCode"
                @input="(e)=>formData.EmployeeCode=e"
                required
                @blur="$common.validateInput"
              ></base-input>
              <base-input
                :tabindex="`2`"
                :label="`Họ và tên`"
                :id="`txtFullName`"
                :value="formData.FullName"
                @input="(e)=>formData.FullName=e"
                required
                @blur="$common.validateInput"
              ></base-input>
              <base-input
                :tabindex="`3`"
                :type="`date`"
                :label="`Ngày sinh`"
                :id="`txtDateOfBirth`"
                :value="$common.formatDateForm(formData.DateOfBirth)"
                @input="(e)=>formData.DateOfBirth=e"
                required
                @blur="$common.validateInput"
              ></base-input>
              <div class="input">
                <div class="label">
                  Giới tính
                  <span class="required">
                    (
                    <i>*</i>)
                  </span>
                </div>
                <base-dropdown
                  @selected="(e)=>formData.Gender=e"
                  v-if="genders.data.length"
                  :tabindex="'4'"
                  :select="genders.select"
                  :options="genders.data"
                  :optionDefault="formData"
                ></base-dropdown>
              </div>
              <base-input
                :tabindex="`5`"
                :label="`Số CMTND/ Căn cước`"
                :id="`txtIdentityNumber`"
                :value="formData.IdentityNumber"
                @input="(e)=>formData.IdentityNumber=e"
                required
                @blur="$common.validateInput"
              ></base-input>
              <base-input
                :tabindex="`6`"
                :type="`date`"
                :label="`Ngày cấp`"
                :id="`txtIdentityDate`"
                :value="$common.formatDateForm(formData.IdentityDate)"
                @input="(e)=>formData.IdentityDate=e"
              ></base-input>
              <base-input
                :tabindex="`7`"
                class="custom-input"
                :label="`Nơi cấp`"
                :id="`txtIdentityPlace`"
                :value="formData.IdentityPlace"
                @input="(e)=>formData.IdentityPlace=e"
              ></base-input>
              <base-input
                :tabindex="`8`"
                :label="`Email`"
                :id="`txtEmail`"
                v-model="formData.Email"
                required
                @input="(e)=>formData.Email=e"
                @blur="$common.validateInput"
              ></base-input>
              <base-input
                :tabindex="`9`"
                :label="`Số điện thoại`"
                :id="`txtPhoneNumber`"
                :value="formData.PhoneNumber"
                required
                @input="(e)=>formData.PhoneNumber=e"
                @blur="$common.validateInput"
              ></base-input>
              <div class="infomation-title">
                <span class="text">B. Thông tin công việc:</span>
              </div>
              <div class="input">
                <div class="label">Chọn vị trí</div>
                <BaseDropdown
                  @selected="(e)=>formData.PositionId=e"
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
                  @selected="(e)=>formData.DepartmentId=e"
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
                @input="(e)=>formData.PersonalTaxCode=e"
              ></base-input>
              <base-input
                :tabindex="`13`"
                :label="`Mức lương cơ bản`"
                :id="`txtSalary`"
                :value="$common.formatMoney(formData.Salary)"
                @input="formatMoney"
                :classes="`text-right`"
                :iconRight="true"
              >
                <template v-slot:icon>
                  <span class="icon">(VNĐ)</span>
                </template>
              </base-input>

              <base-input
                :tabindex="`14`"
                required
                :type="`date`"
                :label="`Ngày gia nhập công ty`"
                :id="`txtJoinDate`"
                :value="$common.formatDateForm(formData.JoinDate)"
                @input="(e)=>formData.JoinDate=e"
                @blur="$common.validateInput"
              ></base-input>

              <div class="input">
                <div class="label">Chọn phòng ban</div>
                <BaseDropdown
                  @selected="(e)=>formData.WorkStatus=e"
                  v-if="workStatus.data.length"
                  :tabindex="`15`"
                  :select="workStatus.select"
                  :options="workStatus.data"
                  :optionDefault="formData"
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
          @click.native="$emit('closeDetail')"
        ></BaseButton>
        <BaseButton
          tabindex="15"
          :id="`btn-save`"
          :text="'Lưu'"
          :iconLeft="true"
          @click.native="saveDetail"
        >
          <i class="far fa-save"></i>
        </BaseButton>
      </div>
    </div>
  </div>
</template>
<script>
import BaseInput from "../../components/base/BaseInput.vue";
import PositionsAPI from "../../apis/components/PositionsAPI";
import DepartmentsAPI from "../../apis/components/DepartmentsAPI";

export default {
  components: {
    BaseInput
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
      }
    };
  },
  methods: {
    /**
     * Format tiền từ text thành số
     */
    formatMoney(e) {
      if (e && !Number.isInteger(e)) {
        this.formData.Salary = +e.replaceAll(".", "");
        console.log(this.formData.Salary);
      }
    },

    /**
     * Kiểm tra lại tất cả input required trước khi emit lên component
     * created: 28/7/2021
     */
    saveDetail() {
      let check = false;
      let input = document.querySelectorAll("input[required='required']");
      input.forEach(e => (check = this.$common.validateInput(e)));
      if (check) this.$emit("saveDetail", this.formData);
    }
  },
  computed: {
    formatSalary() {
      return this.$common.formatMoney(this.formData.Salary);
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/base/FormDetail.css");
</style>