import React, { useState } from "react";
import { View, StyleProp, ViewStyle, TextStyle } from "react-native";
import Spacer from "@/components/Spacer";
import { Button, Text, TextInput, withTheme } from "react-native-paper";
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { HelloWave } from "@/components/HelloWave";
import { Link, useRouter } from "expo-router";

const Login = ({ theme }: Readonly<{ theme: ThemeProp }>) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors ? theme.colors.background : undefined,
      }}
    >
      <Text variant="displayMedium">Welcome Back <HelloWave /></Text>
      <Spacer />
      <Text variant="bodyLarge">Sign in to start managing your project</Text>
      <Spacer size={40} />
      
      <TextInput
        label={"Email"}
        keyboardType="email-address"
        autoCapitalize="none"
        style={inputStyle}
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
        style={inputStyle}
      />
      <Spacer size={75}/>
      
      <Button
        mode="contained"
        contentStyle={buttonContentStyle}
        labelStyle={buttonTextStyle}
        style={buttonStyle}
        onPress={() => {router.replace("/main")}}
      >
        Submit
      </Button>
      
      <Spacer size={40}/>
      <Text>
        Don't have an account?
        <Link href="/welcome/register">
          <Text style={{color: theme.colors?.primary}}>  Register now</Text>
        </Link>
      </Text>
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

const inputStyle: StyleProp<ViewStyle> = {
  width: '80%',
  marginVertical: 8,
};
export default withTheme(Login);
