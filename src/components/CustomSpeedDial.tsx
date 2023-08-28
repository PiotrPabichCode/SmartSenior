import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpeedDial } from '@rneui/themed';

const CustomSpeedDial = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <View style={styles.container}>
      <SpeedDial
        isOpen={open}
        icon={{ name: 'edit', color: 'black' }}
        openIcon={{ name: 'close', color: 'black' }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}>
        <SpeedDial.Action
          icon={{ name: 'add', color: 'black' }}
          title='Add'
          onPress={() => console.log('Add Something')}
        />
        <SpeedDial.Action
          icon={{ name: 'delete', color: '#fff' }}
          title='Delete'
          onPress={() => console.log('Delete Something')}
        />
      </SpeedDial>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 50,
    right: 50,
    margin: 16, // Adjust the margin as needed to avoid overlapping with other content
  },
});

export default CustomSpeedDial;
