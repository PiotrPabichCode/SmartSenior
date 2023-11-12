import { StyleSheet, Text, ScrollView } from 'react-native';
import { Divider } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { Theme, useAppSelector } from '@src/redux/types';
import Colors from '@src/constants/Colors';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';

const PharmacyItemDetails = ({ route }: any) => {
  const theme: Theme = useAppSelector(state => state.auth.theme);
  const currentTheme = Colors[theme];
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

  return (
    <CustomScrollContainer theme={currentTheme}>
      {renderDetail(t('pharmacyItem.name'), item.name)}
      {renderDetail(t('pharmacyItem.status'), item.pharmacyStatus.displayName)}
      {renderDetail(t('pharmacyItem.genre'), item.pharmacyGenre.displayName)}
      {renderAddress(t('pharmacyItem.address'), item.address)}
      {renderDetail(t('pharmacyItem.phone'), item.phoneNumber)}
      {renderDetail(t('pharmacyItem.email'), item.email)}
      {renderDetail(t('pharmacyItem.owners'), item.owners[0].name)}
      {renderDetail(
        t('pharmacyItem.openOnSundays'),
        item.openOnSundaysNonTrade ? t('yes') : t('no'),
      )}
      <Divider style={styles.dividerStyle} />
    </CustomScrollContainer>
  );
};

const styles = StyleSheet.create({
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
