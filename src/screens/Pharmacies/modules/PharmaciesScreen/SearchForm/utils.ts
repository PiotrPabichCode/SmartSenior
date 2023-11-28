import { Pharmacies } from '@src/models';

const generateAddress = (address: any) => {
  const street = address['street'];
  const homeNumber = address['homeNumber'];
  const postCode = address['postcode'];
  const province = address['province'];
  const city = address['city'];
  return `${street} ${homeNumber}, ${postCode} ${city}, ${province}`;
};

export const loadApiPharmacies = async (request: string, onLoad: any) => {
  try {
    console.log(request);
    const response = await fetch(request);
    const json = await response.json();
    const key = Object.keys(json)[0];
    const items: Array<any> = Object.values(json[key]).filter((item: any) => item.name !== '');
    const pharmacies: Pharmacies = items.map(item => ({
      key: '',
      name: item['name'],
      status: item['pharmacyStatus']['displayName'],
      genre: item['pharmacyGenre']['displayName'],
      address: generateAddress(item['address']),
      phone: item['phoneNumber'],
      email: item['email'],
      owners: item['owners'][0]['name'],
      openOnSundays: item['openOnSundaysNonTrade'],
    }));
    onLoad(pharmacies);
  } catch (e) {
    console.log(e);
  }
};
