import React, { useState } from 'react';
import { SpeedDial } from '@rneui/themed';
import { CreateEventProps } from './types';
import { useNavigation, useRoute } from '@react-navigation/native';

const SpeedDialMenu = ({ navigation }: CreateEventProps) => {
  const [open, setOpen] = useState(false);

  const onClickAction = (command: string) => {
    switch (command) {
      case 'ADD':
        navigation.navigate('CreateEvent');
        break;
    }
  };

  return (
    <SpeedDial
      isOpen={open}
      icon={{ name: 'edit', color: 'white' }}
      openIcon={{ name: 'close', color: 'white' }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
      style={{ position: 'absolute', bottom: 50, right: 0 }}>
      <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title='Add'
        onPress={() => onClickAction('ADD')}
      />
      <SpeedDial.Action
        icon={{ name: 'delete', color: '#fff' }}
        title='Delete'
        onPress={() => console.log('Delete Something')}
      />
    </SpeedDial>
  );
};

export default SpeedDialMenu;
