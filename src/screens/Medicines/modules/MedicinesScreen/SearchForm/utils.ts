import { MedicineDTO, Medicines } from '@src/models';

const BASE_URL = 'https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/';
export const BASE_SEARCH_URL = BASE_URL + 'search/public?specimenTypeEnum=L&';

export const loadApiMedicines = async (request: string, onLoad: (_: Medicines) => void) => {
  try {
    console.log(request);
    const response = await fetch(request);
    const json = await response.json();
    const data: Array<MedicineDTO> = json.content;
    const medicines: Medicines = data.map(item => ({
      key: '',
      productName: item.medicinalProductName,
      commonName: item.commonName,
      power: item.medicinalProductPower,
      pharmaceuticalForm: item.pharmaceuticalFormName,
      activeSubstance: item.activeSubstanceName,
      packaging: item.packaging.replaceAll('\\n', '\n'),
      expiration: item.expirationDateString,
      company: item.subjectMedicinalProductName,
      country: item.producersOrImporters[0]?.countryName,
      leafletUrl: item.id ? BASE_URL + item.id + '/leaflet' : null,
      characteristicUrl: item.id ? BASE_URL + item.id + '/characteristic' : null,
    }));
    onLoad(medicines.filter(m => m.country));
  } catch (e) {
    console.log(e);
  }
};
