export type Value = String | Number | Object;

export interface Option<T extends Value> {
  readonly key: symbol | string | number;
  readonly value: T;
}
