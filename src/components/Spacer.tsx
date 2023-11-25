import React from 'react';
import {View} from 'react-native';
import {isAndroid} from '@app/utils';

type SpacerProps = {
  space: number;
  between?: boolean;
};

export default function Spacer({space, between}: SpacerProps) {
  return space ? (
    <View
      style={{
        height: between ? 0 : isAndroid ? space + 1.5 : space,
        width: between ? (isAndroid ? space + 1.5 : space) : 0,
      }}
    />
  ) : null;
}

// <Spacer space={10} between />
