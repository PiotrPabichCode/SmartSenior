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

export type Medicines = Medicine[];
