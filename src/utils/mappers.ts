import { Option } from "../@types/option";

export function onMapNamesToOptions(names: string[]): Option<string>[] {
  return names.map((it) => ({ key: it, value: it }));
}
