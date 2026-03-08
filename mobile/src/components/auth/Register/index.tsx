import React from "react";
import { Keyboard, View, Text, Pressable } from "react-native";
import { Button, InputGroup } from "../../atoms";
import { Ionicons } from "@expo/vector-icons";
import { FormikProps, useFormik } from "formik";
import { registerSchema } from "@/utils/validations/auth-schema";
import SocialCTA from "./SocialCTA";

const RegisterForm = ({
  loading,
  onSubmit,
  handleSocialSignUp,
}: RegisterFormProps & {
  handleSocialSignUp: (provider: SocialProvider) => void;
}): React.JSX.Element => {
  const formik: FormikProps<RegisterFormTypes> = useFormik<RegisterFormTypes>({
    initialValues: {
      fullName: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log("Submitting form with values");
      Keyboard.dismiss();
      onSubmit(values);
    },
    enableReinitialize: true,
  });
  return (
    <View
      className="p-6"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <View>
        <InputGroup
          placeholder="Name"
          label="Full Name"
          startContent={
            <Ionicons name="person-outline" size={20} color="#6B7280" />
          }
          value={formik.values.fullName}
          onChangeText={formik.handleChange("fullName")}
          keyboardType="default"
          error={formik.errors.fullName}
          touched={formik.touched.fullName}
        />
        <InputGroup
          label="Email"
          placeholder="canandoe@gmail.com"
          startContent={
            <Ionicons name="mail-outline" size={20} color="#6B7280" />
          }
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          keyboardType="email-address"
          autoCapitalize="none"
          error={formik.errors.email}
          touched={formik.touched.email}
        />
        <InputGroup
          label="Phone"
          placeholder="91 *********"
          startContent={
            <Ionicons name="call-outline" size={20} color="#6B7280" />
          }
          value={formik.values.phoneNumber}
          onChangeText={formik.handleChange("phoneNumber")}
          keyboardType="phone-pad"
          error={formik.errors.phoneNumber}
          touched={formik.touched.phoneNumber}
        />
        <InputGroup
          label="Password"
          placeholder="••••••••••••••••"
          value={formik.values.password}
          startContent={
            <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
          }
          onChangeText={formik.handleChange("password")}
          keyboardType="default"
          error={formik.errors.password}
          touched={formik.touched.password}
        />
        <InputGroup
          placeholder="••••••••••••••••"
          label="Confirm Password"
          value={formik.values.confirmPassword}
          startContent={
            <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
          }
          onChangeText={formik.handleChange("confirmPassword")}
          keyboardType="default"
          error={formik.errors.confirmPassword}
          touched={formik.touched.confirmPassword}
        />
      </View>
      <View className="flex-row items-start gap-3 mb-6">
        <Pressable
          onPress={() =>
            formik.setFieldValue("acceptTerms", !formik.values.acceptTerms)
          }
          className="mt-1"
        >
          <View
            className={`h-5 w-5 rounded-lg items-center justify-center ${
              formik.values.acceptTerms ? "bg-primary-600" : ""
            }`}
            style={{
              backgroundColor: formik.values.acceptTerms
                ? "#6366F1"
                : "rgba(255, 255, 255, 0.08)",
              borderWidth: 1,
              borderColor: formik.values.acceptTerms
                ? "#6366F1"
                : "rgba(255, 255, 255, 0.2)",
            }}
          >
            {formik.values.acceptTerms && (
              <Ionicons name="checkmark" size={14} color="white" />
            )}
          </View>
        </Pressable>
        <View className="flex-1">
          <Text className="text-neutral-400 text-sm leading-5">
            I will also accept these terms
          </Text>
          <Text className="text-primary-400 text-sm">I accept the terms</Text>
        </View>
      </View>
      <View className="items-center my-5">
        <Button
          width="half"
          loading={loading}
          label={loading ? "Signing In..." : "Sign In"}
          onPress={() => formik.handleSubmit()}
        />
      </View>

      <SocialCTA onSocialPress={handleSocialSignUp} />
    </View>
  );
};

export default RegisterForm;
