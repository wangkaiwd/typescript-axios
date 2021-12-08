import {
  transformRequest,
  transformResponseData,
} from "../../lib/helpers/data";

describe("helper:data", () => {
  describe("transformRequest", () => {
    it("should stringify plain object", () => {
      const object = { foo: 123 };
      expect(transformRequest(object)).toBe(JSON.stringify(object));
    });
    it("should do nothing if data is not a plain object", () => {
      const a = new URLSearchParams("a=b");
      expect(transformRequest(a)).toBe(a);
    });
  });
  describe("transformResponseData", () => {
    it("should parse JSON string", () => {
      const json = '{"a": 1}';
      expect(transformResponseData(json)).toEqual({ a: 1 });
    });
    it("should do nothing if data is not a JSON string", () => {
      const object = { a: 1 };
      expect(transformResponseData(object)).toBe(object);
    });
  });
});
