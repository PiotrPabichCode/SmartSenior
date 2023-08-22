import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Divider } from '@rneui/themed';

const MedicineItemDetails = () => {
  // TODO
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.title}>Ibuprom Max</Text>
      <Divider style={styles.dividerStyle} />
      <Text style={styles.detailTitle}>Cena</Text>
      <Text style={styles.details}>25,20zł</Text>
      <Divider style={styles.dividerStyle} />
      <Text style={styles.detailTitle}>Moc</Text>
      <Text style={styles.details}>4 mg/5 ml</Text>
      <Divider style={styles.dividerStyle} />
      <Text style={styles.detailTitle}>Postać farmaceutyczna</Text>
      <Text style={styles.details}>Tabletki powlekane</Text>
      <Divider style={styles.dividerStyle} />
      <Text style={styles.detailTitle}>Substancja czynna</Text>
      <Text style={styles.details}>Acidum zoledronicum 4 mg/5 ml</Text>
      <Divider style={styles.dividerStyle} />
      <Text style={styles.detailTitle}>Kraj wytworzenia</Text>
      <Text style={styles.details}>Austria</Text>
      <Divider style={styles.dividerStyle} />
      <Text style={styles.detailTitle}>Ulotka</Text>
      <Text style={styles.link}>
        https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/1/leaflet
      </Text>
      <Divider style={styles.dividerStyle} />
      <Text style={styles.detailTitle}>Charakterystyka</Text>
      <Text style={styles.link}>
        https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/1/characteristic
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    padding: 10,
    backgroundColor: '#FFFAFA',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: '500',
  },
  details: {
    fontSize: 16,
    fontWeight: '400',
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
});

export default MedicineItemDetails;
