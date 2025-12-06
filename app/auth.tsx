import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { supabase } from "../lib/supabase";

export default function Auth() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  async function signInWithEmail() {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Sign in failed", error.message);
    } else {
      router.replace("/");
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Sign up failed", error.message);
    } else if (!session) {
      Alert.alert("Check your email", "Please verify your email to continue");
    }
    setLoading(false);
  }

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={isSignUp ? "account-plus" : "account-lock"}
              size={48}
              color="#2563eb"
            />
          </View>
          <Text variant="headlineLarge" style={styles.title}>
            {isSignUp ? "Create Account" : "Welcome Back"}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {isSignUp ? "Sign up to get started" : "Sign in to your account"}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              mode="outlined"
              label="Enter your email"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
              style={styles.input}
              outlineColor="#e5e7eb"
              activeOutlineColor="#2563eb"
              left={<TextInput.Icon icon="email" />}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              mode="outlined"
              label="Enter your password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              editable={!loading}
              style={styles.input}
              outlineColor="#e5e7eb"
              activeOutlineColor="#2563eb"
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
          </View>

          {/* Primary Button */}
          <Button
            mode="contained"
            onPress={isSignUp ? signUpWithEmail : signInWithEmail}
            disabled={loading}
            loading={loading}
            style={styles.primaryButton}
            labelStyle={styles.buttonLabel}
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>

          {/* Toggle Auth Mode */}
          <View style={styles.toggleContainer}>
            <Text variant="bodyMedium" style={styles.toggleText}>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </Text>
            <Button
              mode="text"
              onPress={() => {
                setIsSignUp(!isSignUp);
                setEmail("");
                setPassword("");
              }}
              labelStyle={styles.toggleButton}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text variant="bodySmall" style={styles.footerText}>
            By continuing, you agree to our Terms of Service
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 48,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    color: "#1f2937",
  },
  subtitle: {
    color: "#6b7280",
    textAlign: "center",
  },
  formSection: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f9fafb",
  },
  primaryButton: {
    marginTop: 8,
    paddingVertical: 8,
    backgroundColor: "#2563eb",
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  toggleText: {
    color: "#6b7280",
  },
  toggleButton: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    color: "#9ca3af",
    textAlign: "center",
  },
});
