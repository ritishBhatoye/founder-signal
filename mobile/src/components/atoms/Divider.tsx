import React from 'react'
import { View } from 'react-native'

type DividerOrientation = 'horizontal' | 'vertical'
type DividerVariant = 'solid' | 'dashed' | 'dotted'

interface DividerProps {
  orientation?: DividerOrientation
  variant?: DividerVariant
  className?: string
  color?: string
  thickness?: number
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  className = '',
  color = 'border-neutral-200 dark:border-neutral-700',
  thickness = 1,
}) => {
  const getVariantStyle = () => {
    if (variant === 'dashed') return 'border-dashed'
    if (variant === 'dotted') return 'border-dotted'
    return 'border-solid'
  }

  const orientationStyle =
    orientation === 'horizontal'
      ? `w-full border-t-${thickness} ${getVariantStyle()}`
      : `h-full border-l-${thickness} ${getVariantStyle()}`

  return <View className={`${orientationStyle} ${color} ${className}`} />
}

export default Divider
