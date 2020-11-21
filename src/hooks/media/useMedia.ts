import { useCallback, useState } from 'react';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { useAuthentication } from '../auth';

export const useMedia = () => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { userId } = useAuthentication();
  const uploadMedia = useCallback(
    async ({ path, file }) => {
      setLoading(true);
      setLoaded(false);
      const { uploadTaskSnapshot } = await firebase.uploadFile(path, file);
      const ref = firebase.storage().ref(uploadTaskSnapshot.metadata.fullPath);
      const url = await ref.getDownloadURL();
      const dirtyMetadata = await ref.getMetadata();
      const metadata = JSON.parse(JSON.stringify(dirtyMetadata)); // remove undefined fields;

      await firestore
        .collection('media')
        .add({ url, metadata, createdBy: userId });
      setLoading(false);
      setLoaded(true);
      return true;
    },
    [firebase, firestore, userId],
  );
  const getMediaData = useCallback(
    async docPath => {
      const ref = await firestore.doc(docPath).get();
      return ref.data();
    },
    [firestore],
  );

  return {
    loaded,
    loading,
    uploadMedia,
    getMediaData,
  };
};
