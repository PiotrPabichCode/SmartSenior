import React, { useState } from 'react';
import { SpeedDial } from '@rneui/themed';
import { generateEvents } from '../firebase/queries';

const SpeedDialMenu = ({ navigation }: any) => {
  const [open, setOpen] = useState(false);

  const onClickAction = (command: string) => {
    switch (command) {
      case 'ADD_EVENT':
        navigation.navigate('CreateEvent');
        break;
      case 'ADD_KEEPER':
        navigation.navigate('AddKeeper'); // TODO
        // generateEvents();
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
      style={{ position: 'absolute', bottom: 0, right: 0 }}>
      <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title='Dodaj wydarzenie'
        onPress={() => onClickAction('ADD_EVENT')}
      />
      <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title='Dodaj opiekuna'
        onPress={() => onClickAction('ADD_KEEPER')}
      />
    </SpeedDial>
  );
};

export default SpeedDialMenu;
