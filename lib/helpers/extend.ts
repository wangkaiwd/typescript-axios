// todo: How to specify types for extend function elegant?
export function extend<T extends object, U extends object>(
  to: T,
  from: U
): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}
