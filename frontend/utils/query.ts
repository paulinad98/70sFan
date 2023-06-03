interface StringObject { [key: string]: string | string[] }

export function setQuery(payload: StringObject) {
  const keys = Object.keys(payload);
  const queryArray = setQueryToArray({ keys, payload });
  const query = queryArray.join('&');

  return query;
}

function setArrayQuery(queryArray: string[], key: string) {
  return queryArray.map((value) => `${key}[]=${value}`).join('&');
}

function setQueryToArray({ keys, payload }: { payload: StringObject, keys: string[] }) {
  return keys.map((key) => {
    if (Array.isArray(payload[key])) {
      return setArrayQuery(payload[key] as string[], key);
    }

    return `${key}=${payload[key]}`;
  });
}
