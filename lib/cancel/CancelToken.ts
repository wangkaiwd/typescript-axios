import { CancelExecutor } from "../types";

class CancelToken {
  promise: Promise<string>;

  reason?: string;

  constructor(executor: CancelExecutor) {
    let resolvePromise: (reason: string) => void;
    this.promise = new Promise<string>((resolve) => {
      resolvePromise = resolve;
    });
    executor((reason) => {
      this.reason = reason;
      resolvePromise(reason);
    });
  }
}

export default CancelToken;
