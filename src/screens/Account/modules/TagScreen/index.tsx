import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { TagScreenProps as TagScreenProps } from '@src/navigation/types';
import { ScrollView, StyleSheet } from 'react-native';
import { useActiveTag } from './useActiveTag';
import TagForm from './TagForm';

const TagScreen = ({ route }: TagScreenProps) => {
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
