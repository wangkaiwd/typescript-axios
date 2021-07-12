// todo: How to specify types for extend function elegant?
export function extend<T extends object, U extends object>(
  to: T,
  from: U
): T & U {
  return { ...from, ...to };
}
