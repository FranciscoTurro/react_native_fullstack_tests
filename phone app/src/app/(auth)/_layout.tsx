import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Text } from 'react-native';

export default function Layout() {
  const { authState, isLoading } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!authState.authenticated) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack />;
}
