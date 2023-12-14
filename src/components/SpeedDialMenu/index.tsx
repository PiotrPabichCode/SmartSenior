import { useState } from 'react';
import { SpeedDial } from '@rneui/themed';
import { navigate } from '@src/navigation/navigationUtils';
import { generateEvents } from '@src/helpers/generateEvents';
import { t } from '@src/localization/Localization';
import { Roles } from '@src/models';
import { useAppSelector } from '@src/redux/types';
import useThemeColors from '@src/config/useThemeColors';

const SpeedDialMenu = (props: any) => {
  const role = useAppSelector(state => state.auth.user?.role);
  const [open, setOpen] = useState(false);
  const color = useThemeColors().speedDial;

  const onClickAction = (command: string) => {
    switch (command) {
      case 'ADD_EVENT':
        navigate('CreateEvent');
        setOpen(!open);
        break;
      case 'ADD_NOTE':
        navigate('CreateNote');
        setOpen(!open);
        break;
      case 'ADD_SENIOR':
        navigate('AddConnectedUser'); // TODO
        setOpen(!open);
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
      style={{ ...props.style }}
      color={color}>
      <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title={t('speedDial.addEvent')}
        onPress={() => onClickAction('ADD_EVENT')}
        color={color}
      />
      <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title={t('speedDial.addNote')}
        onPress={() => onClickAction('ADD_NOTE')}
        color={color}
      />

      {role !== Roles.SENIOR ? (
        <SpeedDial.Action
          icon={{ name: 'add', color: '#fff' }}
          title={t('speedDial.addSenior')}
          onPress={() => onClickAction('ADD_SENIOR')}
          color={color}
        />
      ) : (
        <></>
      )}
    </SpeedDial>
  );
};

export default SpeedDialMenu;
