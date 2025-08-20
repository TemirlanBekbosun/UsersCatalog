import React, { useCallback, useState, useEffect } from "react";
import { Search, Calendar, X, Filter } from "lucide-react";
import { Filters } from "../types";
import { MOCK_COUNTRIES, UI_CONSTANTS } from "../constants";
import { debounce } from "../utils/debounce";
import { validateFilters } from "../utils/validation";
import * as S from "./filterPanel.styled";

interface FiltersPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onReset: () => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters,
  onFiltersChange,
  onReset,
}) => {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const debouncedFiltersChange = useCallback(
    debounce((newFilters: Filters) => {
      const validation = validateFilters(newFilters);
      if (validation.isValid) {
        setValidationErrors({});
        onFiltersChange(newFilters);
      } else {
        setValidationErrors({
          general: validation.message || "Ошибка валидации",
        });
      }
    }, UI_CONSTANTS.DEBOUNCE_DELAY),
    [onFiltersChange]
  );

  const handleInputChange = (
    field: keyof Filters,
    value: string | string[]
  ) => {
    const newFilters = { ...localFilters, [field]: value };

    setLocalFilters(newFilters);

    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }));
    }

    debouncedFiltersChange(newFilters);
  };

  const handleCountryChange = (country: string) => {
    const newCountries = localFilters.country.includes(country)
      ? localFilters.country.filter((c) => c !== country)
      : [...localFilters.country, country];
    handleInputChange("country", newCountries);
  };

  return (
    <S.PanelContainer>
      <S.Header>
        <S.Title>
          <Filter size={20} /> Фильтры
        </S.Title>
        <S.ResetButtonStyled onClick={onReset}>
          <X size={16} /> Сбросить
        </S.ResetButtonStyled>
      </S.Header>

      {validationErrors.general && (
        <S.InputError style={{ marginBottom: "16px", textAlign: "center" }}>
          {validationErrors.general}
        </S.InputError>
      )}

      <S.Grid>
        <S.InputGroup>
          <S.Label htmlFor="name-filter">Поиск по имени</S.Label>
          <S.InputContainer>
            <S.InputIcon>
              <Search />
            </S.InputIcon>
            <S.StyledInput
              id="name-filter"
              type="text"
              value={localFilters.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Введите имя"
            />
          </S.InputContainer>
          {validationErrors.name && (
            <S.InputError>{validationErrors.name}</S.InputError>
          )}
        </S.InputGroup>

        <S.InputGroup>
          <S.Label htmlFor="email-filter">Поиск по email</S.Label>
          <S.InputContainer>
            <S.InputIcon>
              <Search />
            </S.InputIcon>
            <S.StyledInput
              id="email-filter"
              type="text"
              value={localFilters.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Введите email"
            />
          </S.InputContainer>
          {validationErrors.email && (
            <S.InputError>{validationErrors.email}</S.InputError>
          )}
        </S.InputGroup>

        <S.InputGroup>
          <S.Label htmlFor="date-from">Дата регистрации от</S.Label>
          <S.InputContainer>
            <S.InputIcon>
              <Calendar />
            </S.InputIcon>
            <S.StyledInput
              id="date-from"
              type="date"
              value={localFilters.registeredFrom}
              onChange={(e) =>
                handleInputChange("registeredFrom", e.target.value)
              }
            />
          </S.InputContainer>
        </S.InputGroup>

        <S.InputGroup>
          <S.Label htmlFor="date-to">Дата регистрации до</S.Label>
          <S.InputContainer>
            <S.InputIcon>
              <Calendar />
            </S.InputIcon>
            <S.StyledInput
              id="date-to"
              type="date"
              value={localFilters.registeredTo}
              onChange={(e) =>
                handleInputChange("registeredTo", e.target.value)
              }
            />
          </S.InputContainer>
        </S.InputGroup>

        <S.CountriesContainer>
          <S.Label>Страны</S.Label>
          <S.CountriesButtonsWrapper>
            {MOCK_COUNTRIES.map((country) => (
              <S.CountryButtonStyled
                key={country}
                onClick={() => handleCountryChange(country)}
                $isActive={localFilters.country.includes(country)}
              >
                {country}
              </S.CountryButtonStyled>
            ))}
          </S.CountriesButtonsWrapper>
        </S.CountriesContainer>
      </S.Grid>
    </S.PanelContainer>
  );
};

export default FiltersPanel;
