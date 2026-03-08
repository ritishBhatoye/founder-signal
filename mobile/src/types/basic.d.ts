// ============================================
// ICON TYPES
// ============================================
type MaterialCommunityIcons =
  keyof typeof import('@expo/vector-icons').MaterialCommunityIcons.glyphMap
type MaterialIconsprops = keyof typeof import('@expo/vector-icons').MaterialIcons.glyphMap
declare type Ionicons = keyof typeof import('@expo/vector-icons').Ionicons.glyphMap
type IoniconType = typeof import('@expo/vector-icons/Ionicons').default
type IoniconName = React.ComponentProps<IoniconType>['name']

// ============================================
// REACT NATIVE & EXPO TYPES
// ============================================
type ImageBackgroundProps = import('expo-image').ImageBackgroundProps
type ImageSourcePropType = import('react-native').ImageSourcePropType
type ReactNode = import('react').ReactNode
type Dispatch<T> = import('react').Dispatch<T>
type SetStateAction<T> = import('react').SetStateAction<T>
type TouchableOpacityProps = import('react-native').TouchableOpacityProps
type TextProps = import('react-native').TextProps
type ViewProps = import('react-native').ViewProps
type TextStyle = import('react-native').TextStyle
type SafeAreaViewProps = import('react-native-safe-area-context').SafeAreaViewProps
type ScrollViewProps = import('react-native').ScrollViewProps
type FlatList = import('react-native').FlatList
type ViewStyle = import('react-native').ViewStyle
type ViewToken = import('react-native').ViewToken
type Href = import('expo-router').Href
type StyleProps = import('react-native-reanimated').StyleProps
type StyleProp<T> = import('react-native').StyleProp<T>
type GestureResponderEvent = import('react-native').GestureResponderEvent
type TextInputProps = import('react-native').TextInputProps

// ============================================
// STATE TYPES
// ============================================
type State<T> = [T, React.Dispatch<React.SetStateAction<T>>]
type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>
type BooleanState = State<boolean>
type NumberState = State<number>
type StringState = State<string>

// ============================================
// BASIC TYPES
// ============================================
type TextAlign = 'center' | 'left' | 'right'
type InputVariant = 'underlined' | 'outline' | 'rounded'
type BorderColor =
  | 'border-black'
  | 'border-danger'
  | 'border-transparent'
  | 'border-white'
  | 'border-lightAzure-400'
  | 'dark:border-primary-100'
type InputBg =
  | 'bg-primary'
  | 'bg-gray-100'
  | 'bg-white'
  | 'bg-lightAzure-400'
  | 'bg-red-500'
type ToastStatus = 'success' | 'error'
type FileObject = { name: string; uri: string }
type ClassValue = string | number | null | undefined | boolean

// ============================================
// ERROR & API TYPES
// ============================================
interface ErrorType {
  message: string
  code?: string | number
  status?: number
}

interface ApiResultType<T> {
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
  error: ErrorType
  data: T
}

// ============================================
// LEAVE MANAGEMENT TYPES
// ============================================
type LeaveType =
  | 'sick'
  | 'casual'
  | 'annual'
  | 'unpaid'
  | 'maternity'
  | 'paternity'
  | 'wfh'
  | 'other'
type LeaveStatus = 'approved' | 'pending' | 'rejected' | 'draft'
type AttendanceStatus = 'not-checked-in' | 'checked-in' | 'checked-out'
type EmployeeStatus = 'active' | 'on-leave' | 'wfh'

interface LeaveBalance {
  type: LeaveType
  total: number
  used: number
  pending: number
}

interface LeaveRecord {
  id: string
  type: LeaveType
  startDate: string
  endDate: string
  status: LeaveStatus
  duration: string
  reason?: string
  appliedOn?: string
}

interface LeaveRequest {
  id: string
  employeeName: string
  employeeImage?: string
  leaveType: LeaveType
  startDate: string
  endDate: string
  duration: string
  reason: string
  status: LeaveStatus
  appliedOn?: string
}

interface LeaveFormData {
  leaveType?: LeaveType
  startDate?: Date
  endDate?: Date
  reason: string
  attachments?: AttachmentFile[]
}

// ============================================
// EMPLOYEE TYPES
// ============================================
interface Employee {
  id: string
  name: string
  role: string
  department: string
  imageUri?: string
  status?: EmployeeStatus
  email?: string
  phone?: string
}

interface TeamMember {
  id: string
  name: string
  role: string
  department?: string
  imageUri?: string
  status?: EmployeeStatus
}

// ============================================
// NOTIFICATION TYPES
// ============================================
type NotificationType = 'approval' | 'leave' | 'attendance' | 'system'

interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  timestamp: string
}

// ============================================
// CALENDAR TYPES
// ============================================
type CalendarEventType = 'leave' | 'holiday' | 'wfh'

interface CalendarEvent {
  date: string
  type: CalendarEventType
}

// ============================================
// ADMIN TYPES
// ============================================
interface AdminStats {
  totalEmployees: number
  presentToday: number
  onLeave: number
  pendingApprovals: number
}

// ============================================
// UI COMPONENT TYPES
// ============================================
type ThemedTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'
  style?: StyleProp<TextStyle>
}

type ThemedScrollViewProps = ScrollViewProps & {
  lightColor?: string
  darkColor?: string
  className?: string
}

type ThemedSafeAreaViewProps = SafeAreaViewProps & {
  lightColor?: string
  darkColor?: string
  className?: string
}

type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

interface OptionType {
  label: string
  subLabel?: string
  value: string
  isDisabled?: boolean
}

interface InputGroupProps {
  tooltipContent?: string
  showTooltip?: boolean
  label?: string
  value: string
  isDisabled?: boolean
  isReadOnly?: boolean
  onChangeText: (text: string) => void
  onBlur?: (e: any) => void
  onFocus?: () => void
  onSubmitEditing?: (e: any) => void
  onClear?: (e: any) => void
  startContent?: ReactNode
  endContent?: ReactNode
  placeholder?: string
  isPassword?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  error?: string
  touched?: boolean
  iconName?: string
  variant?: InputVariant
  borderColor?: BorderColor | any
  backgroundColor?: InputBg
  inputClassName?: string
  isRequired?: boolean
  showPasswordStrength?: boolean
}

interface InputTextAreaProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  onBlur?: (e: any) => void
  error?: string
  touched?: boolean
  isRequired?: boolean
  placeholder?: string
  isAccordion?: boolean
}

interface CalendarInputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  error?: string
  touched?: boolean
  isRequired?: boolean
  isDisabled?: boolean
  placeholder?: string
  maximumDate?: Date
  minimumDate?: Date
}

interface DropdownProps {
  label?: string
  options: OptionType[]
  value?: string | string[]
  onValueChange?: (val: string | string[]) => void
  placeholder?: string
  selectedLabelClassName?: string
  optionClassName?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'underlined' | 'outline' | 'rounded'
  className?: string
  error?: string
  touched?: boolean
  isRequired?: boolean
  isDisabled?: boolean
  borderless?: boolean
  customIconName?: Ionicons
  fullWidth?: boolean
  startContent?: ReactNode
  endContent?: ReactNode
  onStartContentPress?: () => void
  onEndContentPress?: () => void
}

interface IconWithLabelProps {
  icon: string
  label: string
}

interface PaginationCompProps {
  index: number
  x: import('react-native-reanimated').SharedValue<number>
  screenWidth: number
}

interface PaginationProps {
  data: any[]
  x: import('react-native-reanimated').SharedValue<number>
  screenWidth: number
}

interface AccordionContentProps {
  data: any
  index: number
  accordionId: number | null
  itemClassName?: string
  containerClassName?: string
  isClickable?: boolean
}

interface AccordionDetailsProps {
  data: any
  index: number
  accordionId: number | null
}

interface AccordionHeaderProps {
  type?: string
  item: any
  index: number
  accordionId: number | null
  setAccordionId: Dispatch<React.SetStateAction<number | null>>
  typoClassName?: string
  typoSubtitleClassName?: string
  containerClassName?: string
  isChevronIconVisible?: boolean
  isLastItem?: boolean
}

interface BottomSheetWrapperProps {
  children: ReactNode
  snapPoints?: (string | number)[]
  index?: number
  enablePanDownToClose?: boolean
  backgroundColor?: string
  onClose?: () => void
  onOpen?: () => void
  onChangeIndex?: (index: number) => void
  className?: string
  isScrollable?: boolean
}

interface BottomSheetWrapperRef {
  open: () => void
  close: () => void
}

interface CustomButtonProps extends TouchableOpacityProps {
  label?: string
  isPrimary?: boolean
  isSecondary?: boolean
  isWhite?: boolean
  isTertiary?: boolean
  isDanger?: boolean
  isDangerSecondary?: boolean
  isLink?: boolean
  disabled?: boolean
  isFullWidth?: boolean
  isHalfWidth?: boolean
  isSmall?: boolean
  loading?: boolean
  icon?: ReactNode
  className?: string
}

interface CheckboxGroupProps {
  name: string
  value: boolean
  onChange: (checked: boolean) => void
  touched?: boolean
  error?: string
  children: ReactNode
  containerStyle?: ViewStyle
  textStyle?: TextStyle
  errorAlign?: 'left' | 'center'
  className?: string
  showTooltip?: boolean
  tooltipContent?: string
}

interface CountryPickerProps {
  value: string
  onChange: (value: string) => void
}

interface CustomToastProps {
  title?: string
  message: string
  placement?: 'top' | 'bottom'
  duration?: number
  variant?: 'solid' | 'outline'
  action?: 'success' | 'warning' | 'error' | 'info' | 'muted'
}

interface ListTileProps {
  id?: number
  className?: string
  title: string
  isSwitch?: boolean
  content?: string
  isTrailingIcon?: boolean
  onPress?: () => void
  isDanger?: boolean
  isSecondary?: boolean
  isDefault?: boolean
  default?: boolean
  leadingIcon?: Ionicons
  trailingIcon?: Ionicons
}

interface MarkdownTextProps extends Omit<TextProps, 'children'> {
  text: string
  style?: TextStyle
  color?: string
}

interface SelectGroupProps {
  label?: string
  options: { label: string; value: string }[]
  value: string
  onChange: (val: string) => void
  placeholder?: string
  error?: string
  touched?: boolean
  isRequired?: boolean
  variant?: 'underlined' | 'outline' | 'rounded'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

interface WithSkeletonProps {
  height?: number
  width?: number
  delay?: number
  className?: string
  children: React.ReactNode
  isLoading?: boolean
}

interface StarRatingProps {
  rating: number
  size?: number
}

interface ProfileImageUploaderProps {
  value: string
  onChange: (uri: string) => void
  size?: number
  disabled?: boolean
}

interface PasswordStrengthInfo {
  score: number
  color: string
  message: string
}

interface TitleWithCtaProps {
  title: string
  titleClassName?: string
  subTitle?: string
  subTitleClassName?: string
  className?: string
  amount?: number | React.ReactElement
  handleSeeAll?: () => void
}

interface TabItemType {
  key: string
  title: string
  component: React.ReactElement
}

// ============================================
// NAVIGATION & ROUTING TYPES
// ============================================
interface RouteTabDataType {
  label: string
  route: string
}

interface FilterTabDataType {
  id: string
  label: string
  path?: string | undefined
  visible?: boolean
}

interface TabSliderProps {
  tabs: FilterTabDataType[]
  activeRoute: string
  onTabPress: (route: string) => void
  containerClassName?: string
  tabClassName?: string
  activeTabClassName?: string
  inactiveTabClassName?: string
}

interface CommonHeaderOptionsType {
  headerTransparent: boolean
  headerShadowVisible: boolean
  headerStyle: {
    elevation: number
    shadowOpacity: number
  }
}

interface NavItem {
  id: string
  title: string
  leadingIcon?: string
  leadingImage?: string
  children?: NavItem[]
  routePath?: string
}

// ============================================
// MISC TYPES
// ============================================
interface SearchItemProps {
  id: string
  title: string
  onPress?: () => void
}

interface SearchBarProps {
  setSearch: (value: string) => void
  [key: string]: any
}

interface CountryProps {
  name: string
  code: string
  dialCode: string
  flag: string
}

interface IconStyleProps {
  onPress?: () => void
  Icon?: React.ComponentType<any>
  size?: number
  width?: number
  height?: number
  color?: string
  focused?: boolean
  rating?: 'full' | 'half' | 'zero'
}

interface LoaderProps {
  visible: boolean
  size?: 'small' | 'large'
  color?: string
  backgroundOpacity?: number
}

interface ThemeColorProps {
  light?: string
  dark?: string
}

interface OfflineScreenProps {
  setIsOffline: Dispatch<React.SetStateAction<boolean>>
}

interface UseOnboardingSlidesProps {
  slidesLength: number
  onLastSlide?: () => void
}

interface UseImageUploaderResult {
  image: string | null
  uploading: boolean
  pickImage: () => Promise<void>
  takePhoto: () => Promise<void>
}

interface AppToast {
  showToast: (status: 'success' | 'error', title: string, description: string) => void
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
}

interface PricingItem {
  country: string
  amount: number
}

interface CurrencyFormatProps {
  amount?: number
  pricing?: PricingItem[]
}

interface CurrencyInfo {
  symbol: string
  code: string
  country: string
}

interface NotificationTileDataType {
  id: number
  senderProfile?: ImageSourcePropType
  title: string
  timeStamp: string
}

interface DropDownOptionType {
  label: string
  subLabel?: string
  value: string
}

interface EditableDetailItem {
  label: string
  value: string
  editable?: boolean
}

interface EmployeeEditableSectionProps {
  leftData: EditableDetailItem[]
  rightData: EditableDetailItem[]
  onEdit?: () => void
  editTool: 'ICON' | 'CTA'
}
