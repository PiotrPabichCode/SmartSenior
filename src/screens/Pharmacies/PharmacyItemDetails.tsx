import { StyleSheet, Text } from 'react-native';
import { Divider } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import Colors from '@src/constants/Colors';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { Pharmacy } from '@src/models';

const PharmacyItemDetails = ({ route }: any) => {
  const theme = useAppSelector(state => selectTheme(state));
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

  const { pharmacy }: { pharmacy: Pharmacy } = route.params;

  return (
    <CustomScrollContainer theme={currentTheme}>
      {renderDetail(t('pharmacyItem.name'), pharmacy.name)}
      {renderDetail(t('pharmacyItem.status'), pharmacy.status)}
      {renderDetail(t('pharmacyItem.genre'), pharmacy.genre)}
      {renderDetail(t('pharmacyItem.address'), pharmacy.address)}
      {renderDetail(t('pharmacyItem.phone'), pharmacy.phone)}
      {renderDetail(t('pharmacyItem.email'), pharmacy.email)}
      {renderDetail(t('pharmacyItem.owners'), pharmacy.owners)}
      {renderDetail(t('pharmacyItem.openOnSundays'), pharmacy.openOnSundays ? t('yes') : t('no'))}
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
