import { Note, Notes } from '@src/models';
import { useEffect, useState } from 'react';

export const useSortNotes = (notes: Notes) => {
  const [sortedNotes, setSortedNotes] = useState(notes);
  const [sortBy, setSortBy] = useState<keyof Note>('createdAt');
  const [sortType, setSortType] = useState<-1 | 1>(-1);
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

  return {
    sortedNotes,
    sortBy,
    sortType,
    setSortBy,
    setSortType,
  };
};
