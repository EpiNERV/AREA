import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { Icon, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import CustomDrawerAppBar from '@/components/CustomDrawerAppBar';
import { DrawerHeaderProps } from '@react-navigation/drawer';

export default function HomeLayout() {

  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme: ThemeProp =
  colorScheme === 'dark'
  ? { ...MD3DarkTheme, colors: theme.dark }
  : { ...MD3LightTheme, colors: theme.light };

  const routesIcons = (source: any) => {
    return (
      <Icon
        source={source}
        color={paperTheme.colors?.onSurface}
        size={20}
      />
    );
  }

  const routes = [
    { name: 'index', options: { title: 'Home', drawerIcon: () => (routesIcons("home")) } },
    { name: 'documentation', options: { title: 'Documentation' } },
    { name: 'admin/settings', options: { title: 'Backend settings' } },
    { name: 'admin/users', options: { title: 'Users Management' } },
    { name: 'appearance', options: { title: 'Appearance' } },
    { name: 'profile/informations', options: { title: 'Profile informations' } },
    { name: 'profile/services', options: { title: 'Services' } },
  ];

  const customHeader = (props: DrawerHeaderProps) => <CustomDrawerAppBar {...props} />;

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={paperTheme}>
        <Drawer
          screenOptions={{
            header: customHeader
          }}
        >
          {routes.map((route) => (
            <Drawer.Screen
              name={route.name}
              key={route.name}
              options={route.options}
            />
          ))}
        </Drawer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
