import cookie from "../../lib/helpers/cookie";

describe("helper:cookie", () => {
  it("should read cookie value by name", () => {
    document.cookie = "foo=baz";
    expect(cookie.read("foo")).toBe("baz");
  });
  it("should return null if cookie name is not exist", () => {
    document.cookie = "foo=baz";
    expect(cookie.read("foo1")).toBeNull();
  });
});
