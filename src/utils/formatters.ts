
export const formatDate = (
  dateString: string,
  locale: string = "ru-RU"
): string => {
  try {
    return new Date(dateString).toLocaleDateString(locale);
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

export const formatDateRange = (fromDate: string, toDate: string): string => {
  if (!fromDate && !toDate) return "Все даты";
  if (!fromDate) return `До ${formatDate(toDate)}`;
  if (!toDate) return `С ${formatDate(fromDate)}`;
  return `${formatDate(fromDate)} - ${formatDate(toDate)}`;
};

export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
