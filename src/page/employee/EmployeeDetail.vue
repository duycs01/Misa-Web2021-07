<template>
  <div class="modal">
    <div class="modal-content">
      <Basebutton
        :id="`btn-close`"
        :iconRight="true"
        class="text-black bg-gray-4 ml-auto"
        @click.native="$emit('closeDetail')"
      >
        <i class="fas fa-times"></i>
      </Basebutton>
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
                :label="`Mã nhân viên`"
                :id="`txtEmployeeCode`"
                :value="formData.EmployeeCode"
                required
              ></base-input>
              <base-input
                :label="`Họ và tên`"
                :id="`txtFullName`"
                :value="formData.FullName"
                required
              ></base-input>
              <base-input
                :type="`date`"
                :label="`Ngày sinh`"
                :id="`txtDateOfBirth`"
                :value="formData.DateOfBirth"
                required
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
                  @selected="selectedGender"
                  v-if="genders.data.length"
                  :tabindex="4"
                  :select="genders.select"
                  :options="genders.data"
                  :optionDefault="formData"
                ></base-dropdown>
              </div>
              <base-input
                :label="`Số CMTND/ Căn cước`"
                :id="`txtIdentityNumber`"
                :value="formData.IdentityNumber"
                required
              ></base-input>
              <base-input
                :type="`date`"
                :label="`Ngày cấp`"
                :id="`txtIdentityDate`"
                :value="formData.IdentityDate"
              ></base-input>
              <base-input
                class="custom-input"
                :label="`Nơi cấp`"
                :id="`txtIdentityPlace`"
                :value="formData.IdentityPlace"
              ></base-input>
              <base-input :label="`Email`" :id="`txtEmail`" v-model="formData.Email" required></base-input>
              <base-input
                :label="`Số điện thoại`"
                :id="`txtPhoneNumber`"
                :value="formData.PhoneNumber"
                required
              ></base-input>
              <div class="infomation-title">
                <span class="text">B. Thông tin công việc:</span>
              </div>
              <div class="input">
                <div class="label">Chọn vị trí</div>
                <BaseDropdown
                  @selected="selectedPosition"
                  v-if="positions.data.length"
                  :tabindex="12"
                  :select="positions.select"
                  :options="positions.data"
                  :optionDefault="formData"
                ></BaseDropdown>
              </div>
              <div class="input">
                <div class="label">Chọn phòng ban</div>
                <BaseDropdown
                  @selected="selectedDepartment"
                  v-if="departments.data.length"
                  :tabindex="13"
                  :select="departments.select"
                  :options="departments.data"
                  :optionDefault="formData"
                ></BaseDropdown>
              </div>
              <base-input
                :label="`Mã số thuế cá nhân`"
                :id="`txtTaxCode`"
                :value="formData.PersonalTaxCode"
              ></base-input>
              <base-input
                :label="`Mức lương cơ bản`"
                :id="`txtSalary`"
                :value="formData.Salary"
                :classes="`text-right`"
                :iconRight="true"
              >
                <template v-slot:icon>
                  <span class="icon">(VNĐ)</span>
                </template>
              </base-input>

              <base-input
                required
                :type="`date`"
                :label="`Ngày gia nhập công ty`"
                :id="`txtJoinDate`"
                :value="formData.JoinDate"
              ></base-input>
              <div class="input">
                <div class="label">Chọn phòng ban</div>
                <BaseDropdown
                  @selected="selectedWorkStatus"
                  v-if="workStatus.data.length"
                  :tabindex="13"
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
        <basebutton
          :id="`btn-cancel`"
          :text="'Hủy'"
          class="bg-gray-4 text-black"
          @click.native="$emit('closeDetail')"
        ></basebutton>
        <basebutton
          :id="`btn-save`"
          :text="'Lưu'"
          :iconLeft="true"
          @click.native="$emit('saveDetail',formData)"
        >
          <i class="far fa-save"></i>
        </basebutton>
      </div>
    </div>
  </div>
</template>
<script>
import BaseInput from "../../components/base/BaseInput.vue";
import Basebutton from "../../components/base/BaseButton.vue";
import BaseDropdown from "../../components/base/BaseDropdown.vue";
import PositionsAPI from "../../apis/components/PositionsAPI";
import DepartmentsAPI from "../../apis/components/DepartmentsAPI";

export default {
  components: {
    BaseInput,
    Basebutton,
    BaseDropdown
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
     * Lấy dữ liệu gender vào model
     */
    selectedGender(value) {
      this.formData.Gender = +value;
    },
    /**
     * Lấy dữ liệu gender vào model
     */
    selectedDepartment(value) {
      this.formData.DepartmentId = value;
    },
    /**
     * Lấy dữ liệu gender vào model
     */
    selectedPosition(value) {
      this.formData.PositionId = value;
    },
    /**
     * Lấy dữ liệu gender vào model
     */
    selectedWorkStatus(value) {
      this.formData.WorkStatus = +value;
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/base/FormDetail.css");
</style>