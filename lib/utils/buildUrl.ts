function buildUrl(url: string, params: object) {
  const queryString = Object.entries(params).reduce(
    (memo, [key, val], i, array) => {
      memo += `${key}=${val}`;
      if (i !== array.length - 1) {
        memo += "&";
      }
      return memo;
    },
    ""
  );
  return `${url}?${queryString}`;
}

export default buildUrl;
