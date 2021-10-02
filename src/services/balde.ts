import { PagingSourceResult, PagingSourceState } from "../@types/service";
import { MEMBERS, PAGINATED_MEMBERS } from "../constants/balde";

import { wait } from "../utils/promise";

export function getMembers() {
  return wait(MEMBERS, 2000);
}

export async function getPaginatedMembers(
  previousState: PagingSourceState<number>
): Promise<PagingSourceResult<number, string[]>> {
  const page = previousState.nextKey ?? 1;
  const data = await wait(PAGINATED_MEMBERS[page], 2000);
  return {
    data,
    state: { nextKey: !!data ? page + 1 : undefined, previousKey: page },
  };
}
