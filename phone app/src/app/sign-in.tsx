import { router } from 'expo-router';
import { Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function SignIn() {
  const { onLogin } = useAuth();
  const [state, setState] = useState({ username: '', password: '' });
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        className="m-4 p-4 border-2 border-black"
        style={{ height: 40 }}
        placeholder="Username"
        onChangeText={(newState) =>
          setState({ username: newState, password: state.password })
        }
        defaultValue={state.username}
      />
      <TextInput
        className="m-4 p-4 border-2 border-black"
        style={{ height: 40 }}
        placeholder="Password"
        onChangeText={(newState) =>
          setState({ username: state.username, password: newState })
        }
        defaultValue={state.password}
      />
      <Text
        className="bg-red-400 rounded-md p-2"
        onPress={() => {
          onLogin(state.username, state.password);
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/');
        }}
      >
        Sign In
      </Text>
    </View>
  );
}
