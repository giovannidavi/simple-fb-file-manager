import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';

export const useAuthentication = () => {
  const firebase = useFirebase();
  const isAuthenticated = useSelector(
    (state: any) => state.firebase.auth && !state.firebase.auth.isEmpty,
  );
  const profile = useSelector((state: any) => state.firebase.profile);
  const userId = useSelector((state: any) => state.firebase.auth.uid);
  const loaded = useSelector((state: any) => state.firebase.auth.isLoaded);
  const logout = useCallback(() => firebase.logout(), [firebase]);
  const error = useSelector((state: any) => state.firebase.authError);

  return {
    profile,
    loaded,
    userId,
    logout,
    error,
    isAuthenticated,
  };
};
