import { Canceler, CancelExecutor, CancelInstance } from "../types";
import Cancel from "./cancel";

class CancelToken {
  promise: Promise<CancelInstance>;

  reason?: CancelInstance;

  constructor(executor: CancelExecutor) {
    let resolvePromise: (reason: CancelInstance) => void;
    this.promise = new Promise<CancelInstance>((resolve) => {
      resolvePromise = resolve;
    });
    executor((reason) => {
      this.reason = new Cancel(reason);
      resolvePromise(this.reason);
    });
  }

  static source() {
    let cancel: Canceler = () => {};
    const token = new CancelToken((c) => {
      cancel = c;
    });
    return {
      token,
      cancel,
    };
  }
}

export default CancelToken;
