import { View } from "react-native";
import { withTheme, Text, Appbar} from "react-native-paper";
import { ThemeProp } from 'react-native-paper/lib/typescript/types';


function Home({ theme }: Readonly<{ theme: ThemeProp }>) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors ? theme.colors.background : undefined,
      }}>
      <Appbar.Header>
        <Appbar.Content title="Home" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text>Welcome</Text>
      </View>
    </View>
  );
}

export default withTheme(Home)
