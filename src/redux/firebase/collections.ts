import { CollectionReference, collection } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { EventConverter, ConnectedUser } from '@src/models';

export const eventsCollection = collection(db, 'events').withConverter(EventConverter);

// export const connectedUsersCollection(uid: string): CollectionReference<ConnectedUser> {
//     return collection(db, `users/${uid}/connectedUsers`).withConverter
// }
