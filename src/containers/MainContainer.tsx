import {AppColors} from '@app/utils';
import {StatusBar} from 'expo-status-bar';
import React, {PropsWithChildren} from 'react';
import {ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type MainContainerProps = PropsWithChildren<{
  style?: ViewStyle;
  fillHeight?: boolean;
  backgroundColor?: string;
  children: React.ReactNode;
}>;

export default ({
  children,
  style,
  fillHeight,
  backgroundColor,
}: MainContainerProps): JSX.Element => {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{
        flex: fillHeight ? 1 : undefined,
        backgroundColor: backgroundColor || AppColors.PureWhite,
        paddingVertical: 20,
        paddingHorizontal: 10,
        ...style,
      }}>
      <StatusBar style="auto" backgroundColor={AppColors.PrimaryBlue} />
      {children}
    </SafeAreaView>
  );
};

// <MainContainer fillHeight backgroundColor="#000">
// {children}
// </MainContainer>
