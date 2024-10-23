import { View } from "react-native";
import { Text, withTheme} from "react-native-paper";
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

const Appearance = ({ theme }: Readonly<{ theme: ThemeProp }>) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors ? theme.colors.background : undefined,
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text variant="headlineMedium">
          Appearance
        </Text>
      </View>
    </View>
  )
};

export default withTheme(Appearance);
