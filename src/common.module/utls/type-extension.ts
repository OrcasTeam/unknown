/***
 *  知否为空
 * @param value
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/***
 *是否为字符串
 * @param value
 */
export function isString(value: unknown): value is string {
  return !isNil(value) && typeof value === "string";
}

/**
 * 是否为数组
 * @param value
 */
export function isArray<T = unknown>(value: unknown): value is Array<T> {
  return !isNil(value) && typeof value === "object" && value instanceof Array;
}

/**
 * 是否为Object
 * @param value
 */
export function isObject(value: unknown): value is Object {
  return !isNil(value) && typeof value === "object" && !isArray(value);
}

/**
 * 判断类型是否为boolean
 * @param value
 */
export function isBoolean(value: unknown): value is Boolean {
  return !isNil(value) && typeof value === "boolean";
}

/**
 * 判断类型是否为boolean
 * @param value
 */
export function isNumber(value: unknown): value is Number {
  return !isNil(value) && typeof value === "number";
}
