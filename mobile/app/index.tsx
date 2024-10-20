import { View, Image, StyleProp, ViewStyle, TextStyle } from "react-native";
import { withTheme, Button} from "react-native-paper";
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { Link } from 'expo-router';
import Spacer from "@/components/Spacer";

const Home = ({ theme }: Readonly<{ theme: ThemeProp }>) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors ? theme.colors.background : undefined,
      }}>
      <View
        style={{
          alignItems: "center",
        }}>
        <Spacer size={50} />
        <Image style={{ height: 300}} resizeMode="contain" source={require("@/assets/images/welcome.png")}></Image>
        <Spacer size={75} />
        <Link href="/login" asChild>
          <Button mode="contained" contentStyle={buttonContentStyle} labelStyle={buttonTextStyle} style={buttonStyle}>Login</Button>
        </Link>
        <Spacer />
        <Link href="/register" asChild>
          <Button mode="contained" contentStyle={buttonContentStyle} labelStyle={buttonTextStyle} style={buttonStyle}>Register</Button>
        </Link>
      </View>
    </View>
  );
};

const buttonStyle: StyleProp<ViewStyle> = {
  width: '80%',
  marginVertical: 5,
};

const buttonContentStyle: StyleProp<ViewStyle> = {
  flexDirection: "row-reverse",
  paddingVertical: 6,
  paddingHorizontal: 16,
  marginVertical: 5,
};

const buttonTextStyle: StyleProp<TextStyle> = {
  fontSize: 18,
};

export default withTheme(Home)
