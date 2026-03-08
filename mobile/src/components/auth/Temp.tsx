'use client'
import { router } from 'expo-router'
import { useFormik, type FormikProps } from 'formik'
import React from 'react'
import {
  Keyboard,
  Platform,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { ThemedView } from '@/components/atoms'
import { Colors } from '@/constants/Colors'

import Button from '@/components/elements/Button'
import CalendarInput from '@/components/elements/CalendarInput'
import CheckboxGroup from '@/components/elements/CheckboxGroup'
import Dropdown from '@/components/elements/Dropdown'
import InputGroup from '@/components/elements/InputGroup'
import { companyOptions, departmentOptions, genderOption } from '@/constants/global'
import { employeeOverviewSchema } from '@/utils/validations/addNewEmployee/employeeOverviewSchema'

const OverviewForm = ({
  loading,
  onSubmit,
}: EmployeeOverviewFormProps): React.JSX.Element => {
  const formik: FormikProps<EmployeeOverviewFormType> =
    useFormik<EmployeeOverviewFormType>({
      initialValues: {
        basicInfo: {
          systemId: '',
          employeeNumber: '',
          firstName: '',
          middleName: '',
          lastName: '',
          gender: '',
          dob: '',
          email: '',
          status: 'INACTIVE',
          insuranceDetail: {
            individual: false,
            group: false,
          },
        },
        companyDetails: {
          company: '',
          designation: '',
          branch: '',
          department: '',
          reportsTo: '',
          employmentType: '',
        },
      },
      validationSchema: employeeOverviewSchema,
      onSubmit: (values) => {
        console.log('Submitting form with values:', values)
        Keyboard.dismiss()
        onSubmit(values)
      },
      enableReinitialize: true,
    })
  const today: Date = new Date()
  const maxDate: Date = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  )
  const colorScheme = useColorScheme()
  return (
    <View className="flex-1 bg-primary-50 dark:bg-gray-800">
           {' '}
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor:
            colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        extraScrollHeight={200} // adjust this as needed
        enableOnAndroid={true}
      >
               {' '}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
        >
                   {' '}
          <ThemedView
            className={`h-full gap-4 bg-primary-50 px-4 py-6 dark:bg-gray-800 ${
              Platform.OS === 'android' ? 'pb-14' : 'pb-5'
            }`}
          >
                        {/* Header */}              {/* Form Fields */}
                       {' '}
            <ThemedView className="m-2 gap-4 rounded-xl bg-white p-4 dark:bg-primary-800/10">
                           {' '}
              <Dropdown
                isRequired
                label="System ID"
                value={formik.values.basicInfo?.systemId}
                onValueChange={(val: string | string[]) =>
                  formik.setFieldValue('basicInfo.systemId', val as string)
                }
                variant="outline"
                options={departmentOptions}
                error={formik.errors.basicInfo?.systemId}
                touched={formik.touched.basicInfo?.systemId}
              />
                           {' '}
              <InputGroup
                label="Employee Number"
                placeholder="Employee Number"
                value={formik.values.basicInfo.employeeNumber ?? ''}
                onChangeText={formik.handleChange('basicInfo.employeeNumber')}
                onBlur={formik.handleBlur('basicInfo.employeeNumber')}
                error={formik.errors.basicInfo?.employeeNumber}
                touched={formik.touched.basicInfo?.employeeNumber}
                isRequired
              />
                           {' '}
              <InputGroup
                label="First Name"
                placeholder="First Name"
                value={formik.values.basicInfo?.firstName || ''}
                onChangeText={formik.handleChange('basicInfo.firstName')}
                onBlur={formik.handleBlur('basicInfo.firstName')}
                error={formik.errors.basicInfo?.firstName}
                touched={formik.touched.basicInfo?.firstName}
              />
                           {' '}
              <InputGroup
                label="Middle Name"
                placeholder="Middle Name"
                value={formik.values.basicInfo?.middleName || ''}
                onChangeText={formik.handleChange('basicInfo.middleName')}
                onBlur={formik.handleBlur('basicInfo.middleName')}
                error={formik.errors.basicInfo?.middleName}
                touched={formik.touched.basicInfo?.middleName}
              />
                           {' '}
              <InputGroup
                label="Last Name"
                placeholder="Last Name"
                value={formik.values.basicInfo?.lastName}
                onChangeText={formik.handleChange('basicInfo.lastName')}
                onBlur={formik.handleBlur('basicInfo.lastName')}
                error={formik.errors.basicInfo?.lastName}
                touched={formik.touched.basicInfo?.lastName}
                isRequired
              />
                           {' '}
              <Dropdown
                label="Gender"
                value={formik.values.basicInfo?.gender}
                onValueChange={(val: string | string[]) =>
                  formik.setFieldValue('basicInfo.gender', val as string)
                }
                variant="outline"
                options={genderOption}
                error={formik.errors.basicInfo?.gender}
                touched={formik.touched.basicInfo?.gender}
                isRequired
              />
                           {' '}
              <CalendarInput
                label="Date of Birth"
                value={formik.values.basicInfo?.dob}
                onChange={(date: string) => formik.setFieldValue('basicInfo.dob', date)}
                onBlur={() => formik.setFieldTouched('basicInfo.dob', true)}
                error={formik.errors.basicInfo?.dob}
                touched={formik.touched.basicInfo?.dob}
                isRequired
                maximumDate={maxDate}
              />
                           {' '}
              <InputGroup
                label="Email"
                placeholder="Email"
                value={formik.values.basicInfo?.email}
                onChangeText={formik.handleChange('basicInfo.email')}
                onBlur={formik.handleBlur('basicInfo.email')}
                error={formik.errors.basicInfo?.email}
                touched={formik.touched.basicInfo?.email}
                keyboardType="email-address"
                isRequired
              />
                            {/* Status */}
                           {' '}
              <View className="mt-4">
                               {' '}
                <Text className="mb-2 text-sm font-medium text-black">
                                    Status <Text className="text-red-500">*</Text>
                                 {' '}
                </Text>
                               {' '}
                <View className="flex-col items-start gap-4 space-x-6 pt-2">
                                   {' '}
                  <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => formik.setFieldValue('basicInfo.status', 'ACTIVE')}
                  >
                                       {' '}
                    <View className="h-5 w-5 items-center justify-center rounded-full border border-gray-500">
                                           {' '}
                      {formik.values.basicInfo.status === 'ACTIVE' && (
                        <View className="h-3 w-3 rounded-full bg-blue-600" />
                      )}
                                         {' '}
                    </View>
                                        <Text className="ml-2">Active</Text>
                                     {' '}
                  </TouchableOpacity>
                                     {' '}
                  <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => formik.setFieldValue('basicInfo.status', 'INACTIVE')}
                  >
                                       {' '}
                    <View className="h-5 w-5 items-center justify-center rounded-full border border-gray-500">
                                           {' '}
                      {formik.values.basicInfo.status === 'INACTIVE' && (
                        <View className="h-3 w-3 rounded-full bg-blue-600" />
                      )}
                                         {' '}
                    </View>
                                        <Text className="ml-2">Inactive</Text>
                                     {' '}
                  </TouchableOpacity>
                                 {' '}
                </View>
                             {' '}
              </View>
                              {/* Insurance Details */}
                           {' '}
              <View className="mt-6 flex-col items-start gap-2">
                               {' '}
                <Text className="text-sm font-medium text-black">
                                    Insurance Details                {' '}
                </Text>
                                 {' '}
                <CheckboxGroup
                  name="basicInfo.insuranceDetail.individual"
                  value={formik.values.basicInfo.insuranceDetail.individual ?? false}
                  onChange={(checked: boolean) =>
                    formik.setFieldValue('basicInfo.insuranceDetail.individual', checked)
                  }
                  touched={formik.touched.basicInfo?.insuranceDetail?.individual}
                  error={formik.errors.basicInfo?.insuranceDetail?.individual}
                  className="px-0"
                >
                                    Individual                {' '}
                </CheckboxGroup>
                                 {' '}
                <CheckboxGroup
                  name="basicInfo.insuranceDetail.group"
                  value={formik.values.basicInfo.insuranceDetail.group ?? false}
                  onChange={(checked: boolean) =>
                    formik.setFieldValue('basicInfo.insuranceDetail.group', checked)
                  }
                  touched={formik.touched.basicInfo?.insuranceDetail?.group}
                  error={formik.errors.basicInfo?.insuranceDetail?.group}
                  className="px-0"
                >
                                    Group                {' '}
                </CheckboxGroup>
                               {' '}
                {formik.errors.basicInfo?.insuranceDetail &&
                  typeof formik.errors.basicInfo.insuranceDetail === 'string' && (
                    <Text className="mt-1 text-sm text-red-500">
                                            {formik.errors.basicInfo.insuranceDetail}
                                         {' '}
                    </Text>
                  )}
                             {' '}
              </View>
                            {/* Company Details */}
                           {' '}
              <Dropdown
                isRequired
                label="Company"
                value={formik.values.companyDetails.company}
                onValueChange={(val) =>
                  formik.setFieldValue('companyDetails.company', val)
                }
                variant="outline"
                options={companyOptions}
                error={formik.errors.companyDetails?.company}
                touched={formik.touched.companyDetails?.company}
              />
                           {' '}
              {/* <InputGroup
                label="Company"
                placeholder=""
                value={formik.values.companyDetails.company}
                onChangeText={formik.handleChange('companyDetails.company')}
                onBlur={formik.handleBlur('companyDetails.company')}
                error={formik.errors.companyDetails?.company}
                keyboardType="default"
                touched={formik.touched.companyDetails?.company}
                isRequired
              /> */}
                           {' '}
              <InputGroup
                label="Designation"
                placeholder="Designation"
                value={formik.values.companyDetails?.designation}
                onChangeText={formik.handleChange('companyDetails.designation')}
                onBlur={formik.handleBlur('companyDetails.designation')}
                error={formik.errors.companyDetails?.designation}
                touched={formik.touched.companyDetails?.designation}
                isRequired
              />
                           {' '}
              <InputGroup
                label="Branch"
                placeholder="Branch"
                value={formik.values.companyDetails?.branch}
                onChangeText={formik.handleChange('companyDetails.branch')}
                onBlur={formik.handleBlur('companyDetails.branch')}
                error={formik.errors.companyDetails?.branch}
                touched={formik.touched.companyDetails?.branch}
                isRequired
              />
                           {' '}
              <InputGroup
                label="Department"
                placeholder="Department"
                value={formik.values.companyDetails?.department}
                onChangeText={formik.handleChange('companyDetails.department')}
                onBlur={formik.handleBlur('companyDetails.department')}
                error={formik.errors.companyDetails?.department}
                touched={formik.touched.companyDetails?.department}
                isRequired
              />
                           {' '}
              <Dropdown
                isRequired
                label="Reports to"
                value={formik.values.companyDetails?.reportsTo}
                onValueChange={(val) =>
                  formik.setFieldValue('companyDetails.reportsTo', val)
                }
                variant="outline"
                options={departmentOptions}
                error={formik.errors.companyDetails?.reportsTo}
                touched={formik.touched.companyDetails?.reportsTo}
              />
                           {' '}
              <Dropdown
                isRequired
                label="Employment Type"
                value={formik.values.companyDetails?.employmentType}
                onValueChange={(val) =>
                  formik.setFieldValue('companyDetails.employmentType', val)
                }
                variant="outline"
                options={departmentOptions}
                error={formik.errors.companyDetails?.employmentType}
                touched={formik.touched.companyDetails?.employmentType}
              />
                         {' '}
            </ThemedView>
                     {' '}
          </ThemedView>
                 {' '}
        </ScrollView>
             {' '}
      </KeyboardAwareScrollView>
            {/* Actions */}       {' '}
      <View className="w-full flex-row justify-between gap-x-3 bg-white px-5 pb-8 pt-5">
               {' '}
        <View className="w-auto flex-1">
                   {' '}
          <Button
            disabled={!formik.isValid || !formik.dirty || loading}
            className="w-fit"
            label="Save & Continue"
            size="lg"
            onPress={() => {
              formik.handleSubmit()
            }}
            loading={loading}
          />
                 {' '}
        </View>
               {' '}
        <View className="w-auto flex-1">
                   {' '}
          <Button
            disabled={!formik.isValid || !formik.dirty || loading}
            label="Save & Exit"
            size="lg"
            className="w-auto px-10"
            variant="white"
            onPress={() =>
              router.push('/(drawer-routes)/hr/employee-lifecycle/add-new-employee/exit')
            }
          />
                 {' '}
        </View>
             {' '}
      </View>
         {' '}
    </View>
  )
}
export default OverviewForm
