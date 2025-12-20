/**
 * RequiredStar - Red asterisk for required fields
 * Usage: <RequiredStar />
 */
import React from "react";
import { Text } from "react-native";

interface RequiredStarProps {
  className?: string;
}

const RequiredStar: React.FC<RequiredStarProps> = ({ className = "" }) => {
  return <Text className={`text-error-500 text-sm ${className}`}>*</Text>;
};

export default RequiredStar;
