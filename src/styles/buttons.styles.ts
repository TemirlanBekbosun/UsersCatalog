import styled from "styled-components";
import { UI_CONSTANTS } from "../constants";

export const BaseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: ${UI_CONSTANTS.BORDER_RADIUS.MEDIUM};
  font-size: ${UI_CONSTANTS.FONT_SIZES.MEDIUM};
  font-weight: 500;
  cursor: pointer;
  transition: all ${UI_CONSTANTS.ANIMATION_DURATION}ms ease;
  text-decoration: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid ${UI_CONSTANTS.COLORS.PRIMARY};
    outline-offset: 2px;
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background-color: ${UI_CONSTANTS.COLORS.PRIMARY};
  color: white;

  &:hover:not(:disabled) {
    background-color: #0056b3;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background-color: ${UI_CONSTANTS.COLORS.SECONDARY};
  color: white;

  &:hover:not(:disabled) {
    background-color: #545b62;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const ResetButton = styled(BaseButton)`
  background-color: ${UI_CONSTANTS.COLORS.DANGER};
  color: white;

  &:hover:not(:disabled) {
    background-color: #c82333;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const CountryButton = styled(BaseButton)<{ $isActive: boolean }>`
  background-color: ${(props) =>
    props.$isActive ? UI_CONSTANTS.COLORS.PRIMARY : UI_CONSTANTS.COLORS.LIGHT};
  color: ${(props) => (props.$isActive ? "white" : UI_CONSTANTS.COLORS.DARK)};
  border: 1px solid
    ${(props) =>
      props.$isActive
        ? UI_CONSTANTS.COLORS.PRIMARY
        : UI_CONSTANTS.COLORS.SECONDARY};
  padding: 6px 12px;
  font-size: ${UI_CONSTANTS.FONT_SIZES.SMALL};

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.$isActive ? "#0056b3" : UI_CONSTANTS.COLORS.SECONDARY};
    color: white;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;
