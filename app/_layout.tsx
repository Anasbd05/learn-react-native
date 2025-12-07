import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import tw from "twrnc";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const isAuth = true;
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace("/auth");
    }
  });
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={tw`flex-1`}>
      <PaperProvider>
        <SafeAreaProvider>
          <RouteGuard>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </RouteGuard>
        </SafeAreaProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
