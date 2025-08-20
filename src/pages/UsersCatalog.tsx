import React, { useState, useCallback, useEffect } from "react";
import { Filters, User } from "../types";
import { INITIAL_FILTERS, PAGINATION_CONSTANTS } from "../constants";
import { mockGraphQLClient } from "../services/mockClient";
import FiltersPanel from "../components/FiltersPanel";
import UsersTable from "../components//UsersTable";
import * as S from "./UsersCatalog.styles";

const UsersCatalog: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentOffset, setCurrentOffset] = useState<number>(0);

  const loadUsers = useCallback(
    async (searchFilters: Filters, reset: boolean = false) => {
      if (loading) return;

      setLoading(true);
      setError(null);

      const offset = reset ? 0 : currentOffset;

      try {
        const result = await mockGraphQLClient.query(
          searchFilters,
          offset,
          PAGINATION_CONSTANTS.DEFAULT_LIMIT
        );

        if (reset) {
          setUsers(result.users);
          setCurrentOffset(result.users.length);
        } else {
          setUsers((prevUsers) => [...prevUsers, ...result.users]);
          setCurrentOffset(offset + result.users.length);
        }

        setHasMore(result.hasMore);
      } catch (err) {
        setError("Произошла ошибка при загрузке данных");
        console.error("Load users error:", err);
      } finally {
        setLoading(false);
      }
    },
    [loading, currentOffset]
  );

  useEffect(() => {
    loadUsers(INITIAL_FILTERS, true);
  }, []);

  const handleFiltersChange = useCallback(
    (newFilters: Filters) => {
      setFilters(newFilters);
      setCurrentOffset(0);
      loadUsers(newFilters, true);
    },
    [loadUsers]
  );

  const handleReset = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setCurrentOffset(0);
    loadUsers(INITIAL_FILTERS, true);
  }, [loadUsers]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      loadUsers(filters, false);
    }
  }, [filters, hasMore, loading, loadUsers]);

  return (
    <S.PageContainer>
      <S.ContentWrapper>
        <S.Header>
          <S.Title>Каталог пользователей</S.Title>
        </S.Header>

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
          hasMore={hasMore}
        />

        <S.FooterText>Показано пользователей: {users.length}</S.FooterText>
      </S.ContentWrapper>
    </S.PageContainer>
  );
};

export default UsersCatalog;
