import {ACTIVE_BUTTON_OPACITY} from '@app/constants';
import {AppColors, AppFonts, FontSizes} from '@app/utils';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

/**
 * AppButton is a wrapper of Button component from React Native.
 * It exists to make few things easier such as setting predefined background colors, font colors, font sizes, and font families.
 * This ensures consistency across the App.

 * Example usage: <AppButton fontFamily="ManropeMedium" fontSize="medium" color="PureWhite" backgroundColor="PrimaryBlue">
                    Some Text
                  </AppButton>
 */

type AppFontKeys = keyof typeof AppFonts;
type AppColorKeys = keyof typeof AppColors;
type AppFontSizes = keyof typeof FontSizes;

interface AppButtonProps
  extends Omit<TouchableOpacityProps, 'fontSize' | 'fontFamily'> {
  fontFamily?: AppFontKeys;
  fontSize?: AppFontSizes;
  color?: AppColorKeys;
  backgroundColor?: AppColorKeys;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  style?: ViewStyle;
}

export default ({
  color = 'PureWhite',
  fontFamily = 'ManropeSemiBold',
  fontSize = 'regular',
  backgroundColor = 'PrimaryBlue',
  children,
  onPress,
  style,
  ...remainingProps
}: AppButtonProps) => {
  const size = FontSizes[fontSize as keyof typeof FontSizes];
  const fontColor = AppColors[color as keyof typeof AppColors];
  const background = AppColors[backgroundColor as keyof typeof AppColors];
  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_BUTTON_OPACITY}
      onPress={onPress}
      style={{
        ...styles.button,
        backgroundColor: background,
        ...style,
      }}
      {...remainingProps}>
      <Text
        style={{
          fontSize: size,
          fontFamily: fontFamily,
          color: fontColor,
          textAlign: 'center',
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
});
