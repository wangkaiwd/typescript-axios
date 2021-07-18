import { RejectedFn, ResolvedFn } from "../types";

interface Interceptor<T> {
  resolvedFn: ResolvedFn<T>;
  rejectedFn?: RejectedFn;
}

// encapsulate request and response interceptor in one class
// generic type parameter is AxiosRequestConfig or AxiosResponse
export default class AxiosInterceptorManager<T> {
  interceptors: (Interceptor<T> | null)[]; // array populate null to ovid array collapse

  constructor() {
    this.interceptors = [];
  }

  use(resolvedFn: ResolvedFn<T>, rejectedFn?: RejectedFn): number {
    this.interceptors.push({
      resolvedFn,
      rejectedFn,
    });
    return this.interceptors.length - 1;
  }

  forEach(
    fn: (
      interceptor: Interceptor<T>,
      i: number,
      array: Interceptor<T>[]
    ) => void
  ) {
    for (let i = 0; i < this.interceptors.length; i++) {
      const interceptor = this.interceptors[i];
      if (interceptor) {
        fn(interceptor, i, this.interceptors as Interceptor<T>[]);
      }
    }
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
}
