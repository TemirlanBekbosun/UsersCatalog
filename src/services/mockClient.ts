import { Filters, PaginatedResponse } from "../types";
import { generateMockUser, filterUser } from "../utils/mockDataGenerator";
import { PAGINATION_CONSTANTS } from "../constants";

let cachedUsers: any[] = [];
let isInitialized = false;

const initializeUsers = () => {
  if (isInitialized) return;

  cachedUsers = [];
  for (let i = 0; i < PAGINATION_CONSTANTS.MAX_USERS; i++) {
    cachedUsers.push(generateMockUser(i));
  }
  isInitialized = true;
};

export const mockGraphQLClient = {
  query: async (
    filters: Filters,
    offset: number = 0,
    limit: number = PAGINATION_CONSTANTS.DEFAULT_LIMIT
  ): Promise<PaginatedResponse> => {
    await new Promise((resolve) =>
      setTimeout(resolve, PAGINATION_CONSTANTS.LOADING_DELAY)
    );

    initializeUsers();

    const filteredUsers = cachedUsers.filter((user) =>
      filterUser(user, filters)
    );

    const paginatedUsers = filteredUsers.slice(offset, offset + limit);

    const hasMore = offset + limit < filteredUsers.length;

    return {
      users: paginatedUsers,
      hasMore,
      totalCount: filteredUsers.length,
    };
  },
};
