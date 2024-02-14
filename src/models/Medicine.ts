export interface Medicine {
  key: string;
  productName: string;
  commonName: string;
  power: string;
  pharmaceuticalForm: string;
  activeSubstance: string;
  packaging: string;
  expiration: string;
  company: string;
  country: string;
  leafletUrl: string | null;
  characteristicUrl: string | null;
}

export interface MedicineDTO {
  id: string;
  medicinalProductName: string;
  commonName: string;
  medicinalProductPower: string;
  pharmaceuticalFormName: string;
  activeSubstanceName: string;
  packaging: string;
  expirationDateString: string;
  subjectMedicinalProductName: string;
  producersOrImporters: Array<ProducersOrImporters>;
}

interface ProducersOrImporters {
  subjectName: string;
  countryName: string;
}

export type Medicines = Medicine[];
