export const buildRequest = (baseUrl: string, params: any) => {
  const entries = Object.entries(params).filter(
    ([key, value]) => String(value).trim() !== ''
  );
  return baseUrl + entries.map(([key, value]) => `${key}=${value}`).join('&');
};
