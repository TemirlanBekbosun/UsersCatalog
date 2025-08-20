import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Loader, AlertCircle } from "lucide-react";
import { User } from "../types";

interface UsersTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onLoadMore: () => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  loading,
  error,
  onLoadMore,
}) => {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!tableRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
      const isNearBottom = scrollHeight - scrollTop <= clientHeight * 1.1;

      if (isNearBottom && !loading && users.length > 0) {
        onLoadMore();
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener("scroll", handleScroll);
      return () => tableElement.removeEventListener("scroll", handleScroll);
    }
  }, [loading, users.length, onLoadMore]);

  if (error) {
    return (
      <ErrorContainer>
        <ErrorIcon />
        <ErrorTitle>Ошибка загрузки</ErrorTitle>
        <ErrorMessage>{error}</ErrorMessage>
      </ErrorContainer>
    );
  }

  return (
    <TableWrapper>
      <TableScrollContainer ref={tableRef}>
        <StyledTable>
          <TableHeader>
            <tr>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Имя</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Страна</TableHeaderCell>
              <TableHeaderCell>Дата регистрации</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>
                  {new Date(user.registeredAt).toLocaleDateString("ru-RU")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>

        {users.length === 0 && !loading && (
          <CenteredMessageContainer>
            <InfoMessage>Пользователи не найдены</InfoMessage>
          </CenteredMessageContainer>
        )}

        {loading && (
          <LoadingContainer>
            <LoadingSpinner />
            <LoadingText>Загрузка...</LoadingText>
          </LoadingContainer>
        )}
      </TableScrollContainer>
    </TableWrapper>
  );
};

export default UsersTable;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ErrorContainer = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
`;

const ErrorIcon = styled(AlertCircle)`
  width: 3rem;
  height: 3rem;
  color: #ef4444;
  margin: 0 auto 1rem;
`;

const ErrorTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #991b1b;
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.p`
  color: #dc2626;
`;

const TableWrapper = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid #e5e7eb;
  overflow: hidden;
`;

const TableScrollContainer = styled.div`
  overflow: auto;
  max-height: 600px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f9fafb;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const TableHeaderCell = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
`;

const TableBody = styled.tbody`
  background-color: #fff;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  white-space: nowrap;
  font-size: 0.875rem;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;

  &:nth-child(2) {
    font-weight: 500;
  }
`;

const CenteredMessageContainer = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

const InfoMessage = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 1.5rem 0;
`;

const LoadingSpinner = styled(Loader)`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 auto;
  color: #3b82f6;
  animation: ${spinAnimation} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 0.5rem;
  color: #6b7280;
`;
