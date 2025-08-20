import styled from "styled-components";
import { UI_CONSTANTS } from "../constants";

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 12px;
  color: ${UI_CONSTANTS.COLORS.SECONDARY};
  display: flex;
  align-items: center;
  pointer-events: none;
  z-index: 1;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid ${UI_CONSTANTS.COLORS.SECONDARY};
  border-radius: ${UI_CONSTANTS.BORDER_RADIUS.MEDIUM};
  font-size: ${UI_CONSTANTS.FONT_SIZES.MEDIUM};
  transition: all ${UI_CONSTANTS.ANIMATION_DURATION}ms ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${UI_CONSTANTS.COLORS.PRIMARY};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &:hover:not(:focus) {
    border-color: #999;
  }

  &::placeholder {
    color: ${UI_CONSTANTS.COLORS.SECONDARY};
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: ${UI_CONSTANTS.FONT_SIZES.MEDIUM};
  font-weight: 500;
  color: ${UI_CONSTANTS.COLORS.DARK};

  &.required::after {
    content: " *";
    color: ${UI_CONSTANTS.COLORS.DANGER};
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputError = styled.div`
  color: ${UI_CONSTANTS.COLORS.DANGER};
  font-size: ${UI_CONSTANTS.FONT_SIZES.SMALL};
  margin-top: 4px;
  min-height: 16px;
`;

export const InputSuccess = styled.div`
  color: ${UI_CONSTANTS.COLORS.SUCCESS};
  font-size: ${UI_CONSTANTS.FONT_SIZES.SMALL};
  margin-top: 4px;
  min-height: 16px;
`;
