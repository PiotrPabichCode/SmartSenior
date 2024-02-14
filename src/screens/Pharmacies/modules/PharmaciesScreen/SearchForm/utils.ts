import { Pharmacies, PharmacyDTO } from '@src/models';

const generateAddress = (address: PharmacyDTO['address']) => {
  const street = address.street;
  const homeNumber = address.homeNumber;
  const postCode = address.postcode;
  const province = address.province;
  const city = address.city;
  return `${street} ${homeNumber}, ${postCode} ${city}, ${province}`;
};

export const loadApiPharmacies = async (request: string, onLoad: (_: Pharmacies) => void) => {
  try {
    console.log(request);
    const response = await fetch(request);
    const json = await response.json();
    const key = Object.keys(json)[0];
    const apiItems: Array<PharmacyDTO> = Object.values(json[key]);
    const items: Array<PharmacyDTO> = apiItems.filter(item => item.name);
    const pharmacies: Pharmacies = items.map(item => ({
      key: '',
      name: item.name,
      status: item.pharmacyStatus.displayName,
      genre: item.pharmacyGenre.displayName,
      address: generateAddress(item.address),
      phone: item.phoneNumber,
      email: item.email,
      owners: item.owners[0].name,
      openOnSundays: item.openOnSundaysNonTrade,
    }));
    console.log(pharmacies[0]);
    onLoad(pharmacies);
  } catch (e) {
    console.log(e);
  }
};
