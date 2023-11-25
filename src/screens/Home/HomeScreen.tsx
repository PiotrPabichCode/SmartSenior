import { Text, StyleSheet } from 'react-native';
import UpcomingEvents from '@src/screens/Home/UpcomingEvents';
import CustomActivityIndicator from '@components/CustomActivityIndicator';
import { t } from '@src/localization/Localization';
import Colors from '@src/constants/Colors';
import HomeButtons from './HomeButtons';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { useAppSelector } from '@src/redux/types';
import { selectEventGroups } from '@src/redux/events/events.slice';
import { selectTheme, selectUser } from '@src/redux/auth/auth.slice';
import { useEffect, useState } from 'react';
import { EventGroups, Tags } from '@src/models';
import { Timestamp } from 'firebase/firestore';
import { createTags } from '@src/redux/events/events.api';

interface UpcomingEventItem {
  groupKey: string;
  title: string;
  date: Timestamp;
  tags: Tags;
}

export type UpcomingEventItems = UpcomingEventItem[];

const HomeScreen = () => {
  const eventGroups = useAppSelector(state => selectEventGroups(state));
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEventItems>([]);
  const [isReady, setIsReady] = useState(false);
  const user = useAppSelector(state => selectUser(state));
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];

  useEffect(() => {
    const prepareUpcomingEvents = (eventGroups: EventGroups) => {
      const upcomingEvents: UpcomingEventItems = [];
      eventGroups = eventGroups.filter(e => e.active);
      for (const group of eventGroups) {
        let i = 0;
        const tags = createTags(group.tags);
        for (const date of group.dates) {
          if (i === 3) {
            break;
          }
          if (group.completedEvents.findIndex(e => e.isEqual(date)) !== -1) {
            continue;
          }
          upcomingEvents.push({
            date: date,
            title: group.title,
            groupKey: group.key,
            tags: tags,
          });
          i++;
        }
      }
      setUpcomingEvents(
        upcomingEvents.sort((a, b) => {
          if (a.date && b.date) {
            return a.date.toMillis() - b.date.toMillis();
          }
          return 0;
        }),
      );
      setIsReady(true);
    };

    prepareUpcomingEvents(eventGroups);
  }, [eventGroups]);

  if (!user || !isReady) {
    return <CustomActivityIndicator />;
  }

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.welcomeText}>
        {t('homeScreen.welcome', {
          name: user.firstName,
        })}
      </Text>
      <UpcomingEvents events={upcomingEvents} />
      <HomeButtons />
    </CustomScrollContainer>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.black,
  },
});

export default HomeScreen;
