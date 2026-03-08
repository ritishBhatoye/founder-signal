/**
 * ScreenTitle - Main heading for screens
 * Usage: <ScreenTitle>Dashboard</ScreenTitle>
 */
import React from 'react'
import { Text } from 'react-native'

import { tva } from '@/utils/tva'

type TitleSize = 'sm' | 'md' | 'lg' | 'xl'

interface ScreenTitleProps {
  children: React.ReactNode
  size?: TitleSize
  className?: string
  align?: 'left' | 'center' | 'right'
}

const titleStyle = tva({
  base: 'font-bold text-neutral-900 dark:text-neutral-100',
  variants: {
    size: {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
      xl: 'text-3xl',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'lg',
    align: 'left',
  },
})

const ScreenTitle: React.FC<ScreenTitleProps> = ({
  children,
  size = 'lg',
  className = '',
  align = 'left',
}) => <Text className={titleStyle({ size, align, className })}>{children}</Text>

export default ScreenTitle
