import {
  deepMerge,
  isFormData,
  isObject,
  isPlainObject,
  isUndefined,
} from "../../lib/helpers/utils";

describe("helpers:utils", () => {
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
  describe("deepMerge", () => {
    it("should merge property", () => {
      const a = { foo: 123 };
      const b = { bar: 456 };
      const c = { foo: 789 };
      const d = deepMerge(a, b, c);
      expect(d).toEqual({ foo: 789, bar: 456 });
    });
    it("should merge recursively", () => {
      const a = { foo: { bar: 123 } };
      const b = { foo: { baz: 456 }, bar: { qux: 789 } };
      const c = deepMerge(a, b);
      expect(c).toEqual({ foo: { bar: 123, baz: 456 }, bar: { qux: 789 } });
    });

    it("should remove all reference from nested object", () => {
      const a = { foo: { bar: 123 } };
      const b = { foo: { bar: 123 }, qux: 789 };
      const c = deepMerge(a, b);
      expect(c).toEqual({ foo: { bar: 123 }, qux: 789 });
      expect(a.foo).not.toBe(c.foo);
      expect(b.foo).not.toBe(c.foo);
    });
  });
});
