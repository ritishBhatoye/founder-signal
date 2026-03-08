/**
 * ApplyLeaveForm - Complete leave application form
 * Usage: <ApplyLeaveForm onSubmit={handleSubmit} loading={isSubmitting} />
 */
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'

import PrimaryButton from '../atoms/PrimaryButton'
import SecondaryButton from '../atoms/SecondaryButton'
import TextAreaField from '../atoms/TextAreaField'
import DateRangeSelector from '../molecules/DateRangeSelector'
import FormRow from '../molecules/FormRow'
import LeaveTypeSelector from '../molecules/LeaveTypeSelector'

import type { LeaveType } from '../atoms/LeaveTypeTag'

interface LeaveFormData {
  leaveType?: LeaveType
  startDate?: Date
  endDate?: Date
  reason: string
}

interface ApplyLeaveFormProps {
  onSubmit: (data: LeaveFormData) => void
  onCancel?: () => void
  loading?: boolean
  className?: string
}

const ApplyLeaveForm: React.FC<ApplyLeaveFormProps> = ({
  onSubmit,
  onCancel,
  loading = false,
  className = '',
}) => {
  const [formData, setFormData] = useState<LeaveFormData>({ reason: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof LeaveFormData, string>>>({})

  const validate = () => {
    const newErrors: typeof errors = {}
    if (!formData.leaveType) newErrors.leaveType = 'Please select leave type'
    if (!formData.startDate) newErrors.startDate = 'Please select start date'
    if (!formData.endDate) newErrors.endDate = 'Please select end date'
    if (!formData.reason.trim()) newErrors.reason = 'Please provide a reason'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) onSubmit(formData)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={`flex-1 ${className}`}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <LeaveTypeSelector
          value={formData.leaveType}
          onChange={(type) => setFormData({ ...formData, leaveType: type })}
          required
          error={errors.leaveType}
          className="mb-4"
        />
        <DateRangeSelector
          startDate={formData.startDate}
          endDate={formData.endDate}
          onStartPress={() => {}}
          onEndPress={() => {}}
          required
          error={errors.startDate || errors.endDate}
          className="mb-4"
        />
        <FormRow label="Reason" required>
          <TextAreaField
            value={formData.reason}
            onChangeText={(text) => setFormData({ ...formData, reason: text })}
            placeholder="Describe your reason for leave..."
            rows={4}
            maxLength={500}
            showCharCount
            error={errors.reason}
            touched={!!errors.reason}
          />
        </FormRow>
      </ScrollView>
      <View className="flex-row space-x-3 pt-4">
        {onCancel && (
          <View className="flex-1">
            <SecondaryButton onPress={onCancel} disabled={loading}>
              Cancel
            </SecondaryButton>
          </View>
        )}
        <View className="flex-1">
          <PrimaryButton onPress={handleSubmit} loading={loading} icon="paper-plane">
            Submit
          </PrimaryButton>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default ApplyLeaveForm
