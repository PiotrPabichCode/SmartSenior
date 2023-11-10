interface PharmacyStatus {
  displayName: string;
}

interface PharmacyGenre {
  displayName: string;
}

export interface PharmacyItem {
  name: string;
  pharmacyStatus: PharmacyStatus;
  pharmacyGenre: PharmacyGenre;
  address: string;
  phoneNumber: string;
  email: string;
  owners: Array<{ name: string }>;
  openOnSundaysNonTrade: boolean;
}
