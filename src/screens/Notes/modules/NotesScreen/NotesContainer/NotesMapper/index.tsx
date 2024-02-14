import { Notes } from '@src/models';
import { StyleSheet, View } from 'react-native';
import NotesCard from './NotesCard';

type NotesMapperProps = {
  notes: Notes;
  elementsPerLine: number;
};

const NotesMapper = ({ notes, elementsPerLine }: NotesMapperProps) => {
  const rows = [];
  const numNotes = notes.length;
  const elementsInLine = Math.min(elementsPerLine, numNotes);

  for (let i = 0; i < numNotes; i += elementsInLine) {
    const elements = [];
    let notesInLine = 0;
    for (let j = i; j < i + elementsInLine; j++) {
      if (j < numNotes) {
        const note = notes[j];
        elements.push(
          <NotesCard
            key={'note' + j}
            noteKey={note.key}
            description={note.description}
            title={note.title}
            updatedAt={note.updatedAt}
            createdAt={note.createdAt}
            extended={elementsInLine === 1 || (j + 1 === numNotes && notesInLine === 0)}
          />,
        );
        notesInLine++;
      }
    }

    rows.push(
      <View key={`row_${i / elementsInLine}`} style={styles.item}>
        {elements}
      </View>,
    );
  }
  return rows;
};

export default NotesMapper;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    width: '100%',
  },
});
