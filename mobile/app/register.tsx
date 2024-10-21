import React, { useState } from "react";
import { View, StyleProp, ViewStyle, TextStyle, TouchableOpacity } from "react-native";
import { Text, TextInput, Button, HelperText, withTheme } from "react-native-paper";
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { HelloWave } from "@/components/HelloWave";
import Spacer from "@/components/Spacer";
import { Link } from "expo-router";

const Register = ({ theme }: Readonly<{ theme: ThemeProp }>) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isParamsValid = () => {
    return (
      username.length > 0 &&
      email.includes('@') &&
      password.length >= 6 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    );
  };

  const handleRegister = () => {
  };

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
      <Text>Register to start creating and managing your projects.</Text>
      <Spacer size={20} />

      <TextInput
        label="Username"
        mode="outlined"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
        style={inputStyle}
      />
      <HelperText type="error" visible={username.length === 0}>
        Username is required
      </HelperText>

      <TextInput
        label="Email"
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={inputStyle}
      />
      <HelperText type="error" visible={!email.includes('@')}>
        Email address is invalid!
      </HelperText>

      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        style={inputStyle}
      />
      <HelperText type="error" visible={password.length < 6}>
        Password must be at least 6 characters
      </HelperText>

      <TextInput
        label="Confirm Password"
        mode="outlined"
        secureTextEntry
        autoCapitalize="none"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={inputStyle}
      />
      <HelperText type="error" visible={password !== confirmPassword}>
        Passwords do not match
      </HelperText>

      <Button
        mode="contained"
        onPress={handleRegister}
        disabled={!isParamsValid()}
        contentStyle={buttonContentStyle}
        labelStyle={buttonTextStyle}
        style={buttonStyle}
      >
        Agree and Register
      </Button>
      <Spacer size={20} />
      <Text>
        Already have an account?
        <Link href="/login">
          <Text style={{color: theme.colors?.primary}}>  Login now</Text>
        </Link>
      </Text>
    </View>
  );
};

// Styles
const inputStyle: StyleProp<ViewStyle> = {
  width: '80%',
  marginVertical: 8,
};

const buttonStyle: StyleProp<ViewStyle> = {
  width: '70%',
  marginVertical: 4,
  alignSelf: 'center',
};

const buttonContentStyle: StyleProp<ViewStyle> = {
  flexDirection: "row-reverse",
  paddingVertical: 8,
  paddingHorizontal: 16,
};

const buttonTextStyle: StyleProp<TextStyle> = {
  fontSize: 16,
};

export default withTheme(Register);
