import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useRouter, useSegments } from "expo-router";
import { Pressable, Image, View, Dimensions } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import SearchBox from "@/components/SearchBox";
import { Colors } from "@/constants/theme";
import useColorScheme from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { PanGestureHandler } from "react-native-gesture-handler";

const queryClient = new QueryClient();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [searchText, setSearchText] = useState("");

  const router = useRouter();
  const segments = useSegments();

  const TABS = ["home", "category", "wallet", "profile"];

  const activeTab = segments[1]; 
  const index = TABS.indexOf(activeTab);

  const SWIPE_THRESHOLD = 80;
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const EDGE_ONLY = false;

  const onHandlerStateChange = (e: any) => {
    const { translationX, oldState, x } = e.nativeEvent;

    if (oldState === 4) {
      if (EDGE_ONLY) {
        const EDGE_MARGIN = 30;
        if (x > EDGE_MARGIN && x < SCREEN_WIDTH - EDGE_MARGIN) return;
      }

      if (translationX < -SWIPE_THRESHOLD && index < TABS.length - 1) {
        const nextTab = TABS[index + 1];
        router.push(`/${nextTab}`);
      }

      if (translationX > SWIPE_THRESHOLD && index > 0) {
        const prevTab = TABS[index - 1];
        router.push(`/${prevTab}`);
      }
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PanGestureHandler
        onHandlerStateChange={onHandlerStateChange}
        activeOffsetX={[-70, 70]}
      >
        <View style={{ flex: 1 }}>
          <Tabs
            screenOptions={{
              tabBarHideOnKeyboard: true,
              tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
              headerShown: useClientOnlyValue(false, true),
              tabBarStyle: {
                paddingVertical: 10,
                paddingBottom: 10,
                height: 60,
                bottom: 30,
                borderRadius: 20,
                marginEnd: 5,
                marginLeft: 10,
                position: "absolute",
                backgroundColor: Colors[colorScheme ?? "light"].background,
              },
              tabBarItemStyle: {
                paddingVertical: 4,
                paddingHorizontal: 2,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "bold",
                textTransform: "lowercase",
              },
            }}
          >
            <Tabs.Screen
              name="home"
              options={{
                title: "Home",
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="home" color={color} />
                ),
                headerBackground: () => (
                  <LinearGradient
                    colors={["#9333ea", "#6b21a8", "#8e6ea7ff"]}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                ),
                headerTitle: () => (
                  <View style={{ width: "100%", paddingTop: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 12,
                        paddingHorizontal: 10,
                      }}
                    >
                      <Image
                        source={require("../../assets/images/logo.png")}
                        style={{
                          width: 100,
                          height: 30,
                          marginLeft: -40,
                          paddingTop: 10,
                        }}
                        resizeMode="contain"
                      />

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 15,
                          marginLeft: 160,
                          marginTop: 20,
                        }}
                      >
                        <Link href="/wishlist" asChild>
                          <Pressable>
                            {({ pressed }) => (
                              <FontAwesome
                                name="heart-o"
                                size={20}
                                color="#fff"
                                style={{ opacity: pressed ? 0.5 : 1 }}
                              />
                            )}
                          </Pressable>
                        </Link>

                        <Link href="/cart" asChild>
                          <Pressable>
                            {({ pressed }) => (
                              <FontAwesome
                                name="shopping-cart"
                                size={20}
                                color="#fff"
                                style={{ opacity: pressed ? 0.5 : 1 }}
                              />
                            )}
                          </Pressable>
                        </Link>

                        <Link href="/modal" asChild>
                          <Pressable>
                            {({ pressed }) => (
                              <FontAwesome
                                name="info-circle"
                                size={20}
                                color="#fff"
                                style={{ opacity: pressed ? 0.5 : 1 }}
                              />
                            )}
                          </Pressable>
                        </Link>
                      </View>
                    </View>

                    <View style={{ paddingHorizontal: 10, marginBottom: 15 }}>
                      <SearchBox
                        value={searchText}
                        onChange={setSearchText}
                      />
                    </View>
                  </View>
                ),
                headerStyle: {
                  height: 155,
                },
              }}
            />

            <Tabs.Screen
              name="category"
              options={{
                title: "category",
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="th-large" color={color} />
                ),
              }}
            />

            <Tabs.Screen
              name="wallet"
              options={{
                title: "Wallet",
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="dollar" color={color} />
                ),
              }}
            />

            <Tabs.Screen
              name="profile"
              options={{
                title: "Profile",
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="user" color={color} />
                ),
              }}
            />
          </Tabs>
        </View>
      </PanGestureHandler>
    </QueryClientProvider>
  );
}
