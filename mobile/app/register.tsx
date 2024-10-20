import { HelloWave } from "@/components/HelloWave";
import { View } from "react-native";
import { Text, withTheme } from "react-native-paper";
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

const register = ({ theme }: Readonly<{ theme: ThemeProp }>) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors ? theme.colors.background : undefined,
      }}
    >
      <Text variant="displayMedium">Welcome <HelloWave /></Text>
    </View>
  );
}

export default withTheme(register);
