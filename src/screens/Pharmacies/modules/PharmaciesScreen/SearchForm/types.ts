export interface SearchFormProps {
  onLoad: any;
}

export const provinces = [
  { label: 'Kujawsko-pomorskie', value: 'kujawsko-pomorskie' },
  { label: 'Łódzkie', value: 'łódzkie' },
  { label: 'Dolnośląskie', value: 'dolnośląskie' },
  { label: 'Lubelskie', value: 'lubelskie' },
  { label: 'Lubuskie', value: 'lubuskie' },
  { label: 'Małopolskie', value: 'małopolskie' },
  { label: 'Mazowieckie', value: 'mazowieckie' },
  { label: 'Opolskie', value: 'opolskie' },
  { label: 'Podkarpackie', value: 'podkarpackie' },
  { label: 'Podlaskie', value: 'podlaskie' },
  { label: 'Pomorskie', value: 'pomorskie' },
  { label: 'Śląskie', value: 'śląskie' },
  { label: 'Świętokrzyskie', value: 'świętokrzyskie' },
  { label: 'Warmińsko-mazurskie', value: 'warmińsko-mazurskie' },
  { label: 'Wielkopolskie', value: 'wielkopolskie' },
  { label: 'Zachodniopomorskie', value: 'zachodniopomorskie' },
];

export const BASE_SEARCH_URL =
  'https://rejestrymedyczne.ezdrowie.gov.pl/api/pharmacies/search?page=0&size=10&sortField=dateOfChanged&sortDirection=DESC&statusCode=AKTYWNA&';
