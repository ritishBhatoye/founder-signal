/**
 * Toast Utility for showing notifications
 */

import { Alert } from "react-native";

interface ToastOptions {
  title?: string;
  message: string;
  duration?: number;
}

class ToastService {
  /**
   * Show success toast
   */
  success(title: string, message: string) {
    Alert.alert(title, message, [{ text: "OK", style: "default" }]);
  }

  /**
   * Show error toast
   */
  error(title: string, message: string) {
    Alert.alert(title, message, [{ text: "OK", style: "destructive" }]);
  }

  /**
   * Show warning toast
   */
  warning(title: string, message: string) {
    Alert.alert(title, message, [{ text: "OK", style: "default" }]);
  }

  /**
   * Show info toast
   */
  info(title: string, message: string) {
    Alert.alert(title, message, [{ text: "OK", style: "default" }]);
  }

  /**
   * Show generic toast
   */
  show(options: ToastOptions) {
    Alert.alert(options.title || "Notification", options.message, [
      { text: "OK", style: "default" },
    ]);
  }
}

export const showToast = new ToastService();
