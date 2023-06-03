export function setQuery(payload) {
  const keys = Object.keys(payload);
  const queryArray = setQueryToArray({ keys, payload });
  const query = queryArray.join('&');

  return query;
}

function setArrayQuery({ payload, key }) {
  return payload[key].map((value) => `${key}[]=${value}`).join('&');
}

function setQueryToArray({ keys, payload }) {
  return keys.map((key) => {
    if (Array.isArray(payload[key])) {
      return setArrayQuery({ payload, key });
    }
    return `${key}=${payload[key]}`;
  });
}
