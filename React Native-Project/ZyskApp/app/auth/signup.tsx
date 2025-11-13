import { View, Text, TextInput, Pressable, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useAuth } from "@/src/hooks/useAuth";

const SignupSchema = z
  .object({
    name: z.string().min(4, "Name is required"),
    email: z
      .string()
      .email("Enter a valid email")
      .transform((val) => val.toLowerCase().trim()),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type SignupForm = z.infer<typeof SignupSchema>;

export default function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const { signupUser, loading } = useAuth();

  const onSubmit = async (data: SignupForm) => {
    const res = await signupUser(data.name, data.email, data.password);

    if (res.success) {
      Toast.show({
        type: "success",
        text1: "🎉 Account created successfully!",
        position: "top",
        visibilityTime: 2500,
      });
      setTimeout(() => router.replace("/auth/login"), 2000);
    } else {
      Toast.show({
        type: "error",
        text1: "❌ " + (res.message || "Something went wrong"),
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6 py-10">
        <Text className="text-3xl font-bold text-purple-700 mb-2 mt-10">
          Create Account
        </Text>
        <Text className="text-gray-500 mb-8">Sign Up To Get Started</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 mb-2 text-base"
              placeholder="Full Name"
              placeholderTextColor="#9CA3AF"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && (
          <Text className="text-red-500 self-start mb-2">
            {errors.name.message}
          </Text>
        )}

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

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 mb-2 text-base"
              placeholder="Confirm Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text className="text-red-500 self-start mb-2">
            {errors.confirmPassword.message}
          </Text>
        )}

         <Pressable
          className="w-[70%] bg-purple-600 rounded-2xl py-3 shadow-md mt-4 items-center justify-center "
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center text-lg font-bold">
            {loading ? "Submitting..." : "Sign Up"}
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
          <Text className="text-gray-500">Already have an account? </Text>
          <Pressable onPress={() => router.navigate("/auth/login")}>
            <Text className="text-blue-600 font-semibold">Login</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
