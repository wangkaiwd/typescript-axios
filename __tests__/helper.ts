// eslint-disable-next-line no-undef
export const getAjaxRequest: () => Promise<JasmineAjaxRequest> = () =>
  new Promise((resolve) => {
    // why need a setTimeout function?
    setTimeout(() => resolve(jasmine.Ajax.requests.mostRecent()), 0);
  });
