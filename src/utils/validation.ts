export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: true };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: "Введите корректный email адрес",
    };
  }

  return { isValid: true };
};

export const validateDateRange = (
  fromDate: string,
  toDate: string
): ValidationResult => {
  if (!fromDate || !toDate) {
    return { isValid: true };
  }

  const from = new Date(fromDate);
  const to = new Date(toDate);

  if (from > to) {
    return {
      isValid: false,
      message: "Дата 'от' не может быть больше даты 'до'",
    };
  }

  return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: true };
  }

  if (name.length < 2) {
    return {
      isValid: false,
      message: "Имя должно содержать минимум 2 символа",
    };
  }

  if (name.length > 50) {
    return {
      isValid: false,
      message: "Имя не может быть длиннее 50 символов",
    };
  }

  return { isValid: true };
};

export const validateFilters = (filters: any): ValidationResult => {
  const emailValidation = validateEmail(filters.email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  const nameValidation = validateName(filters.name);
  if (!nameValidation.isValid) {
    return nameValidation;
  }

  const dateValidation = validateDateRange(
    filters.registeredFrom,
    filters.registeredTo
  );
  if (!dateValidation.isValid) {
    return dateValidation;
  }

  return { isValid: true };
};
