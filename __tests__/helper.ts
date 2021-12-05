// eslint-disable-next-line no-undef
export const getAjaxRequest: () => Promise<JasmineAjaxRequest> = () => new Promise((resolve) => {
  setTimeout(() => resolve(jasmine.Ajax.requests.mostRecent()), 0);
});