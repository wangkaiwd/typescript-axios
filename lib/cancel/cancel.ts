export function cancelToken(): any {
  let cancel;
  const p: any = new Promise((resolve) => {
    cancel = resolve;
  });
  p.cancel = cancel;
  return p;
}
