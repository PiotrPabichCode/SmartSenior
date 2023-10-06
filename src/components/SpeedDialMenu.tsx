import React, { useState } from 'react';
import { SpeedDial } from '@rneui/themed';
import { generateEvents } from '@src/helpers/generateEvents';
import { navigate } from '@src/navigation/navigationUtils';

const SpeedDialMenu = () => {
  const [open, setOpen] = useState(false);

  const onClickAction = (command: string) => {
    switch (command) {
      case 'ADD_EVENT':
        navigate('CreateEvent');
        break;
      case 'ADD_KEEPER':
        navigate('AddKeeper'); // TODO
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
      style={{ position: 'absolute', bottom: 50, right: 0 }}>
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