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

type MainLayoutProps = {
  routes: {
    name: string;
    options: object;
  }[];
};

export default function MainLayout({ routes }: MainLayoutProps) {
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
        {routes.map((route) => (
          <Stack.Screen
            key={route.name}
            name={route.name}
            options={route.options}
          />
        ))}
      </Stack>
    </PaperProvider>
  );
}
