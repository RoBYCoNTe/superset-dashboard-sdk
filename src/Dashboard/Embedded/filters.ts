export const createDefaultNativeFilter = (filterId, column, operator, value) =>
  `${filterId}:(__cache:(label:'${value}',validateStatus:!f,value:!('${value}')),extraFormData:(filters:!((col:${column},op:${operator},val:!('${value}')))),filterState:(label:'${value}',validateStatus:!f,value:!('${value}')),id:${filterId},ownState:())`;
export const createDefaultNativeFilterGroup = (filters: string[]) =>
  `(${filters.join(",")})`;
