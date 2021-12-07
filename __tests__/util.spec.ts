import {
  isFormData,
  isObject,
  isPlainObject,
  isUndefined,
} from "../lib/helpers/utils";

describe("isPlainObject", () => {
  it("can check plain object", () => {
    expect(isPlainObject({ a: 1, b: 2 })).toBeTruthy();
    expect(isPlainObject(Array)).toBeFalsy();
  });
  it("can handle primitive value", () => {
    expect(isPlainObject(1)).toBeFalsy();
    expect(isPlainObject("x")).toBeFalsy();
    expect(isPlainObject(null)).toBeFalsy();
    expect(isPlainObject(undefined)).toBeFalsy();
    expect(isPlainObject(NaN)).toBeFalsy();
  });
});

describe("isObject", () => {
  it("can check object", () => {
    expect(isObject({ a: 1, b: 2 })).toBeTruthy();
    expect(isObject([])).toBeTruthy();
    expect(isObject(1)).toBeFalsy();
    expect(isObject("1")).toBeFalsy();
    expect(isObject(undefined)).toBeFalsy();
  });
  it("null is not a object", () => {
    expect(isObject(null)).toBeFalsy();
  });
});

describe("isUndefined", () => {
  it("can check undefined", () => {
    expect(isUndefined("")).toBeFalsy();
    expect(isUndefined(1)).toBeFalsy();
    expect(isUndefined(false)).toBeFalsy();
    expect(isUndefined(null)).toBeFalsy();
    expect(isUndefined(undefined)).toBeTruthy();
    expect(isUndefined([])).toBeFalsy();
    expect(isUndefined(() => {})).toBeFalsy();
    expect(isUndefined({ a: 1 })).toBeFalsy();
  });
});

describe("isFormData", () => {
  it("can check formData", () => {
    expect(isFormData("a")).toBeFalsy();
    expect(isFormData(null)).toBeFalsy();
    const formData = new FormData();
    formData.append("name", "formData");
    expect(isFormData(formData)).toBeTruthy();
  });
});
