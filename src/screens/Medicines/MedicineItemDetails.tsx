import { StyleSheet, View, Text, Platform } from 'react-native';
import { Button, Divider } from '@rneui/themed';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { useAppSelector } from '@src/redux/store';
import Colors from '@src/constants/Colors';
import { Theme } from '@src/models';

const MedicineItemDetails = ({ route }: any) => {
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

  const downloadFromUrl = async (url: string, type: string) => {
    const filename = type + '-' + new Date() + '.pdf';
    const result = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + filename);

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
          mimetype,
        )
          .then(async uri => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch(e => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  const { item } = route.params;
  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.title}>{item['medicinalProductName']}</Text>
      {renderDetail(t('medicineItem.commonName'), item['commonName'])}
      {renderDetail(t('medicineItem.power'), item['medicinalProductPower'])}
      {renderDetail(t('medicineItem.pharmaceuticalForm'), item['pharmaceuticalFormName'])}
      {renderDetail(t('medicineItem.activeSubstance'), item['activeSubstanceName'])}
      {renderDetail(t('medicineItem.packaging'), item['packaging'].replaceAll('\\n', '\n'))}
      {renderDetail(t('medicineItem.expiration'), item['expirationDateString'])}
      {renderDetail(t('medicineItem.company'), item['subjectMedicinalProductName'])}
      {renderDetail(t('medicineItem.country'), item['manufacturersDtos'][0]['countryName'])}
      <Divider style={styles.dividerStyle} />
      <View style={styles.buttons}>
        <Button
          title={t('medicineItem.leaflet')}
          titleStyle={styles.buttonTitle}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          onPress={() =>
            downloadFromUrl(
              'https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/' +
                item['id'] +
                '/leaflet',
              'ulotka',
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
              'https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/' +
                item['id'] +
                '/characteristic',
              'charakterystyka',
            )
          }
        />
      </View>
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

export default MedicineItemDetails;
