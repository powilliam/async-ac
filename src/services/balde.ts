import { PagingSourceResult, PagingSourceState } from "../@types/paging-source";
import { MEMBERS, PAGINATED_MEMBERS } from "../constants/balde";

import { wait } from "../utils/promise";

export function getMembers() {
  return wait(MEMBERS, 2000);
}

export async function getPaginatedMembers(
  previousState: PagingSourceState<number>
): Promise<PagingSourceResult<number, string[]>> {
  const page = previousState.nextKey ?? 1;
  const response = await wait(PAGINATED_MEMBERS[page], 2000);
  return {
    data: response.members,
    state: {
      nextKey: response.pagination.nextPage,
      previousKey: response.pagination.previousPage,
      hasReachedTheEnd: !response.pagination.nextPage,
    },
  };
}
