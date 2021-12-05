import axios from "../lib";
import { getAjaxRequest } from "./helper";

describe("requests", () => {
  beforeEach(() => {
    jasmine.Ajax.install();
  });
  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  test("should treat single string arg as url", () => {
    const url = "/foo";
    axios(url);

    return getAjaxRequest().then((request) => {
      expect(request.url).toBe(url);
      expect(request.method).toBe("get");
    });
  });
});