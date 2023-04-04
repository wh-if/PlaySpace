
/**
 * 0 成功
 * 1 失败
 *  */ 
class AjaxResult {
  constructor(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
  };
  static success(arg_1, arg_2) {
    if (typeof arg_1 === "object") {
      arg_2 = arg_1;
      arg_1 = "成功";
    }
    return new AjaxResult(0, arg_1, arg_2);
  };
  static error(message = "失败") {
    return new AjaxResult(1, message, null);
  }
}

module.exports = AjaxResult;