export interface Pharmacy {
  key: string;
  name: string;
  status: string;
  genre: string;
  address: string;
  phone: string;
  email: string;
  owners: string;
  openOnSundays: boolean;
}

export type Pharmacies = Pharmacy[];
