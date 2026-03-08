import React from 'react'
import { Text, View } from 'react-native'

import { tva } from '@/utils/tva'

import type { TextProps, ViewProps } from 'react-native'

const formControlStyle = tva({
  base: 'mb-4',
  variants: {
    isInvalid: {
      true: '',
    },
    isDisabled: {
      true: 'opacity-40',
    },
    isReadOnly: {
      true: '',
    },
  },
})

interface FormControlProps extends ViewProps {
  isInvalid?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  className?: string
}

export const FormControl = React.forwardRef<
  React.ElementRef<typeof View>,
  FormControlProps
>(({ isInvalid, isDisabled, isReadOnly, className, ...props }, ref) => (
  <View
    ref={ref}
    className={formControlStyle({ isInvalid, isDisabled, isReadOnly, className })}
    {...props}
  />
))

FormControl.displayName = 'FormControl'

const formControlLabelStyle = tva({
  base: 'mb-1 flex-row items-center',
})

export const FormControlLabel = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps & { className?: string }
>(({ className, ...props }, ref) => (
  <View ref={ref} className={formControlLabelStyle({ className })} {...props} />
))

FormControlLabel.displayName = 'FormControlLabel'

const formControlLabelTextStyle = tva({
  base: 'text-sm font-medium text-neutral-900 dark:text-neutral-100',
})

export const FormControlLabelText = React.forwardRef<
  React.ElementRef<typeof Text>,
  TextProps & { className?: string }
>(({ className, ...props }, ref) => (
  <Text ref={ref} className={formControlLabelTextStyle({ className })} {...props} />
))

FormControlLabelText.displayName = 'FormControlLabelText'

const formControlLabelAstrickStyle = tva({
  base: 'text-sm text-error-500',
})

export const FormControlLabelAstrick = React.forwardRef<
  React.ElementRef<typeof Text>,
  TextProps & { className?: string }
>(({ className, ...props }, ref) => (
  <Text ref={ref} className={formControlLabelAstrickStyle({ className })} {...props} />
))

FormControlLabelAstrick.displayName = 'FormControlLabelAstrick'

const formControlErrorStyle = tva({
  base: 'mt-1 flex-row items-center',
})

export const FormControlError = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps & { className?: string }
>(({ className, ...props }, ref) => (
  <View ref={ref} className={formControlErrorStyle({ className })} {...props} />
))

FormControlError.displayName = 'FormControlError'

const formControlErrorTextStyle = tva({
  base: 'text-xs text-error-500',
})

export const FormControlErrorText = React.forwardRef<
  React.ElementRef<typeof Text>,
  TextProps & { className?: string }
>(({ className, ...props }, ref) => (
  <Text ref={ref} className={formControlErrorTextStyle({ className })} {...props} />
))

FormControlErrorText.displayName = 'FormControlErrorText'
