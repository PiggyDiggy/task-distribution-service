export const getParamsObject = (searchParams: URLSearchParams) => {
  const result: Record<string, string | number | null> = {};

  for (const [key, value] of searchParams) {
    result[key] = value === "null" ? null : value;
  }

  return result;
};
