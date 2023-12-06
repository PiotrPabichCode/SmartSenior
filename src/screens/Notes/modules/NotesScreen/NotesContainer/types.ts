import { Notes } from '@src/models';

export interface NotesContainerProps {
  notes: Notes;
  elementsPerLine: number;
}

export const elementsPerLineOptions = [
  { label: 'notesPerLine1', value: 1, multiLang: true },
  { label: 'notesPerLine2', value: 2, multiLang: true },
];
