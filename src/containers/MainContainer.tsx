import { AppColors, isAndroid } from "@app/utils";
import React, { PropsWithChildren } from "react";
import { StatusBar, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PaddingContainer from "./PaddingContainer";

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
    <SafeAreaView>
      <StatusBar barStyle={isAndroid ? "light-content" : "dark-content"} />
      <PaddingContainer
        style={{
          height: fillHeight ? "100%" : 0,
          backgroundColor: backgroundColor || AppColors.JustWhite,
          paddingVertical: 20,
          ...style,
        }}
      >
        {children}
      </PaddingContainer>
    </SafeAreaView>
  );
};

// <MainContainer fillHeight backgroundColor="#000">
// {children}
// </MainContainer>
