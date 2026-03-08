// ============================================
// ELEMENT/ORGANISM PROPS INTERFACES
// ============================================

// DashboardHeader
interface DashboardHeaderProps {
  userName: string
  userRole?: string
  userImage?: string
  notificationCount?: number
  onProfilePress?: () => void
  onNotificationPress?: () => void
  onMenuPress?: () => void
  className?: string
}

// EmployeeCard
interface EmployeeCardProps {
  employee: Employee
  onPress?: () => void
  onCall?: () => void
  onEmail?: () => void
  showActions?: boolean
  className?: string
}

// LeaveRequestCard
interface LeaveRequestCardProps {
  request: LeaveRequest
  onPress?: () => void
  onApprove?: () => void
  onReject?: () => void
  showActions?: boolean
  loading?: boolean
  className?: string
}

// LeaveHistoryList
interface LeaveHistoryListProps {
  leaves: LeaveRecord[]
  onLeavePress?: (id: string) => void
  filter?: string
  onFilterChange?: (filter: string) => void
  className?: string
}

// ApplyLeaveForm
interface ApplyLeaveFormProps {
  onSubmit: (data: LeaveFormData) => void
  onCancel?: () => void
  loading?: boolean
  className?: string
}

// DrawerMenu
interface MenuItem {
  id: string
  icon: Ionicons
  label: string
  badge?: number
  danger?: boolean
}

interface DrawerMenuProps {
  userName: string
  userRole?: string
  userImage?: string
  items: MenuItem[]
  activeItemId?: string
  onItemPress: (id: string) => void
  onProfilePress?: () => void
  onLogout?: () => void
  className?: string
}

// AttendanceSummary
interface AttendanceSummaryProps {
  status: AttendanceStatus
  checkInTime?: string
  checkOutTime?: string
  totalHours?: string
  onCheckIn?: () => void
  onCheckOut?: () => void
  loading?: boolean
  className?: string
}

// CalendarView
interface CalendarViewProps {
  month: Date
  events?: CalendarEvent[]
  onDayPress?: (date: Date) => void
  onPrevMonth?: () => void
  onNextMonth?: () => void
  className?: string
}

// ApprovalsList
interface ApprovalsListProps {
  requests: LeaveRequest[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onRequestPress?: (id: string) => void
  filter?: string
  onFilterChange?: (filter: string) => void
  loading?: boolean
  className?: string
}

// NotificationCenter
interface NotificationCenterProps {
  notifications: Notification[]
  onPress: (id: string) => void
  onMarkAllRead?: () => void
  className?: string
}

// ProfileScreenSection
interface ProfileScreenSectionProps {
  name: string
  role?: string
  department?: string
  imageUri?: string
  email?: string
  phone?: string
  employeeId?: string
  joinDate?: string
  onEdit?: () => void
  className?: string
}

// SettingItem
interface SettingItem {
  id: string
  type: 'toggle' | 'link' | 'action'
  icon?: Ionicons
  label: string
  description?: string
  value?: boolean
  onToggle?: (value: boolean) => void
  onPress?: () => void
  danger?: boolean
}

// SettingsScreenSection
interface SettingsScreenSectionProps {
  title?: string
  items: SettingItem[]
  className?: string
}

// AdminOverviewCards
interface AdminOverviewCardsProps {
  stats: AdminStats
  onEmployeesPress?: () => void
  onPresentPress?: () => void
  onLeavePress?: () => void
  onApprovalsPress?: () => void
  className?: string
}

// TeamListView
interface TeamListViewProps {
  members: TeamMember[]
  onMemberPress?: (id: string) => void
  showSearch?: boolean
  className?: string
}

// LeaveAnalyticsSection
interface LeaveAnalyticsSectionProps {
  balances: LeaveBalance[]
  className?: string
}

// LeaveBalanceCard (Element)
interface LeaveBalanceCardProps {
  leaveType: LeaveType
  total: number
  used: number
  pending?: number
  className?: string
}

// ApprovalCard (Element)
interface ApprovalCardProps {
  employeeName: string
  employeeAvatar?: string
  leaveType: LeaveType
  startDate: string
  endDate: string
  duration: string
  reason: string
  onApprove: () => void
  onReject: () => void
  loading?: boolean
  className?: string
}

// AttendanceCard (Element)
interface AttendanceCardProps {
  date: string
  checkIn?: string
  checkOut?: string
  totalHours?: string
  status: 'present' | 'absent' | 'late' | 'half-day' | 'leave'
  location?: string
  className?: string
}

// LeaveCard (Element)
interface LeaveCardProps {
  leaveType: LeaveType
  status: LeaveStatus
  startDate: string
  endDate: string
  duration: string
  reason?: string
  employeeName?: string
  employeeAvatar?: string
  onPress?: () => void
  className?: string
}

// QuickActionCard (Element)
interface QuickActionCardProps {
  title: string
  icon: Ionicons
  iconColor?: string
  iconBg?: string
  onPress: () => void
  disabled?: boolean
  className?: string
}
