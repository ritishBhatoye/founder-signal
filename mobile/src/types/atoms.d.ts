// ============================================
// ATOM PROPS INTERFACES
// ============================================

// AppLogo
interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  imageSource?: ImageSourcePropType
  className?: string
}

// ScreenTitle
interface ScreenTitleProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  align?: TextAlign
}

// SubTitle
interface SubTitleProps {
  children: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  muted?: boolean
}

// PrimaryButton
interface PrimaryButtonProps {
  children: ReactNode
  onPress: () => void
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  icon?: Ionicons
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  className?: string
}

// SecondaryButton
interface SecondaryButtonProps {
  children: ReactNode
  onPress: () => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outlined' | 'ghost'
  disabled?: boolean
  loading?: boolean
  icon?: Ionicons
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  danger?: boolean
  className?: string
}

// IconButton
interface IconButtonProps {
  icon: Ionicons
  onPress: () => void
  variant?: 'filled' | 'outlined' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'
  disabled?: boolean
  className?: string
}

// Avatar
interface AvatarProps {
  name?: string
  imageUri?: string | ImageSourcePropType
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  backgroundColor?: string
  textColor?: string
}

// AvatarSmall
interface AvatarSmallProps {
  name?: string
  imageUri?: string
  className?: string
  backgroundColor?: string
}

// AvatarMedium
interface AvatarMediumProps {
  name?: string
  imageUri?: string
  className?: string
  backgroundColor?: string
  showBadge?: boolean
  badgeColor?: string
}

// StatusBadge
interface StatusBadgeProps {
  status: LeaveStatus
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

// LeaveTypeTag
interface LeaveTypeTagProps {
  type: LeaveType
  showIcon?: boolean
  size?: 'sm' | 'md'
  className?: string
}

// DateChip
interface DateChipProps {
  date: Date | string
  format?: 'short' | 'medium' | 'long'
  showIcon?: boolean
  variant?: 'default' | 'outlined' | 'filled'
  className?: string
}

// Divider
interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted'
  className?: string
  color?: string
  thickness?: number
}

// InputLabel
interface InputLabelProps {
  children: ReactNode
  required?: boolean
  className?: string
  htmlFor?: string
}

// InputField
interface InputFieldProps extends TextInputProps {
  error?: string
  touched?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  containerClassName?: string
}

// TextAreaField
interface TextAreaFieldProps extends TextInputProps {
  error?: string
  touched?: boolean
  rows?: number
  maxLength?: number
  showCharCount?: boolean
  containerClassName?: string
}

// RequiredStar
interface RequiredStarProps {
  className?: string
}

// EmptyStateText
interface EmptyStateTextProps {
  children: ReactNode
  className?: string
}

// TabItem
interface TabItemProps {
  label: string
  active?: boolean
  onPress: () => void
  badge?: number
  className?: string
}

// NavIcon
interface NavIconProps {
  name: Ionicons
  active?: boolean
  badge?: number
  size?: number
  className?: string
}

// NotificationDot
interface NotificationDotProps {
  count?: number
  showCount?: boolean
  size?: 'sm' | 'md'
  className?: string
}

// Badge
interface BadgeProps {
  label: string
  variant?:
    | 'approved'
    | 'pending'
    | 'rejected'
    | 'draft'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: ReactNode
}

// Chip
interface ChipProps {
  label: string
  variant?: 'filled' | 'outlined' | 'light'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'
  onPress?: () => void
  onDelete?: () => void
  icon?: ReactNode
  disabled?: boolean
  className?: string
}

// ProgressBar
interface ProgressBarProps {
  value: number
  max?: number
  variant?: 'primary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
  animated?: boolean
}

// Spinner
interface SpinnerProps {
  size?: 'small' | 'large'
  variant?: 'primary' | 'secondary' | 'white' | 'neutral'
  label?: string
  className?: string
}

// Skeleton
interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: number | string
  height?: number | string
  className?: string
  animate?: boolean
}

// Switch
interface SwitchProps {
  value: boolean
  onValueChange: (value: boolean) => void
  label?: string
  disabled?: boolean
  className?: string
  labelPosition?: 'left' | 'right'
}

// Checkbox
interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  error?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

// Radio
interface RadioProps {
  selected: boolean
  onSelect: () => void
  label?: string
  disabled?: boolean
  error?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

// InfoCard
interface InfoCardProps {
  title?: string
  message: string
  variant?: 'info' | 'success' | 'warning' | 'error'
  icon?: Ionicons
  className?: string
}

// EmptyState
interface EmptyStateProps {
  icon?: Ionicons
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

// StatCard
interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: Ionicons
  iconColor?: string
  iconBg?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  onPress?: () => void
  className?: string
}

// DrawerWrapper
interface DrawerWrapperProps {
  isOpen: boolean
  onClose: () => void
  anchor?: 'bottom' | 'top' | 'left' | 'right'
  size?: 'sm' | 'md' | 'lg' | 'full'
  children: ReactNode
  className?: string
}

// PasswordStrength
interface PasswordStrengthProps {
  value: string
  error?: string
}
