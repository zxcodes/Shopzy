import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

type PaddingContainerProps = {
  style?: ViewStyle;
  children: React.ReactNode | React.ReactNode[];
};

export default ({children, style}: PaddingContainerProps) => {
  return (
    <View
      style={{
        ...styles.container,
        ...style,
      }}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

// <PaddingContainer style>
//     <View />
//     <View />
// </PaddingContainer>
