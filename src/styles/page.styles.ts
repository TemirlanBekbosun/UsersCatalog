import styled from "styled-components";
import { UI_CONSTANTS } from "../constants";

export const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 32px;
  color: white;
`;

export const Title = styled.h1`
  font-size: ${UI_CONSTANTS.FONT_SIZES.TITLE};
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: ${UI_CONSTANTS.FONT_SIZES.XLARGE};
  }
`;

export const FooterText = styled.div`
  text-align: center;
  margin-top: 24px;
  padding: 16px;
  background: white;
  border-radius: ${UI_CONSTANTS.BORDER_RADIUS.MEDIUM};
  color: ${UI_CONSTANTS.COLORS.SECONDARY};
  font-size: ${UI_CONSTANTS.FONT_SIZES.MEDIUM};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
