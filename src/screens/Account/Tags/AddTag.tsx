import { Button, Input } from '@rneui/themed';
import ColorPicker from '@src/components/ColorPicker';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import CustomToast from '@src/components/CustomToast';
import { renderIcon } from '@src/components/Icons';
import { t } from '@src/localization/Localization';
import { Tag } from '@src/models';
import { goBack } from '@src/navigation/navigationUtils';
import { AddTagScreenProps } from '@src/navigation/types';
import { addUserTag, updateUserTag } from '@src/redux/auth/auth.actions';
import { selectAuthStatus, selectTagById, selectTags } from '@src/redux/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

const AddTag = ({ route }: AddTagScreenProps) => {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState<boolean>(false);
  const tags = useAppSelector(state => selectTags(state));
  const activeTag = useAppSelector(state => selectTagById(state, route.params?.key));
  const [activeColorPicker, setActiveColorPicker] = useState(false);
  const status = useAppSelector(state => selectAuthStatus(state));
  const [name, setName] = useState('');
  const [color, setColor] = useState('#555555');

  useEffect(() => {
    const loadTag = () => {
      if (activeTag) {
        console.log(activeTag);
        setName(activeTag.name);
        setColor(activeTag.color);
      }
      setIsReady(true);
    };

    loadTag();
  }, [route.params?.key]);

  if (!isReady || status === 'pending') {
    return <CustomActivityIndicator />;
  }

  const onSubmit = async () => {
    try {
      if (!name) {
        return CustomToast('error', t('message.error.missingData'));
      }
      if (tags && tags.findIndex(tag => tag.name === name && !route.params?.key) !== -1) {
        return CustomToast('error', t('message.error.duplicateTag'));
      }
      const tag: Tag = {
        id: route.params?.key ? route.params.key : '',
        name: name,
        color: color,
      };

      if (tag.id) {
        await dispatch(updateUserTag(tag)).unwrap();
        CustomToast('success', t('message.success.updateTag'));
      } else {
        await dispatch(addUserTag(tag)).unwrap();
        CustomToast('success', t('message.success.addTag'));
      }
      goBack();
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
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          {route.params?.key ? t('tags.updateTitle') : t('tags.new')}
        </Text>
        <Input
          placeholder={t('tags.namePlaceholder')}
          value={name}
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
            title={name ? name : t('tags.colorPlaceholder')}
            containerStyle={{ minWidth: '100%', borderRadius: 25 }}
          />
        )}
        <View style={{ flexDirection: 'row', gap: 10, minWidth: '100%' }}>
          <Button
            color={'green'}
            onPress={() => onSubmit()}
            title={route.params?.key ? t('tags.update') : t('tags.add')}
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
