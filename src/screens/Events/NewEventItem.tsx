import { View, TouchableOpacity } from 'react-native';
import { Timestamp } from 'firebase/firestore';
import { Tags } from '@src/models';
import { convertTimestampToDate } from '@src/utils/utils';
import { Switch, Text } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';

type Props = {
  groupKey: string;
  title: string;
  date: Timestamp;
  tags: Tags;
  active: boolean;
};

const NewEventItem = ({ groupKey, title, date, tags, active }: Props) => {
  return (
    <>
      <View style={{ height: 1, backgroundColor: 'black', width: '100%' }} />
      <TouchableOpacity
        style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', gap: 5 }}
        onPress={() =>
          navigate('EventItem', {
            groupKey: groupKey,
            date: date,
          })
        }>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
          {t('eventGroups.upcomingEvent', {
            title: title,
          })}
        </Text>
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
          <Switch value={active} />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default NewEventItem;
