import { MEMBERS } from "../constants/balde";

import { wait } from "../utils/promise";

export function getMembers() {
  return wait(MEMBERS, 2000);
}
