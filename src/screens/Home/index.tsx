import { Text } from 'react-native';
import CustomActivityIndicator from '@components/CustomActivityIndicator';
import { t } from '@src/localization/Localization';
import Colors from '@src/constants/Colors';
import HomeButtons from './HomeButtons';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { useAppSelector } from '@src/redux/types';
import { selectEventGroups } from '@src/redux/events/events.slice';
import { selectTheme, selectUser } from '@src/redux/auth/auth.slice';
import { useEffect, useState } from 'react';
import { EventGroups } from '@src/models';
import { Timestamp } from 'firebase/firestore';
import { createTags } from '@src/redux/events/events.api';
import { UpcomingEventItems } from './types';
import UpcomingEvents from './UpcomingEvents';
import { useStyles } from './styles';

const HomeScreen = () => {
  const eventGroups = useAppSelector(state => selectEventGroups(state));
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEventItems>([]);
  const [isReady, setIsReady] = useState(false);
  const user = useAppSelector(state => selectUser(state));
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
  const styles = useStyles();

  useEffect(() => {
    const prepareUpcomingEvents = (eventGroups: EventGroups) => {
      const upcomingEvents: UpcomingEventItems = [];
      eventGroups = eventGroups.filter(e => e.active);
      for (const group of eventGroups) {
        let i = 0;
        const tags = createTags(group.tags);
        const dates = group.dates.filter(d => d.toMillis() >= Timestamp.now().toMillis());
        for (const date of dates) {
          if (i === 4) {
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
      <UpcomingEvents upcomingEvents={upcomingEvents} />
      <HomeButtons />
    </CustomScrollContainer>
  );
};

export default HomeScreen;
