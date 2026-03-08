import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Text } from '@/components/atoms'
import { colors } from '@/constants/theme'

type PressureLevel = 'Low' | 'Medium' | 'High'

export default function SupportPressureScreen() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState<PressureLevel>('Low')

  const pressureLevels: {
    level: PressureLevel
    color: string
    icon: string
    desc: string
  }[] = [
    {
      level: 'Low',
      color: colors.success,
      icon: 'checkmark-circle',
      desc: 'Few support requests, everything smooth',
    },
    {
      level: 'Medium',
      color: colors.warning,
      icon: 'alert-circle',
      desc: 'Normal volume, manageable workload',
    },
    {
      level: 'High',
      color: colors.danger,
      icon: 'warning',
      desc: 'High volume, need to investigate issues',
    },
  ]

  const handleSave = () => {
    // TODO: Save to backend
    router.back()
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.bg }}>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View className="mb-8 mt-4">
          <TouchableOpacity onPress={() => router.back()} className="mb-4">
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={{ color: colors.text }} className="text-2xl font-bold">
            Support Pressure
          </Text>
          <Text style={{ color: colors.textMuted }} className="mt-2 text-base">
            How&apos;s your support load today? This helps track overall health.
          </Text>
        </View>

        {/* Pressure Level Options */}
        <View className="mb-6">
          {pressureLevels.map((item) => {
            const isSelected = selectedLevel === item.level
            return (
              <TouchableOpacity
                key={item.level}
                onPress={() => setSelectedLevel(item.level)}
                className="mb-3 rounded-2xl border p-5"
                style={{
                  backgroundColor: isSelected ? `${item.color}15` : colors.card,
                  borderColor: isSelected ? `${item.color}40` : colors.border,
                }}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View
                      className="mr-3 h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <Ionicons name={item.icon as any} size={24} color={item.color} />
                    </View>
                    <View className="flex-1">
                      <Text
                        style={{ color: colors.text }}
                        className="text-lg font-semibold"
                      >
                        {item.level}
                      </Text>
                      <Text style={{ color: colors.textMuted }} className="mt-1 text-sm">
                        {item.desc}
                      </Text>
                    </View>
                  </View>
                  {isSelected && (
                    <View
                      className="h-6 w-6 items-center justify-center rounded-full"
                      style={{ backgroundColor: item.color }}
                    >
                      <Ionicons name="checkmark" size={16} color="white" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Info Box */}
        <View
          className="mb-6 rounded-2xl border p-4"
          style={{ backgroundColor: colors.card }}
        >
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={20} color={colors.primary} />
            <View className="ml-3 flex-1">
              <Text style={{ color: colors.text }} className="text-sm font-semibold">
                Why we ask this
              </Text>
              <Text style={{ color: colors.textMuted }} className="mt-1 text-sm">
                Support pressure is a leading indicator. High support + revenue drop =
                investigate product issues.
              </Text>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          className="rounded-2xl py-4"
          style={{ backgroundColor: colors.success }}
        >
          <Text className="text-center text-lg font-semibold text-white">Save</Text>
        </TouchableOpacity>

        {/* Future Note */}
        <View className="mt-6 items-center">
          <Text style={{ color: colors.textMuted }} className="text-center text-xs">
            We&apos;re working on auto-detecting this from your support tools
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
