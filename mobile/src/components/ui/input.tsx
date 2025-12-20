import { tva } from "@/utils/tva";
import React from "react";
import {
  Pressable,
  PressableProps,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
} from "react-native";

const inputStyle = tva({
  base: "flex-row items-center rounded-lg border bg-white dark:bg-neutral-800",
  variants: {
    variant: {
      outline: "border-neutral-300 dark:border-neutral-600",
      underlined: "border-b border-t-0 border-l-0 border-r-0 rounded-none",
      filled: "bg-neutral-100 dark:bg-neutral-900 border-transparent",
    },
    size: {
      sm: "px-3 py-2",
      md: "px-4 py-2.5",
      lg: "px-4 py-3",
    },
    isFocused: {
      true: "border-primary-500",
    },
    isInvalid: {
      true: "border-error-500",
    },
    isDisabled: {
      true: "opacity-40",
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});

const inputFieldStyle = tva({
  base: "flex-1 text-base text-neutral-900 dark:text-neutral-100",
});

interface InputContextValue {
  variant?: "outline" | "underlined" | "filled";
  size?: "sm" | "md" | "lg";
  isFocused?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  borderColor?: string;
  backgroundColor?: string;
}

const InputContext = React.createContext<InputContextValue>({});

interface InputProps extends ViewProps {
  variant?: "outline" | "underlined" | "filled";
  size?: "sm" | "md" | "lg";
  isFocused?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  className?: string;
  context?: InputContextValue;
}

export const Input = React.forwardRef<React.ElementRef<typeof View>, InputProps>(
  (
    { variant, size, isFocused, isInvalid, isDisabled, className, context, children, ...props },
    ref,
  ) => {
    const contextValue = context || { variant, size, isFocused, isInvalid, isDisabled };

    return (
      <InputContext.Provider value={contextValue}>
        <View
          ref={ref}
          className={inputStyle({
            variant,
            size,
            isFocused,
            isInvalid,
            isDisabled,
            className,
          })}
          {...props}
        >
          {children}
        </View>
      </InputContext.Provider>
    );
  },
);

Input.displayName = "Input";

interface InputFieldProps extends TextInputProps {
  className?: string;
}

export const InputField = React.forwardRef<React.ElementRef<typeof TextInput>, InputFieldProps>(
  ({ className, ...props }, ref) => {
    const context = React.useContext(InputContext);

    return (
      <TextInput
        ref={ref}
        editable={!context.isDisabled}
        className={inputFieldStyle({ className })}
        {...props}
      />
    );
  },
);

InputField.displayName = "InputField";

interface InputSlotProps extends PressableProps {
  className?: string;
  children?: React.ReactNode;
}

export const InputSlot = React.forwardRef<React.ElementRef<typeof Pressable>, InputSlotProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Pressable ref={ref} className={className} {...props}>
        {children}
      </Pressable>
    );
  },
);

InputSlot.displayName = "InputSlot";
