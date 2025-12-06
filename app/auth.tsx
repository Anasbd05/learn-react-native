import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import tw from "twrnc";

const Auth = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const handleSwitchMode = () => {
    setIsSignup((prev) => !prev);
  };
  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-gray-100 `}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={tw`px-[16px] justify-center  flex-1  `}>
        <Text variant="headlineMedium" style={tw`text-center  mb-5`}>
          {isSignup ? "Create account" : " Welcome Back"}{" "}
        </Text>
        <TextInput
          style={tw`mb-4 `}
          autoCapitalize="none"
          label="Email"
          keyboardType="email-address"
          placeholder="example@gmail.com"
          mode="outlined"
        />
        <TextInput
          autoCapitalize="none"
          style={tw`mb-4 `}
          label="Password"
          keyboardType="visible-password"
          mode="outlined"
        />
        <Button style={tw`mt-2`} mode="contained">
          {isSignup ? "Sign Up" : "Sign In"}
        </Button>
        <Button style={tw`mt-4`} mode="text" onPress={handleSwitchMode}>
          {isSignup
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Auth;
