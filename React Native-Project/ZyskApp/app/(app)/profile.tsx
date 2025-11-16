import { useAuth } from "@/src/hooks/useAuth";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, Text, View, ActivityIndicator } from "react-native";

export default function Profile() {
  const { user, loading, logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/auth/login");
  };

  const handleLogin = () => {
    router.replace("/auth/login");
  };

  // 🔥 Show loading screen while user is being fetched from AsyncStorage
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-3 text-gray-600">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 px-6 py-10">
      {user ? (
        <View className="items-center">
          <View className="bg-white p-6 rounded-2xl w-full mb-8 shadow-md flex-row items-center">
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              }}
              className="w-16 h-16 rounded-full mr-4"
            />
            <View>
              <Text className="text-lg font-semibold text-gray-900">
                {user.name}
              </Text>
              <Text className="text-gray-600">{user.email}</Text>
            </View>
          </View>

          <View className="w-full bg-white rounded-2xl shadow-sm mb-6">
            {[
              { label: "My Orders", icon: "box-open" },
              { label: "Saved Addresses", icon: "map-marker-alt" },
              { label: "Payment Methods", icon: "credit-card" },
              { label: "Help & Support", icon: "headset" },
            ].map((item, index) => (
              <Pressable
                key={index}
                className="flex-row justify-between items-center px-5 py-4 border-b border-gray-100 active:bg-gray-50"
              >
                <View className="flex-row items-center space-x-3">
                  <FontAwesome5
                    name={item.icon as any}
                    size={18}
                    color="#374151"
                  />
                  <Text className="text-base text-gray-800">{item.label}</Text>
                </View>

                <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                  <FontAwesome5 name="chevron-right" size={14} color="#6B7280" />
                </View>
              </Pressable>
            ))}
          </View>

          <Pressable
            onPress={handleLogout}
            className="bg-blue-500 w-2/3 py-3 rounded-full shadow-md"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Logout
            </Text>
          </Pressable>
        </View>
      ) : (
        <View className="items-center justify-center flex-1">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png",
            }}
            className="w-28 h-28 mb-6 opacity-80"
          />
          <Text className="text-gray-600 text-base mb-4">
            You’re not logged in.
          </Text>
          <Pressable
            onPress={handleLogin}
            className="bg-blue-500 w-2/3 py-3 rounded-full shadow-md"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Login to another account
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
