import styled from "styled-components";
import { UI_CONSTANTS } from "../constants";

export const TableWrapper = styled.div`
  background: white;
  border-radius: ${UI_CONSTANTS.BORDER_RADIUS.LARGE};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const TableScrollContainer = styled.div`
  max-height: 600px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: ${UI_CONSTANTS.COLORS.SECONDARY};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
`;

export const TableHeader = styled.thead`
  background: ${UI_CONSTANTS.COLORS.LIGHT};
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const TableHeaderCell = styled.th`
  padding: 16px;
  text-align: left;
  font-weight: 600;
  font-size: ${UI_CONSTANTS.FONT_SIZES.MEDIUM};
  color: ${UI_CONSTANTS.COLORS.DARK};
  border-bottom: 2px solid ${UI_CONSTANTS.COLORS.SECONDARY};
  white-space: nowrap;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  transition: background-color ${UI_CONSTANTS.ANIMATION_DURATION}ms ease;

  &:hover {
    background-color: #f8f9fa;
  }

  &:nth-child(even) {
    background-color: #fafafa;
  }

  &:nth-child(even):hover {
    background-color: #f0f0f0;
  }
`;

export const TableCell = styled.td`
  padding: 16px;
  border-bottom: 1px solid #e9ecef;
  font-size: ${UI_CONSTANTS.FONT_SIZES.MEDIUM};
  color: ${UI_CONSTANTS.COLORS.DARK};
  vertical-align: middle;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  color: ${UI_CONSTANTS.COLORS.DANGER};
`;

export const ErrorIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${UI_CONSTANTS.COLORS.DANGER};
  border-radius: 50%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "!";
    color: white;
    font-size: 24px;
    font-weight: bold;
  }
`;

export const CenteredMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
`;

export const InfoMessage = styled.div`
  color: ${UI_CONSTANTS.COLORS.SECONDARY};
  font-size: ${UI_CONSTANTS.FONT_SIZES.LARGE};
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: ${UI_CONSTANTS.COLORS.PRIMARY};
`;

export const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid ${UI_CONSTANTS.COLORS.PRIMARY};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 8px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingText = styled.div`
  font-size: ${UI_CONSTANTS.FONT_SIZES.MEDIUM};
  color: ${UI_CONSTANTS.COLORS.SECONDARY};
`;
