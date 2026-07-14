import { useEffect } from 'react';
import { useAuth } from './AuthContext';

export function useAuthGuard(navigation) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  }, [isAuthenticated, navigation]);
}
