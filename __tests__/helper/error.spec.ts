import { createError } from "../../lib/helpers/error";
import { AxiosRequestConfig, AxiosResponse } from "../../lib";

describe("helper:error", () => {
  it("should create Error with message, config, code, request, response and isAxiosError", () => {
    const request = new XMLHttpRequest();
    const config: AxiosRequestConfig = { method: "get" };
    const response: AxiosResponse = {
      status: 200,
      statusText: "OK",
      data: { a: 1 },
      headers: { "Content-Type": "plain/text;charset=utf8" },
      config,
      request,
    };
    const options = {
      request,
      config,
      response,
      message: "Boom!",
      code: "SOMETHING",
    };
    const error = createError(options);
    expect(error.message).toBe(options.message);
    expect(error.isAxiosError).toBeTruthy();
    expect(error.config).toBe(config);
    expect(error.request).toBe(request);
    expect(error.response).toBe(response);
    expect(error.code).toBe(options.code);
  });
});
