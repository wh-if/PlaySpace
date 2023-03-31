class AjaxResult {
  constructor(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
  };
  static success(arg_1, arg_2) {
    if (typeof arg_1 === "object") {
      arg_2 = arg_1;
      arg_1 = "操作成功！";
    }
    return JSON.stringify(new AjaxResult(200, arg_1, arg_2));
  };
  static error(message = "操作失败！") {
    return JSON.stringify(new AjaxResult(404, message, null));
  }
}

module.exports = AjaxResult;