import { wait } from "../utils/promise";

export function getMembers() {
  return wait(
    ["William", "Juliano", "Matheus", "Igão", "Italo", "Zaza", "Clebinho"],
    2000
  );
}
