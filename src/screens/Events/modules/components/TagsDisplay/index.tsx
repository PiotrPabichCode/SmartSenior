import { View, Text } from 'react-native';
import { Tags } from '@src/models';
import { t } from '@src/localization/Localization';
import { TagCard } from '@src/components';

type Props = {
  selectedTags: Tags;
  fieldName?: string;
  onPress?: any;
  disabled?: boolean;
};

const TagsDisplay = ({ selectedTags, fieldName, onPress, disabled }: Props) => {
  return (
    selectedTags.length > 0 && (
      <View style={{ gap: 10 }} pointerEvents={disabled ? 'none' : 'auto'}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          {t('tags.selected')}
        </Text>
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
