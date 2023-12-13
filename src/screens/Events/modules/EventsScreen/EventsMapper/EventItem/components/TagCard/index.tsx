import { t } from '@src/localization/Localization';
import { Tag } from '@src/models';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  tag?: Tag;
};

const TagCard = ({ tag }: Props) => {
  return (
    <View style={styles.container}>
      {tag ? (
        <View style={[styles.nameContainer, { backgroundColor: tag.color }]}>
          <Text style={styles.name} numberOfLines={1}>
            {tag.name}
          </Text>
        </View>
      ) : (
        <Text style={styles.noTags}>{t('eventGroups.noTags')}</Text>
      )}
    </View>
  );
};

export default TagCard;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  name: {
    color: 'white',
  },
  noTags: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});
