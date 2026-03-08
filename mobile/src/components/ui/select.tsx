import React, { useState } from 'react'
import { Modal, Pressable, ScrollView, Text, View } from 'react-native'

import { tva } from '@/utils/tva'

import type { PressableProps, ScrollViewProps, TextProps, ViewProps } from 'react-native'

const selectTriggerStyle = tva({
  base: 'flex-row items-center justify-between rounded-lg border bg-white dark:bg-neutral-800',
  variants: {
    variant: {
      outline: 'border-neutral-300 dark:border-neutral-600',
      underlined: 'border-b border-t-0 border-l-0 border-r-0 rounded-none',
    },
    size: {
      sm: 'px-3 py-2',
      md: 'px-4 py-2.5',
      lg: 'px-4 py-3',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
})

const selectItemStyle = tva({
  base: 'px-4 py-3 border-b border-neutral-100 dark:border-neutral-700',
  variants: {
    isSelected: {
      true: 'bg-primary-50 dark:bg-primary-900/20',
    },
    isDisabled: {
      true: 'opacity-40',
    },
  },
})

interface SelectContextValue {
  selectedValue?: string
  onValueChange?: (value: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const SelectContext = React.createContext<SelectContextValue>({
  isOpen: false,
  setIsOpen: () => {},
})

interface SelectProps extends ViewProps {
  selectedValue?: string
  onValueChange?: (value: string) => void
}

export const Select: React.FC<SelectProps> = ({
  selectedValue,
  onValueChange,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SelectContext.Provider value={{ selectedValue, onValueChange, isOpen, setIsOpen }}>
      <View {...props}>{children}</View>
    </SelectContext.Provider>
  )
}

interface SelectTriggerProps extends PressableProps {
  variant?: 'outline' | 'underlined'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  SelectTriggerProps
>(({ variant, size, className, children, ...props }, ref) => {
  const { setIsOpen } = React.useContext(SelectContext)

  return (
    <Pressable
      ref={ref}
      onPress={() => setIsOpen(true)}
      className={selectTriggerStyle({ variant, size, className })}
      {...props}
    >
      {children}
    </Pressable>
  )
})

SelectTrigger.displayName = 'SelectTrigger'

interface SelectInputProps extends TextProps {
  placeholder?: string
  placeholderTextColor?: string
  className?: string
}

export const SelectInput = React.forwardRef<
  React.ElementRef<typeof Text>,
  SelectInputProps
>(({ placeholder, placeholderTextColor, className, ...props }, ref) => {
  const { selectedValue } = React.useContext(SelectContext)

  return (
    <Text
      ref={ref}
      className={`flex-1 text-base ${
        selectedValue
          ? 'text-neutral-900 dark:text-neutral-100'
          : placeholderTextColor || 'text-neutral-500'
      } ${className}`}
      {...props}
    >
      {selectedValue || placeholder}
    </Text>
  )
})

SelectInput.displayName = 'SelectInput'

export const SelectIcon: React.FC<{ as: () => React.ReactNode }> = ({ as }) => <>{as()}</>

export const SelectPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen, setIsOpen } = React.useContext(SelectContext)

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => setIsOpen(false)}
    >
      {children}
    </Modal>
  )
}

export const SelectBackdrop: React.FC<PressableProps & { className?: string }> = ({
  className,
  ...props
}) => {
  const { setIsOpen } = React.useContext(SelectContext)

  return (
    <Pressable
      className={`flex-1 ${className}`}
      onPress={() => setIsOpen(false)}
      {...props}
    />
  )
}

export const SelectContent: React.FC<ViewProps & { className?: string }> = ({
  className,
  children,
  ...props
}) => (
  <View className="flex-1 items-center justify-center bg-black/50">
    <View className={`max-h-96 w-11/12 rounded-xl ${className}`} {...props}>
      {children}
    </View>
  </View>
)

export const SelectDragIndicatorWrapper: React.FC<ViewProps> = ({
  children,
  ...props
}) => (
  <View className="items-center py-2" {...props}>
    {children}
  </View>
)

export const SelectDragIndicator: React.FC<ViewProps> = (props) => (
  <View className="h-1 w-12 rounded-full bg-neutral-300 dark:bg-neutral-600" {...props} />
)

export const SelectScrollView: React.FC<ScrollViewProps> = ({ children, ...props }) => (
  <ScrollView {...props}>{children}</ScrollView>
)

interface SelectItemProps extends PressableProps {
  value: string
  label: string
  isDisabled?: boolean
  className?: string
  textStyle?: { className?: string }
}

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  SelectItemProps
>(({ value, label, isDisabled, className, textStyle, ...props }, ref) => {
  const { selectedValue, onValueChange, setIsOpen } = React.useContext(SelectContext)
  const isSelected = selectedValue === value

  const handlePress = () => {
    if (!isDisabled && onValueChange) {
      onValueChange(value)
      setIsOpen(false)
    }
  }

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      disabled={isDisabled}
      className={selectItemStyle({ isSelected, isDisabled, className })}
      {...props}
    >
      <Text
        className={`text-base text-neutral-900 dark:text-neutral-100 ${
          textStyle?.className || ''
        }`}
      >
        {label}
      </Text>
    </Pressable>
  )
})

SelectItem.displayName = 'SelectItem'
