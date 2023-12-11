export const createCollection = <T extends Record<string, any>>(array: T[], key: keyof T = "id") => {
  return array.reduce((collection, element) => {
    return collection.set(element[key], element);
  }, new Map());
};
