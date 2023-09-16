import { View, Text, StyleSheet } from 'react-native';
import { Button, Icon, Divider } from '@rneui/themed';

const UpcomingEvents = () => {
  const moreButton = (
    <Button
      title='Zobacz więcej'
      containerStyle={styles.moreButtonStyle}
      buttonStyle={styles.moreButtonStyle}
      titleStyle={styles.moreButtonTitle}
    />
  );
  const actionButton = (
    <Button
      title='Wykonaj'
      containerStyle={styles.actionButtonStyle}
      buttonStyle={styles.actionButtonStyle}
      titleStyle={styles.actionButtonTitle}
    />
  );
  const events = [
    {
      startTime: '17.07.2023r. godzina 16:00',
      description: 'Badanie ciśnieniomierzem',
    },
    {
      startTime: '21.07.2023r. godzina 12:00',
      description: 'Poranny rozruch',
    },
    {
      startTime: '21.07.2023r. godzina 12:00',
      description: 'Poranny rozruch',
    },
    {
      startTime: '21.07.2023r. godzina 12:00',
      description: 'Poranny rozruch',
    },
  ];

  const mapEventItems = events.map((event, index) => {
    const isEnd = index !== events.length - 1;
    return (
      <View style={styles.eventView} key={'event' + index.toString()}>
        <View style={styles.eventTimeView}>
          <Icon name='arrow-right' color='#000' size={30} />
          <Text style={styles.eventText}>{event.startTime}</Text>
          <Icon name='arrow-left' color='#000' size={30} />
        </View>
        <Text style={styles.eventTitle}>{event.description}</Text>
        {actionButton}
        {isEnd && <Divider style={styles.dividerStyle} />}
      </View>
    );
  });

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.titleStyle}>Nadchodzące wydarzenia</Text>
      {mapEventItems}
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FB6D6C',
    width: '95%',
    borderRadius: 20,
    padding: 15,
  },
  titleStyle: {
    fontSize: 26,
    fontWeight: '500',
    color: 'white',
    width: '100%',
    textAlign: 'center',
  },
  actionButtonStyle: {
    backgroundColor: '#FFB909',
    width: 200,
    borderRadius: 25,
  },
  actionButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  moreButtonStyle: {
    backgroundColor: '#0940FF',
    width: 200,
    borderRadius: 25,
  },
  moreButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  eventView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 7,
  },
  eventTimeView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  eventText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  dividerStyle: {
    backgroundColor: 'white',
    color: 'white',
    width: 300,
    marginVertical: 10,
  },
});

export default UpcomingEvents;
