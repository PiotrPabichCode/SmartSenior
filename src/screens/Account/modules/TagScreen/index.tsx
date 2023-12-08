import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { TagScreenProps as TagScreenProps } from '@src/navigation/types';
import { ScrollView } from 'react-native';
import { useStyles } from './styles';
import { useActiveTag } from './useActiveTag';
import TagForm from './TagForm';

const TagScreen = ({ route }: TagScreenProps) => {
  const styles = useStyles();
  const key = route.params?.key;
  const { isReady, activeTag } = useActiveTag(key);

  if (!isReady) {
    return <CustomActivityIndicator />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <TagForm isUpdate={!!key} tag={activeTag} />
    </ScrollView>
  );
};

export default TagScreen;
