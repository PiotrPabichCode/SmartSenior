import { type DocumentData, type QuerySnapshot } from 'firebase/firestore';

export const getDocs = (snapshot: QuerySnapshot<DocumentData, DocumentData>) => {
  return snapshot.docs.map(doc => doc.data());
};
