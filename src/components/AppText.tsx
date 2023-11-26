import {AppColors, AppFonts, FontSizes} from '@app/utils';
import {Text, TextProps, TextStyle} from 'react-native';

/**
 * AppText is a wrapper of native Text component from React Native.
 * It exists to make few things easier such as setting predefined colors, font sizes, and font families.
 * This ensures consistency across the App.

 * Example usage: <AppText fontFamily="ManropeMedium" 
fontSize="medium" color="PureWhite">
                    Some Text
                  </AppText>
 */

type AppFontKeys = keyof typeof AppFonts;
type AppColorKeys = keyof typeof AppColors;
type AppFontSizes = keyof typeof FontSizes;

interface AppTextProps extends TextProps {
  fontFamily?: AppFontKeys;
  fontSize?: AppFontSizes;
  color?: AppColorKeys;
  style?: TextStyle;
}

export default ({
  fontFamily = 'ManropeMedium',
  color = 'GreyDark',
  fontSize = 'regular',
  children,
  style,
  ...remainingProps
}: AppTextProps) => {
  const size = FontSizes[fontSize as keyof typeof FontSizes];
  const fontColor = AppColors[color as keyof typeof AppColors];

  return (
    <Text
      style={{
        fontFamily,
        fontSize: size,
        color: fontColor,
        ...style,
      }}
      {...remainingProps}>
      {children}
    </Text>
  );
};
