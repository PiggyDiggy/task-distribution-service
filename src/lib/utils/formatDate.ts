export const formatDate = (dateObj: Date, format: "long" | "short" = "short") => {
  const options: Intl.DateTimeFormatOptions =
    format === "short" ? { day: "2-digit", month: "2-digit" } : { day: "numeric", month: "long" };
  return dateObj.toLocaleString("ru-RU", options);
};
