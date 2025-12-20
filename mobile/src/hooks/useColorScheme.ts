/**
 * useColorScheme hook - Returns the current color scheme
 */
import { useColorScheme as useRNColorScheme } from "react-native";

export function useColorScheme() {
  return useRNColorScheme() ?? "light";
}

export default useColorScheme;
