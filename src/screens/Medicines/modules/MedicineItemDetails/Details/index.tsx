import { View, Text, StyleSheet } from 'react-native';
import { DetailsProps } from './types';
import { Button, Divider } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { downloadFromUrl } from './utils';
import { useState } from 'react';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';

const Details = ({ medicineItem }: DetailsProps) => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <CustomActivityIndicator />;
  }

  const renderDetail = (title: string, detail: string) => {
    return (
      <>
        <Divider style={styles.divider} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.details}>{detail}</Text>
      </>
    );
  };

  return (
    <>
      <Text style={styles.name}>{medicineItem.productName}</Text>
      {renderDetail(t('medicineItem.commonName'), medicineItem.commonName)}
      {renderDetail(t('medicineItem.power'), medicineItem.power)}
      {renderDetail(t('medicineItem.pharmaceuticalForm'), medicineItem.pharmaceuticalForm)}
      {renderDetail(t('medicineItem.activeSubstance'), medicineItem.activeSubstance)}
      {renderDetail(t('medicineItem.packaging'), medicineItem.packaging)}
      {renderDetail(t('medicineItem.expiration'), medicineItem.expiration)}
      {renderDetail(t('medicineItem.company'), medicineItem.company)}
      {renderDetail(t('medicineItem.country'), medicineItem.country)}
      <Divider style={styles.divider} />
      {medicineItem.leafletUrl && medicineItem.characteristicUrl && (
        <View style={styles.buttons}>
          <Button
            title={t('medicineItem.leaflet')}
            titleStyle={styles.buttonTitle}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            onPress={() =>
              downloadFromUrl(
                medicineItem.leafletUrl,
                'ulotka',
                medicineItem.productName,
                setLoading,
              )
            }
          />
          <Button
            title={t('medicineItem.characteristic')}
            titleStyle={styles.buttonTitle}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            onPress={() =>
              downloadFromUrl(
                medicineItem.leafletUrl,
                'charakterystyka',
                medicineItem.productName,
                setLoading,
              )
            }
          />
        </View>
      )}
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  name: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
  },
  details: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  divider: {
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
