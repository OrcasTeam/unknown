export default class TypeExtensions {
  /***
   *  知否为空
   * @param value
   */
  static isNil(value: unknown): value is null | undefined {
    return value === null || value === undefined;
  }

  /***
   *是否为字符串
   * @param value
   */
  static isString(value: unknown): value is string {
    return !TypeExtensions.isNil(value) && typeof value === "string";
  }

  /**
   * 是否为数组
   * @param value
   */
  static isArray<T = unknown>(value: unknown): value is Array<T> {
    return !TypeExtensions.isNil(value) && typeof value === "object" && value instanceof Array;
  }

  /**
   * 是否为Object
   * @param value
   */
  static isObject(value: unknown): value is Object {
    return !TypeExtensions.isNil(value) && typeof value === "object" && !TypeExtensions.isArray(value);
  }

  /**
   * 判断类型是否为boolean
   * @param value
   */
  static isBoolean(value: unknown): value is Boolean {
    return !TypeExtensions.isNil(value) && typeof value === "boolean";
  }

  /**
   * 判断类型是否为boolean
   * @param value
   */
  static isNumber(value: unknown): value is Number {
    return !TypeExtensions.isNil(value) && typeof value === "number";
  }
}
