import { View, StyleSheet } from 'react-native';
import { Tags } from '@src/models';
import { t } from '@src/localization/Localization';
import TagCard from '@src/components/TagCard';
import { Text } from '@rneui/themed';

type Props = {
  selectedTags: Tags;
  fieldName?: string;
  onPress?: any;
  disabled?: boolean;
};

const TagsDisplay = ({ selectedTags, fieldName, onPress, disabled }: Props) => {
  return (
    selectedTags.length > 0 && (
      <View style={styles.container} pointerEvents={disabled ? 'none' : 'auto'}>
        <Text style={styles.label}>{t('tags.selected')}</Text>
        {selectedTags.map((tag, index) => {
          return (
            <TagCard
              key={index}
              color={tag.color}
              name={tag.name}
              id={tag.id}
              onPress={() => {
                onPress &&
                  onPress(
                    fieldName,
                    selectedTags.filter(t => t.id !== tag.id),
                  );
              }}
            />
          );
        })}
      </View>
    )
  );
};

export default TagsDisplay;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: '100%',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
