import { t } from '@src/localization/Localization';
import { Tag } from '@src/models';
import { View, Text } from 'react-native';

type Props = {
  tag?: Tag;
};

const TagCard = ({ tag }: Props) => {
  return (
    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
      {tag ? (
        <View
          style={{
            backgroundColor: tag.color,
            borderRadius: 25,
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          <Text style={{ color: 'white' }} numberOfLines={1}>
            {tag.name}
          </Text>
        </View>
      ) : (
        <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{t('eventGroups.noTags')}</Text>
      )}
    </View>
  );
};

export default TagCard;
