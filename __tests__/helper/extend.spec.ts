import { extend } from "../../lib/helpers/extend";

describe("helper:extend", () => {
  describe("extend", () => {
    it("should get a object which will get property from all arguments", () => {
      const a = { x: 1, y: 2 };
      const b = { f: 3 };
      expect(extend(a, b)).toEqual({ x: 1, y: 2, f: 3 });
    });
    it("should next argument property will overwrite previous argument property", () => {
      const a = { x: 1, y: 2 };
      const b = { x: 4, f: 3 };
      expect(extend(a, b)).toEqual({ x: 4, y: 2, f: 3 });
    });
  });
});
