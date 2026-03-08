/**
 * RequiredStar - Red asterisk for required fields
 * Usage: <RequiredStar />
 */
import React from 'react'
import { Text } from 'react-native'

interface RequiredStarProps {
  className?: string
}

const RequiredStar: React.FC<RequiredStarProps> = ({ className = '' }) => (
  <Text className={`text-sm text-error-500 ${className}`}>*</Text>
)

export default RequiredStar
