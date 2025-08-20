import styled, { keyframes } from "styled-components";

export const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const BaseContainer = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid #e5e7eb;
`;

export const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const IconWrapper = styled.div<{ size?: string }>`
  & > svg {
    width: ${({ size }) => size || "1rem"};
    height: ${({ size }) => size || "1rem"};
  }
`;
