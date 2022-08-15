import { useTheme } from 'native-base';
import { useCallback } from 'react';
import { ActionSheetIOS, ActionSheetIOSOptions } from 'react-native';

interface Action {
  text: string;
  action?: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export const useActionSheet = (
  actions: Action[],
  options?: Omit<ActionSheetIOSOptions, 'options'>
): (() => void) => {
  const { colors } = useTheme();

  const show = useCallback(
    () =>
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', ...actions.map((action) => action.text)],
          cancelButtonIndex: 0,
          tintColor: colors.primary[500],
          destructiveButtonIndex: actions.reduce(
            (indices: number[], currAction: Action, index: number) => {
              if (currAction.destructive) {
                indices.push(index + 1);
              }
              return indices;
            },
            []
          ),
          disabledButtonIndices: actions.reduce(
            (indices: number[], currAction: Action, index: number) => {
              if (currAction.disabled) {
                indices.push(index + 1);
              }
              return indices;
            },
            []
          ),
          ...options,
        },
        (buttonIndex: number) => {
          if (buttonIndex === 0) {
            return;
          }
          actions[buttonIndex - 1]?.action?.();
        }
      ),
    [actions, colors.primary, options]
  );

  return show;
};
