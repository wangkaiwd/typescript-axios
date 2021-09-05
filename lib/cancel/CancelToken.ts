import { Canceler, CancelExecutor, CancelInstance } from "../types";
import Cancel from "./Cancel";

class CancelToken {
  promise: Promise<CancelInstance>;

  reason?: CancelInstance;

  constructor(executor: CancelExecutor) {
    let resolvePromise: (reason: CancelInstance) => void;
    this.promise = new Promise<CancelInstance>((resolve) => {
      resolvePromise = resolve;
    });
    executor((reason) => {
      // create Cancel instance and check it whether or not an Cancel instance
      // add a property to distinguish may be more simple to understand
      this.reason = new Cancel(reason);
      resolvePromise(this.reason);
    });
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason;
    }
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
