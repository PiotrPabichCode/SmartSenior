export const BASE_GOV_MEDICINES =
  'https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/search/public?specimenTypeEnum=L&';

export const handleApiError = async (error: any) => {
  try {
    const errorMessage = error || 'An unknown error occured.';
    console.error(errorMessage);
    return { error: errorMessage, data: null };
  } catch (error) {
    throw new Error(`An unknown error occurred: ${error}`);
  }
};
