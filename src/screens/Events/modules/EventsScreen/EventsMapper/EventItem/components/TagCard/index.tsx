import { Text } from '@rneui/themed';
import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { Tag } from '@src/models';
import { pickColorBasedOnRGB } from '@src/utils/utils';
import { View, StyleSheet } from 'react-native';

type TagCardProps = {
  tag?: Tag;
};

const TagCard = ({ tag }: TagCardProps) => {
  const { light, dark } = useThemeColors();
  return (
    <View style={styles.container}>
      {tag ? (
        <View style={[styles.nameContainer, { backgroundColor: tag.color }]}>
          <Text
            style={[styles.name, { color: pickColorBasedOnRGB(tag.color, light, dark) }]}
            numberOfLines={1}>
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
