import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useColorScheme } from 'react-native';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { Stack } from 'expo-router';
import CustomAppBar from '@/components/CustomAppBar';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme: ThemeProp =
  colorScheme === 'dark'
    ? { ...MD3DarkTheme, colors: theme.dark }
    : { ...MD3LightTheme, colors: theme.light };

  return (
    <PaperProvider theme={paperTheme}>
      <Stack
        screenOptions={{
          header: (props) => <CustomAppBar {...props} />,
        }}
      >
        <Stack.Screen name="login" options={{ title: "Login"}} />
        <Stack.Screen name="register" options={{ title: "Register"}} />
      </Stack>
    </PaperProvider>
  );
}
