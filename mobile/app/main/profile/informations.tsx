import { View } from "react-native";
import { Text, withTheme} from "react-native-paper";
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

const Informations = ({ theme }: Readonly<{ theme: ThemeProp }>) => {
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
          Profile Information
        </Text>
      </View>
    </View>
  )
};

export default withTheme(Informations);
