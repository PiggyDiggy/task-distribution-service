export function getScopeMap<T extends { id: number | string; scopeName: string }>(
  ids: Array<T["id"]>,
  getterFn: (id: T["id"]) => T
) {
  const map = new Map<string, T[]>();

  for (const id of ids) {
    const entity = getterFn(id);
    if (!map.has(entity.scopeName)) {
      map.set(entity.scopeName, []);
    }
    map.get(entity.scopeName)!.push(entity);
  }

  return map;
}
