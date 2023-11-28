export interface SearchFormProps {
  onLoad: any;
}

const BASE_URL = 'https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/';
export const BASE_SEARCH_URL = BASE_URL + 'search/public?specimenTypeEnum=L&';
