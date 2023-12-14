import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Image, useTheme } from '@rneui/themed';
import { ActivityIndicator, Alert } from 'react-native';
import { Image as ImageModel, Images } from '@src/models';
import { t } from '@src/localization/Localization';
import Icons from '../Icons';
import useThemeColors from '@src/config/useThemeColors';

type Props = {
  onChange: any;
  initialValues?: Images;
};

const MultipleImagePicker = ({ onChange, initialValues }: Props) => {
  const [selectedImages, setSelectedImages] = useState<Images>(initialValues ? initialValues : []);
  const BASE_WIDTH = 200;
  const BASE_HEIGHT = 200;
  const backgroundColor = useThemeColors().customBtnBackground;
  const [currentWidth, setCurrentWidth] = useState<number>(BASE_WIDTH);
  const [currentHeight, setCurrentHeight] = useState<number>(BASE_HEIGHT);
  const imageFullScreenHeight = Dimensions.get('window').height * 0.7;
  const imageFullScreenWidth = Dimensions.get('window').width * 0.85;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    onChange('images', selectedImages);
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

  const checkIfNewImage = (image: ImageModel) => {
    return image.base64 !== null;
  };

  const handleImageResize = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: currentWidth === BASE_WIDTH ? (imageFullScreenWidth + 10) * index : 0,
      animated: currentWidth === BASE_WIDTH ? true : false,
    });
    setCurrentHeight(currentHeight === BASE_HEIGHT ? imageFullScreenHeight : BASE_HEIGHT);
    setCurrentWidth(currentWidth === BASE_WIDTH ? imageFullScreenWidth : BASE_WIDTH);
  };

  const handleImageDelete = (image: ImageModel) => {
    Alert.alert(t('multipleImagePicker.deleteTitle'), t('multipleImagePicker.deleteQuestion'), [
      {
        text: t('eventItem.alert.no'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('eventItem.alert.yes'),
        style: 'destructive',
        onPress: () => setSelectedImages(selectedImages.filter(img => img.uri !== image.uri)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Button
        size="lg"
        title={t('multipleImagePicker.selectPhotos')}
        buttonStyle={{ backgroundColor }}
        onPress={pickImages}
      />
      <Button
        size="lg"
        title={t('multipleImagePicker.takePhoto')}
        buttonStyle={{ backgroundColor }}
        onPress={takePhoto}
      />
      <ScrollView horizontal ref={scrollViewRef} scrollEventThrottle={16}>
        {selectedImages.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={{ uri: image.uri }}
              resizeMode={currentWidth === BASE_WIDTH ? 'cover' : 'center'}
              containerStyle={{ width: currentWidth, height: currentHeight, margin: 5 }}
              PlaceholderContent={<ActivityIndicator />}
              onPress={() => handleImageResize(index)}
            />
            {currentWidth === BASE_WIDTH && checkIfNewImage(image) && (
              <Icons name="delete" style={styles.delete} onPress={() => handleImageDelete(image)} />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MultipleImagePicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  delete: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});
