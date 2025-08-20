import { Filters } from "../types";

export const MOCK_COUNTRIES: string[] = [
  "USA",
  "Canada",
  "UK",
  "Germany",
  "France",
  "Japan",
  "Australia",
  "Brazil",
];

export const MOCK_NAMES = [
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

export const MOCK_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "company.com",
];

export const PAGINATION_CONSTANTS = {
  DEFAULT_LIMIT: 20,
  MAX_USERS: 1000,
  SCROLL_THRESHOLD: 1.2,
  LOADING_DELAY: 500,
} as const;

export const INITIAL_FILTERS: Filters = {
  name: "",
  email: "",
  country: [],
  registeredFrom: "",
  registeredTo: "",
};

export * from "./ui";
