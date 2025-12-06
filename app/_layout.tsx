import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
    <PaperProvider>
      <SafeAreaProvider>
        <RouteGuard>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </RouteGuard>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
