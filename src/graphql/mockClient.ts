import { ApolloClient, InMemoryCache } from "@apollo/client";
import { MockLink } from "@apollo/client/testing";
import { GET_USERS } from "./client";
import { User, Filters } from "../types";

const MOCK_COUNTRIES = [
  "USA",
  "Canada",
  "UK",
  "Germany",
  "France",
  "Japan",
  "Australia",
  "Brazil",
];

const generateMockUsers = (
  offset: number = 0,
  limit: number = 20,
  filters: Filters
): User[] => {
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
    const name =
      names[id % names.length] + ` ${Math.floor(id / names.length) + 1}`;
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
    ) {
      matches = false;
    }

    if (
      filters.email &&
      !user.email.toLowerCase().includes(filters.email.toLowerCase())
    ) {
      matches = false;
    }

    if (filters.country.length > 0 && !filters.country.includes(user.country)) {
      matches = false;
    }

    if (filters.registeredFrom && user.registeredAt < filters.registeredFrom) {
      matches = false;
    }

    if (filters.registeredTo && user.registeredAt > filters.registeredTo) {
      matches = false;
    }

    if (matches) {
      users.push(user);
      count++;
    }

    id++;
  }

  return users;
};

const mocks = [
  {
    request: {
      query: GET_USERS,
    },
    newData: () => {
      const filters: Filters = {
        name: "",
        email: "",
        country: [],
        registeredFrom: "",
        registeredTo: "",
      };
      const users = generateMockUsers(0, 20, filters);

      return {
        data: {
          users,
        },
      };
    },
  },
];

const mockLink = new MockLink(mocks, true);

export const mockApolloClient = new ApolloClient({
  link: mockLink,
  cache: new InMemoryCache(),
});
