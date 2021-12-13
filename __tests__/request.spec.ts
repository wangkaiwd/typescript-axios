import axios, { IAxiosError } from "../lib";
import { getAjaxRequest } from "./helper";

describe("requests", () => {
  beforeEach(() => {
    jasmine.Ajax.install();
  });
  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  it("should treat single string arg as url", () => {
    const url = "/foo";
    axios(url);

    return getAjaxRequest().then((request) => {
      expect(request.url).toBe(url);
      expect(request.method).toBe("GET");
    });
  });
  it("should treat method value as lowercase string", (done) => {
    axios({ url: "/foo", method: "POST" }).then((res) => {
      expect(res.config.method).toBe("post");
      done();
    });
    getAjaxRequest().then((request) => {
      request.respondWith({
        status: 200,
      });
    });
  });
  it("should reject on network errors", (done) => {
    const resolveSpy = jest.fn((res) => res);
    const rejectSpy = jest.fn((error) => error);
    jasmine.Ajax.uninstall();
    const next = (reason: IAxiosError) => {
      expect(resolveSpy).not.toBeCalled();
      expect(rejectSpy).toBeCalled();
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
      // The instanceof operator tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an object
      // reason.__proto__ = AxiosError.prototype
      // AxiosError.prototype.__proto__ = Error.prototype
      expect(reason instanceof Error).toBeTruthy();
      expect(reason.message).toBe("Network Error");
      jasmine.Ajax.install();
      done();
    };
    axios({ url: "/foo" }).then(resolveSpy).catch(rejectSpy).then(next);
  });
});
