import { View, Text, TextInput, Pressable, Image } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useAuth } from "@/src/hooks/useAuth";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address").transform((val) => val.toLocaleLowerCase().trim()),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof LoginSchema>;

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { loginUser, loading } = useAuth();

  const onSubmit = async (data: LoginForm) => {
    const res = await loginUser(data.email, data.password);

    if (res.success) {
      Toast.show({
        type: "success",
        text1: "✅ Login successful!",
        position: "top",
        visibilityTime: 2500,
      });

      setTimeout(() => router.replace("/(app)/home"), 2000);
    } else {
      Toast.show({
        type: "error",
        text1: "❌ " + (res.message || "Invalid credentials"),
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold text-purple-700 mb-2">
        Welcome Back
      </Text>
      <Text className="text-gray-500 mb-8">Sign In To Get Started</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 mb-2 text-base"
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && (
        <Text className="text-red-500 self-start mb-2">
          {errors.email.message}
        </Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 mb-2 text-base"
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && (
        <Text className="text-red-500 self-start mb-2">
          {errors.password.message}
        </Text>
      )}

      <Pressable className="self-end mb-6">
        <Text className="text-blue-600 font-semibold">Forgot Password?</Text>
      </Pressable>

      <Pressable
        className="w-[70%] bg-purple-600 rounded-2xl py-3 shadow-md"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-center text-lg font-semibold">
          {loading ? "Logging in..." : "Login"}
        </Text>
      </Pressable>

      <View className="flex-row items-center my-6 w-full">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-3 text-gray-500">OR</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>
      <View className="flex-row justify-between w-full gap-4">
        <Pressable className="flex-1 border border-gray-300 rounded-2xl py-3 flex-row justify-center items-center">
          <Image
            source={require("@/assets/images/google.png")}
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          <Text className="text-gray-700 font-semibold">Google</Text>
        </Pressable>

        <Pressable className="flex-1 border border-gray-300 rounded-2xl py-3 flex-row justify-center items-center">
          <Image
            source={require("@/assets/images/linkedin.png")}
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          <Text className="text-gray-700 font-semibold">LinkedIn</Text>
        </Pressable>
      </View>

      <View className="flex-row mt-6">
        <Text className="text-gray-500">Don’t have an account? </Text>
        <Pressable onPress={() => router.navigate("/auth/signup")}>
          <Text className="text-blue-600 font-semibold">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}
