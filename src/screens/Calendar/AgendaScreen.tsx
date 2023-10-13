import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import {
  Agenda,
  AgendaEntry,
  AgendaSchedule,
  DateData,
} from 'react-native-calendars';
import { navigate } from '@src/navigation/navigationUtils';
import moment from 'moment';
import { EventDetails } from '@src/redux/types/eventsTypes';
import { connect } from 'react-redux';
import { renderLocalDateWithTime } from '@src/utils/utils';

interface State {
  items?: AgendaSchedule;
  events: any;
}

const mapStateToProps = (state: any) => {
  return {
    events: state.events.events,
  };
};

class AgendaScreen extends Component<State> {
  state: State = {
    items: undefined,
    events: undefined,
  };

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItemsForMonth}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
        selected={moment().format('YYYY-MM-DD')}
        pastScrollRange={1}
        futureScrollRange={3}
        showOnlySelectedDayItems
      />
    );
  }

  loadItemsForMonth = ({ month, year }: DateData) => {
    // Load items for certain month
    const items = this.state.items || {};

    setTimeout(() => {
      let events: EventDetails[] = this.props.events;

      events = Object.values(events).filter((event) => {
        const eventDate = new Date(event.executionTime);
        const eMonth = eventDate.getMonth() + 1;
        const eYear = eventDate.getFullYear();
        return eMonth === month && eYear === year;
      });

      Object.values(events).forEach((event) => {
        const key = moment(event.executionTime).format('YYYY-MM-DD');
        if (!items[key]) {
          items[key] = [];
          items[key].push({
            key: event.key,
            description: event.description,
            executionTime: event.executionTime,
            priority: event.priority,
            name: event.title,
            height: Math.max(50, Math.floor(Math.random() * 150)),
            day: key,
          });
        }
      });
      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      console.log(newItems);
      this.setState({
        items: newItems,
      });
    }, 1000);
  };

  renderItem = (event: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';
    return (
      <TouchableOpacity
        style={[styles.item]}
        onPress={() =>
          navigate('EventItem', {
            eventKey: event.key,
          })
        }>
        <Text style={{ fontSize, color }}>
          {renderLocalDateWithTime(event.executionTime)}
        </Text>
        <Text style={[styles.name, { fontSize, color }]}>{event.name}</Text>
        <Text numberOfLines={1} style={{ fontSize, color }}>
          {event.description}
        </Text>
        <Text>{`Priorytet: ${event.priority}`}</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>Empty date</Text>
      </View>
    );
  };

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };
}

export default connect(mapStateToProps)(AgendaScreen);

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green',
  },
  dayItem: {
    marginLeft: 34,
  },
});
