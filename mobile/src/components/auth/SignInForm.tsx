import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useFormik } from 'formik'
import React from 'react'
import { Keyboard, View, Text, Pressable } from 'react-native'

import { signInSchema } from '@/utils/validations/auth-schema'

import { Button, InputGroup } from '../atoms'

import type { FormikProps } from 'formik'

interface SignInFormProps {
  isLoading: boolean
  onSubmit: (values: SignInFormTypes) => void
  onMagicLinkSignIn: (email: string) => void
  onSocialSignIn: (provider: 'google' | 'apple') => void
}

const SignInForm = ({
  isLoading,
  onSubmit,
  onMagicLinkSignIn,
  onSocialSignIn,
}: SignInFormProps): React.JSX.Element => {
  const formik: FormikProps<SignInFormTypes> = useFormik<SignInFormTypes>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      console.log('Submitting Form with Values:', values)
      Keyboard.dismiss()
      onSubmit(values)
    },
    enableReinitialize: true,
  })

  const handleMagicLinkSignIn = () => {
    onMagicLinkSignIn(formik.values.email)
  }

  const handleSocialSignIn = (provider: 'google' | 'apple') => {
    onSocialSignIn(provider)
  }

  return (
    <View>
      {/* Email Field */}
      <View className="mb-6">
        <InputGroup
          inputClassName="text-white"
          label="Email"
          placeholder="canandoe@gmail.com"
          startContent={<Ionicons name="mail-outline" size={20} color="#6B7280" />}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          keyboardType="email-address"
          autoCapitalize="none"
          error={formik.errors.email}
          touched={formik.touched.email}
        />
      </View>

      {/* Password Field */}
      <View className="mb-6">
        <View className="mb-3 flex-row items-center justify-between">
          <Pressable
            className="relative ml-1 w-full"
            onPress={() => router.push('/(auth)/forgot-password')}
          >
            <Text className="absolute right-0 top-3 text-sm font-medium text-primary-400">
              Forgot?
            </Text>
          </Pressable>
        </View>
        <InputGroup
          label="Password"
          placeholder="••••••••••••••••"
          startContent={<Ionicons name="lock-closed-outline" size={20} color="#6B7280" />}
          inputClassName="text-white"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          secureTextEntry
          error={formik.errors.password}
          touched={formik.touched.password}
        />
      </View>

      {/* Sign In Button */}
      <View className="mb-7 items-center">
        <Button
          width="half"
          loading={isLoading}
          label={isLoading ? 'Signing In...' : 'Sign In'}
          onPress={() => formik.handleSubmit()}
        />
      </View>

      <Pressable
        onPress={handleMagicLinkSignIn}
        disabled={!formik.values.email || isLoading}
        className="mb-8 h-12 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <Text className="text-sm font-medium text-primary-400">
          Send Magic Link Instead
        </Text>
      </Pressable>

      {/* Social Sign In */}
      <View className="mb-8">
        <View className="mb-6 flex-row items-center">
          <View className="h-px flex-1 bg-neutral-800" />
          <Text className="mx-4 text-sm font-medium text-neutral-500">or Login with</Text>
          <View className="h-px flex-1 bg-neutral-800" />
        </View>

        <View className="flex-row gap-4">
          <Pressable
            onPress={() => handleSocialSignIn('google')}
            className="h-14 flex-1 flex-row items-center justify-center gap-3 rounded-2xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <Ionicons name="logo-google" size={20} color="white" />
            <Text className="text-sm font-medium text-white">Google</Text>
          </Pressable>

          <Pressable
            onPress={() => handleSocialSignIn('apple')}
            className="h-14 flex-1 flex-row items-center justify-center gap-3 rounded-2xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <Ionicons name="logo-apple" size={20} color="white" />
            <Text className="text-sm font-medium text-white">Apple</Text>
          </Pressable>
        </View>
      </View>

      {/* Footer */}
      <View className="items-center">
        <Pressable onPress={() => router.push('/(auth)/register')}>
          <Text className="text-base text-neutral-400">
            New here?{' '}
            <Text className="font-semibold text-primary-400">Create Account</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default SignInForm
