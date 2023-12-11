export const pluralize = (count: number, nominative: string, genitive: string, plural: string) => {
  if (count % 10 === 1) {
    return `${count} ${nominative}`;
  }
  if (count % 10 < 5) {
    return `${count} ${genitive}`;
  }
  return `${count} ${plural}`;
};
