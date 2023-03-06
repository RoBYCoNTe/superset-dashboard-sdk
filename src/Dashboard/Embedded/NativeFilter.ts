export type NativeFilter = {
  id: string;
  column: string;
  operator: string;
  value: any;
};



export const formatNativeFilter = (filter: NativeFilter) => {
  const filterObject = {
    [filter.id]: {
    "id": filter.id,
    "extraFormData": {
    "filters": [
      {
        "col": filter.column,
        "op": filter.operator,
        "val": filter.value
      }
    ]
  },
    "filterState": {
    "validateMessage": false,
      "validateStatus": false,
      "label": filter.value.toString(),
      "value": filter.value
  },
    "ownState": {},
    "__cache": {
    "validateMessage": false,
      "validateStatus": false,
      "label": filter.value.toString(),
      "value": filter.value
  }
  }
}

  return filterObject
};
