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
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '90%',
    elevation: 5,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 25,
  },
});
