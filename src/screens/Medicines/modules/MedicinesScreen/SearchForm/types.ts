import { Medicines } from '@src/models';

export interface SearchFormProps {
  onLoad: (medicines: Medicines) => void;
}

const BASE_URL = 'https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/';
export const BASE_SEARCH_URL = BASE_URL + 'search/public?specimenTypeEnum=L&';
