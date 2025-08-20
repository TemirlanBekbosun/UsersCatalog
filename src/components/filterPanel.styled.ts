import styled from "styled-components";
import { ResetButton, CountryButton } from "../styles/buttons.styles";
import {
  InputContainer,
  InputIcon,
  StyledInput,
  Label,
  InputError,
  InputGroup,
} from "../styles/inputs.styles";
import { UI_CONSTANTS } from "../constants";

export const PanelContainer = styled.div`
  background: white;
  border-radius: ${UI_CONSTANTS.BORDER_RADIUS.LARGE};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: ${UI_CONSTANTS.FONT_SIZES.XLARGE};
  font-weight: 600;
  color: ${UI_CONSTANTS.COLORS.DARK};
`;

export const ResetButtonStyled = styled(ResetButton)`
  padding: 8px 16px;
  font-size: ${UI_CONSTANTS.FONT_SIZES.SMALL};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

export {
  InputContainer,
  InputIcon,
  StyledInput,
  Label,
  InputError,
  InputGroup,
};

export const CountriesContainer = styled.div`
  grid-column: 1 / -1;
`;

export const CountriesButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const CountryButtonStyled = styled(CountryButton)`
`;
