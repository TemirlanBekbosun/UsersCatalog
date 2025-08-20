import { User, Filters } from "../types";
import { MOCK_COUNTRIES, MOCK_NAMES, MOCK_DOMAINS } from "../constants";

export const generateMockUser = (id: number): User => {
  const name = `${MOCK_NAMES[id % MOCK_NAMES.length]} ${
    Math.floor(id / MOCK_NAMES.length) + 1
  }`;
  const email = `${name.toLowerCase().replace(" ", ".")}@${
    MOCK_DOMAINS[id % MOCK_DOMAINS.length]
  }`;
  const country = MOCK_COUNTRIES[id % MOCK_COUNTRIES.length];
  const registeredAt = new Date(2020 + (id % 4), id % 12, (id % 28) + 1)
    .toISOString()
    .split("T")[0];

  return { id: id.toString(), name, email, country, registeredAt };
};

export const filterUser = (user: User, filters: Filters): boolean => {
  if (filters.name && filters.name.trim() !== "") {
    if (!user.name.toLowerCase().includes(filters.name.toLowerCase().trim())) {
      return false;
    }
  }

  if (filters.email && filters.email.trim() !== "") {
    if (
      !user.email.toLowerCase().includes(filters.email.toLowerCase().trim())
    ) {
      return false;
    }
  }

  if (filters.country && filters.country.length > 0) {
    if (!filters.country.includes(user.country)) {
      return false;
    }
  }

  if (filters.registeredFrom && filters.registeredFrom.trim() !== "") {
    if (user.registeredAt < filters.registeredFrom) {
      return false;
    }
  }

  if (filters.registeredTo && filters.registeredTo.trim() !== "") {
    if (user.registeredAt > filters.registeredTo) {
      return false;
    }
  }

  return true;
};
