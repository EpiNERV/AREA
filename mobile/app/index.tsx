import { SafeAreaView, View } from "react-native";
import { withTheme, Text, Button} from "react-native-paper";
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { Link, useNavigation } from 'expo-router';
import { useEffect } from 'react';

const Home = ({ theme }: Readonly<{ theme: ThemeProp }>) => {
  const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({ headerShown: false });
  // }, [navigation]);


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.colors ? theme.colors.background : undefined,
      }}>
      <View
        style={{
          alignItems: "center",
        }}>
        <Text>Welcome</Text>
        <Link href="/login" asChild>
          <Button mode="contained">Login</Button>
        </Link>
        <Link href="/register" asChild>
          <Button mode="contained">Register</Button>
        </Link>
      </View>
    </View>
  );
}

export default withTheme(Home)
