import React, {PropsWithChildren} from 'react';
import {View, ViewStyle} from 'react-native';

interface FlexContainerProps extends PropsWithChildren {
  position?: 'start' | 'center' | 'end' | 'rowBetween' | 'columnBetween';
  direction?: 'row' | 'column';
  fillHeight?: boolean;
  style?: ViewStyle;
}

const FlexContainer: React.FC<FlexContainerProps> = ({
  children,
  position,
  direction,
  fillHeight = false,
  style,
}) => {
  const getPositionStyles = (position: string): ViewStyle => {
    const baseStyles: ViewStyle = {
      flex: fillHeight ? 1 : undefined,
      flexDirection: direction === 'row' ? 'row' : 'column',
      ...style,
    };

    switch (position) {
      case 'start':
        return {
          ...baseStyles,
          justifyContent: 'flex-start',
          alignItems: direction === 'row' ? 'center' : 'flex-start',
        };
      case 'center':
        return {
          ...baseStyles,
          justifyContent: 'center',
          alignItems: 'center',
        };
      case 'end':
        return {
          ...baseStyles,
          justifyContent: 'flex-end',
          alignItems: direction === 'row' ? 'center' : 'flex-end',
        };
      case 'rowBetween':
        return {
          ...baseStyles,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        };
      case 'columnBetween':
        return {
          ...baseStyles,
          justifyContent: 'space-between',
          flexDirection: 'column',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <View style={position ? getPositionStyles(position) : {}}>{children}</View>
  );
};

export default FlexContainer;
