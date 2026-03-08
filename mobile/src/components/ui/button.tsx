import React from "react";
import { Pressable, PressableProps, Text, TextProps } from "react-native";
import { tva } from "@/utils/tva";

const buttonStyle = tva({
  base: 'flex-row items-center justify-center rounded-lg',
  variants: {
    variant: {
      solid: 'bg-primary-500',
      outline: 'border-2 border-primary-500 bg-transparent',
      ghost: 'bg-transparent',
    },
    size: {
      xs: 'px-3 py-1.5',
      sm: 'px-4 py-2',
      md: 'px-5 py-2.5',
      lg: 'px-6 py-3',
      xl: 'px-7 py-3.5',
    },
    disabled: {
      true: 'opacity-40',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

const buttonTextStyle = tva({
  base: 'font-medium',
  variants: {
    variant: {
      solid: 'text-white',
      outline: 'text-primary-500',
      ghost: 'text-primary-500',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

interface ButtonProps extends PressableProps {
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  children?: React.ReactNode
}

export const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ variant, size, disabled, className, children, ...props }, ref) => (
      <Pressable
        ref={ref}
        disabled={disabled}
        className={buttonStyle({ variant, size, disabled: disabled ?? false, className })}
        {...props}
      >
        {children}
      </Pressable>
    ),
)

Button.displayName = 'Button'

interface ButtonTextProps extends TextProps {
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export const ButtonText = React.forwardRef<
  React.ElementRef<typeof Text>,
  ButtonTextProps
>(({ variant, size, className, ...props }, ref) => <Text ref={ref} className={buttonTextStyle({ variant, size, className })} {...props} />,
})

ButtonText.displayName = 'ButtonText'
