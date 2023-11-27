import { View, TouchableOpacity } from 'react-native';
import { Timestamp } from 'firebase/firestore';
import { Tags } from '@src/models';
import { convertTimestampToDate } from '@src/utils/utils';
import { Switch, Text } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import Icons from '@src/components/Icons';

type Props = {
  groupKey: string;
  title: string;
  date: Timestamp;
  tags: Tags;
  active: boolean;
  completed?: boolean;
};

const NewEventItem = ({ groupKey, title, date, tags, active, completed }: Props) => {
  const renderLabel = () => {
    if (completed) {
      return t('eventGroups.completedEvent', {
        title: title,
      });
    }
    if (date.toMillis() < Timestamp.now().toMillis()) {
      return t('eventGroups.delayedEvent', {
        title: title,
      });
    }
    if (!completed) {
      return t('eventGroups.upcomingEvent', {
        title: title,
      });
    }
  };

  return (
    <>
      <View style={{ height: 1, backgroundColor: 'black', width: '100%' }} />
      <TouchableOpacity
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          opacity: completed ? 0.3 : 1,
        }}
        onPress={() =>
          navigate('EventItem', {
            groupKey: groupKey,
            date: date,
          })
        }>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{renderLabel()}</Text>
        <View
          style={{
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ flex: 2, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{t('eventGroups.date')}</Text>
            <Text>{convertTimestampToDate(date, 'DD-MM-YYYY HH:mm')}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {tags.length > 0 ? (
              <View
                style={{
                  backgroundColor: tags[0].color,
                  borderRadius: 25,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                }}>
                <Text style={{ color: 'white' }}>{tags[0].name}</Text>
              </View>
            ) : (
              <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{t('eventGroups.noTags')}</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {active ? (
              <>
                <Icons name={'active-tick'} />
                <Text style={{ fontWeight: '700', color: 'green' }}>{t('eventGroups.active')}</Text>
              </>
            ) : (
              <>
                <Icons name={'active-untick'} />
                <Text style={{ fontWeight: '700', color: 'red' }}>{t('eventGroups.inactive')}</Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default NewEventItem;
