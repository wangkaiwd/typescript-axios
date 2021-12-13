import {
  flattenHeaders,
  parseResponseHeaders,
  processHeaders,
} from "../../lib/helpers/header";

describe("helper:header", () => {
  describe("parseResponseHeaders", () => {
    it("should convert string headers to object", () => {
      const parsedHeaders = parseResponseHeaders(
        "Content-Type: application/json\r\n" +
          "Connection: keep-alive\r\n" +
          "Transfer-Encoding: chunked\r\n" +
          "Date: Tue, 21 May 2019 09:23:44 GMT\r\n" +
          ":aa\r\n" +
          "key:"
      );
      expect(parsedHeaders).toEqual({
        "content-type": "application/json",
        connection: "keep-alive",
        "transfer-encoding": "chunked",
        date: "Tue, 21 May 2019 09:23:44 GMT",
        key: "",
      });
    });
    it("should return empty object if headers is empty string", () => {
      expect(parseResponseHeaders("")).toEqual({});
    });
  });
  describe("processHeaders", () => {
    it("should normalize Content-Type header name", () => {
      const headers = {
        "conTent-Type": "foo/bar",
        "Content-length": 1024,
      };
      processHeaders(headers, {});
      expect(headers).toEqual({
        "Content-Type": "foo/bar",
        "Content-length": 1024,
      });
    });
    it("should set Content-Type if not set and data is plain object", () => {
      const headers = {};
      processHeaders(headers, { a: 1 });
      expect(headers).toEqual({
        "Content-Type": "application/json; charset=utf-8",
      });
    });
  });
  describe("flattenHeaders", () => {
    it("should flatten headers include common headers", () => {
      const headers = {
        common: { "Content-Type": "application/json;charset=utf8", c: 3 },
        get: { a: 1 },
        b: 2,
        c: 4,
      };
      expect(flattenHeaders(headers, "get")).toEqual({
        "Content-Type": "application/json;charset=utf8",
        a: 1,
        b: 2,
        c: 4,
      });
    });
  });
});
