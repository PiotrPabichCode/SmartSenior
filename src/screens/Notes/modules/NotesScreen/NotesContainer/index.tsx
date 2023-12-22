import { View } from 'react-native';
import { NotesContainerProps } from './types';
import { useAppSelector } from '@src/redux/types';
import { selectNotesStatus } from '@src/redux/notes/notes.slice';
import { CustomActivityIndicator } from '@src/components';
import NotesMapper from './NotesMapper';

const NotesContainer = ({ notes, elementsPerLine }: NotesContainerProps) => {
  const status = useAppSelector(state => selectNotesStatus(state));

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  return (
    <View>
      <NotesMapper notes={notes} elementsPerLine={elementsPerLine} />
    </View>
  );
};

export default NotesContainer;
