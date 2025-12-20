import { Input, Text } from "@/components/atoms";
import { TextInputProps, View } from "react-native";

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export const FormField = ({ label, error, ...inputProps }: FormFieldProps) => {
  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-medium mb-2">{label}</Text>
      <Input error={!!error} {...inputProps} />
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};
