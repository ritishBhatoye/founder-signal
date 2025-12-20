// ============================================
// MOLECULE PROPS INTERFACES
// ============================================

// HeaderBar
interface HeaderBarProps {
  title: string;
  onBack?: () => void;
  showNotification?: boolean;
  notificationCount?: number;
  onNotificationPress?: () => void;
  rightAction?: ReactNode;
  className?: string;
}

// SearchBarWithIcon
interface SearchBarWithIconProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onSubmit?: () => void;
  autoFocus?: boolean;
  className?: string;
}

// DateRangeSelector
interface DateRangeSelectorProps {
  startDate?: Date;
  endDate?: Date;
  onStartPress: () => void;
  onEndPress: () => void;
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

// LeaveTypeSelector
interface LeaveOption {
  type: LeaveType;
  label: string;
  balance?: number;
}

interface LeaveTypeSelectorProps {
  value?: LeaveType;
  onChange: (type: LeaveType) => void;
  options?: LeaveOption[];
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

// UserInfoRow
interface UserInfoRowProps {
  name: string;
  role?: string;
  department?: string;
  imageUri?: string;
  onPress?: () => void;
  rightContent?: ReactNode;
  showOnlineStatus?: boolean;
  isOnline?: boolean;
  className?: string;
}

// LeaveStatusRow
interface LeaveStatusRowProps {
  type: LeaveType;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  duration?: string;
  onPress?: () => void;
  className?: string;
}

// DrawerItemRow
interface DrawerItemRowProps {
  icon: Ionicons;
  label: string;
  onPress: () => void;
  active?: boolean;
  badge?: number;
  danger?: boolean;
  className?: string;
}

// BottomNavItem
interface BottomNavItemProps {
  icon: Ionicons;
  iconOutline?: Ionicons;
  label: string;
  active?: boolean;
  onPress: () => void;
  badge?: number;
  className?: string;
}

// StatCardSmall
interface StatCardSmallProps {
  title: string;
  value: number | string;
  icon?: Ionicons;
  color?: "primary" | "success" | "warning" | "error" | "info";
  onPress?: () => void;
  className?: string;
}

// FormRow
interface FormRowProps {
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

// SettingRowToggle
interface SettingRowToggleProps {
  label: string;
  description?: string;
  icon?: Ionicons;
  value: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
}

// AttachmentFile
interface AttachmentFile {
  id: string;
  name: string;
  size?: string;
  type?: string;
}

// AttachmentUploader
interface AttachmentUploaderProps {
  files: AttachmentFile[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  maxFiles?: number;
  label?: string;
  className?: string;
}

// CommentBox
interface CommentBoxProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

// FilterOption
interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

// FilterChipGroup
interface FilterChipGroupProps {
  options: FilterOption[];
  selected?: string;
  onSelect: (value: string) => void;
  className?: string;
}

// ProfileStat
interface ProfileStat {
  label: string;
  value: string | number;
}

// ProfileSummaryCard
interface ProfileSummaryCardProps {
  name: string;
  role?: string;
  department?: string;
  imageUri?: string;
  stats?: ProfileStat[];
  onEdit?: () => void;
  className?: string;
}
