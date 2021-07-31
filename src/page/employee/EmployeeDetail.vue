<template>
  <div class="modal">
    <div class="modal-content">
      <Basebutton
        :id='`btn-close`'
        :iconRight="true"
        class="text-black bg-gray-4 ml-auto"
        @click.native="$emit('closeDetail')"
      >
        <i class="fas fa-times"></i>
      </Basebutton>
      <form
        action="#"
        class="form"
      >
        <div class="form-title">Thông tin nhân viên</div>
        <div class="form-content">
          <div class="avatar-employee">
            <div
              class="avatar"
              id="avatar"
            >
              <img
                src="/content/img/default-avatar.jpg"
                alt="avatar"
              />
              <input
                type="file"
                hidden
              />
            </div>
            <div class="text">
              (Vui lòng chọn ảnh có định dạng .jpg. .jpeg. .png. .gif.)
            </div>
          </div>
          <div class="info-employee">
            <div class="form-info">
              <div class="infomation-title">
                <span class="text"> A. Thông tin chung: </span>
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
                  Giới tính <span class="required">(<i>*</i>)</span>
                </div>
                <base-dropdown
                  :tabindex="4"
                  :select="genders.select"
                  :options="genders.data"
                  :optionDefault="genders.data[0]"
                ></base-dropdown>
              </div>
              <base-input
                :label="`Số CMTND/ Căn cước`"
                :id="`txtIdentityNumber`"
                :value="formData.txtIdentityNumber"
                required
              ></base-input>
              <base-input
                :type="`date`"
                :label="`Ngày cấp`"
                :id="`txtIdentityDate`"
                :value="formData.txtIdentityDate"
              ></base-input>
              <base-input
                class="custom-input"
                :label="`Nơi cấp`"
                :id="`txtIdentityPlace`"
                :value="formData.txtIdentityPlace"
              ></base-input>
              <base-input
                :label="`Email`"
                :id="`txtEmail`"
                :value="formData.Email"
                required
              ></base-input>
              <base-input
                :label="`Số điện thoại`"
                :id="`txtPhoneNumber`"
                :value="formData.PhoneNumber"
                required
              ></base-input>
              <div class="infomation-title">
                <span class="text"> B. Thông tin công việc: </span>
              </div>
              <div class="input">
                <div class="label">
                  Chọn vị trí
                </div>
                <BaseDropdown
                  v-if="positions.data"
                  :tabindex="12"
                  :select="positions.select"
                  :options="positions.data"
                  :optionDefault="positions.data[0]"
                ></BaseDropdown>
              </div>
              <div class="input">
                <div class="label">
                  Chọn phòng ban
                </div>
                <BaseDropdown
                  v-if="departments.data"
                  :tabindex="13"
                  :select="departments.select"
                  :options="departments.data"
                  :optionDefault="departments.data[0]"
                ></BaseDropdown>
              </div>
              <base-input
                :label="`Mã số thuế cá nhân`"
                :id="`txtTaxCode`"
                :value="formData.TaxCode"
              ></base-input>
              <base-input
                :label="`Mức lương cơ bản`"
                :id="`txtSalary`"
                :value="'123'"
              ></base-input>

              <base-input
                required
                :type="`date`"
                :label="`Ngày gia nhập công ty`"
                :id="`txtJoinDate`"
                :value="formData.JoinDate"
              ></base-input>
              <div class="input">
                <div class="label">
                  Chọn phòng ban
                </div>
                <BaseDropdown
                  v-if="workStatus.data"
                  :tabindex="13"
                  :select="workStatus.select"
                  :options="workStatus.data"
                  :optionDefault="workStatus.data[0]"
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
        >
        </basebutton>
        <basebutton
          :id="`btn-save`"
          :text="'Lưu'"
          :iconLeft="true"
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
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    BaseInput,
    Basebutton,
    BaseDropdown
  },
  data() {
    return {
      genders: {
        data: [
          {
            GenderName: "Nam",
            Gender: "0"
          },
          {
            GenderName: "Nữ",
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
            WorkStatus: "0"
          },
          {
            WorkStatusName: "Đã nghỉ việc",
            WorkStatus: "1"
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
  mounted() {
    /**
     * Gọi api lấy tất cả vị trí
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
  }
};
</script>
<style scoped>
@import url("../../assets/css/base/FormDetail.css");
</style>