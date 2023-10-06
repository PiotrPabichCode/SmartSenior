import { StyleSheet, View, Text, ScrollView, Platform } from 'react-native';
import { Button, Divider } from '@rneui/themed';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

const MedicineItemDetails = ({ route }: any) => {
  const renderDetail = (title: string, detail: string) => {
    return (
      <>
        <Divider style={styles.dividerStyle} />
        <Text style={styles.detailTitle}>{title}</Text>
        <Text style={styles.details}>{detail}</Text>
      </>
    );
  };

  const downloadFromUrl = async (url: string, type: string) => {
    const filename = type + '-' + new Date() + '.pdf';
    const result = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + filename
    );
    console.log(result);

    save(result.uri, filename, 'application/pdf');
  };

  const save = async (uri: any, filename: any, mimetype: any) => {
    if (Platform.OS === 'android') {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  const { item } = route.params;
  console.log(item);
  // TODO
  return (
    <ScrollView contentContainerStyle={styles.viewStyle}>
      <Text style={styles.title}>{item['medicinalProductName']}</Text>
      {renderDetail('Nazwa powszechna', item['commonName'])}
      {renderDetail('Moc', item['medicinalProductPower'])}
      {renderDetail('Postać farmaceutyczna', item['pharmaceuticalFormName'])}
      {renderDetail('Substancja czynna', item['activeSubstanceName'])}
      {renderDetail(
        'Dostępne opakowania',
        item['packaging'].replaceAll('\\n', '\n')
      )}
      {renderDetail('Termin ważności', item['expirationDateString'])}
      {renderDetail('Firma', item['subjectMedicinalProductName'])}
      {renderDetail(
        'Kraj wytworzenia',
        item['manufacturersDtos'][0]['countryName']
      )}
      <Divider style={styles.dividerStyle} />
      <View style={styles.buttons}>
        <Button
          title='Ulotka'
          titleStyle={styles.buttonTitle}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          onPress={() =>
            downloadFromUrl(
              'https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/' +
                item['id'] +
                '/leaflet',
              'ulotka'
            )
          }
        />
        <Button
          title='Charakterystyka'
          titleStyle={styles.buttonTitle}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          onPress={() =>
            downloadFromUrl(
              'https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/' +
                item['id'] +
                '/characteristic',
              'charakterystyka'
            )
          }
        />
      </View>
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

export default MedicineItemDetails;
