/**
 * EmptyStateText - Text for empty states
 * Usage: <EmptyStateText>No leave requests found</EmptyStateText>
 */
import React from 'react'
import { Text } from 'react-native'

import { tva } from '@/utils/tva'

interface EmptyStateTextProps {
  children: React.ReactNode
  className?: string
}

const textStyle = tva({
  base: 'text-center text-neutral-500 dark:text-neutral-400 text-base',
})

const EmptyStateText: React.FC<EmptyStateTextProps> = ({ children, className = '' }) => (
  <Text className={textStyle({ className })}>{children}</Text>
)

export default EmptyStateText
