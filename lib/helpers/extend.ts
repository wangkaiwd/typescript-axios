export function extend<T, U> (to: T, from: U): T & U {
  // Object.keys(from).forEach((key) => {
  //   ;(to as T & U)[key] = from[key];
  // });
  return to as T & U;
}
