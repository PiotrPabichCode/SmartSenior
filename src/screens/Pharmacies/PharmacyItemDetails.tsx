import { StyleSheet, Text, ScrollView } from 'react-native';
import { Divider } from '@rneui/themed';

const PharmacyItemDetails = ({ route }: any) => {
  const renderDetail = (title: string, detail: string) => {
    return (
      <>
        <Divider style={styles.dividerStyle} />
        <Text style={styles.detailTitle}>{title}</Text>
        <Text style={styles.details}>{detail}</Text>
      </>
    );
  };

  const { item } = route.params;

  const renderAddress = (title: string, address: any) => {
    const street = address['street'];
    const homeNumber = address['homeNumber'];
    const postCode = address['postcode'];
    const province = address['province'];
    const city = address['city'];
    const outputString = `${street} ${homeNumber}, ${postCode} ${city}, ${province}`;
    return (
      <>
        <Divider style={styles.dividerStyle} />
        <Text style={styles.detailTitle}>{title}</Text>
        <Text style={styles.details}>{outputString}</Text>
      </>
    );
  };

  // TODO
  return (
    <ScrollView contentContainerStyle={styles.viewStyle}>
      {renderDetail('Nazwa apteki', item.name)}
      {renderDetail('Dostępność', item.pharmacyStatus.displayName)}
      {renderDetail('Postać farmaceutyczna', item.pharmacyGenre.displayName)}
      {renderAddress('Adres: ', item.address)}
      {renderDetail('Numer telefonu', item.phoneNumber)}
      {renderDetail('E-mail', item.email)}
      {renderDetail('Właściciele', item.owners[0].name)}
      {renderDetail(
        'Otwarte w niedziele niehandlowe',
        item.openOnSundaysNonTrade ? 'Tak' : 'Nie'
      )}
      <Divider style={styles.dividerStyle} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFAFA',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: '500',
  },
  details: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
  dividerStyle: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'black',
    height: 1,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
  buttonTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    width: 140,
    borderRadius: 10,
  },
  buttonStyle: {
    backgroundColor: 'blue',
  },
});

export default PharmacyItemDetails;
