import { navigate } from '@src/navigation/navigationUtils';
import { StyleSheet, View } from 'react-native';
import { Tags } from '@src/models';
import { t } from '@src/localization/Localization';
import AddTagButton from '../AddTagButton';
import TagCard from '@src/components/TagCard';
import { Text } from '@rneui/themed';

type TagsMapperProps = {
  tags: Tags;
};

const TagsMapper = ({ tags }: TagsMapperProps) => {
  return (
    <View style={styles.container}>
      <AddTagButton />
      <Text style={styles.title}>{t('tags.title')}</Text>
      {tags.map((tag, index) => {
        return (
          <TagCard
            key={index}
            name={tag.name}
            color={tag.color}
            id={tag.id}
            onPress={() =>
              navigate('TagScreen', {
                key: tag.id,
              })
            }
          />
        );
      })}
    </View>
  );
};

export default TagsMapper;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
