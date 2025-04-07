export type TypeValue =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | DateConstructor
  | ArrayConstructor;

export const transformTypeValue = (
  value: any,
  type?: TypeValue,
  itemType?: TypeValue,
): any => {
  if (typeof type === "undefined") {
    return value;
  }

  try {
    switch (type) {
      case String:
        return String(value);
      case Number:
        return Number(value);
      case Boolean:
        return Boolean(value);
      case Date:
        return new Date(value);
      case Array:
        if (Array.isArray(value)) {
          return typeof itemType !== "undefined"
            ? value.map((item: any) => transformTypeValue(item, itemType))
            : value;
        } else if (value !== null && typeof value !== "undefined") {
          return typeof itemType !== "undefined"
            ? [transformTypeValue(value, itemType)]
            : [value];
        } else {
          return [];
        }
      default:
        return value;
    }
  } catch (err) {
    return value;
  }
};
