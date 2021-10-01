export function wait<T>(value: T, timeout: number = 1000): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), timeout));
}
