class AjaxResult {
  constructor(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
  };
  static success(data) {
    return JSON.stringify(this.success("操作成功！", data));
  };
  static success(message, data) {
    return JSON.stringify(new AjaxResult(200, message, data));
  };
  static error(message = "操作失败！") {
    return JSON.stringify(new AjaxResult(404, message, null));
  }
}

module.exports = AjaxResult;