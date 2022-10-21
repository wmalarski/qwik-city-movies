// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type inferPromise<T> = T extends (...args: any) => Promise<infer A>
  ? A
  : never;
