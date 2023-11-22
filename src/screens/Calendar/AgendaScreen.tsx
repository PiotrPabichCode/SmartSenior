import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { Agenda, AgendaEntry, AgendaSchedule, DateData } from 'react-native-calendars';
import { navigate } from '@src/navigation/navigationUtils';
import moment from 'moment';
import { EventGroups, Events } from '@src/models';
import { connect } from 'react-redux';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';

interface State {
  items?: AgendaSchedule;
  eventGroups: any;
}

const mapStateToProps = (state: any) => {
  return {
    eventGroups: state.events.eventGroups,
  };
};

class AgendaScreen extends Component<State> {
  state: State = {
    items: undefined,
    eventGroups: undefined,
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
        displayLoadingIndicator={false}
        showOnlySelectedDayItems
      />
    );
  }

  prepareCalendarEvents = (eventGroups: EventGroups) => {
    const calendarItems = [];
    for (const group of eventGroups) {
      for (const date of group.dates) {
        calendarItems.push({
          groupKey: group.key,
          description: group.description,
          date: date,
          priority: group.priority,
          name: group.title,
        });
      }
    }
    return calendarItems;
  };

  loadItemsForMonth = ({ month, year }: DateData) => {
    // Load items for certain month
    const items = this.state.items || {};

    setTimeout(() => {
      let eventGroups: EventGroups = this.props.eventGroups;
      let events = this.prepareCalendarEvents(eventGroups);
      console.log(eventGroups);

      events = events.filter(event => {
        const eventDate = event.date?.toDate()!;
        const eMonth = eventDate.getMonth() + 1;
        const eYear = eventDate.getFullYear();
        return eMonth === month && eYear === year;
      });

      events.forEach(event => {
        const formattedDate = convertTimestampToDate(event.date!, 'YYYY-MM-DD');
        if (!items[formattedDate]) {
          items[formattedDate] = [];
        }
        const existingItem = items[formattedDate].find(item => item.key === event.key);

        if (!existingItem) {
          items[formattedDate].push({
            groupKey: event.groupKey,
            description: event.description,
            date: event.date!,
            priority: event.priority,
            name: event.title,
            height: Math.max(50, Math.floor(Math.random() * 150)),
          });
        }
      });
      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
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
            groupKey: event.groupKey,
            date: event.date,
          })
        }>
        <Text style={{ fontSize, color }}>
          {convertTimestampToDate(event.date, 'DD-MM-YYYY HH:mm')}
        </Text>
        <Text style={[styles.name, { fontSize, color }]}>{event.name}</Text>
        <Text numberOfLines={1} style={{ fontSize, color }}>
          {event.description}
        </Text>
        <Text>
          {t('agenda.priority', {
            priority: event.priority,
          })}
        </Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
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
