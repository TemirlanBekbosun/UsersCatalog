import { Filters, User } from "../types";
import { MOCK_COUNTRIES } from "../constants";

const generateMockUsers = (
  offset: number = 0,
  limit: number = 20,
  filters: Filters
): { users: User[]; nextId: number } => {
  const users: User[] = [];
  const names = [
    "John",
    "Jane",
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
    "Frank",
    "Grace",
    "Henry",
  ];
  const domains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "company.com",
  ];

  let count = 0;
  let id = offset;

  while (count < limit && id < 1000) {
    const name = `${names[id % names.length]} ${
      Math.floor(id / names.length) + 1
    }`;
    const email = `${name.toLowerCase().replace(" ", ".")}@${
      domains[id % domains.length]
    }`;
    const country = MOCK_COUNTRIES[id % MOCK_COUNTRIES.length];
    const registeredAt = new Date(2020 + (id % 4), id % 12, (id % 28) + 1)
      .toISOString()
      .split("T")[0];

    const user = { id: id.toString(), name, email, country, registeredAt };

    let matches = true;
    if (
      filters.name &&
      !user.name.toLowerCase().includes(filters.name.toLowerCase())
    )
      matches = false;
    if (
      filters.email &&
      !user.email.toLowerCase().includes(filters.email.toLowerCase())
    )
      matches = false;
    if (filters.country.length > 0 && !filters.country.includes(user.country))
      matches = false;
    if (filters.registeredFrom && user.registeredAt < filters.registeredFrom)
      matches = false;
    if (filters.registeredTo && user.registeredAt > filters.registeredTo)
      matches = false;

    if (matches) {
      users.push(user);
      count++;
    }
    id++;
  }
  return { users, nextId: id };
};

export const mockGraphQLClient = {
  query: async (
    filters: Filters,
    offset: number = 0,
    limit: number = 20
  ): Promise<{ users: User[]; hasMore: boolean; nextOffset: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const { users, nextId } = generateMockUsers(offset, limit, filters);

    const hasMore = users.length === limit && nextId < 1000;
    return { users, hasMore, nextOffset: nextId };
  },
};
