import { Button, Input } from '@rneui/themed';
import ColorPicker from '@src/components/ColorPicker';
import { renderIcon } from '@src/components/Icons';
import { goBack } from '@src/navigation/navigationUtils';
import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

const AddTag = () => {
  const [activeColorPicker, setActiveColorPicker] = useState(false);
  const [color, setColor] = useState('#555555');
  console.log(color);
  const onSubmit = async () => {
    try {
      console.log('Dodano nowy znacznik');
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
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Nowy znacznik</Text>
        <Input
          placeholder="Wpisz nazwę znacznika"
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
            title={'Wybierz kolor znacznika'}
            containerStyle={{ minWidth: '100%', borderRadius: 25 }}
          />
        )}
        <View style={{ flexDirection: 'row', gap: 10, minWidth: '100%' }}>
          <Button
            color={'green'}
            onPress={() => onSubmit()}
            title="Dodaj"
            containerStyle={{ flex: 1 }}
          />
          <Button
            color={'red'}
            onPress={() => goBack()}
            title="Anuluj"
            containerStyle={{ flex: 1 }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddTag;
