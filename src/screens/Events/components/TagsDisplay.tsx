import { View, Text } from 'react-native';
import { Tags } from '@src/models';
import { t } from '@src/localization/Localization';
import Tag from '@src/screens/Account/Tags/Tag';

type Props = {
  selectedTags: Tags;
  fieldName?: string;
  onPress?: any;
};

const TagsDisplay = ({ selectedTags, fieldName, onPress }: Props) => {
  return (
    selectedTags.length > 0 && (
      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          {t('tags.selected')}
        </Text>
        {selectedTags.map((tag, index) => {
          return (
            <Tag
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
