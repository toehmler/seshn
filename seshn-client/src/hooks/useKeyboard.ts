import { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useBoolean } from './useBoolean';

interface ReturnObject {
  isKeyboardShown: boolean;
  dismiss: () => void;
}

export const useKeyboard = (): ReturnObject => {
  const [isKeyboardShown, setIsKeyboardShown] = useBoolean();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardShown.on();
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardShown.off();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [setIsKeyboardShown]);

  return { isKeyboardShown, dismiss: Keyboard.dismiss };
};
