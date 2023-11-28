import { StyleSheet, View, Text, Platform } from 'react-native';
import { Button, Divider } from '@rneui/themed';
import { shareAsync } from 'expo-sharing';
import { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { Medicine } from '@src/models';
import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import CustomToast from '@src/components/CustomToast';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { Timestamp } from 'firebase/firestore';
import { convertTimestampToDate } from '@src/utils/utils';

const MedicineItemDetails = ({ route }: any) => {
  const theme = useAppSelector(state => selectTheme(state));
  const [loading, setLoading] = useState(false);
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

  if (loading) {
    return <CustomActivityIndicator />;
  }

  const downloadFromUrl = async (url: string | null, type: string, title: string) => {
    try {
      if (!url) {
        return;
      }
      setLoading(true);
      const filename = `${type}-${title}${convertTimestampToDate(
        Timestamp.now(),
        'DD-MM-YYYY HH:mm:ss',
      )}.pdf`.replace(/[\s,%]/g, '');
      console.log(filename);
      const result = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + filename);
      console.log(result);

      await save(result.uri, filename, 'application/pdf');
      CustomToast('success', t('medicineItem.download'));
    } catch (error) {
      CustomToast('error', t('medicineItem.downloadNoPermission'));
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const save = async (uri: any, filename: any, mimetype: any) => {
    if (Platform.OS === 'android') {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      console.log(permissions);
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
        throw new Error('Permission not granted');
      }
    } else {
      shareAsync(uri);
    }
  };

  const { medicine }: { medicine: Medicine } = route.params;

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.title}>{medicine.productName}</Text>
      {renderDetail(t('medicineItem.commonName'), medicine.commonName)}
      {renderDetail(t('medicineItem.power'), medicine.power)}
      {renderDetail(t('medicineItem.pharmaceuticalForm'), medicine.pharmaceuticalForm)}
      {renderDetail(t('medicineItem.activeSubstance'), medicine.activeSubstance)}
      {renderDetail(t('medicineItem.packaging'), medicine.packaging)}
      {renderDetail(t('medicineItem.expiration'), medicine.expiration)}
      {renderDetail(t('medicineItem.company'), medicine.company)}
      {renderDetail(t('medicineItem.country'), medicine.country)}
      <Divider style={styles.dividerStyle} />
      {medicine.leafletUrl && medicine.characteristicUrl && (
        <View style={styles.buttons}>
          <Button
            title={t('medicineItem.leaflet')}
            titleStyle={styles.buttonTitle}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            onPress={() => downloadFromUrl(medicine.leafletUrl, 'ulotka', medicine.productName)}
          />
          <Button
            title={t('medicineItem.characteristic')}
            titleStyle={styles.buttonTitle}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            onPress={() =>
              downloadFromUrl(medicine.leafletUrl, 'charakterystyka', medicine.productName)
            }
          />
        </View>
      )}
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
