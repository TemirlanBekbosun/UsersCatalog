import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Filters, User } from "../types";
import FiltersPanel from "../components/FiltersPanel";
import UsersTable from "../components/UsersTable";

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
  return users;
};

const mockGraphQLClient = {
  query: async (
    filters: Filters,
    offset: number = 0,
    limit: number = 20
  ): Promise<{ users: User[]; hasMore: boolean }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const users = generateMockUsers(offset, limit, filters);
    const hasMore = users.length === limit;
    return { users, hasMore };
  },
};

const UsersCatalog: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<Filters>({
    name: "",
    email: "",
    country: [],
    registeredFrom: "",
    registeredTo: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);

  const loadUsers = useCallback(
    async (newFilters?: Filters, reset = false) => {
      if (loading) return;
      setLoading(true);
      setError(null);
      const currentFilters = newFilters || filters;
      const currentOffset = reset ? 0 : offset;
      try {
        const result = await mockGraphQLClient.query(
          currentFilters,
          currentOffset
        );
        if (reset) {
          setUsers(result.users);
        } else {
          setUsers((prev) => [...prev, ...result.users]);
        }
        setOffset(currentOffset + result.users.length);
        setHasMore(result.hasMore);
      } catch (err) {
        setError("Произошла ошибка при загрузке данных");
      } finally {
        setLoading(false);
      }
    },
    [filters, offset, loading]
  );

  useEffect(() => {
    loadUsers(filters, true);
  }, []);

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    loadUsers(newFilters, true);
  };

  const handleReset = () => {
    const resetFilters: Filters = {
      name: "",
      email: "",
      country: [],
      registeredFrom: "",
      registeredTo: "",
    };
    setFilters(resetFilters);
    loadUsers(resetFilters, true);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadUsers();
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>
          <Title>Каталог пользователей</Title>
        </Header>

        <FiltersPanel
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onReset={handleReset}
        />

        <UsersTable
          users={users}
          loading={loading}
          error={error}
          onLoadMore={handleLoadMore}
        />

        <FooterText>
          Показано пользователей: {users.length}
          {hasMore && !loading && " (прокрутите для загрузки еще)"}
        </FooterText>
      </ContentWrapper>
    </PageContainer>
  );
};

export default UsersCatalog;

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem 0;
`;

const ContentWrapper = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
`;

const FooterText = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
`;
