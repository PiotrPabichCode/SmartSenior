import Icons from '@src/components/Icons';
import { t } from '@src/localization/Localization';
import { View, Text } from 'react-native';

type Props = {
  active: boolean;
};

const ActivityStatus = ({ active }: Props) => {
  return (
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
  );
};

export default ActivityStatus;
