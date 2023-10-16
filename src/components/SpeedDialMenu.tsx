import { useState } from 'react';
import { SpeedDial } from '@rneui/themed';
import { navigate } from '@src/navigation/navigationUtils';
import { generateEvents } from '@src/helpers/generateEvents';
import { translate } from '@src/localization/Localization';

const SpeedDialMenu = (props: any) => {
  const [open, setOpen] = useState(false);

  const onClickAction = (command: string) => {
    switch (command) {
      case 'ADD_EVENT':
        navigate('CreateEvent');
        setOpen(!open);
        break;
      case 'ADD_KEEPER':
        // navigate('AddKeeper'); // TODO
        setOpen(!open);
        generateEvents();
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
      style={{ ...props.style }}>
      <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title={translate('speedDial.addEvent')}
        onPress={() => onClickAction('ADD_EVENT')}
      />
      <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title={translate('speedDial.addKeeper')}
        onPress={() => onClickAction('ADD_KEEPER')}
      />
    </SpeedDial>
  );
};

export default SpeedDialMenu;
