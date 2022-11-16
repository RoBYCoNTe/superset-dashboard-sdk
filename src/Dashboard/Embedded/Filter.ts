export type Filter = {
  id: string;
  column: string;
  operator: string;
  value: string;
};

export const formatFilter = (filter: Filter) => {
  return `${filter.id}:(__cache:(label:'${filter.value}',validateStatus:!f,value:!('${filter.value}')),extraFormData:(filters:!((col:${filter.column},op:${filter.operator},val:!('${filter.value}')))),filterState:(label:'${filter.value}',validateStatus:!f,value:!('${filter.value}')),id:${filter.id},ownState:())`;
};
