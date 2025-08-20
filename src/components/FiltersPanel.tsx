import styled from "styled-components";
import { Search, Calendar, X, Filter } from "lucide-react";
import { Filters } from "../types";

interface FiltersPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onReset: () => void;
}
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

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters,
  onFiltersChange,
  onReset,
}) => {
  const handleInputChange = (
    field: keyof Filters,
    value: string | string[]
  ) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  const handleCountryChange = (country: string) => {
    const newCountries = filters.country.includes(country)
      ? filters.country.filter((c) => c !== country)
      : [...filters.country, country];
    handleInputChange("country", newCountries);
  };

  return (
    <PanelContainer>
      <Header>
        <Title>
          <Filter />
          Фильтры
        </Title>
        <ResetButton onClick={onReset}>
          <X />
          Сбросить
        </ResetButton>
      </Header>

      <Grid>
        <div>
          <Label>Поиск по имени</Label>
          <InputContainer>
            <InputIcon>
              <Search />
            </InputIcon>
            <StyledInput
              type="text"
              value={filters.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("name", e.target.value)
              }
              placeholder="Введите имя"
            />
          </InputContainer>
        </div>

        <div>
          <Label>Поиск по email</Label>
          <InputContainer>
            <InputIcon>
              <Search />
            </InputIcon>
            <StyledInput
              type="text"
              value={filters.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("email", e.target.value)
              }
              placeholder="Введите email"
            />
          </InputContainer>
        </div>

        <div>
          <Label>Дата регистрации от</Label>
          <InputContainer>
            <InputIcon>
              <Calendar />
            </InputIcon>
            <StyledInput
              type="date"
              value={filters.registeredFrom}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("registeredFrom", e.target.value)
              }
            />
          </InputContainer>
        </div>

        <div>
          <Label>Дата регистрации до</Label>
          <InputContainer>
            <InputIcon>
              <Calendar />
            </InputIcon>
            <StyledInput
              type="date"
              value={filters.registeredTo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("registeredTo", e.target.value)
              }
            />
          </InputContainer>
        </div>
      </Grid>

      <CountriesContainer>
        <Label>Страны</Label>
        <CountriesButtonsWrapper>
          {MOCK_COUNTRIES.map((country) => (
            <CountryButton
              key={country}
              onClick={() => handleCountryChange(country)}
              $isActive={filters.country.includes(country)}
            >
              {country}
            </CountryButton>
          ))}
        </CountriesButtonsWrapper>
      </CountriesContainer>
    </PanelContainer>
  );
};

export default FiltersPanel;

const PanelContainer = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;

  & > svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
  }
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background-color: #f3f4f6;
  color: #374151;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 150ms;

  &:hover {
    background-color: #e5e7eb;
  }

  & > svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.25rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;

  & > svg {
    width: 1rem;
    height: 1rem;
  }
`;

const StyledInput = styled.input`
  width: 70%;
  padding: 0.5rem 0.75rem;
  padding-left: 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const CountriesContainer = styled.div`
  margin-top: 1rem;
`;

const CountriesButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CountryButton = styled.button<{ $isActive: boolean }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: background-color 150ms, color 150ms;

  background-color: ${({ $isActive }) => ($isActive ? "#3b82f6" : "#f3f4f6")};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#374151")};

  &:hover {
    background-color: ${({ $isActive }) => !$isActive && "#e5e7eb"};
  }
`;
