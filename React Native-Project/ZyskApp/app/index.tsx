import { useAuth } from "@/src/hooks/useAuth";
import { Redirect, Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function Layout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href="/(app)/home" />;
}
