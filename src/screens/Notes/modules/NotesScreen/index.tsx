import { ScrollView, View } from 'react-native';
import NotesContainer from './NotesContainer';
import { Text } from '@rneui/themed';
import { useAppSelector } from '@src/redux/types';
import { selectNotes } from '@src/redux/notes/notes.slice';
import EmptyNotes from './EmptyNotes';
import CustomDropdown from '@src/components/CustomDropdown';
import { useEffect, useState } from 'react';
import { elementsPerLineOptions } from './NotesContainer/types';
import { t } from '@src/localization/Localization';
import { Note } from '@src/models';
import { sortOptions, sortTypes } from './types';
import { useStyles } from './styles';

const NotesScreen = () => {
  const notes = useAppSelector(state => selectNotes(state));
  const [elementsPerLine, setElementsPerLine] = useState(1);
  const [sortBy, setSortBy] = useState<keyof Note>('createdAt');
  const [sortType, setSortType] = useState<-1 | 1>(-1);
  const [sortedNotes, setSortedNotes] = useState(notes);
  const styles = useStyles();

  if (notes.length === 0) {
    return <EmptyNotes />;
  }

  useEffect(() => {
    setSortedNotes(
      [...notes].sort((a, b) => {
        if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
          return (a[sortBy].toMillis() - b[sortBy].toMillis()) * sortType;
        }
        if (a[sortBy] < b[sortBy]) {
          return -1 * sortType;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1 * sortType;
        }
        return 0;
      }),
    );
  }, [sortBy, sortType, notes]);

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
          handleChange={(e: any) => setElementsPerLine(e.value)}
        />
      </View>
      <View style={styles.sortContainer}>
        <View style={styles.sortSingleItemContainer}>
          <Text style={styles.boldedText}>{t('sortBy')}</Text>
          <CustomDropdown
            data={sortOptions}
            value={sortBy}
            handleChange={(e: any) => setSortBy(e.value)}
          />
        </View>
        <View style={styles.sortSingleItemContainer}>
          <Text style={styles.boldedText}>{t('sortType')}</Text>
          <CustomDropdown
            data={sortTypes}
            value={sortType}
            handleChange={(e: any) => setSortType(e.value)}
          />
        </View>
      </View>

      <NotesContainer notes={sortedNotes} elementsPerLine={elementsPerLine} />
    </ScrollView>
  );
};

export default NotesScreen;
