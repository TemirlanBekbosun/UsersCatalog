import React, { useEffect, useRef } from "react";
import { User } from "../types";
import { PAGINATION_CONSTANTS } from "../constants";
import { formatDate } from "../utils/formatters";
import * as S from "./UsersTable.styled";

interface UsersTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onLoadMore: () => void;
  hasMore: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  loading,
  error,
  onLoadMore,
  hasMore,
}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const loadingMore = loading && users.length > 0;

  useEffect(() => {
    const handleScroll = () => {
      if (!tableRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
      const isNearBottom =
        scrollHeight - scrollTop <=
        clientHeight * PAGINATION_CONSTANTS.SCROLL_THRESHOLD;

      if (isNearBottom && !loading && hasMore) {
        onLoadMore();
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener("scroll", handleScroll);
      return () => tableElement.removeEventListener("scroll", handleScroll);
    }
  }, [loading, hasMore, onLoadMore]);

  if (error) {
    return (
      <S.ErrorContainer>
        <S.ErrorIcon />
        <h3>Ошибка загрузки</h3>
        <p>{error}</p>
      </S.ErrorContainer>
    );
  }

  return (
    <S.TableWrapper>
      <S.TableScrollContainer ref={tableRef}>
        <S.StyledTable>
          <S.TableHeader>
            <tr>
              <S.TableHeaderCell>ID</S.TableHeaderCell>
              <S.TableHeaderCell>Имя</S.TableHeaderCell>
              <S.TableHeaderCell>Email</S.TableHeaderCell>
              <S.TableHeaderCell>Страна</S.TableHeaderCell>
              <S.TableHeaderCell>Дата регистрации</S.TableHeaderCell>
            </tr>
          </S.TableHeader>
          <S.TableBody>
            {users.map((user) => (
              <S.TableRow key={user.id}>
                <S.TableCell>{user.id}</S.TableCell>
                <S.TableCell>{user.name}</S.TableCell>
                <S.TableCell>{user.email}</S.TableCell>
                <S.TableCell>{user.country}</S.TableCell>
                <S.TableCell>{formatDate(user.registeredAt)}</S.TableCell>
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.StyledTable>

        {users.length === 0 && !loading && (
          <S.CenteredMessageContainer>
            <S.InfoMessage>Пользователи не найдены</S.InfoMessage>
          </S.CenteredMessageContainer>
        )}

        {loadingMore && (
          <S.LoadingContainer>
            <S.LoadingSpinner />
            <S.LoadingText>Загрузка...</S.LoadingText>
          </S.LoadingContainer>
        )}
      </S.TableScrollContainer>
    </S.TableWrapper>
  );
};

export default UsersTable;
