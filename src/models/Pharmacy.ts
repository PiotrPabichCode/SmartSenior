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

export interface PharmacyDTO {
  name: string;
  pharmacyStatus: PharmacyStatus;
  pharmacyGenre: PharmacyGenre;
  address: PharmacyAddress;
  phoneNumber: string;
  email: string;
  owners: PharmacyOwner[];
  openOnSundaysNonTrade: boolean;
}

interface PharmacyStatus {
  displayName: string;
}

interface PharmacyGenre {
  displayName: string;
}

interface PharmacyOwner {
  name: string;
}

interface PharmacyAddress {
  street: string;
  homeNumber: string;
  postcode: string;
  province: string;
  city: string;
}

export type Pharmacies = Pharmacy[];
