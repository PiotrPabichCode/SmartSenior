import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import CustomToast from '@src/components/CustomToast';
import { t } from '@src/localization/Localization';
import { Timestamp } from 'firebase/firestore';
import { convertTimestampToDate } from '@src/utils/utils';

const save = async (uri: any, filename: any, mimetype: any) => {
  if (Platform.OS === 'android') {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
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

export const downloadFromUrl = async (
  url: string | null,
  type: string,
  title: string,
  onLoad: any,
) => {
  try {
    if (!url) {
      return;
    }
    onLoad(true);
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
    onLoad(false);
  }
};
