import { Button, Input } from '@rneui/themed';
import ColorPicker from '@src/components/ColorPicker';
import CustomToast from '@src/components/CustomToast';
import { renderIcon } from '@src/components/Icons';
import { t } from '@src/localization/Localization';
import { Tag } from '@src/models';
import { goBack } from '@src/navigation/navigationUtils';
import { addUserTag } from '@src/redux/auth/auth.actions';
import { selectTags } from '@src/redux/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

const AddTag = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(state => selectTags(state));
  const [activeColorPicker, setActiveColorPicker] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#555555');
  const onSubmit = async () => {
    try {
      if (!name) {
        return CustomToast('error', t('message.error.missingData'));
      }
      console.log(tags);
      if (tags && tags.findIndex(tag => tag.name === name) !== -1) {
        return CustomToast('error', t('message.error.duplicateTag'));
      }
      const tag: Tag = {
        id: '',
        name: name,
        color: color,
      };
      await dispatch(addUserTag(tag)).unwrap();
      goBack();
      CustomToast('success', t('message.success.addTag'));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      keyboardShouldPersistTaps="handled">
      <View
        style={{
          width: '90%',
          elevation: 5,
          gap: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 25,
        }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{t('tags.new')}</Text>
        <Input
          placeholder={t('tags.namePlaceholder')}
          onChangeText={value => setName(value)}
          inputStyle={{ alignSelf: 'flex-end' }}
          leftIcon={renderIcon({
            name: 'tags-account',
            size: 24,
            style: { marginTop: 10 },
          })}
        />
        {activeColorPicker ? (
          <ColorPicker
            onPress={() => setActiveColorPicker(false)}
            setColor={setColor}
            color={color}
          />
        ) : (
          <Button
            color={color}
            onPress={() => setActiveColorPicker(true)}
            title={t('tags.colorPlaceholder')}
            containerStyle={{ minWidth: '100%', borderRadius: 25 }}
          />
        )}
        <View style={{ flexDirection: 'row', gap: 10, minWidth: '100%' }}>
          <Button
            color={'green'}
            onPress={() => onSubmit()}
            title={t('tags.add')}
            containerStyle={{ flex: 1 }}
          />
          <Button
            color={'red'}
            onPress={() => goBack()}
            title={t('tags.cancel')}
            containerStyle={{ flex: 1 }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddTag;
