import { StyleSheet, Text } from 'react-native';
import { DetailsProps } from './types';
import { Divider } from '@rneui/themed';
import { t } from '@src/localization/Localization';

const Details = ({ pharmacyItem }: DetailsProps) => {
  const renderDetail = (title: string, detail: string) => {
    return (
      <>
        <Divider style={styles.divider} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </>
    );
  };

  return (
    <>
      {renderDetail(t('pharmacyItem.name'), pharmacyItem.name)}
      {renderDetail(t('pharmacyItem.status'), pharmacyItem.status)}
      {renderDetail(t('pharmacyItem.genre'), pharmacyItem.genre)}
      {renderDetail(t('pharmacyItem.address'), pharmacyItem.address)}
      {renderDetail(t('pharmacyItem.phone'), pharmacyItem.phone)}
      {renderDetail(t('pharmacyItem.email'), pharmacyItem.email)}
      {renderDetail(t('pharmacyItem.owners'), pharmacyItem.owners)}
      {renderDetail(
        t('pharmacyItem.openOnSundays'),
        pharmacyItem.openOnSundays ? t('yes') : t('no'),
      )}
      <Divider style={styles.divider} />
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'black',
    height: 1,
  },
  title: { fontSize: 22, fontWeight: '500' },
  detail: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});
