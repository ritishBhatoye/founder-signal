import { signInSchema } from "@/utils/validations/auth-schema";
import { FormikProps, useFormik } from "formik";
import React from "react";
import { Keyboard, View, Text, Pressable } from "react-native";
import { Button, InputGroup } from "../atoms";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

interface SignInFormProps {
  isLoading: boolean;
  onSubmit: (values: SignInFormTypes) => void;
  onMagicLinkSignIn: (email: string) => void;
  onSocialSignIn: (provider: "google" | "apple") => void;
}

const SignInForm = ({
  isLoading,
  onSubmit,
  onMagicLinkSignIn,
  onSocialSignIn,
}: SignInFormProps): React.JSX.Element => {
  const formik: FormikProps<SignInFormTypes> = useFormik<SignInFormTypes>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      console.log("Submitting Form with Values:", values);
      Keyboard.dismiss();
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  const handleMagicLinkSignIn = () => {
    onMagicLinkSignIn(formik.values.email);
  };

  const handleSocialSignIn = (provider: "google" | "apple") => {
    onSocialSignIn(provider);
  };

  return (
    <View>
      {/* Email Field */}
      <View className="mb-6">
        <Text className="text-neutral-300 text-sm font-medium mb-3 ml-1">
          Email
        </Text>
        <InputGroup
          placeholder="canandoe@gmail.com"
          startContent={
            <Ionicons name="mail-outline" size={20} color="#6B7280" />
          }
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {formik.touched.email && formik.errors.email && (
          <Text className="text-red-400 text-sm mt-1 ml-1">
            {formik.errors.email}
          </Text>
        )}
      </View>

      {/* Password Field */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-neutral-300 text-sm font-medium ml-1">
            Password
          </Text>
          <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
            <Text className="text-primary-400 text-sm font-medium">
              Forgot?
            </Text>
          </Pressable>
        </View>
        <InputGroup
          placeholder="••••••••••••••••"
          startContent={
            <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
          }
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          secureTextEntry
        />
        {formik.touched.password && formik.errors.password && (
          <Text className="text-red-400 text-sm mt-1 ml-1">
            {formik.errors.password}
          </Text>
        )}
      </View>

      {/* Sign In Button */}
      <View className="items-center mb-7">
        <Button
          width="half"
          loading={isLoading}
          label={isLoading ? "Signing In..." : "Sign In"}
          onPress={() => formik.handleSubmit()}
        />
      </View>

      <Pressable
        onPress={handleMagicLinkSignIn}
        disabled={!formik.values.email || isLoading}
        className="h-12 rounded-2xl items-center justify-center mb-8"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <Text className="text-primary-400 text-sm font-medium">
          Send Magic Link Instead
        </Text>
      </Pressable>

      {/* Social Sign In */}
      <View className="mb-8">
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-neutral-800" />
          <Text className="text-neutral-500 text-sm mx-4 font-medium">
            or Login with
          </Text>
          <View className="flex-1 h-px bg-neutral-800" />
        </View>

        <View className="flex-row gap-4">
          <Pressable
            onPress={() => handleSocialSignIn("google")}
            className="flex-1 h-14 rounded-2xl items-center justify-center flex-row gap-3"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Ionicons name="logo-google" size={20} color="white" />
            <Text className="text-white text-sm font-medium">Google</Text>
          </Pressable>

          <Pressable
            onPress={() => handleSocialSignIn("apple")}
            className="flex-1 h-14 rounded-2xl items-center justify-center flex-row gap-3"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Ionicons name="logo-apple" size={20} color="white" />
            <Text className="text-white text-sm font-medium">Apple</Text>
          </Pressable>
        </View>
      </View>

      {/* Footer */}
      <View className="items-center">
        <Pressable onPress={() => router.push("/(auth)/register")}>
          <Text className="text-neutral-400 text-base">
            New here?{" "}
            <Text className="text-primary-400 font-semibold">
              Create Account
            </Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignInForm;
