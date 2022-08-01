import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
  HapticOptions,
} from 'react-native-haptic-feedback';

export const triggerHaptics = (
  type: HapticFeedbackTypes,
  options?: HapticOptions
) => {
  ReactNativeHapticFeedback.trigger(type, {
    ...options,
  });
};
