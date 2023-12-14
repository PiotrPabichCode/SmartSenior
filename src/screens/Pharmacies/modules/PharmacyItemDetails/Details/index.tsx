import { StyleSheet } from 'react-native';
import { DetailsProps } from './types';
import { Divider } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import DetailsItem from './DetailsItem';
import useThemeColors from '@src/config/useThemeColors';

const Details = ({ pharmacyItem }: DetailsProps) => {
  const styles = useStyles();
  return (
    <>
      <DetailsItem title={t('pharmacyItem.name')} detail={pharmacyItem.name} />
      <DetailsItem title={t('pharmacyItem.status')} detail={pharmacyItem.status} />
      <DetailsItem title={t('pharmacyItem.genre')} detail={pharmacyItem.genre} />
      <DetailsItem title={t('pharmacyItem.address')} detail={pharmacyItem.address} />
      <DetailsItem title={t('pharmacyItem.phone')} detail={pharmacyItem.phone} />
      <DetailsItem title={t('pharmacyItem.email')} detail={pharmacyItem.email} />
      <DetailsItem title={t('pharmacyItem.owners')} detail={pharmacyItem.owners} />
      <DetailsItem
        title={t('pharmacyItem.openOnSundays')}
        detail={pharmacyItem.openOnSundays ? t('yes') : t('no')}
      />
      <Divider style={styles.divider} />
    </>
  );
};

export default Details;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    divider: {
      width: '100%',
      marginVertical: 10,
      backgroundColor: theme.divider,
      height: 1,
    },
  });
