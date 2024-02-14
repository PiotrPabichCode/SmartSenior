import { ScrollView, StyleSheet, View } from 'react-native';
import NotesContainer from './NotesContainer';
import { Text } from '@rneui/themed';
import { useAppSelector } from '@src/redux/types';
import { selectNotes } from '@src/redux/notes/notes.slice';
import EmptyNotes from './EmptyNotes';
import CustomDropdown from '@src/components/CustomDropdown';
import { useState } from 'react';
import { elementsPerLineOptions } from './NotesContainer/types';
import { t } from '@src/localization/Localization';
import { sortOptions, sortTypes } from './types';
import { useSortNotes } from './useSortNotes';
import useThemeColors from '@src/config/useThemeColors';

const NotesScreen = () => {
  const styles = useStyles();
  const notes = useAppSelector(state => selectNotes(state));
  const [elementsPerLine, setElementsPerLine] = useState(1);
  const { sortedNotes, sortBy, sortType, setSortType, setSortBy } = useSortNotes(notes);

  if (notes.length === 0) {
    return <EmptyNotes />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleAndElementsPerLine}>
        <Text h4 style={styles.title}>
          {t('yourNotes')}
        </Text>
        <CustomDropdown
          data={elementsPerLineOptions}
          value={elementsPerLine}
          viewStyle={{ flex: 1 }}
          handleChange={e => setElementsPerLine(e.value)}
        />
      </View>
      <View style={styles.sortContainer}>
        <View style={styles.sortSingleItemContainer}>
          <Text h4 h4Style={styles.sortOptionsText}>
            {t('sortBy')}
          </Text>
          <CustomDropdown
            data={sortOptions}
            value={sortBy}
            handleChange={e => setSortBy(e.value)}
          />
        </View>
        <View style={styles.sortSingleItemContainer}>
          <Text h4 h4Style={styles.sortOptionsText}>
            {t('sortType')}
          </Text>
          <CustomDropdown
            data={sortTypes}
            value={sortType}
            handleChange={e => setSortType(e.value)}
          />
        </View>
      </View>

      <NotesContainer notes={sortedNotes} elementsPerLine={elementsPerLine} />
    </ScrollView>
  );
};

export default NotesScreen;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme.cardBackground,
      gap: 10,
    },
    titleAndElementsPerLine: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
    },
    title: {
      flex: 1,
      textAlign: 'center',
    },
    sortContainer: {
      flexDirection: 'row',
      margin: 10,
    },
    sortSingleItemContainer: {
      flex: 1,
      alignItems: 'center',
      gap: 10,
    },
    sortOptionsText: {
      fontSize: 20,
    },
  });
