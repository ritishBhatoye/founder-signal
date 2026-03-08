// ============================================
// AUTH TYPES
// ============================================
type SocialProvider = 'google' | 'apple'

interface AuthType {
  id: string
  isLoggedIn?: boolean
  accessToken: string
  refreshToken: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  profileImage: string
}

interface UserType {
  accountType: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  profileImage?: string
}

interface ProfileProps {
  firstName: string
  lastName: string
  email: string
  profileImage: string
}

interface UserWithProfile {
  user: ProfileProps | UserType
}

// ============================================
// AUTH SCREEN TYPES
// ============================================
interface AuthScreenLayoutProps {
  title: string
  image?: ImageBackgroundProps
  subtitle?: string
  showBackButton?: boolean
  children: ReactNode
  align?: TextAlign
  withPadding?: boolean
  className?: string
  showLogo?: boolean
  contentClassName?: string
  headerPosition?: 'INSIDE' | 'OUTSIDE'
}

interface InitiateEmailOtpRequestType {
  id: string
  email: string
  firstName: string
  action: string
}

interface InitiateEmailOtpRequestResultType {
  sessionToken: string
  message: string
  contactInfo: string
}

// ============================================
// AUTH FORM TYPES
// ============================================
interface EmailFormType {
  email: string
}

interface FindAccountFormTypes {
  email: string
}

interface VerifyOtpType {
  email?: string
  otp?: string
  action?: string
}

interface VerifyIdentityFormTypes {
  firstName: string
  middleName?: string | undefined
  lastName: string
  confirmLegalName: boolean
}

interface SignInFormTypes {
  email: string
  password: string
  rememberMe: boolean
}

interface RegisterFormTypes {
  fullName: string
  email: string
  phoneNumber: string
  countryCode: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

interface CompanyInformationFormTypes {
  legalName: string
  industryType: string
  companyType: string
  pan: string
  tan?: string
  gstin: string
  cin?: string
  financialYear: string
}

interface SetNewPasswordFormTypes {
  newPassword: string
  confirmNewPassword: string
}

interface RecoveryEmailFormTypes {
  email: string
  confirmEmail: string
}

interface Address {
  line1: string
  line2?: string
  line3?: string
  pinCode: string
  city: string
  state: string
  country: string
}

interface EditProfileFormTypes {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  countryCode?: string
  gender: string
  headline?: string
  body?: string
  dob: string
  address: Address
  profileImage?: string
}

interface PersonalInfoFormTypes {
  profileImage?: string
  title: string
  firstName: string
  middleName?: string
  lastName: string
  gender: string
  dob: string
  aadhaar: string
  phoneNumber: string
  pan: string
  officialEmail: string
  designation: string
  department: string
}

interface BusinessTaxInformationTypes {
  phoneNumber: string
  landlineNumber: string
  officialEmail: string
  officialWebsite: string
  pincode: string
  state: string
  city: string
  addressLine1: string
  addressLine2?: string
  addressLine3?: string
}

interface MultiFactorFormTypes {
  mfaEnabled: boolean
}

interface AccountSecurityFormTypes {
  email: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface AddReviewFormTypes {
  id?: string
  title: string
  review: string
  rating: number
}

type FormikState<T> = import('formik').FormikState<T>
type ResetFormType = (nextState?: Partial<FormikState<any>>) => void

interface FormSubmissionProps<T> {
  loading: boolean
  onSubmit: (values: T, actions?: ResetFormType) => void
  initialValues?: T
  isFetchingData?: boolean
}

// Form Props Types
type MultiFactorFormProps = FormSubmissionProps<MultiFactorFormTypes>
type RecoveryEmailFormProps = FormSubmissionProps<RecoveryEmailFormTypes>
type FindAccountFormProps = FormSubmissionProps<FindAccountFormTypes>
type ResetPasswordFormProps = FormSubmissionProps<SetNewPasswordFormTypes>
type SignInFormProps = FormSubmissionProps<SignInFormTypes>
type RegisterFormProps = FormSubmissionProps<RegisterFormTypes>
type VerifyOTPFormProps = FormSubmissionProps<VerifyOtpType>
type VerifyIdentityFormProps = FormSubmissionProps<VerifyIdentityFormTypes>
type EditProfileFormProps = FormSubmissionProps<EditProfileFormTypes>
type AccountFormProps = FormSubmissionProps<AccountSecurityFormTypes>
type AddReviewFormProps = FormSubmissionProps<AddReviewFormTypes>
type PersonalInfoFormProps = FormSubmissionProps<PersonalInfoFormTypes>
type CompanyInformationFormProps = FormSubmissionProps<CompanyInformationFormTypes>
