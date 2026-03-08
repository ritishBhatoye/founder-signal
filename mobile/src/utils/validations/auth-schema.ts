import * as Yup from 'yup'

export const signInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Must contain at least one special character')
    .required('Password is required'),
})

export const registerSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .min(3, 'Full Name must be at least 3 characters')
    .required('Full Name is required'),

  email: Yup.string().email('Invalid email address').required('Email is required'),

  countryCode: Yup.string().required('Country code is required'),

  phoneNumber: Yup.string()
    .matches(/^[0-9]{7,15}$/, 'Phone number is not valid')
    .required('Phone number is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Must contain at least one special character')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),

  acceptTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
})
