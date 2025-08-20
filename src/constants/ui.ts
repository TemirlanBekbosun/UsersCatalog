
export const UI_CONSTANTS = {
  DEBOUNCE_DELAY: 300,
  ANIMATION_DURATION: 200,

  BORDER_RADIUS: {
    SMALL: "4px",
    MEDIUM: "8px",
    LARGE: "12px",
  },

  COLORS: {
    PRIMARY: "#007bff",
    SECONDARY: "#6c757d",
    SUCCESS: "#28a745",
    DANGER: "#dc3545",
    WARNING: "#ffc107",
    INFO: "#17a2b8",
    LIGHT: "#f8f9fa",
    DARK: "#343a40",
  },

  FONT_SIZES: {
    SMALL: "12px",
    MEDIUM: "14px",
    LARGE: "16px",
    XLARGE: "18px",
    TITLE: "24px",
  },

  Z_INDEX: {
    DROPDOWN: 1000,
    MODAL: 1050,
    TOOLTIP: 1070,
  },
} as const;
