import { Stack } from 'expo-router';

export default function ProductsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: '#9333ea',
      }}
    >
      <Stack.Screen
        name="products"
        options={{
          headerShown:false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false, 
        }}
      />
    </Stack>
  );
}
