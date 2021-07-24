class Employee extends Base {
  constructor(tableId) {
    super(name);
    console.log("Khởi tạo đối tượng");
    this.EmployeeCode = code;
    this.FullName = name;
  }
  static address = null;
  static GetCompany() {
    return this.FullName;
  }
  getName() {
    return 3;
  }
}
