import { Key } from "react";

export type Value = String | Number | Object;

export interface Option<T extends Key, K extends Value> {
  readonly key: T;
  readonly value: K;
}
