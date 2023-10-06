export const buildRequest = (baseUrl: string, params: any) => {
  const entries = Object.entries(params).filter(
    ([key, value]) => String(value).trim() !== ''
  );
  return baseUrl + entries.map(([key, value]) => `${key}=${value}`).join('&');
};

export const renderLocalDateWithTime = (value: number) => {
  const date = new Date(value);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

export const renderLocalDate = (value: number) => {
  return new Date(value).toLocaleDateString();
};

export const createDatetimeTimezone = (dateValue?: Date, timeValue?: Date) => {
  if (!dateValue || !timeValue) {
    return false;
  }
  const year = dateValue.getFullYear();
  const month = dateValue.getMonth();
  const day = dateValue.getDate();
  const hours = timeValue.getHours();
  const minutes = timeValue.getMinutes();
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}`);
};
