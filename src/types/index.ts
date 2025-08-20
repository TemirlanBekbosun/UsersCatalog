export interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  registeredAt: string;
}

export interface Filters {
  name: string;
  email: string;
  country: string[];
  registeredFrom: string;
  registeredTo: string;
}

export interface UsersResponse {
  users: User[];
}

export interface UsersVariables {
  name?: string;
  email?: string;
  country?: string[];
  registeredFrom?: string;
  registeredTo?: string;
  offset?: number;
  limit?: number;
}
export interface PaginatedResponse {
  users: User[];
  hasMore: boolean;
  totalCount: number;
}
