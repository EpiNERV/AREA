import React, { useState } from "react";
import { View, StyleProp, ViewStyle, TextStyle } from "react-native";
import Spacer from "@/components/Spacer";
import { Button, Text, TextInput, withTheme } from "react-native-paper";
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { HelloWave } from "@/components/HelloWave";

const Login = ({ theme }: Readonly<{ theme: ThemeProp }>) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors ? theme.colors.background : undefined,
      }}
    >
      <View style={{
        flex: 1,
        margin: 20,
      }}>
        <Spacer size={40}/>
        <Text variant="displayMedium">Welcome Back <HelloWave /></Text>
        <Spacer />
        <Text variant="bodyLarge">Sign in to start managing your project</Text>
        <Spacer size={40} />
        
        <TextInput
          label={"Email"}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Spacer />
        
        <TextInput
          label={"Password"}
          secureTextEntry={!passwordVisible}
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye-off" : "eye"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
        <Spacer />
        
        <Button
          mode="contained"
          contentStyle={buttonContentStyle}
          labelStyle={buttonTextStyle}
          style={buttonStyle}
        >
          Submit
        </Button>
      </View>
    </View>
  );
}

const buttonStyle: StyleProp<ViewStyle> = {
  width: '70%',
  marginVertical: 4,
  alignSelf: 'center',
};

const buttonContentStyle: StyleProp<ViewStyle> = {
  flexDirection: "row-reverse",
  paddingVertical: 3,
  paddingHorizontal: 8,
  marginVertical: 2,
};

const buttonTextStyle: StyleProp<TextStyle> = {
  fontSize: 16,
};

export default withTheme(Login);
