function workStatus(status) {
  if (status)
    switch (status) {
      case 0:
        return "Đang làm việc";
        break;
      case 1:
        return "Chưa làm việc";
        break;
      case 2:
        return "Đang thử việc";
        break;
      case 3:
        return "Sắp làm việc";
        break;
      case 4:
        return "Sẽ làm việc";
        break;
      case 5:
        return "Nhân viên chính thức";
        break;
      case 6:
        return "Fresher Dev";
        break;
      case 7:
        return "Intern Dev";
        break;
      case 8:
        return "Junior Dev";
        break;
      case 9:
        return "Senior Dev";
        break;

      case 10:
        return "Đã nghỉ việc";
        break;
    }
}
