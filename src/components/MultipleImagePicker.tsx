import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Image } from '@rneui/themed';
import { ActivityIndicator } from 'react-native';
import { Images } from '@src/models';
import { t } from '@src/localization/Localization';

type Props = {
  onChange: any;
  initialValues?: Images;
};

const MultipleImagePicker = ({ onChange, initialValues }: Props) => {
  const [selectedImages, setSelectedImages] = useState<Images>(initialValues ? initialValues : []);

  useEffect(() => {
    onChange('images', selectedImages);
    console.log(selectedImages);
  }, [selectedImages]);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      base64: true,
    });

    loadImages(result);
  };

  const takePhoto = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      return;
    }
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
    });

    console.log(pickerResult);

    loadImages(pickerResult);
  };

  const loadImages = (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled) {
      const assets = result.assets;
      if (assets && assets.length > 0) {
        const images = assets.map(image => ({
          uri: image.uri,
          base64: image.base64,
        }));
        const imagesBase64 = selectedImages.map(image => image.base64);
        const newImages = images.filter(img => !imagesBase64.includes(img.base64));
        setSelectedImages([...selectedImages, ...newImages]);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        gap: 10,
      }}>
      <Button
        size="lg"
        title={t('multipleImagePicker.selectPhotos')}
        buttonStyle={{ backgroundColor: 'black' }}
        containerStyle={{ minWidth: '90%', borderRadius: 25 }}
        onPress={pickImages}
      />
      <Button
        size="lg"
        title={t('multipleImagePicker.takePhoto')}
        buttonStyle={{ backgroundColor: 'green' }}
        containerStyle={{ minWidth: '90%', borderRadius: 25 }}
        onPress={takePhoto}
      />
      <ScrollView horizontal>
        {selectedImages.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.uri }}
            containerStyle={{ width: 100, height: 100, margin: 5 }}
            PlaceholderContent={<ActivityIndicator />}
            onPress={() => setSelectedImages(selectedImages.filter(img => img.uri !== image.uri))}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MultipleImagePicker;
